<template>

</template>

<script setup lang="ts">
import * as THREE from "three";

const props = defineProps({
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  controls: Object
});
const { scene, renderer, camera, controls } = props;
if (scene && renderer && camera && controls) {
  const geometry = new THREE.PlaneGeometry( 1, 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0xff0000, side: THREE.DoubleSide} );
  const plane = new THREE.Mesh( geometry, material );
  scene.add( plane );
}
</script>