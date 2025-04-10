<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import EngineControlButton from './EngineControlButton.vue';

const center = ref({ lat: 59.4050, lng: 24.5630 });
const markerOptions = ref({ position: center.value, label: 'UGV' });
const isEngineOn = ref(false);
const moveSpeed = 0.00005;

const keysPressed = ref<{ [key: string]: boolean }>({});
let animationFrameId: number | null = null;

function toggleEngine() {
  isEngineOn.value = !isEngineOn.value;
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    keysPressed.value[event.key] = true;
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (keysPressed.value[event.key]) {
    keysPressed.value[event.key] = false;
  }
};

function moveUGV() {
  if (!isEngineOn.value) {
    animationFrameId = requestAnimationFrame(moveUGV);
    return;
  }

  let moved = false;
  let newLat = center.value.lat;
  let newLng = center.value.lng;

  if (keysPressed.value['ArrowUp']) {
    newLat += moveSpeed;
    moved = true;
  }
  if (keysPressed.value['ArrowDown']) {
    newLat -= moveSpeed;
    moved = true;
  }
  if (keysPressed.value['ArrowLeft']) {
    newLng -= moveSpeed;
    moved = true;
  }
  if (keysPressed.value['ArrowRight']) {
    newLng += moveSpeed;
    moved = true;
  }

  if (moved) {
    center.value = { lat: newLat, lng: newLng };
  }

  animationFrameId = requestAnimationFrame(moveUGV);
}

watch(center, (newPosition) => {
  markerOptions.value = { ...markerOptions.value, position: newPosition };
});

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  animationFrameId = requestAnimationFrame(moveUGV);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});

</script>

<template>
  <div class="map-wrapper">
    <GoogleMap
      api-key=""
      style="width: 60vw; height: 90vh;"
      :center="center"
      :zoom="15"
      :fullscreen-control="false"
      :street-view-control="false"
    >
    <Marker :options="markerOptions" />
    </GoogleMap>
    <EngineControlButton @toggle-engine="toggleEngine" :isEngineOn="isEngineOn"/>
  </div>
</template>

<style scoped>
.map-wrapper {
  position: relative;
  width: 60vw;
  height: 90vh;
  float: left;
}
</style>

