<template>
  <div class="company-submission-form">
    <!-- Environment indicator for development -->
    <div v-if="isDev" class="alert alert-info mb-4">
      <i class="bi bi-info-circle me-2"></i>
      Mode pengembangan aktif - data akan disimpan di database development
    </div>

    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h4 class="card-title mb-0">
          <i class="bi bi-plus-circle me-2"></i>
          Daftarkan Layanan Komposting Anda
        </h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="submitForm" class="needs-validation" novalidate>
          <!-- Basic Information -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-primary mb-3">
                <i class="bi bi-info-circle me-2"></i>
                Informasi Dasar
              </h5>
            </div>

            <div class="col-md-6 mb-3">
              <label for="companyName" class="form-label required">Nama Perusahaan/Layanan</label>
              <input
                type="text"
                class="form-control"
                id="companyName"
                v-model="formData.name"
                :class="{ 'is-invalid': errors.name }"
                required
                placeholder="Contoh: Green Cycle Bali"
              >
              <div class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="contactPerson" class="form-label required">Nama Penanggung Jawab</label>
              <input
                type="text"
                class="form-control"
                id="contactPerson"
                v-model="formData.contact_person"
                :class="{ 'is-invalid': errors.contact_person }"
                required
                placeholder="Nama lengkap penanggung jawab"
              >
              <div class="invalid-feedback">{{ errors.contact_person }}</div>
            </div>

            <div class="col-12 mb-3">
              <label for="description" class="form-label required">Deskripsi Layanan</label>
              <textarea
                class="form-control"
                id="description"
                rows="4"
                v-model="formData.description"
                :class="{ 'is-invalid': errors.description }"
                required
                placeholder="Jelaskan layanan komposting yang Anda tawarkan, pengalaman, dan keunggulan layanan..."
              ></textarea>
              <div class="invalid-feedback">{{ errors.description }}</div>
              <div class="form-text">Minimal 50 karakter. Jelaskan dengan detail untuk menarik minat pelanggan.</div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-primary mb-3">
                <i class="bi bi-telephone me-2"></i>
                Informasi Kontak
              </h5>
            </div>

            <div class="col-md-6 mb-3">
              <label for="phone" class="form-label required">Nomor Telepon</label>
              <input
                type="tel"
                class="form-control"
                id="phone"
                v-model="formData.phone"
                :class="{ 'is-invalid': errors.phone }"
                required
                placeholder="+6281234567890"
              >
              <div class="invalid-feedback">{{ errors.phone }}</div>
              <div class="form-text">Format: +6281234567890 atau 081234567890</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="whatsapp" class="form-label">WhatsApp</label>
              <input
                type="tel"
                class="form-control"
                id="whatsapp"
                v-model="formData.whatsapp"
                placeholder="+6281234567890 (opsional)"
              >
              <div class="form-text">Nomor WhatsApp untuk memudahkan komunikasi dengan pelanggan</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="formData.email"
                :class="{ 'is-invalid': errors.email }"
                placeholder="contoh@email.com (opsional)"
              >
              <div class="invalid-feedback">{{ errors.email }}</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="instagram" class="form-label">Instagram</label>
              <div class="input-group">
                <span class="input-group-text">@</span>
                <input
                  type="text"
                  class="form-control"
                  id="instagram"
                  v-model="formData.instagram"
                  placeholder="username (opsional)"
                >
              </div>
              <div class="form-text">Username Instagram tanpa tanda @</div>
            </div>
          </div>

          <!-- Service Areas -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-primary mb-3">
                <i class="bi bi-geo-alt me-2"></i>
                Area Layanan
              </h5>
            </div>

            <div class="col-12 mb-3">
              <label class="form-label required">Wilayah yang Dilayani</label>
              <div class="row">
                <div v-for="kabupaten in regions.kabupaten" :key="kabupaten.id" class="col-md-6 col-lg-4 mb-3">
                  <div class="card h-100">
                    <div class="card-header py-2">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="`kabupaten-${kabupaten.id}`"
                          :checked="isKabupatenSelected(kabupaten.id)"
                          @change="toggleKabupaten(kabupaten.id)"
                        >
                        <label class="form-check-label fw-bold" :for="`kabupaten-${kabupaten.id}`">
                          {{ kabupaten.name }}
                        </label>
                      </div>
                    </div>
                    <div class="card-body py-2">
                      <div v-for="kecamatan in kabupaten.kecamatan" :key="kecamatan.id" class="form-check form-check-sm">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          :id="kecamatan.id"
                          :value="kecamatan.id"
                          v-model="formData.service_areas"
                        >
                        <label class="form-check-label small" :for="kecamatan.id">
                          {{ kecamatan.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="invalid-feedback d-block" v-if="errors.service_areas">
                {{ errors.service_areas }}
              </div>
              <div class="form-text">Pilih semua kecamatan yang dapat Anda layani. Minimal pilih 1 area.</div>
            </div>
          </div>

          <!-- Service Details -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-primary mb-3">
                <i class="bi bi-recycle me-2"></i>
                Detail Layanan
              </h5>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label required">Frekuensi Penjemputan</label>
              <div class="row">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="weekly"
                      value="weekly"
                      v-model="formData.pickup_frequency"
                    >
                    <label class="form-check-label" for="weekly">Mingguan</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="bi-weekly"
                      value="bi-weekly"
                      v-model="formData.pickup_frequency"
                    >
                    <label class="form-check-label" for="bi-weekly">Dua Minggu Sekali</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="monthly"
                      value="monthly"
                      v-model="formData.pickup_frequency"
                    >
                    <label class="form-check-label" for="monthly">Bulanan</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label required">Jenis Sampah yang Diterima</label>
              <div class="row">
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="organic"
                      value="organic"
                      v-model="formData.waste_types"
                    >
                    <label class="form-check-label" for="organic">Sampah Organik Rumah Tangga</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="garden"
                      value="garden"
                      v-model="formData.waste_types"
                    >
                    <label class="form-check-label" for="garden">Sampah Kebun</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="food-waste"
                      value="food-waste"
                      v-model="formData.waste_types"
                    >
                    <label class="form-check-label" for="food-waste">Sisa Makanan</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="restaurant-waste"
                      value="restaurant-waste"
                      v-model="formData.waste_types"
                    >
                    <label class="form-check-label" for="restaurant-waste">Limbah Restoran/Hotel</label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="agricultural-waste"
                      value="agricultural-waste"
                      v-model="formData.waste_types"
                    >
                    <label class="form-check-label" for="agricultural-waste">Limbah Pertanian</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="pricingInfo" class="form-label">Informasi Harga</label>
              <textarea
                class="form-control"
                id="pricingInfo"
                rows="3"
                v-model="formData.pricing_info"
                placeholder="Contoh: Rp 150.000/bulan untuk penjemputan mingguan, Rp 100.000/bulan untuk dua minggu sekali"
              ></textarea>
              <div class="form-text">Jelaskan struktur harga untuk berbagai layanan</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="coverageArea" class="form-label">Detail Area Cakupan</label>
              <textarea
                class="form-control"
                id="coverageArea"
                rows="3"
                v-model="formData.coverage_area"
                placeholder="Contoh: Melayani seluruh Kuta dan Kuta Selatan, dengan fokus di area Seminyak, Canggu, dan Jimbaran"
              ></textarea>
              <div class="form-text">Jelaskan secara spesifik area yang dapat dilayani</div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-primary mb-3">
                <i class="bi bi-info-square me-2"></i>
                Informasi Tambahan
              </h5>
            </div>

            <div class="col-md-4 mb-3">
              <label for="businessType" class="form-label">Jenis Usaha</label>
              <select
                class="form-select"
                id="businessType"
                v-model="formData.business_type"
              >
                <option value="">Pilih jenis usaha</option>
                <option value="individual">Individu</option>
                <option value="community">Komunitas</option>
                <option value="company">Perusahaan</option>
              </select>
              <div class="form-text">Pilih kategori yang paling sesuai</div>
            </div>

            <div class="col-md-4 mb-3">
              <label for="experienceYears" class="form-label">Pengalaman (tahun)</label>
              <input
                type="number"
                class="form-control"
                id="experienceYears"
                v-model.number="formData.experience_years"
                min="0"
                max="50"
                placeholder="0"
              >
              <div class="form-text">Berapa lama telah menjalankan layanan komposting</div>
            </div>

            <div class="col-md-4 mb-3">
              <label for="currentCapacity" class="form-label">Kapasitas (rumah tangga/bulan)</label>
              <input
                type="number"
                class="form-control"
                id="currentCapacity"
                v-model.number="formData.current_capacity"
                min="1"
                placeholder="50"
              >
              <div class="form-text">Berapa rumah tangga yang dapat dilayani per bulan</div>
            </div>

            <div class="col-12 mb-3">
              <label for="servicesOffered" class="form-label">Layanan yang Ditawarkan</label>
              <textarea
                class="form-control"
                id="servicesOffered"
                rows="3"
                v-model="formData.services_offered_text"
                placeholder="Contoh: Penjemputan rutin, edukasi pemilahan sampah, laporan hasil kompos, konsultasi gratis"
              ></textarea>
              <div class="form-text">Jelaskan semua layanan tambahan yang Anda berikan</div>
            </div>

            <div class="col-12 mb-3">
              <label for="additionalInfo" class="form-label">Informasi Tambahan</label>
              <textarea
                class="form-control"
                id="additionalInfo"
                rows="4"
                v-model="formData.additional_info"
                placeholder="Ceritakan lebih lanjut tentang layanan Anda, keunggulan, sertifikat yang dimiliki, kerjasama dengan pihak lain, atau hal lain yang ingin disampaikan kepada calon pelanggan..."
              ></textarea>
              <div class="form-text">Informasi tambahan untuk menarik minat pelanggan</div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="row">
            <div class="col-12">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button 
                  type="button" 
                  class="btn btn-outline-secondary me-2"
                  @click="resetForm"
                  :disabled="isSubmitting"
                >
                  <i class="bi bi-arrow-clockwise me-1"></i>
                  Reset Form
                </button>
                <button 
                  type="submit" 
                  class="btn btn-primary px-4"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  <i v-else class="bi bi-send me-1"></i>
                  {{ isSubmitting ? 'Mengirim...' : 'Kirim Permohonan' }}
                </button>
              </div>
            </div>
          </div>
        </form>

        <!-- Success Message -->
        <div v-if="showSuccess" class="alert alert-success mt-4" role="alert">
          <div class="d-flex align-items-center">
            <i class="bi bi-check-circle-fill me-3 fs-4 text-success"></i>
            <div class="flex-grow-1">
              <h5 class="alert-heading mb-1">Permohonan Berhasil Dikirim!</h5>
              <p class="mb-2">Tim kami akan meninjau permohonan Anda dalam 2-3 hari kerja dan menghubungi melalui nomor yang tercantum.</p>
              <small class="text-muted d-block">
                <strong>ID Permohonan:</strong> {{ submittedRequestId }}<br>
                <strong>Environment:</strong> {{ currentEnvironment.toUpperCase() }}
              </small>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="showError" class="alert alert-danger mt-4" role="alert">
          <div class="d-flex align-items-center">
            <i class="bi bi-exclamation-triangle-fill me-3 fs-4 text-danger"></i>
            <div class="flex-grow-1">
              <h5 class="alert-heading mb-1">Gagal Mengirim Permohonan</h5>
              <p class="mb-0">{{ errorMessage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { dataService, isDev, currentEnvironment } from '@/utils/dataService'

// Form state
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const submittedRequestId = ref('')
const regions = ref({ kabupaten: [] })

// Form data
const formData = reactive({
  name: '',
  contact_person: '',
  description: '',
  phone: '',
  whatsapp: '',
  email: '',
  instagram: '',
  service_areas: [],
  pickup_frequency: [],
  waste_types: [],
  pricing_info: '',
  coverage_area: '',
  business_type: '',
  experience_years: null,
  current_capacity: null,
  services_offered_text: '',
  additional_info: ''
})

// Form validation errors
const errors = reactive({})

// Load regions data on component mount
onMounted(async () => {
  try {
    const response = await fetch('/data/regions.json')
    if (response.ok) {
      const data = await response.json()
      regions.value = data
    } else {
      console.error('Failed to load regions data')
    }
  } catch (error) {
    console.error('Error loading regions:', error)
  }
})

// Helper functions for area selection
const isKabupatenSelected = (kabupatenId) => {
  return regions.value.kabupaten
    .find(k => k.id === kabupatenId)
    ?.kecamatan.some(kec => formData.service_areas.includes(kec.id)) || false
}

const toggleKabupaten = (kabupatenId) => {
  const kabupaten = regions.value.kabupaten.find(k => k.id === kabupatenId)
  const isSelected = isKabupatenSelected(kabupatenId)
  
  if (isSelected) {
    // Remove all kecamatan from this kabupaten
    kabupaten.kecamatan.forEach(kec => {
      const index = formData.service_areas.indexOf(kec.id)
      if (index > -1) {
        formData.service_areas.splice(index, 1)
      }
    })
  } else {
    // Add all kecamatan from this kabupaten
    kabupaten.kecamatan.forEach(kec => {
      if (!formData.service_areas.includes(kec.id)) {
        formData.service_areas.push(kec.id)
      }
    })
  }
}

// Validation rules
const validateForm = () => {
  const newErrors = {}

  // Required fields
  if (!formData.name.trim()) {
    newErrors.name = 'Nama perusahaan wajib diisi'
  } else if (formData.name.trim().length < 3) {
    newErrors.name = 'Nama perusahaan minimal 3 karakter'
  }

  if (!formData.contact_person.trim()) {
    newErrors.contact_person = 'Nama penanggung jawab wajib diisi'
  } else if (formData.contact_person.trim().length < 3) {
    newErrors.contact_person = 'Nama penanggung jawab minimal 3 karakter'
  }

  if (!formData.description.trim()) {
    newErrors.description = 'Deskripsi layanan wajib diisi'
  } else if (formData.description.trim().length < 50) {
    newErrors.description = 'Deskripsi layanan minimal 50 karakter'
  }

  if (!formData.phone.trim()) {
    newErrors.phone = 'Nomor telepon wajib diisi'
  } else if (!/^(\+62|62|0)[\d\s-]{8,13}$/.test(formData.phone.replace(/\s/g, ''))) {
    newErrors.phone = 'Format nomor telepon tidak valid (contoh: +6281234567890)'
  }

  // Email validation (optional but must be valid if provided)
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'Format email tidak valid'
  }

  // Service areas required
  if (formData.service_areas.length === 0) {
    newErrors.service_areas = 'Pilih minimal satu area layanan'
  }

  // Pickup frequency required
  if (formData.pickup_frequency.length === 0) {
    newErrors.pickup_frequency = 'Pilih minimal satu frekuensi penjemputan'
  }

  // Waste types required
  if (formData.waste_types.length === 0) {
    newErrors.waste_types = 'Pilih minimal satu jenis sampah yang diterima'
  }

  // Clear previous errors and set new ones
  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)

  return Object.keys(newErrors).length === 0
}

// Submit form
const submitForm = async () => {
  // Reset states
  showSuccess.value = false
  showError.value = false
  
  // Validate form
  if (!validateForm()) {
    // Scroll to first error
    const firstError = document.querySelector('.is-invalid')
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    return
  }

  isSubmitting.value = true

  try {
    // Prepare submission data to match actual database schema
    const submissionData = {
      // Basic company information
      name: formData.name || '',
      description: formData.description || '',
      
      // Contact information (matching database columns exactly)
      contact_person: formData.contact_person || formData.name || '',
      phone: formData.phone || null,
      whatsapp: formData.whatsapp || '',
      email: formData.email || null,
      instagram: formData.instagram || null,
      
      // Service details (matching database array columns)
      service_areas: Array.isArray(formData.service_areas) ? formData.service_areas : [],
      pickup_frequency: Array.isArray(formData.pickup_frequency) ? formData.pickup_frequency : [],
      waste_types: Array.isArray(formData.waste_types) ? formData.waste_types : [],
      
      // Business information
      business_type: formData.business_type || 'composting_service',
      coverage_area: formData.coverage_area || '',
      pricing_info: formData.pricing_info || '',
      
      // Additional details
      additional_info: formData.additional_info || '',
      current_capacity: formData.current_capacity ? parseInt(formData.current_capacity) : null,
      experience_years: formData.experience_years ? parseInt(formData.experience_years) : null
    }

    // Convert services_offered_text to services_offered array
    if (formData.services_offered_text) {
      submissionData.services_offered = formData.services_offered_text.split(',').map(s => s.trim()).filter(s => s)
    }

    const result = await dataService.submitCompanyRequest(submissionData)
    
    // Show success message
    showSuccess.value = true
    submittedRequestId.value = result.id
    
    // Scroll to success message
    setTimeout(() => {
      const successAlert = document.querySelector('.alert-success')
      if (successAlert) {
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
      showSuccess.value = false
    }, 10000) // Hide success message after 10 seconds

  } catch (error) {
    showError.value = true
    errorMessage.value = error.message || 'Terjadi kesalahan saat mengirim data. Silakan coba lagi.'
    console.error('Form submission error:', error)
    
    // Scroll to error message
    setTimeout(() => {
      const errorAlert = document.querySelector('.alert-danger')
      if (errorAlert) {
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  } finally {
    isSubmitting.value = false
  }
}

// Reset form
const resetForm = () => {
  Object.assign(formData, {
    name: '',
    contact_person: '',
    description: '',
    phone: '',
    whatsapp: '',
    email: '',
    instagram: '',
    service_areas: [],
    pickup_frequency: [],
    waste_types: [],
    pricing_info: '',
    coverage_area: '',
    business_type: '',
    experience_years: null,
    current_capacity: null,
    services_offered_text: '',
    additional_info: ''
  })
  
  Object.keys(errors).forEach(key => delete errors[key])
  showSuccess.value = false
  showError.value = false
}
</script>

<style scoped>
.required::after {
  content: " *";
  color: #dc3545;
}

.form-check {
  margin-bottom: 0.5rem;
}

.form-check-sm {
  margin-bottom: 0.25rem;
}

.form-check-sm .form-check-input {
  margin-top: 0.125rem;
}

.form-check-sm .form-check-label {
  font-size: 0.875rem;
}

.alert {
  border: none;
  border-radius: 0.5rem;
}

.card-header {
  border-radius: 0.5rem 0.5rem 0 0 !important;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}

.card {
  transition: all 0.2s ease-in-out;
}

.card:hover {
  box-shadow: 0 0.125rem 0.375rem rgba(0, 0, 0, 0.1);
}

.text-primary {
  color: #174735 !important;
}

.bg-primary {
  background-color: #174735 !important;
}

.btn-primary {
  background-color: #174735;
  border-color: #174735;
}

.btn-primary:hover {
  background-color: #0f2f23;
  border-color: #0f2f23;
}

.form-text {
  font-size: 0.8rem;
  color: #6c757d;
}

.invalid-feedback {
  font-size: 0.8rem;
}
</style>
