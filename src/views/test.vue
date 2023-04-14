<template></template>

<script setup lang="ts">
import * as THREE from "three";
//@ts-ignore
import test_vertex from "./glsl/test_vertex.glsl";
//@ts-ignore
import test_frag from "./glsl/test_frag.glsl";

const props = defineProps({
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  controls: Object,
});
const { scene, renderer, camera, controls } = props;
if (scene && renderer && camera && controls) {
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.ShaderMaterial({
    vertexShader: test_vertex,
    fragmentShader: test_frag,
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);
}
</script>
