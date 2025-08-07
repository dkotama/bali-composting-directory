<template>
  <div class="product-marketplace">
    <div class="row">
      <div class="col-12 mb-4">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h2>
              <i class="fas fa-store text-primary-green me-2"></i>
              Produk Komposting
            </h2>
            <p class="text-muted mb-0">Temukan alat dan bahan untuk komposting di rumah</p>
          </div>
          <button class="btn btn-primary" @click="$emit('navigate', 'product-form')">
            <i class="fas fa-plus me-2"></i>
            Tambah Produk
          </button>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="filter-section p-3 bg-light rounded">
          <div class="row g-3 align-items-center">
            <div class="col-md-3">
              <label for="categoryFilter" class="form-label mb-1">Kategori</label>
              <select id="categoryFilter" class="form-select" v-model="filters.category">
                <option value="">Semua Kategori</option>
                <option value="equipment">Peralatan</option>
                <option value="supplies">Bahan/Aktivator</option>
                <option value="tools">Alat Bantu</option>
              </select>
            </div>
            
            <div class="col-md-3">
              <label for="priceFilter" class="form-label mb-1">Rentang Harga</label>
              <select id="priceFilter" class="form-select" v-model="filters.priceRange">
                <option value="">Semua Harga</option>
                <option value="low">< Rp 100.000</option>
                <option value="medium">Rp 100.000 - 500.000</option>
                <option value="high">> Rp 500.000</option>
              </select>
            </div>
            
            <div class="col-md-3">
              <label for="locationFilter" class="form-label mb-1">Lokasi Vendor</label>
              <select id="locationFilter" class="form-select" v-model="filters.location">
                <option value="">Semua Lokasi</option>
                <option value="denpasar">Denpasar</option>
                <option value="ubud">Ubud</option>
                <option value="sanur">Sanur</option>
                <option value="badung">Badung</option>
                <option value="gianyar">Gianyar</option>
              </select>
            </div>
            
            <div class="col-md-3">
              <button class="btn btn-outline-secondary w-100" @click="clearFilters">
                <i class="fas fa-times me-2"></i>Reset Filter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="row" v-if="!loading">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="col-lg-4 col-md-6 mb-4"
      >
        <ProductCard :product="product" />
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-5">
      <div class="loading-spinner mx-auto mb-3"></div>
      <p>Memuat produk...</p>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && filteredProducts.length === 0" class="text-center py-5">
      <div class="mb-4">
        <i class="fas fa-search fa-3x text-muted"></i>
      </div>
      <h4 class="text-muted">Tidak Ada Produk Ditemukan</h4>
      <p class="text-muted mb-4">Coba ubah filter atau tambahkan produk baru</p>
      <button class="btn btn-primary" @click="$emit('navigate', 'product-form')">
        <i class="fas fa-plus me-2"></i>
        Tambah Produk Pertama
      </button>
    </div>

    <!-- Call to Action -->
    <div v-if="!loading && filteredProducts.length > 0" class="row mt-5">
      <div class="col-12">
        <div class="card text-center">
          <div class="card-body py-4">
            <h5>Punya produk komposting untuk dijual?</h5>
            <p class="text-muted mb-3">Daftarkan produk Anda dan jangkau lebih banyak pelanggan di Bali</p>
            <button class="btn btn-outline-primary" @click="$emit('navigate', 'product-form')">
              <i class="fas fa-plus me-2"></i>
              Daftarkan Produk
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import ProductCard from '../common/ProductCard.vue'
import { loadProductsData } from '../../utils/dataLoader.js'

// Emits
defineEmits(['navigate'])

// Reactive data
const loading = ref(true)
const products = ref([])

const filters = reactive({
  category: '',
  priceRange: '',
  location: ''
})

// Computed properties
const filteredProducts = computed(() => {
  let filtered = [...products.value]

  // Filter by category
  if (filters.category) {
    filtered = filtered.filter(product => product.category === filters.category)
  }

  // Filter by price range
  if (filters.priceRange) {
    filtered = filtered.filter(product => {
      if (!product.price || !product.price.range) return false
      
      const price = extractMinPrice(product.price.range)
      
      switch (filters.priceRange) {
        case 'low':
          return price < 100000
        case 'medium':
          return price >= 100000 && price <= 500000
        case 'high':
          return price > 500000
        default:
          return true
      }
    })
  }

  // Filter by location
  if (filters.location) {
    filtered = filtered.filter(product => 
      product.vendor && 
      product.vendor.location && 
      product.vendor.location.toLowerCase().includes(filters.location.toLowerCase())
    )
  }

  return filtered
})

// Methods
const extractMinPrice = (priceRange) => {
  if (!priceRange) return 0
  
  // Extract minimum price from range like "150000-250000"
  const match = priceRange.match(/(\d+)/)
  return match ? parseInt(match[1]) : 0
}

const clearFilters = () => {
  filters.category = ''
  filters.priceRange = ''
  filters.location = ''
}

// Load products on mount
onMounted(async () => {
  try {
    const productsData = await loadProductsData()
    products.value = productsData.products
  } catch (error) {
    console.error('Error loading products:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.product-marketplace {
  min-height: 400px;
}

.filter-section {
  border-radius: 10px;
}

.filter-section .form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--heading-text);
}

.filter-section .form-select {
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .filter-section .row > div {
    margin-bottom: 1rem;
  }
  
  .filter-section .row > div:last-child {
    margin-bottom: 0;
  }
}
</style>
