<script setup lang="ts">
import MapWidget from '@/components/MapWidget.vue';
import WaypointList from '@/components/WaypointList.vue';
</script>

<template>
    <main class="interface-container">
      <MapWidget></MapWidget>
      <WaypointList></WaypointList>
    </main>
</template>

<style scoped>
.interface-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
