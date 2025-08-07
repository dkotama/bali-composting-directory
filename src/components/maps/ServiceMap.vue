<template>
  <div class="service-map">
    <div class="map-container" id="map-container">
      <!-- Map will be rendered here -->
      <div v-if="!mapReady" class="map-placeholder">
        <div class="text-center py-5">
          <i class="fas fa-map fa-3x text-muted mb-3"></i>
          <h5 class="text-muted">Loading Map...</h5>
          <p class="text-muted">Peta akan menampilkan area layanan perusahaan komposting</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

// Props
const props = defineProps({
  companies: {
    type: Array,
    default: () => []
  },
  selectedArea: {
    type: String,
    default: ''
  }
})

// Reactive data
const mapReady = ref(false)

// Methods (placeholder for now - full Leaflet implementation would be added later)
const initializeMap = () => {
  // This would initialize Leaflet map with company locations
  // For now, just show placeholder
  setTimeout(() => {
    mapReady.value = true
  }, 1000)
}

// Watch for changes
watch(() => props.companies, () => {
  // Update map markers when companies change
}, { deep: true })

// Mount
onMounted(() => {
  initializeMap()
})
</script>

<style scoped>
.service-map {
  width: 100%;
}

.map-container {
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
}

.map-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(45deg, #f8f9fa 25%, transparent 25%), 
              linear-gradient(-45deg, #f8f9fa 25%, transparent 25%), 
              linear-gradient(45deg, transparent 75%, #f8f9fa 75%), 
              linear-gradient(-45deg, transparent 75%, #f8f9fa 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}

@media (max-width: 768px) {
  .map-container {
    height: 300px;
  }
}
</style>
