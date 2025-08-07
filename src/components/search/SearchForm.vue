<template>
  <div class="search-form">
    <form @submit.prevent="performSearch">
      <div class="row g-3">
        <!-- Location Selection -->
        <div class="col-md-6">
          <label for="kabupaten" class="form-label fw-bold">
            <i class="fas fa-map-marker-alt me-1"></i>
            Pilih Lokasi
          </label>
          <select 
            id="kabupaten" 
            class="form-select" 
            v-model="searchForm.kabupaten"
            @change="onKabupatenChange"
          >
            <option value="">Pilih Kabupaten/Kota</option>
            <option 
              v-for="kabupaten in kabupatenList" 
              :key="kabupaten.id" 
              :value="kabupaten.id"
            >
              {{ kabupaten.name }}
            </option>
          </select>
        </div>

        <div class="col-md-6">
          <label for="kecamatan" class="form-label fw-bold">
            <i class="fas fa-location-arrow me-1"></i>
            Kecamatan
          </label>
          <select 
            id="kecamatan" 
            class="form-select" 
            v-model="searchForm.area"
            :disabled="!searchForm.kabupaten"
          >
            <option value="">{{ searchForm.kabupaten ? 'Pilih Kecamatan' : 'Pilih Kabupaten dulu' }}</option>
            <option 
              v-for="kecamatan in filteredKecamatan" 
              :key="kecamatan.id" 
              :value="kecamatan.id"
            >
              {{ kecamatan.name }}
            </option>
          </select>
        </div>

        <!-- Advanced Filters Toggle -->
        <div class="col-12">
          <button 
            type="button" 
            class="btn btn-outline-secondary btn-sm"
            @click="showAdvancedFilters = !showAdvancedFilters"
          >
            <i class="fas" :class="showAdvancedFilters ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
            Filter Lanjutan
          </button>
        </div>

        <!-- Advanced Filters -->
        <div v-if="showAdvancedFilters" class="col-12">
          <div class="row g-3 p-3 bg-light rounded">
            
            <!-- Availability Filter -->
            <div class="col-md-3">
              <label for="availability" class="form-label">Status Ketersediaan</label>
              <select id="availability" class="form-select" v-model="searchForm.availability">
                <option value="all">Semua Status</option>
                <option value="accepting">Menerima Pelanggan</option>
                <option value="waitlist">Daftar Tunggu</option>
                <option value="full">Penuh</option>
              </select>
            </div>

            <!-- Pricing Tier -->
            <div class="col-md-3">
              <label for="pricingTier" class="form-label">Rentang Harga</label>
              <select id="pricingTier" class="form-select" v-model="searchForm.pricingTier">
                <option value="all">Semua Harga</option>
                <option value="low">Ekonomis</option>
                <option value="medium">Menengah</option>
                <option value="high">Premium</option>
              </select>
            </div>

            <!-- Pickup Frequency -->
            <div class="col-md-3">
              <label for="pickupFrequency" class="form-label">Frekuensi Pickup</label>
              <select id="pickupFrequency" class="form-select" v-model="searchForm.pickupFrequency">
                <option value="all">Semua Frekuensi</option>
                <option value="weekly">Mingguan</option>
                <option value="bi-weekly">Dua Minggu</option>
                <option value="monthly">Bulanan</option>
              </select>
            </div>

            <!-- Waste Types -->
            <div class="col-md-3">
              <label class="form-label">Jenis Sampah</label>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="organic"
                  value="organic"
                  v-model="searchForm.wasteTypes"
                >
                <label class="form-check-label" for="organic">Organik</label>
              </div>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="garden"
                  value="garden"
                  v-model="searchForm.wasteTypes"
                >
                <label class="form-check-label" for="garden">Kebun</label>
              </div>
              <div class="form-check">
                <input 
                  class="form-check-input" 
                  type="checkbox" 
                  id="food-waste"
                  value="food-waste"
                  v-model="searchForm.wasteTypes"
                >
                <label class="form-check-label" for="food-waste">Sisa Makanan</label>
              </div>
            </div>
          </div>
        </div>

        <!-- Search Button -->
        <div class="col-12 text-center">
          <button 
            type="submit" 
            class="btn btn-primary btn-lg"
            :disabled="loading"
          >
            <i v-if="loading" class="loading-spinner me-2"></i>
            <i v-else class="fas fa-search me-2"></i>
            {{ loading ? 'Mencari...' : 'Cari Layanan' }}
          </button>
          
          <button 
            v-if="hasActiveFilters" 
            type="button" 
            class="btn btn-outline-secondary btn-lg ms-3"
            @click="clearFilters"
          >
            <i class="fas fa-times me-2"></i>
            Reset Filter
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { loadRegionsData } from '../../utils/dataLoader.js'

// Props
const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['search', 'filter'])

// Reactive data
const showAdvancedFilters = ref(false)

const searchForm = reactive({
  kabupaten: '',
  area: '',
  availability: 'all',
  pricingTier: 'all',
  pickupFrequency: 'all',
  wasteTypes: []
})

const regions = reactive({
  kabupaten: [],
  kecamatan: []
})

// Computed properties
const kabupatenList = computed(() => regions.kabupaten)

const filteredKecamatan = computed(() => {
  if (!searchForm.kabupaten) return []
  return regions.kecamatan.filter(kecamatan => 
    kecamatan.kabupatenId === searchForm.kabupaten
  )
})

const hasActiveFilters = computed(() => {
  return (
    searchForm.kabupaten ||
    searchForm.area ||
    searchForm.availability !== 'all' ||
    searchForm.pricingTier !== 'all' ||
    searchForm.pickupFrequency !== 'all' ||
    searchForm.wasteTypes.length > 0
  )
})

// Methods
const onKabupatenChange = () => {
  // Clear kecamatan when kabupaten changes
  searchForm.area = ''
}

const performSearch = () => {
  const searchData = {
    kabupaten: searchForm.kabupaten,
    area: searchForm.area,
    availability: searchForm.availability,
    pricingTier: searchForm.pricingTier,
    pickupFrequency: searchForm.pickupFrequency,
    wasteTypes: [...searchForm.wasteTypes]
  }
  
  emit('search', searchData)
}

const clearFilters = () => {
  searchForm.kabupaten = ''
  searchForm.area = ''
  searchForm.availability = 'all'
  searchForm.pricingTier = 'all'
  searchForm.pickupFrequency = 'all'
  searchForm.wasteTypes = []
  showAdvancedFilters.value = false
}

// Load data on mount
onMounted(async () => {
  try {
    const regionsData = await loadRegionsData()
    regions.kabupaten = regionsData.kabupaten
    regions.kecamatan = regionsData.kecamatan
  } catch (error) {
    console.error('Error loading regions data in SearchForm:', error)
  }
})
</script>

<style scoped>
.search-form {
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.form-check {
  font-size: 0.9rem;
}

.form-check-input {
  margin-top: 0.15rem;
}

@media (max-width: 768px) {
  .search-form {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  .btn-lg.ms-3 {
    margin-left: 0 !important;
    margin-top: 0.5rem;
  }
}

.btn:disabled {
  opacity: 0.6;
}
</style>
