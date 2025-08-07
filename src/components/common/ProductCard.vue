<template>
  <div class="card product-card h-100">
    <!-- Product Image Placeholder -->
    <div class="product-image">
      <div class="image-placeholder">
        <i class="fas fa-image fa-2x text-muted"></i>
      </div>
      <div class="availability-overlay">
        <span 
          class="availability-badge"
          :class="availabilityClass"
        >
          {{ availabilityText }}
        </span>
      </div>
    </div>

    <div class="card-body d-flex flex-column">
      <!-- Product Header -->
      <div class="product-header mb-3">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h6 class="card-title mb-0">{{ product.name }}</h6>
          <small class="badge bg-light text-dark category-badge">
            {{ formatCategory(product.category) }}
          </small>
        </div>
        
        <!-- Rating and Sales -->
        <div class="product-stats mb-2" v-if="product.rating || product.soldCount">
          <div class="d-flex align-items-center">
            <div v-if="product.rating" class="rating me-2">
              <div class="stars">
                <i 
                  v-for="star in 5" 
                  :key="star"
                  class="fas fa-star"
                  :class="star <= product.rating ? 'text-warning' : 'text-muted'"
                ></i>
              </div>
              <small class="text-muted ms-1">({{ product.rating }})</small>
            </div>
            <div v-if="product.soldCount" class="sold-count">
              <small class="text-muted">{{ product.soldCount }} terjual</small>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Description -->
      <p class="card-text text-muted small mb-3">{{ truncateText(product.description, 100) }}</p>

      <!-- Features -->
      <div class="features mb-3" v-if="product.features && product.features.length > 0">
        <h6 class="small mb-2">
          <i class="fas fa-check-circle me-1 text-success"></i>
          Fitur:
        </h6>
        <ul class="feature-list">
          <li v-for="feature in product.features.slice(0, 3)" :key="feature">
            <small>{{ feature }}</small>
          </li>
          <li v-if="product.features.length > 3">
            <small class="text-muted">+{{ product.features.length - 3 }} fitur lainnya</small>
          </li>
        </ul>
      </div>

      <!-- Price -->
      <div class="price-section mb-3">
        <div class="price-display">
          <span class="price-label">Harga:</span>
          <span class="price-value">{{ formatPriceRange(product.price) }}</span>
        </div>
      </div>

      <!-- Vendor Info -->
      <div class="vendor-info mb-3">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <small class="vendor-name fw-bold">{{ product.vendor.name }}</small>
            <br>
            <small class="text-muted">
              <i class="fas fa-map-marker-alt me-1"></i>
              {{ product.vendor.location }}
            </small>
          </div>
        </div>
      </div>

      <!-- Contact Buttons -->
      <div class="contact-buttons mt-auto">
        <!-- WhatsApp -->
        <a 
          v-if="product.vendor.contact.whatsapp"
          :href="generateWhatsAppUrl(product.vendor.contact.whatsapp)"
          target="_blank"
          class="btn btn-success btn-sm w-100 mb-2"
          @click="trackProductClick('whatsapp', product.id)"
        >
          <i class="fab fa-whatsapp me-2"></i>
          WhatsApp
        </a>

        <!-- E-commerce Links -->
        <div class="ecommerce-links">
          <a 
            v-if="product.vendor.contact.tokopedia"
            :href="product.vendor.contact.tokopedia"
            target="_blank"
            class="btn btn-outline-success btn-sm me-1 flex-fill"
            @click="trackProductClick('tokopedia', product.id)"
          >
            Tokopedia
          </a>
          
          <a 
            v-if="product.vendor.contact.shopee"
            :href="product.vendor.contact.shopee"
            target="_blank"
            class="btn btn-outline-warning btn-sm me-1 flex-fill"
            @click="trackProductClick('shopee', product.id)"
          >
            Shopee
          </a>
          
          <a 
            v-if="product.vendor.contact.bukalapak"
            :href="product.vendor.contact.bukalapak"
            target="_blank"
            class="btn btn-outline-info btn-sm flex-fill"
            @click="trackProductClick('bukalapak', product.id)"
          >
            Bukalapak
          </a>
        </div>

        <!-- Instagram -->
        <a 
          v-if="product.vendor.contact.instagram"
          :href="generateInstagramUrl(product.vendor.contact.instagram)"
          target="_blank"
          class="btn btn-outline-primary btn-sm w-100 mt-2"
          @click="trackProductClick('instagram', product.id)"
        >
          <i class="fab fa-instagram me-2"></i>
          Instagram
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { helpers } from '../../utils/dataLoader.js'

