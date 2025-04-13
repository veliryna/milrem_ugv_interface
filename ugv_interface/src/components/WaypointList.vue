<script setup lang="ts">
import WaypointListItem from './WaypointListItem.vue';
import { useWaypointStore } from '@/store/waypoint-store'
import { storeToRefs } from 'pinia';

const waypointStore = useWaypointStore();
const { waypoints } = storeToRefs(waypointStore);
</script>

<template>
  <div class="waypoint-list">
    <h2>Waypoint List</h2>
    <WaypointListItem
      v-for="(wp, index) in waypoints"
      :key="index"
      :waypoint="wp"
      :index="index"
    />
    <div v-if="waypoints.length === 0" style="text-align: center;">No waypoints created</div>
  </div>
</template>

<style scoped>
.waypoint-list {
  height: calc(100vh - 10px);
  width: calc(20vw - 20px);
  overflow-y: hidden;
  background-color: #f9f9f9;
  padding: 10px;
  box-sizing: border-box;
  border: solid 2px rgb(92, 148, 92);
  border-radius: 5px;
  margin-top: 10px;
}
h2{
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
