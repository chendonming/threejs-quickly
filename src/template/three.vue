<template>
  <!-- THREEJS模板 -->
  <div class="WebGl" ref="webgl" id="webgl"></div>
  <RouterView
    v-if="camera && scene && renderer"
    :scene="scene"
    :renderer="renderer"
    :camera="camera"
    :controls="controls"
  />
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { onMounted, Ref, ref } from "vue";

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
let camera: Ref<THREE.PerspectiveCamera | undefined> = ref();
let controls = ref();

onMounted(() => {
  scene.background = new THREE.Color("#fff");
  const dom = document.getElementById("webgl")!;
  const width = dom.clientWidth;
  const height = dom.clientHeight;
  camera.value = new THREE.PerspectiveCamera(75, width / height, 0.01, 1000);

  //@ts-ignore
  window.camera = camera.value;
  //@ts-ignore
  window.scene = scene;

  renderer.localClippingEnabled = true;
  renderer.setSize(width, height);
  dom.appendChild(renderer.domElement);

  // 添加光源
  const point = new THREE.PointLight(0xffffff, 1.5);
  point.position.set(0, 0, 100);
  scene.add(point);

  // 添加相机控制
  controls.value = new OrbitControls(camera.value, renderer.domElement);
  camera.value.position.set(1, 2, 3);
  controls.value.update();

  // 添加FPS监控
  const stats = Stats();
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  stats.showPanel(0);
  dom.appendChild(stats.dom);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    //@ts-ignore
    camera.value.aspect = window.innerWidth / window.innerHeight;
    //@ts-ignore
    camera.value.updateProjectionMatrix();
  });

  function animate() {
    requestAnimationFrame(animate);
    if (camera.value) {
      stats.begin();
      const vector = camera.value.position.clone();
      point.position.set(vector.x, vector.y, vector.z);
      renderer.render(scene, camera.value);
    }
    stats.end();
  }

  animate();
});
</script>

<style scoped>
.WebGl {
  border-top: 1px solid #eee;
  position: relative;
  height: 100%;
}
</style>