// Props
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Computed properties
const availabilityClass = computed(() => {
  const status = props.product.availability
  switch (status) {
    case 'in-stock': return 'bg-success'
    case 'limited-stock': return 'bg-warning'
    case 'out-of-stock': return 'bg-danger'
    default: return 'bg-secondary'
  }
})

const availabilityText = computed(() => {
  const statusMap = {
    'in-stock': 'Tersedia',
    'limited-stock': 'Stok Terbatas',
    'out-of-stock': 'Habis'
  }
  return statusMap[props.product.availability] || 'Tidak Diketahui'
})

// Methods
const formatCategory = (category) => {
  const categoryMap = {
    equipment: 'Peralatan',
    supplies: 'Bahan',
    tools: 'Alat Bantu'
  }
  return categoryMap[category] || category
}

const formatPriceRange = (price) => {
  if (!price || !price.range) return 'Hubungi Vendor'
  
  const range = price.range
  if (range.includes('-')) {
    const [min, max] = range.split('-')
    return `Rp ${helpers.formatCurrency(parseInt(min)).replace('Rp', '')} - ${helpers.formatCurrency(parseInt(max))}`
  }
  
  return helpers.formatCurrency(parseInt(range))
}

const truncateText = (text, length) => {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

const generateWhatsAppUrl = (phoneNumber) => {
  const message = `Halo, saya tertarik dengan produk ${props.product.name}. Bisa informasi lebih lanjut?`
  return helpers.generateWhatsAppUrl(phoneNumber, message)
}

const generateInstagramUrl = (instagram) => {
  const handle = instagram.startsWith('@') ? instagram.substring(1) : instagram
  return `https://www.instagram.com/${handle}/`
}

const trackProductClick = (platform, productId) => {
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'product_click', {
      event_category: 'Product Contact',
      event_label: `${platform}_${productId}`,
      product_id: productId,
      platform: platform
    })
  }
}
</script>

<style scoped>
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 12px;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.product-image {
  height: 200px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  text-align: center;
}

.availability-overlay {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.availability-badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  color: white;
  font-weight: 500;
  text-transform: uppercase;
}

.category-badge {
  font-size: 0.65rem;
  text-transform: uppercase;
  font-weight: 500;
}

.product-stats .stars {
  display: inline-block;
}

.product-stats .stars i {
  font-size: 0.8rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 0.1rem 0;
  position: relative;
  padding-left: 1rem;
}

.feature-list li:before {
  content: "•";
  color: var(--primary-green);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.price-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 0.75rem;
  border-left: 3px solid var(--primary-green);
}

.price-label {
  font-size: 0.8rem;
  color: #6c757d;
  display: block;
}

.price-value {
  font-weight: bold;
  color: var(--primary-green);
  font-size: 0.9rem;
}

.vendor-info {
  border-top: 1px solid #e9ecef;
  padding-top: 0.75rem;
}

.vendor-name {
  color: var(--heading-text);
}

.contact-buttons {
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}

.ecommerce-links {
  display: flex;
  gap: 0.25rem;
}

.contact-buttons .btn {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
}

@media (max-width: 768px) {
  .product-image {
    height: 150px;
  }
  
  .contact-buttons .btn {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>
