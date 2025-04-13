<script setup lang="ts">
defineProps<{
  lat: number,
  lng: number
}>();
</script>

<template>
  <div class="location-display">
    <p id="ugv-name-display">UGV📍</p>
    <div id="lat-display">{{ lat.toFixed(6) }}</div>
    <div id="lng-display">{{ lng.toFixed(6) }}</div>
  </div>
</template>

<style scoped>
.location-display {
  position: absolute;
  top: 10px;
  right: 100px;
  width: auto;
  height: 40px;
  background-color: rgba(77, 77, 77, 0.8);
  border: 2px solid black;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  text-align: center;
  padding-left: 10px;
  padding-right: 5px;
}
#lat-display{
  font-weight: bold;
  padding-left: 5px;
  padding-right: 5px;
}
#lng-display{
  font-weight: bold;
  padding-left: 5px;
  padding-right: 5px;
}
#ugv-name-display {
  font-weight: bold;
}
</style>
