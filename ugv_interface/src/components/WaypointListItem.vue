<script setup lang="ts">
import { ref } from 'vue'
import { useWaypointStore } from '@/store/waypoint-store'
import WaypointRenameDialog from './WaypointRenameDialog.vue';
import { ugvPositionStore } from '@/store/ugv-position-store';

interface WayPoint {
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
}

interface Props {
  waypoint: WayPoint;
  index: number;
}

const props = defineProps<Props>()
const emit = defineEmits(['waypoint-updated'])
const waypointStore = useWaypointStore()
const ugvLocation = ugvPositionStore()

const showMenu = ref(false)
const showRenameDialog = ref(false)
const editedName = ref('')

function deleteWaypoint() {
  waypointStore.removeWaypoint(props.index)
  showMenu.value = false
  emit('waypoint-updated')
}

function openRenameDialog() {
  editedName.value = props.waypoint.name
  showRenameDialog.value = true
  showMenu.value = false
}

function renameWaypoint(newName: string) {
  waypointStore.updateWaypoint(props.index, newName)
  showRenameDialog.value = false
  emit('waypoint-updated')
}

function closeRenameDialog() {
  showRenameDialog.value = false
}

function driveToWaypoint() {
  ugvLocation.setCenter(props.waypoint.coords)
  showMenu.value = false
}
</script>

<template>
  <div class="waypoint-item" @click="showMenu = true">
    <div class="item-title">
      {{ waypoint.name }}
    </div>
    <div class="item-coords">
      📍 Lat: {{ waypoint.coords.lat.toFixed(6) }}, Lng: {{ waypoint.coords.lng.toFixed(6) }}
    </div>

    <teleport to="body">
      <div v-if="showMenu" class="menu-overlay" @click.self="showMenu = false">
        <div class="menu-dialog">
          <h3>Waypoint Actions</h3>
          <div class="buttons">
            <button @click="deleteWaypoint">Delete</button>
            <button @click="openRenameDialog">Rename</button>
            <button @click="driveToWaypoint">Drive</button>
          </div>
        </div>
      </div>

      <WaypointRenameDialog
        v-if="showRenameDialog"
        :initial-name="props.waypoint.name"
        @rename="renameWaypoint"
        @close="closeRenameDialog"
      />
    </teleport>
  </div>
</template>

<style scoped>
.waypoint-item {
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  cursor: pointer;
  position: relative;
}
.item-title {
  font-weight: bold;
}
.item-coords {
  font-size: 0.9em;
  color: #555;
}

.menu-overlay {
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

.menu-dialog {
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

.menu-dialog .buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.menu-dialog .buttons button {
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  background-color: rgba(99, 154, 132, 0.5);
  border-radius: 5px;
}

.menu-dialog .buttons button:hover {
  background-color: rgb(183,183,183);
}
</style>
