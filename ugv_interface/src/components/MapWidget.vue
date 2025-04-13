<script setup lang="ts">
import { GoogleMap, Marker } from 'vue3-google-map';
import { ref, onMounted, onUnmounted, watch, h } from 'vue';
import { toast } from 'vue3-toastify'
import { useWaypointStore } from '@/store/waypoint-store';
import { ugvPositionStore } from '@/store/ugv-position-store';
import { storeToRefs } from 'pinia';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
defineExpose({ apiKey });

import EngineControlButton from './EngineControlButton.vue';
import VehicleLocationDisplay from './VehicleLocationDisplay.vue';
import EngineStatusPopup from './EngineStatusPopup.vue';
import WaypointCreationDialog from './WaypointCreationDialog.vue';
import ugvIcon from '@/assets/uvg.svg';

const waypointStore = useWaypointStore();
const ugvStore = ugvPositionStore();
const { center: ugvPosition } = storeToRefs(ugvStore);

const newWaypointCoords = ref<{ lat: number; lng: number } | null>(null);
const pressTimeout = ref<number | null>(null);
const showWaypointCreationPopup = ref(false);

const handleMapLongPress = (event: google.maps.MapMouseEvent | null) => {
    pressTimeout.value = setTimeout(() => {
      if (event?.latLng) {
        newWaypointCoords.value = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        }
      }
      showWaypointCreationPopup.value = true;
    }, 1000);
};

const driveToNewWaypoint = () => {
  if (newWaypointCoords.value) {
    ugvStore.setNewPosition(newWaypointCoords.value);
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

const center = ugvPosition;
const markerOptions = ref({ position: center.value, icon: ugvIcon });
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

const toggleEngine = () => {
  isEngineOn.value = !isEngineOn.value;
}

const moveVehicle = () => {
  if (!isEngineOn.value) {
    animationFrameId = requestAnimationFrame(moveVehicle);
    return;
  }

  let moved = false;
  let newLat = ugvPosition.value.lat;
  let newLng = ugvPosition.value.lng;

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
    ugvStore.setNewPosition({ lat: newLat, lng: newLng });
  }

  animationFrameId = requestAnimationFrame(moveVehicle);
}

watch(ugvPosition, (newPosition) => {
  markerOptions.value = { ...markerOptions.value, position: newPosition, icon: ugvIcon };
});

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
  animationFrameId = requestAnimationFrame(moveVehicle);
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
      :api-key="apiKey"
      style="width: 80vw; height: 100vh;"
      :center="center"
      :zoom="15"
      :fullscreen-control="false"
      :street-view-control="false"
      @click="handleMapLongPress"
    >
    <Marker :options="markerOptions"/>
    </GoogleMap>
    <VehicleLocationDisplay :lat="ugvPosition.lat" :lng="ugvPosition.lng" />
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
  width: 80vw;
  height: 100vh;
}
</style>

