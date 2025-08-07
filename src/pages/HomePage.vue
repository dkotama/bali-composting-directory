<template>
  <div class="homepage">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4">
              Platform Layanan Komposting Bali
            </h1>
            <p class="lead mb-4">
              Temukan layanan komposting terpercaya di seluruh Bali dan mulai berkontribusi 
              untuk lingkungan yang lebih bersih dan berkelanjutan.
            </p>
            <div class="hero-buttons">
              <button class="btn btn-light btn-lg me-3" @click="scrollToSearch">
                <i class="fas fa-search me-2"></i>
                Cari Layanan
              </button>
              <button class="btn btn-outline-light btn-lg" @click="$emit('navigate', 'howto')">
                <i class="fas fa-book me-2"></i>
                Pelajari Komposting
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="container my-5" id="search-section">
      <div class="search-section">
        <div class="row">
          <div class="col-12">
            <h2 class="text-center mb-4">Temukan Layanan Komposting di Daerah Anda</h2>
          </div>
        </div>

        <!-- Search Form -->
        <SearchForm 
          @search="handleSearch"
          @filter="handleFilter"
          :loading="searchLoading"
        />

        <!-- Results -->
        <div class="results-section mt-5" v-if="searchResults.length > 0 || searchPerformed">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h3>
              {{ searchResults.length > 0 ? `${searchResults.length} Layanan Ditemukan` : 'Tidak Ada Hasil' }}
              <small class="text-muted" v-if="selectedArea">
                di {{ getAreaName(selectedArea) }}
              </small>
            </h3>
            
            <div class="view-toggle">
              <div class="btn-group" role="group">
                <button 
                  type="button" 
                  class="btn btn-outline-primary"
                  :class="{ active: viewMode === 'list' }"
                  @click="viewMode = 'list'"
                >
                  <i class="fas fa-list"></i>
                </button>
                <button 
                  type="button" 
                  class="btn btn-outline-primary"
                  :class="{ active: viewMode === 'map' }"
                  @click="viewMode = 'map'"
                >
                  <i class="fas fa-map"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- List View -->
          <div v-if="viewMode === 'list'" class="companies-list">
            <CompanyCard 
              v-for="company in searchResults" 
              :key="company.id"
              :company="company"
              class="mb-3"
            />
          </div>

          <!-- Map View -->
          <div v-if="viewMode === 'map'" class="map-view">
            <ServiceMap 
              :companies="searchResults"
              :selected-area="selectedArea"
            />
          </div>

          <!-- No Results -->
          <div v-if="searchResults.length === 0 && searchPerformed" class="text-center py-5">
            <div class="mb-4">
              <i class="fas fa-search fa-3x text-muted"></i>
            </div>
            <h4 class="text-muted">Belum Ada Layanan di Area Ini</h4>
            <p class="text-muted mb-4">
              Saat ini belum ada layanan komposting yang terdaftar di area yang Anda pilih. 
            </p>
            <button class="btn btn-primary" @click="$emit('navigate', 'company-form')">
              <i class="fas fa-plus me-2"></i>
              Daftarkan Layanan Anda
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Educational Navigation Cards -->
    <section class="container my-5" v-if="!searchPerformed">
      <div class="row">
        <div class="col-12 text-center mb-4">
          <h2>Mulai Perjalanan Komposting Anda</h2>
          <p class="text-muted">Pelajari cara berkontribusi untuk lingkungan yang lebih hijau</p>
        </div>
      </div>
      
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card h-100 text-center">
            <div class="card-body">
              <div class="mb-3">
                <i class="fas fa-seedling fa-3x text-primary-green"></i>
              </div>
              <h5 class="card-title">Panduan Komposting</h5>
              <p class="card-text">
                Pelajari cara membuat kompos di rumah dengan mudah dan efektif
              </p>
              <button class="btn btn-outline-primary" @click="$emit('navigate', 'howto')">
                Pelajari Sekarang
              </button>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 text-center">
            <div class="card-body">
              <div class="mb-3">
                <i class="fas fa-calculator fa-3x text-primary-green"></i>
              </div>
              <h5 class="card-title">Kalkulator Kompos</h5>
              <p class="card-text">
                Hitung berapa lama waktu yang dibutuhkan untuk membuat kompos
              </p>
              <button class="btn btn-outline-primary" @click="$emit('navigate', 'calculator')">
                Hitung Sekarang
              </button>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <div class="card h-100 text-center">
            <div class="card-body">
              <div class="mb-3">
                <i class="fas fa-store fa-3x text-primary-green"></i>
              </div>
              <h5 class="card-title">Produk Komposting</h5>
              <p class="card-text">
                Temukan alat dan bahan yang dibutuhkan untuk komposting di rumah
              </p>
              <button class="btn btn-outline-primary" @click="$emit('navigate', 'howto')">
                Lihat Produk
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="bg-light py-5 mt-5">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h2 class="mb-3">Punya Layanan Komposting?</h2>
            <p class="lead mb-4">
              Daftarkan layanan komposting Anda dan bantu lebih banyak warga Bali 
              untuk hidup berkelanjutan
            </p>
            <button class="btn btn-primary btn-lg" @click="$emit('navigate', 'company-form')">
              <i class="fas fa-plus me-2"></i>
              Daftarkan Layanan
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import SearchForm from '../components/search/SearchForm.vue'
import CompanyCard from '../components/common/CompanyCard.vue'
import ServiceMap from '../components/maps/ServiceMap.vue'
import { loadRegionsData, loadCompaniesData, helpers } from '../utils/dataLoader.js'

