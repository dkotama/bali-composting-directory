<template>
  <div class="card company-card">
    <div class="card-body">
      <div class="row">
        <!-- Company Info -->
        <div class="col-md-8">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h5 class="card-title mb-0">{{ company.name }}</h5>
            <span 
              class="availability-badge"
              :class="availabilityClass"
            >
              {{ availabilityText }}
            </span>
          </div>

          <p class="card-text text-muted mb-3">{{ company.description }}</p>

          <!-- Service Details -->
          <div class="service-details mb-3">
            <div class="row g-2">
              <div class="col-auto">
                <small class="badge bg-light text-dark">
                  <i class="fas fa-calendar-alt me-1"></i>
                  {{ formatPickupFrequency(company.pickup_frequency) }}
                </small>
              </div>
              <div class="col-auto">
                <small class="badge bg-light text-dark">
                  <i class="fas fa-leaf me-1"></i>
                  {{ formatWasteTypes(company.waste_types) }}
                </small>
              </div>
              <div class="col-auto">
                <small class="badge bg-light text-dark">
                  <i class="fas fa-tag me-1"></i>
                  {{ formatPricingTier(company.pricing_tier) }}
                </small>
              </div>
            </div>
          </div>

          <!-- Service Areas -->
          <div class="service-areas mb-3">
            <h6 class="mb-2">
              <i class="fas fa-map-marker-alt me-1 text-primary-green"></i>
              Area Layanan:
            </h6>
            <div class="d-flex flex-wrap gap-1">
              <span 
                v-for="area in company.service_areas" 
                :key="area"
                class="badge bg-primary-green"
              >
                {{ area }}
              </span>
            </div>
          </div>

          <!-- Features -->
          <div class="features" v-if="company.features && company.features.length > 0">
            <h6 class="mb-2">
              <i class="fas fa-star me-1 text-primary-green"></i>
              Keunggulan:
            </h6>
            <ul class="list-unstyled mb-0">
              <li v-for="feature in company.features" :key="feature" class="mb-1">
                <i class="fas fa-check text-success me-2"></i>
                <small>{{ feature }}</small>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contact & Actions -->
        <div class="col-md-4">
          <div class="contact-section">
            <!-- Pricing Info -->
            <div class="pricing-info mb-3" v-if="company.price_weekly || company.price_bi_weekly || company.price_monthly">
              <h6 class="mb-2">
                <i class="fas fa-money-bill-wave me-1 text-primary-green"></i>
                Harga:
              </h6>
              <div v-if="company.price_weekly" class="mb-1">
                <small class="text-muted">
                  Mingguan: 
                  <span class="fw-bold text-primary-green">{{ formatCurrency(company.price_weekly) }}</span>
                </small>
              </div>
              <div v-if="company.price_bi_weekly" class="mb-1">
                <small class="text-muted">
                  2 Minggu: 
                  <span class="fw-bold text-primary-green">{{ formatCurrency(company.price_bi_weekly) }}</span>
                </small>
              </div>
              <div v-if="company.price_monthly" class="mb-1">
                <small class="text-muted">
                  Bulanan: 
                  <span class="fw-bold text-primary-green">{{ formatCurrency(company.price_monthly) }}</span>
                </small>
              </div>
            </div>

            <!-- Company Info -->
            <div class="company-info mb-3">
              <div v-if="company.established" class="mb-2">
                <small class="text-muted">
                  <i class="fas fa-calendar me-1"></i>
                  Didirikan {{ company.established }}
                </small>
              </div>
              <div v-if="company.customer_capacity" class="mb-2">
                <small class="text-muted">
                  <i class="fas fa-users me-1"></i>
                  Kapasitas: {{ company.customer_capacity }} pelanggan
                </small>
              </div>
              <div v-if="company.waste_capacity" class="mb-2">
                <small class="text-muted">
                  <i class="fas fa-weight me-1"></i>
                  Kapasitas sampah: {{ company.waste_capacity }}
                </small>
              </div>
            </div>

            <!-- Contact Buttons -->
            <div class="contact-buttons">
              <h6 class="mb-2">
                <i class="fas fa-phone me-1 text-primary-green"></i>
                Hubungi:
              </h6>
              
              <!-- WhatsApp Button -->
              <a 
                v-if="company.whatsapp"
                :href="generateWhatsAppUrl(company.whatsapp)"
                target="_blank"
                class="contact-btn whatsapp-btn d-block mb-2"
                @click="trackContactClick('whatsapp', company.id)"
              >
                <i class="fab fa-whatsapp me-2"></i>
                WhatsApp
              </a>

              <!-- Instagram Button -->
              <a 
                v-if="company.instagram"
                :href="generateInstagramUrl(company.instagram)"
                target="_blank"
                class="contact-btn instagram-btn d-block mb-2"
                @click="trackContactClick('instagram', company.id)"
              >
                <i class="fab fa-instagram me-2"></i>
                Instagram
              </a>

              <!-- Phone Button -->
              <a 
                v-if="company.phone && company.phone !== company.whatsapp"
                :href="`tel:${company.phone}`"
                class="contact-btn btn btn-outline-primary d-block mb-2"
              >
                <i class="fas fa-phone me-2"></i>
                Telepon
              </a>

              <!-- Email Button -->
              <a 
                v-if="company.email"
                :href="`mailto:${company.email}`"
                class="contact-btn btn btn-outline-secondary d-block"
              >
                <i class="fas fa-envelope me-2"></i>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  company: {
    type: Object,
    required: true
  },
  regions: {
    type: Object,
    default: () => ({ kabupaten: [], kecamatan: [] })
  }
})

