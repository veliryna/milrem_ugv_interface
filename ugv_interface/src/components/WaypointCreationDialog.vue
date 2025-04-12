<script setup lang="ts">
interface Props {
  coords: { lat: number; lng: number } | null;
}
defineProps<Props>();
const emit = defineEmits(['close', 'drive', 'save', 'discard']);
</script>

<template>
  <div class="waypoint-creation-overlay" @click.self="$emit('close')">
    <div class="waypoint-creation-dialog">
      <h3>New Waypoint</h3>
      <p v-if="coords">
        Lat: {{ coords.lat.toFixed(6) }}; Lng: {{ coords.lng.toFixed(6) }}
      </p>
      <div class="buttons">
        <button @click="emit('discard')">Discard</button>
        <button @click="emit('drive')">Drive</button>
        <button @click="emit('save')">Save</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.waypoint-creation-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.waypoint-creation-dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

h3{
  font-weight: bold;
}

.waypoint-creation-dialog .buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.waypoint-creation-dialog .buttons button {
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  background-color: rgba(99, 154, 132, 0.5);
  border-radius: 5px;
}

.waypoint-creation-dialog .buttons button:hover {
  background-color: rgb(183, 183, 183);
}
</style>
