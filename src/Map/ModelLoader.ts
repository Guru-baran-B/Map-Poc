import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';


interface ModelTransform {
  translateX: number;
  translateY: number;
  translateZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scale: number;
}

interface CustomLayer {
  id: string;
  type: 'custom';
  renderingMode: '3d' | '2d';
  camera: THREE.Camera;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  modelTransform: ModelTransform;
  onAdd: (map: mapboxgl.Map, gl: WebGLRenderingContext) => void;
  render: (gl: any, matrix: any) => void;
}

const model = '/building.glb';

export const load3DModel = (map: mapboxgl.Map, modelTransform: ModelTransform) => {
  const customLayer: CustomLayer = {
    id: '3d-model',
    type: 'custom',
    renderingMode: '3d',
    camera: new THREE.Camera(),
    scene: new THREE.Scene(),
    renderer: new THREE.WebGLRenderer(),
    modelTransform: modelTransform,
    onAdd: function (map: mapboxgl.Map, gl: WebGLRenderingContext) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 2);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 9);
      directionalLight.position.set(-50, 40, -30);
      directionalLight.castShadow = true;

      // Shadow properties
      directionalLight.shadow.mapSize.width = 1080;
      directionalLight.shadow.mapSize.height = 1080;
      directionalLight.shadow.bias = -0.005;

      directionalLight.shadow.camera.near = 0.5;
      directionalLight.shadow.camera.far = 100;
      directionalLight.shadow.camera.left = -100;
      directionalLight.shadow.camera.right = 100;
      directionalLight.shadow.camera.top = 100;
      directionalLight.shadow.camera.bottom = -100;
      
      this.scene.add(directionalLight);

      // Shadow-receiving plane
      const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
      const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = -Math.PI / 2;
      plane.position.y = 0;
      plane.receiveShadow = true;
      this.scene.add(plane);

      // Renderer configuration
      this.renderer = new THREE.WebGLRenderer({
        canvas: map.getCanvas(),
        context: gl,
        antialias: true,
        alpha: false,
      });
      this.renderer.autoClear = false;
      
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1;
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      

      // DRACO loader setup
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        'https://www.gstatic.com/draco/versioned/decoders/1.5.6/'
      );

      // Load 3D model
      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      loader.load(model, (gltf) => {
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Material modifications
            if (mesh.material) {
              const material = mesh.material as THREE.MeshStandardMaterial;
              material.metalness = 0;
              material.roughness = 0;

              // Glass material handling
              if (material.name === 'Glass') {
                material.transparent = true;
                material.metalness = 1;
                material.opacity = 0.3;
              }
            }
          }
        });

        this.scene.add(gltf.scene);
      });
    },

    render: function (gl, matrix) {
      const rotationX = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(1, 0, 0),
        this.modelTransform.rotateX
      );
      const rotationY = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 1, 0),
        this.modelTransform.rotateY
      );
      const rotationZ = new THREE.Matrix4().makeRotationAxis(
        new THREE.Vector3(0, 0, 1),
        this.modelTransform.rotateZ
      );

      const m = new THREE.Matrix4().fromArray(matrix);
      const l = new THREE.Matrix4()
        .makeTranslation(
          this.modelTransform.translateX,
          this.modelTransform.translateY,
          this.modelTransform.translateZ
        )
        .scale(
          new THREE.Vector3(
            this.modelTransform.scale,
            -this.modelTransform.scale,
            this.modelTransform.scale
          )
        )
        .multiply(rotationX)
        .multiply(rotationY)
        .multiply(rotationZ);

      this.camera.projectionMatrix = m.multiply(l);
      this.renderer.resetState();
      this.renderer.render(this.scene, this.camera);
      map.triggerRepaint();
    }
  };

  // Add the custom layer
  map.addLayer(customLayer, 'waterway-label');
};
