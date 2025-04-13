import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Coords {
  lat: number;
  lng: number;
}

export const ugvPositionStore = defineStore('ugvPositionStore', () => {
  const position = ref<Coords>({ lat: 59.4050, lng: 24.5630 });

  function setNewPosition(newPosition: Coords) {
    position.value = newPosition;
  }

  return { center: position, setNewPosition };
});
