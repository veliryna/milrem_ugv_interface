<script setup lang="ts">
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'
import EngineControlButton from './EngineControlButton.vue';

const center = { lat: 59.4050, lng: 24.5630 }
const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' }
const pinOptions = { background: '#FBBC04' }
</script>

<template>
  <div class="map-wrapper">
    <GoogleMap
      api-key="AIzaSyBCSNUcXFyjuJKRL_zHT16T96WcAwbEDjI"
      style="width: 60vw; height: 90vh;"
      :center="center"
      :zoom="15"
      :fullscreen-control="false"
      :street-view-control="false"
    >
    <AdvancedMarker :options="markerOptions" :pin-options="pinOptions"/>
    </GoogleMap>
    <EngineControlButton />
  </div>
</template>

<style scoped>
.map-wrapper {
  position: relative;
  width: 60vw;
  height: 90vh;
  float: left;
}
</style>

