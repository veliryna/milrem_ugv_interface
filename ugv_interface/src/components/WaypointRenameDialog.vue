<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  initialName: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['close', 'rename']);

const newName = ref(props.initialName);
</script>


<template>
  <div class="rename-dialog-overlay" @click.self="$emit('close')">
    <div class="rename-dialog">
      <h3>Rename Waypoint</h3>
      <input type="text" v-model="newName" />
      <div class="buttons">
        <button @click="emit('close')">Cancel</button>
        <button @click="emit('rename', newName)">Rename</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rename-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 11;
}

.rename-dialog {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.rename-dialog h3 {
  margin-top: 0;
}

.rename-dialog input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.rename-dialog .buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.rename-dialog .buttons button {
  padding: 10px 15px;
  cursor: pointer;
  font-weight: bold;
  background-color: rgba(99, 154, 132, 0.5);
  border-radius: 5px;
}

h3{
  font-weight: bold;
}

.rename-dialog .buttons button:first-child {
  background-color: rgba(99, 154, 132, 0.5);;
}

.rename-dialog .buttons button:hover {
  background-color: rgb(183,183,183);
}
</style>
