<template>
  <div class="company-form-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4">
              Daftarkan Layanan Komposting Anda
            </h1>
            <p class="lead mb-4">
              Bergabunglah dengan Direktori dan Edukasi Komposting Bali untuk menjangkau lebih banyak 
              pelanggan yang peduli lingkungan
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Form Section -->
    <div class="container my-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card">
            <div class="card-header bg-primary-green text-white">
              <h3 class="mb-0">
                <i class="fas fa-building me-2"></i>
                Formulir Pendaftaran Perusahaan
              </h3>
            </div>
            <div class="card-body p-4">
              <div class="alert alert-info">
                <i class="fas fa-info-circle me-2"></i>
                <strong>Informasi:</strong> Formulir ini akan mengirim data Anda untuk review. 
                Setelah diverifikasi, layanan Anda akan tampil di platform dalam 1-3 hari kerja.
              </div>

              <form 
                @submit.prevent="submitForm"
                name="company-registration"
                method="POST"
              >
                <!-- Company Basic Info -->
                <div class="form-section mb-5">
                  <h5 class="section-title">
                    <i class="fas fa-info-circle me-2"></i>
                    Informasi Dasar Perusahaan
                  </h5>
                  
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label for="companyName" class="form-label">Nama Perusahaan *</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="companyName"
                        v-model="formData.name"
                        required
                        placeholder="contoh: Green Cycle Bali"
                      >
                    </div>
                    
                    <div class="col-md-6">
                      <label for="established" class="form-label">Tahun Didirikan</label>
                      <input 
                        type="number" 
                        class="form-control" 
                        id="established"
                        v-model="formData.established"
                        min="1990"
                        :max="currentYear"
                        placeholder="contoh: 2020"
                      >
                    </div>
                    
                    <div class="col-12">
                      <label for="description" class="form-label">Deskripsi Perusahaan *</label>
                      <textarea 
                        class="form-control" 
                        id="description"
                        rows="3"
                        v-model="formData.description"
                        required
                        placeholder="Jelaskan layanan dan keunggulan perusahaan Anda..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <!-- Service Areas -->
                <div class="form-section mb-5">
                  <h5 class="section-title">
                    <i class="fas fa-map-marker-alt me-2"></i>
                    Area Layanan
                  </h5>
                  
                  <div class="alert alert-warning">
                    <small>Pilih kabupaten terlebih dahulu, kemudian pilih kecamatan yang Anda layani</small>
                  </div>
                  
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label for="kabupaten" class="form-label">Kabupaten/Kota *</label>
                      <select 
                        id="kabupaten" 
                        class="form-select" 
                        v-model="selectedKabupaten"
                        @change="onKabupatenChange"
                        required
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
                      <label class="form-label">Kecamatan yang Dilayani *</label>
                      <div class="kecamatan-selection" v-if="filteredKecamatan.length > 0">
                        <div class="form-check" v-for="kecamatan in filteredKecamatan" :key="kecamatan.id">
                          <input 
                            class="form-check-input" 
                            type="checkbox" 
                            :id="kecamatan.id"
                            :value="kecamatan.id"
                            v-model="formData.serviceAreas"
                          >
                          <label class="form-check-label" :for="kecamatan.id">
                            {{ kecamatan.name }}
                          </label>
                        </div>
                      </div>
                      <p v-else class="text-muted small">Pilih kabupaten terlebih dahulu</p>
                    </div>
                  </div>
                </div>

                <!-- Service Details -->
                <div class="form-section mb-5">
                  <h5 class="section-title">
                    <i class="fas fa-cogs me-2"></i>
                    Detail Layanan
                  </h5>
                  
                  <div class="row g-3">
                    <!-- Pickup Frequency -->
                    <div class="col-md-4">
                      <label class="form-label">Frekuensi Pickup *</label>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          id="weekly"
                          value="weekly"
                          v-model="formData.pickupFrequency"
                        >
                        <label class="form-check-label" for="weekly">Mingguan</label>
                      </div>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          id="biweekly"
                          value="bi-weekly"
                          v-model="formData.pickupFrequency"
                        >
                        <label class="form-check-label" for="biweekly">Dua Minggu</label>
                      </div>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          id="monthly"
                          value="monthly"
                          v-model="formData.pickupFrequency"
                        >
                        <label class="form-check-label" for="monthly">Bulanan</label>
                      </div>
                    </div>

                    <!-- Waste Types -->
                    <div class="col-md-4">
                      <label class="form-label">Jenis Sampah yang Diterima *</label>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          id="organic"
                          value="organic"
                          v-model="formData.wasteTypes"
                        >
                        <label class="form-check-label" for="organic">Sampah Organik</label>
                      </div>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          id="garden"
                          value="garden"
                          v-model="formData.wasteTypes"
                        >
                        <label class="form-check-label" for="garden">Sampah Kebun</label>
                      </div>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="checkbox" 
                          id="foodwaste"
                          value="food-waste"
                          v-model="formData.wasteTypes"
                        >
                        <label class="form-check-label" for="foodwaste">Sisa Makanan</label>
                      </div>
                    </div>

                    <!-- Pricing and Capacity -->
                    <div class="col-md-4">
                      <label for="pricingTier" class="form-label">Kategori Harga *</label>
                      <select id="pricingTier" class="form-select" v-model="formData.pricingTier" required>
                        <option value="">Pilih Kategori Harga</option>
                        <option value="low">Ekonomis (< Rp 100.000/bulan)</option>
                        <option value="medium">Menengah (Rp 100.000 - 200.000/bulan)</option>
                        <option value="high">Premium (> Rp 200.000/bulan)</option>
                      </select>

                      <label for="capacity" class="form-label mt-3">Kapasitas Layanan</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="capacity"
                        v-model="formData.capacity"
                        placeholder="contoh: 100 rumah tangga/bulan"
                      >
                    </div>
                  </div>
                </div>

                <!-- Contact Information -->
                <div class="form-section mb-5">
                  <h5 class="section-title">
                    <i class="fas fa-phone me-2"></i>
                    Informasi Kontak
                  </h5>
                  
                  <div class="row g-3">
                    <div class="col-md-6">
                      <label for="whatsapp" class="form-label">WhatsApp *</label>
                      <input 
                        type="tel" 
                        class="form-control" 
                        id="whatsapp"
                        v-model="formData.whatsapp"
                        required
                        placeholder="contoh: +628123456789 atau 08123456789"
                      >
                    </div>
                    
                    <div class="col-md-6">
                      <label for="instagram" class="form-label">Instagram</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        id="instagram"
                        v-model="formData.instagram"
                        placeholder="contoh: @namainstagram"
                      >
                    </div>
                    
                    <div class="col-md-6">
                      <label for="email" class="form-label">Email</label>
                      <input 
                        type="email" 
                        class="form-control" 
                        id="email"
                        v-model="formData.email"
                        placeholder="contoh: info@perusahaan.com"
                      >
                    </div>
                    
                    <div class="col-md-6">
                      <label for="phone" class="form-label">Telepon Lainnya</label>
                      <input 
                        type="tel" 
                        class="form-control" 
                        id="phone"
                        v-model="formData.phone"
                        placeholder="Jika berbeda dengan WhatsApp"
                      >
                    </div>
                  </div>
                </div>

                <!-- Availability Status -->
                <div class="form-section mb-5">
                  <h5 class="section-title">
                    <i class="fas fa-check-circle me-2"></i>
                    Status Ketersediaan
                  </h5>
                  
                  <div class="row">
                    <div class="col-12">
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="radio" 
                          name="availability" 
                          id="accepting"
                          value="accepting"
                          v-model="formData.availability"
                        >
                        <label class="form-check-label" for="accepting">
                          <strong class="text-success">Menerima Pelanggan Baru</strong>
                          <br><small class="text-muted">Siap melayani pelanggan baru saat ini</small>
                        </label>
                      </div>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="radio" 
                          name="availability" 
                          id="waitlist"
                          value="waitlist"
                          v-model="formData.availability"
                        >
                        <label class="form-check-label" for="waitlist">
                          <strong class="text-warning">Daftar Tunggu</strong>
                          <br><small class="text-muted">Masih bisa menerima tapi ada daftar tunggu</small>
                        </label>
                      </div>
                      <div class="form-check">
                        <input 
                          class="form-check-input" 
                          type="radio" 
                          name="availability" 
                          id="full"
                          value="full"
                          v-model="formData.availability"
                        >
                        <label class="form-check-label" for="full">
                          <strong class="text-danger">Penuh</strong>
                          <br><small class="text-muted">Tidak bisa menerima pelanggan baru untuk sementara</small>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- reCAPTCHA integration -->
                <div class="form-section mb-4" v-if="isRecaptchaEnabled()">
                  <div class="alert alert-info border">
                    <i class="fas fa-shield-alt me-2"></i>
                    Formulir ini dilindungi oleh reCAPTCHA Enterprise Google untuk mencegah spam.
                    <div class="small mt-1 text-muted">
                      reCAPTCHA akan diverifikasi secara otomatis saat Anda mengirim formulir.
                    </div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="text-center">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-lg"
                    :disabled="submitting"
                  >
                    <i v-if="submitting" class="loading-spinner me-2"></i>
                    <i v-else class="fas fa-paper-plane me-2"></i>
                    {{ submitting ? 'Mengirim...' : 'Kirim Pendaftaran' }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { loadRegionsData } from '../utils/dataLoader.js'
import { validateFormWithRecaptcha, isRecaptchaEnabled } from '../utils/recaptcha.js'

// Reactive data
const submitting = ref(false)
const selectedKabupaten = ref('')
const currentYear = new Date().getFullYear()

const regions = reactive({
  kabupaten: [],
  kecamatan: []
})

const formData = reactive({
  name: '',
  description: '',
  established: '',
  serviceAreas: [],
  pickupFrequency: [],
  wasteTypes: [],
  pricingTier: '',
  capacity: '',
  whatsapp: '',
  instagram: '',
  email: '',
  phone: '',
  availability: 'accepting'
})

// Computed properties
const kabupatenList = computed(() => regions.kabupaten)

const filteredKecamatan = computed(() => {
  if (!selectedKabupaten.value) return []
  return regions.kecamatan.filter(kecamatan => 
    kecamatan.kabupatenId === selectedKabupaten.value
  )
})

// Methods
const onKabupatenChange = () => {
  // Clear selected kecamatan when kabupaten changes
  formData.serviceAreas = []
}

const submitForm = async () => {
  submitting.value = true
  
  // Validate required fields first
  if (!formData.name || !formData.description || !formData.whatsapp) {
    alert('Mohon lengkapi semua field yang wajib diisi.')
    submitting.value = false
    return
  }

  if (formData.serviceAreas.length === 0) {
    alert('Mohon pilih minimal satu kecamatan yang dilayani.')
    submitting.value = false
    return
  }

  if (formData.pickupFrequency.length === 0 || formData.wasteTypes.length === 0) {
    alert('Mohon lengkapi detail layanan (frekuensi pickup dan jenis sampah).')
    submitting.value = false
    return
  }

  // Use reCAPTCHA validation for form submission
  await validateFormWithRecaptcha(
    'company_registration',
    async (recaptchaToken) => {
      try {
        // Get selected kabupaten name
        const selectedKabupatenName = regions.kabupaten.find(k => k.id === selectedKabupaten.value)?.name || ''
        
        // Get selected kecamatan names
        const selectedKecamatanNames = regions.kecamatan
          .filter(k => formData.serviceAreas.includes(k.id))
          .map(k => k.name)
          .join(', ')

        // Prepare form data for submission
        const submissionData = {
          'form-name': 'company-registration',
          companyName: formData.name,
          description: formData.description,
          established: formData.established,
          kabupaten: selectedKabupatenName,
          serviceAreas: selectedKecamatanNames,
          pickupFrequency: formData.pickupFrequency.join(', '),
          wasteTypes: formData.wasteTypes.join(', '),
          pricingTier: formData.pricingTier,
          capacity: formData.capacity,
          whatsapp: formData.whatsapp,
          instagram: formData.instagram,
          email: formData.email,
          phone: formData.phone,
          availability: formData.availability,
          submissionDate: new Date().toISOString(),
          // Include reCAPTCHA token if available
          ...(recaptchaToken && { 'g-recaptcha-response': recaptchaToken })
        }

        // For now, we'll simulate form submission since we're not using Netlify Forms
        console.log('Form submission data:', submissionData)
        
        // Show success message
        alert('Terima kasih! Pendaftaran Anda telah berhasil dikirim. Tim kami akan meninjau dan menghubungi Anda dalam 1-3 hari kerja.')
        
        // Reset form
        resetForm()
        
      } catch (error) {
        console.error('Form submission error:', error)
        throw error
      }
    },
    (error) => {
      console.error('reCAPTCHA validation failed:', error)
      alert('Verifikasi keamanan gagal. Silakan refresh halaman dan coba lagi.')
    }
  )
  
  submitting.value = false
}

const resetForm = () => {
  Object.assign(formData, {
    name: '',
    description: '',
    established: '',
    serviceAreas: [],
    pickupFrequency: [],
    wasteTypes: [],
    pricingTier: '',
    capacity: '',
    whatsapp: '',
    instagram: '',
    email: '',
    phone: '',
    availability: 'accepting'
  })
  selectedKabupaten.value = ''
}

// Load regions data on mount
onMounted(async () => {
  try {
    const regionsData = await loadRegionsData()
    regions.kabupaten = regionsData.kabupaten
    regions.kecamatan = regionsData.kecamatan
  } catch (error) {
    console.error('Error loading regions data:', error)
  }
})
</script>

<style scoped>
.company-form-page {
  min-height: 100vh;
}

.form-section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1.5rem;
}

.form-section:last-of-type {
  border-bottom: none;
  padding-bottom: 0;
}

.section-title {
  color: var(--primary-green);
  font-family: var(--font-heading);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-green);
}

.kecamatan-selection {
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #f8f9fa;
}

.form-check {
  margin-bottom: 0.5rem;
}

.form-check-label {
  cursor: pointer;
}

.card-header {
  font-family: var(--font-heading);
}

@media (max-width: 768px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .card-body {
    padding: 1.5rem !important;
  }
  
  .kecamatan-selection {
    max-height: 150px;
  }
}
</style>
