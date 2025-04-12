<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map';
import { ref, onMounted, onUnmounted, watch, h } from 'vue';
import { toast } from 'vue3-toastify'
import EngineControlButton from './EngineControlButton.vue';
import VehicleLocationDisplay from './VehicleLocationDisplay.vue';
import EngineStatusPopup from './EngineStatusPopup.vue';
import WaypointCreationDialog from './WaypointCreationDialog.vue';
import { useWaypointStore } from '@/store/waypoint-store'

const waypointStore = useWaypointStore();
const newWaypointCoords = ref<{ lat: number; lng: number } | null>(null);
const showWaypointCreationPopup = ref(false);

const handleMapClick = (event: google.maps.MapMouseEvent | null) => {
  if (event?.latLng) {
    newWaypointCoords.value = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    showWaypointCreationPopup.value = true;
  }
};

const driveToNewWaypoint = () => {
  if (newWaypointCoords.value) {
    center.value = newWaypointCoords.value;
  }
  closeWaypointCreationPopup();
};

const saveNewWaypoint = () => {
  if (newWaypointCoords.value) {
    const name = "Waypoint " + (waypointStore.waypoints.length+1).toString();
    waypointStore.addWaypoint({
      name: name,
      coords: newWaypointCoords.value,
    });
  }
  closeWaypointCreationPopup();
};

const discardNewWaypoint = () => {
  closeWaypointCreationPopup();
};

const closeWaypointCreationPopup = () => {
  newWaypointCoords.value = null;
  showWaypointCreationPopup.value = false;
};

const center = ref({ lat: 59.4050, lng: 24.5630 });
const markerOptions = ref({ position: center.value, label: 'UGV' });
const isEngineOn = ref(false);
const moveSpeed = 0.00005;

const keysPressed = ref<{ [key: string]: boolean }>({});
let animationFrameId: number | null = null;

const handleKeyDown = (event: KeyboardEvent) => {
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    keysPressed.value[event.key] = true;
    if (!isEngineOn.value) {
      toast.info(h(EngineStatusPopup));
    }
  }
};

const handleKeyUp = (event: KeyboardEvent) => {
  if (keysPressed.value[event.key]) {
    keysPressed.value[event.key] = false;
  }
};

function toggleEngine() {
  isEngineOn.value = !isEngineOn.value;
}

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
      api-key="AIzaSyANGtl9Mv0kZZg4oQbNkqu8jKmDx2X9EyQ"
      style="width: 60vw; height: 90vh;"
      :center="center"
      :zoom="15"
      :fullscreen-control="false"
      :street-view-control="false"
      @click="handleMapClick"
    >
    <Marker :options="markerOptions" />
    </GoogleMap>
    <VehicleLocationDisplay :lat="center.lat" :lng="center.lng" />
    <EngineControlButton @toggle-engine="toggleEngine" :isEngineOn="isEngineOn"/>

    <WaypointCreationDialog
      v-if="showWaypointCreationPopup"
      :coords="newWaypointCoords"
      @drive="driveToNewWaypoint"
      @save="saveNewWaypoint"
      @discard="discardNewWaypoint"
      @close="closeWaypointCreationPopup"
    />

  </div>
</template>

<style scoped>
.map-wrapper {
  position: relative;
  width: 60vw;
  height: 90vh;
}
</style>

