'use client';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '../mapbox-geocoder.css';
import { createRoot } from 'react-dom/client';
import { load3DModel } from './ModelLoader';
import LocationMarker from './LocationMarker';
import LocationCard from './LoactionCard';

interface Location {
  id: string;
  name: string;
  coordinates: [number, number];
  description?: string;
  imageUrl?: string;
  shopNumber?: number;
  openingTime?: string;
  closingTime?: string;
  url?: string;
  category: string;
}

interface MapProps {
  locations: Location[];
  selectedLocation: Location | null;
  showMarker: boolean;
  onMarkerClick: (locationId: string) => void;
  setMarkerClickHandler?: (handler: (locationId: string) => void) => void;
}

const Map: React.FC<MapProps> = ({ 
  locations, 
  selectedLocation, 
  showMarker,
  onMarkerClick,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<(mapboxgl.Marker | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const token = 'pk.eyJ1IjoiZ3VydWJhcmFuIiwiYSI6ImNtNjdqY3g3ZzAxcjkya3B0OXBrZzR6cG4ifQ.KS6Q4NhPYHB1t3bHSp7u9A';

  const degreesToRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };


  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);


  const createCustomMarkerElement = () => {
    const markerElement = document.createElement('div');

    const root = createRoot(markerElement);
    root.render(<LocationMarker />);
    
    return markerElement;
  };

  // Map and 3D model initialization - runs once only
  useEffect(() => {
    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current as HTMLElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [55.232262, 25.032722],
      zoom: isMobile ? 17.5 : 18.5,
      pitch: 70,
      bearing: 30
    });

    mapRef.current = map;

    map.on('load', () => {

      const layers = map.getStyle()?.layers || [];
      const labelLayerId = layers.find(
        (layer) => layer.type === "symbol" && layer.layout && layer.layout["text-field"]
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
      // Add search bar (geocoder)
      const geocoder = new MapboxGeocoder({
        accessToken: token,
        mapboxgl: mapboxgl as any,
        placeholder: 'Search for a location',
        marker: false, // We'll handle markers ourselves
        proximity: {
          longitude: 55.232262,
          latitude: 25.032722
        }
      });
      
      // Position the geocoder based on device type
      map.addControl(
        geocoder as unknown as mapboxgl.IControl,
      isMobile ? 'top' : 'top-right'
      );

      // Add navigation controls with position based on viewport
      const navigationControl = new mapboxgl.NavigationControl();
      !isMobile &&map.addControl(
        navigationControl,'bottom-left'
      );
      
      // Add geolocation control
      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
      });
      
      !isMobile && map.addControl(
        geolocateControl,'bottom-left'
      );

      // Load 3D model
      const modelOrigin: [number, number] = [55.232262, 25.032722];
      const modelAltitude = 0;
      const modelRotate = [degreesToRadians(90), degreesToRadians(31.05), 0];

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
        scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
      };

      load3DModel(map, modelTransform);
    });

    return () => {
      map.remove();
    };
  }, [isMobile]);

  // Store markers with their IDs for programmatic access
  const markersByIdRef = useRef<Record<string, mapboxgl.Marker>>({});
  
  

  // Marker management - runs when props affecting markers change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker?.remove());
    markersRef.current = [];
    markersByIdRef.current = {};

    // Only add markers if the map is loaded and showMarker is true
    if (map && showMarker) {
      console.log('Adding markers for locations:', locations);
      locations.forEach(location => {
        // Create popup element and render React into it
        const popupNode = document.createElement('div');
        const popupRoot = createRoot(popupNode);
        popupRoot.render(<LocationCard location={location} />);
        
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
          .setDOMContent(popupNode);
        
        
        const customMarkerElement = createCustomMarkerElement();
        
        const marker = new mapboxgl.Marker({
          element: customMarkerElement,
          anchor: 'top'
        })
          .setLngLat(location.coordinates)
          .setPopup(popup)
          .addTo(map);
        
        // Store the marker with its ID
        markersByIdRef.current[location.id] = marker;
        
        customMarkerElement.addEventListener('click', () => {
          console.log('Marker clicked:', location.name);
          onMarkerClick(location.id);
          
          map.flyTo({
            center: location.coordinates,
            zoom: 23,
            pitch: 90,
            bearing: 30
          });
        });

        markersRef.current.push(marker);
      });
    }
  }, [locations, showMarker, onMarkerClick]);

  // Add this useEffect to handle selectedLocation changes
  useEffect(() => {
    if (selectedLocation && markersByIdRef.current[selectedLocation.id]) {
      // Get the marker for the selected location
      const marker = markersByIdRef.current[selectedLocation.id];
      
      // Fly to the location
      mapRef.current?.flyTo({
        center: selectedLocation.coordinates,
        zoom: 23,
        pitch: 90,
        bearing: 30
      });
      
      // Show the popup for this marker
      marker.togglePopup();
    }
  }, [selectedLocation]);

  return (
    <div 
      ref={mapContainerRef} 
      className="w-full h-full absolute top-0 left-0" 
    />
  );
};



export default Map;



