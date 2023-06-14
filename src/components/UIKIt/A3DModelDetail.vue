<template>
  <canvas class="model-cover" ref="canvasRef"></canvas>
</template>

<script setup>
  const props = defineProps({
    name: String,
    slice: Number,
  })
// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// let scene = new THREE.Scene();
// let camera  = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 10;

// let renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
// renderer.setClearColor(0x000000, 0);
// renderer.setSize(1280, 720);

// renderer.domElement.setAttribute("id", "3dModelDomEl");
// document.body.insertBefore(renderer.domElement, document.body.firstChild);

// const aLight = new THREE.AmbientLight(0x404040, 1.2);
// scene.add(aLight);

// const pLight = new THREE.PointLight(0xFFFFFF, 1.2);
// pLight.position.set(0, -3, 7);
// scene.add(pLight);

// let loader = new THREE.GLTFLoader();
// let obj = null;

// loader.load("../../assets/3dModels/Main/scene.gltf", function(gltf) {
//   obj = gltf;
//   obj.scene.scale.set(1.3, 1.3, 1.3);

//   scene.add(obj.scene);
// });








  // import * as THREE from "three";
  // import { onMounted, onUnmounted, ref, render } from "vue";

  // let SCENE;
  // let CAMERA;
  // let RENDERER;
  // let LOADING_MANAGER;
  // let IMAGE_LOADER;
  // let OBJ_LOADER;
  // let CONTROLS;
  // let MOUSE;
  // let RAYCASTER;

  // let TEXTURE;
  // let OBJECT;

  // function initScene() {
  //   SCENE = new THREE.Scene();

  //   initLights();
  // }

  // function initLights() {
  //   const ambient = new THREE.AmbientLight(0xffffff, 0.7);
  //   SCENE.add(ambient);

  //   const directionalLight = new THREE.DirectionalLight(0xffffff);
  //   directionalLight.position.set(0, 1, 1);
  //   SCENE.add(directionalLight);
  // }

  // function initCamera() {
  //   CAMERA = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
  //   CAMERA.position.z = 100;
  // }

  // function initRenderer() {
  //   RENDERER = new THREE.WebGLRenderer({ alpha: true });
  //   RENDERER.setPixelRatio(window.devicePixelRatio);
  //   RENDERER.setSize(window.innerWidth, window.innerHeight);
  // }

  // function initLoaders() {
  //   LOADING_MANAGER = new THREE.LoadingManager();
  //   IMAGE_LOADER = new THREE.ImageLoader(LOADING_MANAGER);
  //   OBJ_LOADER = new THREE.OBJLoader(LOADING_MANAGER);
  // }

  // function loadModel() {
  //   OBJ_LOADER.load('./model.obj', (object) => {
  //       object.scale.x = 0.3;
  //       object.scale.y = 0.3;
  //       object.scale.z = 0.3;
  //       object.rotation.x = -Math.PI / 2;
  //       object.position.y = -30;

  //       OBJECT = object;
  //       SCENE.add(OBJECT);
  //   });
  // }

  // function animate() {
  //   requestAnimationFrame(animate);
  //   render();
  // }

  // function render() {
  //   CAMERA.lookAt(SCENE.position);

  //   RENDERER.render(SCENE, CAMERA);
  // }

  // function initEventListeners() {
  //   window.addEventListener('resize', onWindowResize);

  //   onWindowResize();
  // }

  // function onWindowResize() {
  //   CAMERA.aspect = window.innerWidth / window.innerHeight;
  //   CAMERA.updateProjectionMatrix();

  //   RENDERER.setSize(window.innerWidth, window.innerHeight);
  // }

  // function initTexture() {
  //   TEXTURE = new THREE.Texture();
  // }

  // function loadTexture() {
  //   IMAGE_LOADER.load('./texture.jpg', (image) => {
  //       TEXTURE.image = image;
  //       TEXTURE.needsUpdate = true;
  //   });
  // }


  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
  import * as THREE from "three";
  import { onMounted, onUnmounted, ref, render } from "vue";

  let scene = new THREE.Scene();
  let renderer;
  let controls;

  let shownModel;
  let loadedModel;
  let modelName = props.name;

  let canvasRef = ref();

  // let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  // let boxMaterial = new THREE.MeshStandardMaterial({ color: "mediumpurple" });
  // let box = new THREE.Mesh(boxGeometry, boxMaterial);
  // box.position.set(0, 0, -2);

  // scene.add(box);

  let ambientLight = new  THREE.AmbientLight("#FFFFFF", 1);
  scene.add(ambientLight);

  let camera = new THREE.PerspectiveCamera(
    75,
    600 / 600,
    0.1,
    100
  );
  camera.position.y=10;
  camera.position.z=20;
  camera.position.x=20;

  camera.lookAt(new THREE.Vector3(0, 0, 0));

  scene.add(camera);

  let loop = () => {
    // box.rotation.y += 0.02;

    controls.update();
    renderer.render(scene, camera);
  };

  let resizeCallback = () => {
    // renderer.setSize(600, 600);

    camera.aspect = 600 / 600;
    camera.updateProjectionMatrix();
  }

  onMounted(() =>{
    renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true,
    });

    renderer.setSize(900, 900);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(scene, camera);
    renderer.xr.enabled = true;

    renderer.setAnimationLoop(loop);

    controls = new OrbitControls(camera, canvasRef.value);
    controls.enabledDamping = true;

    const gltfLoader = new GLTFLoader();
    let dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(`/models/${modelName}.gltf`, (gltf) => {
    // gltfLoader.load(`../../assets/3dModels/Main/scene.gltf`, (gltf) => {
      loadedModel = gltf.scene.children[0];

      shownModel = loadedModel.clone();
      shownModel.name = modelName;
      const scaleModel = props.slice;
      shownModel.scale.set(scaleModel, scaleModel, scaleModel);
      scene.add(shownModel);
    })

    window.addEventListener("resize", resizeCallback);
  })

  onUnmounted(() => {
    renderer.setAnimationLoop(null);
    window.removeEventListener("resize", resizeCallback);
  })



  // import * as THREE from "three";
  // import { onMounted, onUnmounted, ref, render } from "vue";
  
  // let scene = new THREE.Scene();
  // let renderer;
  // let canvasRef = ref();

  // let boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  // let boxMaterial = new THREE.MeshStandardMaterial({ color: "mediumpurple" });
  // let box = new THREE.Mesh(boxGeometry, boxMaterial);
  // box.position.set(0, 0, -2);

  // scene.add(box);

  // let ambientLight = new  THREE.AmbientLight("#FFFFFF", 1);
  // scene.add(ambientLight);

  // let camera = new THREE.PerspectiveCamera(
  //   75,
  //   600 / 600,
  //   0.1,
  //   100
  // );
  // camera.position.y=1;
  // camera.position.z=2;
  // camera.lookAt(new THREE.Vector3(0, 0, 0));

  // scene.add(camera);

  // // let loop = () => {
  // //   box.rotation.y += 0.02;
  // //   renderer.render(scene, camera);
  // //   requestAnimationFrame(loop);
  // // };

  // let loop = () => {
  //   box.rotation.y += 0.02;
  //   renderer.render(scene, camera);
  // };

  // // let resizeCallback = () => {
  // //   renderer.setSize()
  // // }

  // onMounted(() =>{
  //   renderer = new THREE.WebGLRenderer({
  //     canvas: canvasRef.value,
  //     antialias: true,
  //     alpha: true,
  //   });

  //   renderer.setSize(640, 640);
  //   renderer.setPixelRatio(window.devicePixelRatio);
  //   renderer.render(scene, camera);
    
  //   // requestAnimationFrame(loop);
  //   renderer.setAnimationLoop(loop);
  // })

  // onUnmounted(() => {
  //   renderer.setAnimationLoop(null);
  // })
</script>

<style scoped>
.model-cover {
}
</style>
