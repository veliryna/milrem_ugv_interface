import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Coords {
  lat: number;
  lng: number;
}

export const ugvPositionStore = defineStore('ugvPositionStore', () => {
  const position = ref<Coords>({ lat: import.meta.env.VITE_INITIAL_LAT, lng: import.meta.env.VITE_INITIAL_LONG });

  function setNewPosition(newPosition: Coords) {
    position.value = newPosition;
  }

  return { center: position, setNewPosition };
});
