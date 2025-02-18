import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import glb from "../src/building.glb";


const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  const locations = [
    // { id: 1, lng: 55.232262, lat: 25.032722, title: "Origin" },
    // { id: 2, lng: 55.232154, lat: 25.033234, title: "Location 2" },
    // { id: 3, lng: 55.231794, lat: 25.033036, title: "Location 3" },
    // { id: 4, lng: 55.232050, lat: 25.032184, title: "Location 4" },
    // { id: 4, lng: 55.232166, lat: 25.032069, title: "Location 4" },
    // { id: 4, lng: 55.232742, lat: 25.032384, title: "Location 4" },
  ];

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ3VydWJhcmFuIiwiYSI6ImNtNjdqY3g3ZzAxcjkya3B0OXBrZzR6cG4ifQ.KS6Q4NhPYHB1t3bHSp7u9A";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [55.232262, 25.032722],
      zoom: 19.2,
      pitch: 70,
      bearing: 30,
      antialias: true,
    });

    // Add controls
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "bottom-left"
    );

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places",
      marker: true,
    });
    map.addControl(geocoder, "top-right");

    // Setup 3D model coordinates
    const modelOrigin = [55.232262, 25.032722];
    const modelAltitude = 0;
    const modelRotate = [degreesToRadians(90), degreesToRadians(31.05), 0]; // Using the helper function

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits(),
    };

    // Create custom layer for 3D model
    const customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Soft white light
        this.scene.add(ambientLight);

        // Replace directional light with spotlight
        const directionalLight = new THREE.DirectionalLight(0xffffff, 9); // Increase intensity
        directionalLight.position.set(-50, 40, -30); // Adjusted position to be above the surface
        directionalLight.castShadow = true; // Enable shadow casting
        this.scene.add(directionalLight);

        // Shadow properties
        directionalLight.shadow.mapSize.width = 4096; // Increase for better quality
        directionalLight.shadow.mapSize.height = 4096; // Increase for better quality
        directionalLight.shadow.bias = -0.005; // Adjust bias to reduce artifacts
        directionalLight.shadow.camera.near = 0.5; // Adjust as needed
        directionalLight.shadow.camera.far = 100; // Adjust as needed

        // Create a plane to receive shadows
        const planeGeometry = new THREE.PlaneGeometry(1000, 1000); // Adjust size as needed
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 }); // Adjust opacity for shadow visibility
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2; // Rotate to lay flat
        plane.position.y = 0; // Adjust position to match the map
        plane.receiveShadow = true; // Enable shadow receiving
        this.scene.add(plane);

        // Setup DRACO loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath(
          "https://www.gstatic.com/draco/versioned/decoders/1.5.6/"
        );

        // Configure renderer for transparency and shadows
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
          antialias: true,
          alpha: true,
        });

        this.renderer.autoClear = false;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.physicallyCorrectLights = true;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.shadowMap.enabled = true; // Enable shadow maps
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Use soft shadows

        // Load your 3D model with material modifications
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.load(glb, (gltf) => {
       

          gltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true; // Enable shadow casting
              child.receiveShadow = true; // Enable shadow receiving

            

              // Optionally adjust material properties for quality
              child.material.metalness = 0; // Increase metalness for a shinier look
              child.material.roughness = 0; // Decrease roughness for a smoother surface

              // Check if the material is glass and set transparency
              if (child.material.name === "Glass") {
                // Adjust the condition based on your material naming
                child.material.transparent = true; // Enable transparency
                child.material.metalness = 1;
                child.material.opacity = 0.3; // Set the desired opacity (0.0 to 1.0)
              }
            }
          });

          // gltf.scene.scale.set(1, 1, 1); // Adjust scale as needed
          this.scene.add(gltf.scene);
        });

        directionalLight.shadow.camera.left = -100; // Adjust these values
        directionalLight.shadow.camera.right = 100;
        directionalLight.shadow.camera.top = 100;
        directionalLight.shadow.camera.bottom = -100;
        directionalLight.shadow.camera.near = 0.5; // Adjust as needed
        directionalLight.shadow.camera.far = 100; // Adjust as needed
        directionalLight.shadow.mapSize.width = 4096; // Increase for better quality
        directionalLight.shadow.mapSize.height = 4096; // Increase for better quality
        directionalLight.shadow.bias = -0.005; // Adjust as needed
      },
      render: function (gl, matrix) {
        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        map.triggerRepaint();
      },
    };

    map.on("load", () => {
      // Add the custom layer
      map.addLayer(customLayer, "waterway-label");
      const layers = map.getStyle().layers;
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout["text-field"]
      )?.id;

      // Ensure the 3D buildings layer is added before setting light
      map.addLayer(
        {
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 15,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.6,
          },
        },
        labelLayerId
      );

      // Add markers
      const markers = {};
      locations?.forEach((location) => {
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false,
        }).setHTML(`
          <div style="font-family: Arial, sans-serif; padding: 16px;">
            <h3 style="color: #334155; font-size: 16px; font-weight: 700; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 2px solid #3b82f6;">${
              location.title
            }</h3>
            <div style="background-color: #f8fafc; padding: 8px; border-radius: 4px; margin-top: 8px;">
              <p style="margin: 4px 0; font-size: 14px; color: #334155;">
                <span style="font-weight: 700;">Latitude:</span> ${location.lat.toFixed(
                  6
                )}
              </p>
              <p style="margin: 4px 0; font-size: 14px; color: #334155;">
                <span style="font-weight: 700;">Longitude:</span> ${location.lng.toFixed(
                  6
                )}
              </p>
            </div>
          </div>
        `);

        const marker = new mapboxgl.Marker({ color: "#FF0000" })
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map);

        marker._element.dataset.id = location.id;

        marker.getElement().addEventListener("click", () => {
          handleMarkerSelect(location.id);
        });
      });

      map.markers = markers;
    });

    mapRef.current = map;

    return () => map.remove();
  }, []);

  const handleMarkerSelect = () => {};

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      {/* <div style={{ 
        width: '256px', 
        backgroundColor: 'white', 
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', 
        padding: '16px',
        overflowY: 'auto' 
      }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: 'bold', 
          marginBottom: '16px', 
          color: '#334155' 
        }}>Locations</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {locations.map(location => (
            <button
              key={location.id}
              onClick={() => handleMarkerSelect(location.id)}
              style={{
                width: '100%',
                padding: '8px',
                textAlign: 'left',
                borderRadius: '4px',
                backgroundColor: selectedMarker === location.id ? '#3b82f6' : '#f1f5f9',
                color: selectedMarker === location.id ? 'white' : '#334155',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {location.title}
            </button>
          ))}
        </div>
      </div> */}

      {/* Map Container */}
      <div style={{ flex: 1 }}>
        <div ref={mapContainerRef} style={{ height: "100%" }}></div>
      </div>
    </div>
  );
};

export default Map;
