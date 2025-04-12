import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Coords {
  lat: number;
  lng: number;
}

export const ugvPositionStore = defineStore('ugvPositionStore', () => {
  const center = ref<Coords>({ lat: 59.4050, lng: 24.5630 });

  function setCenter(newCenter: Coords) {
    center.value = newCenter;
  }

  return { center, setCenter };
});