// Emits
defineEmits(['navigate'])

// Reactive data
const searchLoading = ref(false)
const searchPerformed = ref(false)
const searchResults = ref([])
const selectedArea = ref('')
const viewMode = ref('list')

// Data
const regions = reactive({ kabupaten: [], kecamatan: [] })
const companies = ref([])

// Methods
const scrollToSearch = () => {
  document.getElementById('search-section').scrollIntoView({ 
    behavior: 'smooth' 
  })
}

const handleSearch = async (searchData) => {
  searchLoading.value = true
  searchPerformed.value = true
  selectedArea.value = searchData.area || ''

  try {
    // Filter companies based on search criteria
    let filtered = [...companies.value]

    // Filter by area if specified
    if (searchData.area) {
      filtered = helpers.findCompaniesByArea(filtered, searchData.area)
    }

    // Filter by availability if specified
    if (searchData.availability && searchData.availability !== 'all') {
      filtered = helpers.filterCompaniesByAvailability(filtered, searchData.availability)
    }

    // Filter by pricing tier if specified
    if (searchData.pricingTier && searchData.pricingTier !== 'all') {
      filtered = filtered.filter(company => 
        company.services.pricingTier === searchData.pricingTier
      )
    }

    // Filter by pickup frequency if specified
    if (searchData.pickupFrequency && searchData.pickupFrequency !== 'all') {
      filtered = filtered.filter(company => 
        company.services.pickupFrequency.includes(searchData.pickupFrequency)
      )
    }

    // Filter by waste types if specified
    if (searchData.wasteTypes && searchData.wasteTypes.length > 0) {
      filtered = filtered.filter(company => 
        searchData.wasteTypes.some(type => 
          company.services.wasteTypes.includes(type)
        )
      )
    }

    searchResults.value = filtered
  } catch (error) {
    console.error('Search error:', error)
    searchResults.value = []
  } finally {
    searchLoading.value = false
  }
}

const handleFilter = (filterData) => {
  // Handle additional filtering if needed
  handleSearch(filterData)
}

const getAreaName = (areaId) => {
  const kecamatan = helpers.findKecamatanById(regions.kecamatan, areaId)
  if (kecamatan) {
    const kabupaten = regions.kabupaten.find(kab => kab.id === kecamatan.kabupatenId)
    return `${kecamatan.name}, ${kabupaten?.name || ''}`
  }
  return areaId
}

// Load data on component mount
onMounted(async () => {
  try {
    // Load regions data
    const regionsData = await loadRegionsData()
    regions.kabupaten = regionsData.kabupaten
    regions.kecamatan = regionsData.kecamatan

    // Load companies data
    const companiesData = await loadCompaniesData()
    companies.value = companiesData.companies
  } catch (error) {
    console.error('Error loading homepage data:', error)
  }
})
</script>

<style scoped>
.homepage {
  padding-bottom: 2rem;
}

.hero-buttons .btn {
  min-width: 180px;
}

.view-toggle .btn {
  min-width: 40px;
}

.view-toggle .btn.active {
  background-color: var(--primary-green);
  border-color: var(--primary-green);
  color: white;
}

@media (max-width: 768px) {
  .hero-buttons .btn {
    min-width: auto;
    margin-bottom: 1rem;
  }
  
  .hero-buttons .btn.me-3 {
    margin-right: 0 !important;
  }
}
</style>