// Computed properties
const availabilityClass = computed(() => {
  const status = props.company.availability
  return `availability-${status}`
})

const availabilityText = computed(() => {
  const statusMap = {
    accepting: 'Menerima Pelanggan',
    waitlist: 'Daftar Tunggu',
    full: 'Penuh'
  }
  return statusMap[props.company.availability] || props.company.availability
})

// Methods
const formatPickupFrequency = (frequencies) => {
  if (!frequencies || frequencies.length === 0) return 'Tidak tersedia'
  
  const frequencyMap = {
    weekly: 'Mingguan',
    'bi-weekly': '2 Minggu',
    monthly: 'Bulanan'
  }
  
  return frequencies.map(freq => frequencyMap[freq] || freq).join(', ')
}

const formatWasteTypes = (types) => {
  if (!types || types.length === 0) return 'Tidak tersedia'
  
  const typeMap = {
    organic: 'Organik',
    garden: 'Kebun',
    'food-waste': 'Sisa Makanan',
    'restaurant-waste': 'Limbah Restoran',
    'agricultural-waste': 'Limbah Pertanian'
  }
  
  return types.map(type => typeMap[type] || type).join(', ')
}

const formatPricingTier = (tier) => {
  const tierMap = {
    low: 'Ekonomis',
    medium: 'Menengah',
    high: 'Premium'
  }
  return tierMap[tier] || tier
}

const formatFrequency = (frequency) => {
  const frequencyMap = {
    weekly: 'Mingguan',
    'bi-weekly': '2 Minggu',
    monthly: 'Bulanan'
  }
  return frequencyMap[frequency] || frequency
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const generateWhatsAppUrl = (phoneNumber, message = '') => {
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  const defaultMessage = message || `Halo ${props.company.name}, saya tertarik dengan layanan komposting Anda. Bisa informasi lebih lanjut?`
  const encodedMessage = encodeURIComponent(defaultMessage)
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`
}

const generateInstagramUrl = (instagram) => {
  const handle = instagram.startsWith('@') ? instagram.substring(1) : instagram
  return `https://www.instagram.com/${handle}/`
}

const trackContactClick = (contactType, companyId) => {
  // Analytics tracking - would integrate with Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'contact_click', {
      event_category: 'Company Contact',
      event_label: `${contactType}_${companyId}`,
      company_id: companyId,
      contact_type: contactType
    })
  }
}
</script>

<style scoped>
.company-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 15px;
  border: none;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.company-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.contact-section {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  height: fit-content;
}

.service-details .badge {
  font-size: 0.75rem;
  padding: 0.4rem 0.6rem;
}

.features ul {
  max-height: 120px;
  overflow-y: auto;
}

.features li {
  font-size: 0.875rem;
}

.contact-buttons .contact-btn {
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.whatsapp-btn {
  background-color: #25d366;
  color: white;
}

.whatsapp-btn:hover {
  background-color: #1da851;
  color: white;
}

.instagram-btn {
  background: linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);
  color: white;
}

.instagram-btn:hover {
  opacity: 0.9;
  color: white;
}

.pricing-info {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  border-left: 4px solid var(--primary-green);
}

@media (max-width: 768px) {
  .contact-section {
    margin-top: 1rem;
    padding: 1rem;
  }
  
  .contact-buttons .contact-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>
