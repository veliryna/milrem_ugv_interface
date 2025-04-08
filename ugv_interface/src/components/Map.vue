<script setup lang="ts">
import { GoogleMap } from 'vue3-google-map'

const center = { lat: 40.689247, lng: -74.044502 }
</script>

<template>
  <GoogleMap
  api-key=""
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="15"
  >
  </GoogleMap>
</template>
