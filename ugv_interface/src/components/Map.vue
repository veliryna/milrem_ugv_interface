<script setup lang="ts">
import { GoogleMap } from 'vue3-google-map'

const center = { lat: 59.4050, lng: 24.5630 }
</script>

<template>
  <GoogleMap
  api-key=""
  style="width: 60vw; height: 90vh; margin: 5vh 0 5vh 0; float: left"
  :center="center"
  :zoom="15"
  :fullscreen-control="false"
  :street-view-control="false"
  >
  </GoogleMap>
</template>
