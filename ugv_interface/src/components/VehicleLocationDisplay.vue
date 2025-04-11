<script setup lang="ts">
defineProps<{
  lat: number,
  lng: number
}>();
</script>

<template>
  <div class="location-display">
    <div id="lat-display">{{ lat.toFixed(6) }}</div>
    <div id="lng-display">{{ lng.toFixed(6) }}</div>
  </div>
</template>

<style scoped>
.location-display {
  position: absolute;
  top: 10px;
  right: 100px;
  width: 90px;
  height: 55px;
  background-color: rgba(77, 77, 77, 0.8);
  border: 2px solid black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  text-align: center;
}
#lat-display{
  font-weight: bold;
}
#lng-display{
  font-weight: bold;
}
</style>
