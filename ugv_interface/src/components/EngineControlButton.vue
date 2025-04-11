<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  isEngineOn: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['toggle-engine']);

function toggleEngine() {
  emit('toggle-engine');
}
</script>

<template>
  <div class="engine-control-button" @click="toggleEngine">
    <div :class="['icon', { on: isEngineOn }]">⏻</div>
    <div class="label">{{ props.isEngineOn ? 'ENGINE ON' : 'ENGINE OFF' }}</div>
  </div>
</template>

<style scoped>
.engine-control-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 80px;
  height: 80px;
  background-color: rgba(77, 77, 77, 0.8);
  border: 2px solid black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  text-align: center;
}

.icon {
  font-size: 36px;
  transition: color 0.3s;
  line-height: 1.2;
}

.icon.on {
  color: rgb(63, 255, 63);
}

.label {
  font-size: 12px;
  font-weight: bold;
  line-height: 1.2;
}
</style>
