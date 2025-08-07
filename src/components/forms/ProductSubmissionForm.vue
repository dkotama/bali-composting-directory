<template>
  <div class="product-submission-form">
    <!-- Environment indicator for development -->
    <div v-if="isDev" class="alert alert-info mb-4">
      <i class="bi bi-info-circle me-2"></i>
      Mode pengembangan aktif - data akan disimpan di database development
    </div>

    <div class="card shadow-sm">
      <div class="card-header bg-success text-white">
        <h4 class="card-title mb-0">
          <i class="bi bi-box-seam me-2"></i>
          Tambahkan Produk Komposting
        </h4>
      </div>

      <div class="card-body">
        <form @submit.prevent="submitForm" class="needs-validation" novalidate>
          <!-- Product Basic Information -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-success mb-3">
                <i class="bi bi-info-circle me-2"></i>
                Informasi Produk
              </h5>
            </div>

            <div class="col-md-8 mb-3">
              <label for="productName" class="form-label required">Nama Produk</label>
              <input
                type="text"
                class="form-control"
                id="productName"
                v-model="formData.name"
                :class="{ 'is-invalid': errors.name }"
                required
                placeholder="Contoh: Komposter Bin Plastik 100L"
              >
              <div class="invalid-feedback">{{ errors.name }}</div>
            </div>

            <div class="col-md-4 mb-3">
              <label for="category" class="form-label required">Kategori</label>
              <select
                class="form-select"
                id="category"
                v-model="formData.category"
                :class="{ 'is-invalid': errors.category }"
                required
              >
                <option value="">Pilih kategori</option>
                <option value="equipment">Peralatan (Equipment)</option>
                <option value="supplies">Bahan/Pupuk (Supplies)</option>
                <option value="tools">Alat Bantu (Tools)</option>
                <option value="service">Layanan (Service)</option>
              </select>
              <div class="invalid-feedback">{{ errors.category }}</div>
            </div>

            <div class="col-12 mb-3">
              <label for="description" class="form-label required">Deskripsi Produk</label>
              <textarea
                class="form-control"
                id="description"
                rows="4"
                v-model="formData.description"
                :class="{ 'is-invalid': errors.description }"
                required
                placeholder="Jelaskan produk secara detail, kegunaan, dan keunggulannya untuk komposting..."
              ></textarea>
              <div class="invalid-feedback">{{ errors.description }}</div>
              <div class="form-text">Minimal 30 karakter. Jelaskan dengan detail untuk menarik minat pembeli.</div>
            </div>

            <div class="col-12 mb-3">
              <label for="features" class="form-label">Fitur/Keunggulan Produk</label>
              <textarea
                class="form-control"
                id="features"
                rows="3"
                v-model="formData.features_text"
                placeholder="Contoh: Kapasitas 100 liter, Bahan plastik food grade, Sistem ventilasi optimal (pisahkan dengan koma)"
              ></textarea>
              <div class="form-text">Tuliskan fitur-fitur utama, dipisahkan dengan koma</div>
            </div>
          </div>

          <!-- Pricing Information -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-success mb-3">
                <i class="bi bi-tags me-2"></i>
                Informasi Harga & Ketersediaan
              </h5>
            </div>

            <div class="col-md-6 mb-3">
              <label for="priceRange" class="form-label required">Kisaran Harga</label>
              <select
                class="form-select"
                id="priceRange"
                v-model="formData.price_range"
                :class="{ 'is-invalid': errors.price_range }"
                required
              >
                <option value="">Pilih kisaran harga</option>
                <option value="under-50k">Di bawah Rp 50.000</option>
                <option value="50k-100k">Rp 50.000 - Rp 100.000</option>
                <option value="100k-250k">Rp 100.000 - Rp 250.000</option>
                <option value="250k-500k">Rp 250.000 - Rp 500.000</option>
                <option value="500k-1m">Rp 500.000 - Rp 1.000.000</option>
                <option value="over-1m">Di atas Rp 1.000.000</option>
              </select>
              <div class="invalid-feedback">{{ errors.price_range }}</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="availability" class="form-label">Status Ketersediaan</label>
              <select
                class="form-select"
                id="availability"
                v-model="formData.availability"
              >
                <option value="in-stock">Tersedia (In Stock)</option>
                <option value="limited-stock">Stok Terbatas</option>
                <option value="pre-order">Pre-order</option>
                <option value="seasonal">Musiman</option>
                <option value="out-of-stock">Habis</option>
              </select>
            </div>

            <div class="col-12 mb-3">
              <label for="shippingAreas" class="form-label">Area Pengiriman</label>
              <div class="row">
                <div v-for="kabupaten in regions.kabupaten" :key="kabupaten.id" class="col-md-6 col-lg-4 mb-2">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :id="`ship-${kabupaten.id}`"
                      :value="kabupaten.id"
                      v-model="formData.shipping_areas"
                    >
                    <label class="form-check-label" :for="`ship-${kabupaten.id}`">
                      {{ kabupaten.name }}
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-text">Pilih wilayah yang dapat Anda jangkau untuk pengiriman</div>
            </div>
          </div>

          <!-- Vendor Information -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-success mb-3">
                <i class="bi bi-shop me-2"></i>
                Informasi Vendor/Penjual
              </h5>
            </div>

            <div class="col-md-6 mb-3">
              <label for="vendorName" class="form-label required">Nama Toko/Vendor</label>
              <input
                type="text"
                class="form-control"
                id="vendorName"
                v-model="formData.vendor_name"
                :class="{ 'is-invalid': errors.vendor_name }"
                required
                placeholder="Contoh: Bali Eco Products"
              >
              <div class="invalid-feedback">{{ errors.vendor_name }}</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="vendorLocation" class="form-label">Lokasi Vendor</label>
              <input
                type="text"
                class="form-control"
                id="vendorLocation"
                v-model="formData.vendor_location"
                placeholder="Contoh: Denpasar, Bali"
              >
            </div>

            <div class="col-md-6 mb-3">
              <label for="whatsapp" class="form-label required">WhatsApp</label>
              <input
                type="tel"
                class="form-control"
                id="whatsapp"
                v-model="formData.vendor_whatsapp"
                :class="{ 'is-invalid': errors.vendor_whatsapp }"
                required
                placeholder="+6281234567890"
              >
              <div class="invalid-feedback">{{ errors.vendor_whatsapp }}</div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="instagram" class="form-label">Instagram</label>
              <div class="input-group">
                <span class="input-group-text">@</span>
                <input
                  type="text"
                  class="form-control"
                  id="instagram"
                  v-model="formData.vendor_instagram"
                  placeholder="username (opsional)"
                >
              </div>
            </div>

            <div class="col-md-6 mb-3">
              <label for="tokopedia" class="form-label">Link Tokopedia</label>
              <input
                type="url"
                class="form-control"
                id="tokopedia"
                v-model="formData.vendor_tokopedia"
                placeholder="https://tokopedia.com/namatoko (opsional)"
              >
            </div>

            <div class="col-md-6 mb-3">
              <label for="shopee" class="form-label">Link Shopee</label>
              <input
                type="url"
                class="form-control"
                id="shopee"
                v-model="formData.vendor_shopee"
                placeholder="https://shopee.co.id/namatoko (opsional)"
              >
            </div>

            <div class="col-md-6 mb-3">
              <label for="bukalapak" class="form-label">Link Bukalapak</label>
              <input
                type="url"
                class="form-control"
                id="bukalapak"
                v-model="formData.vendor_bukalapak"
                placeholder="https://bukalapak.com/namatoko (opsional)"
              >
            </div>

            <div class="col-md-6 mb-3">
              <label for="website" class="form-label">Website</label>
              <input
                type="url"
                class="form-control"
                id="website"
                v-model="formData.vendor_website"
                placeholder="https://website-toko.com (opsional)"
              >
            </div>
          </div>

          <!-- Additional Information -->
          <div class="row mb-4">
            <div class="col-12">
              <h5 class="text-success mb-3">
                <i class="bi bi-info-square me-2"></i>
                Informasi Tambahan
              </h5>
            </div>

            <div class="col-md-6 mb-3">
              <label for="productType" class="form-label">Tipe Produk</label>
              <select
                class="form-select"
                id="productType"
                v-model="formData.product_type"
              >
                <option value="">Pilih tipe produk</option>
                <option value="physical">Produk Fisik</option>
                <option value="digital">Produk Digital</option>
                <option value="service">Layanan</option>
                <option value="bundle">Paket Bundle</option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="weight" class="form-label">Berat/Volume</label>
              <input
                type="text"
                class="form-control"
                id="weight"
                v-model="formData.weight_volume"
                placeholder="Contoh: 5kg, 100L, dll"
              >
            </div>

            <div class="col-12 mb-3">
              <label for="additionalInfo" class="form-label">Informasi Tambahan</label>
              <textarea
                class="form-control"
                id="additionalInfo"
                rows="3"
                v-model="formData.additional_info"
                placeholder="Informasi tambahan seperti garansi, layanan purna jual, tips penggunaan, dll..."
              ></textarea>
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
                  class="btn btn-success px-4"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  <i v-else class="bi bi-send me-1"></i>
                  {{ isSubmitting ? 'Mengirim...' : 'Kirim Produk' }}
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
              <h5 class="alert-heading mb-1">Produk Berhasil Dikirim!</h5>
              <p class="mb-2">Tim kami akan meninjau produk Anda dalam 1-2 hari kerja dan menghubungi melalui WhatsApp yang tercantum.</p>
              <small class="text-muted d-block">
                <strong>ID Produk:</strong> {{ submittedRequestId }}<br>
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
              <h5 class="alert-heading mb-1">Gagal Mengirim Produk</h5>
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
  description: '',
  category: '',
  features_text: '',
  price_range: '',
  availability: 'in-stock',
  shipping_areas: [],
  vendor_name: '',
  vendor_location: '',
  vendor_whatsapp: '',
  vendor_instagram: '',
  vendor_tokopedia: '',
  vendor_shopee: '',
  vendor_bukalapak: '',
  vendor_website: '',
  product_type: '',
  weight_volume: '',
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

// Validation rules
const validateForm = () => {
  const newErrors = {}

  // Required fields
  if (!formData.name.trim()) {
    newErrors.name = 'Nama produk wajib diisi'
  } else if (formData.name.trim().length < 5) {
    newErrors.name = 'Nama produk minimal 5 karakter'
  }

  if (!formData.category.trim()) {
    newErrors.category = 'Kategori produk wajib dipilih'
  }

  if (!formData.description.trim()) {
    newErrors.description = 'Deskripsi produk wajib diisi'
  } else if (formData.description.trim().length < 30) {
    newErrors.description = 'Deskripsi produk minimal 30 karakter'
  }

  if (!formData.price_range.trim()) {
    newErrors.price_range = 'Kisaran harga wajib dipilih'
  }

  if (!formData.vendor_name.trim()) {
    newErrors.vendor_name = 'Nama toko/vendor wajib diisi'
  } else if (formData.vendor_name.trim().length < 3) {
    newErrors.vendor_name = 'Nama toko/vendor minimal 3 karakter'
  }

  if (!formData.vendor_whatsapp.trim()) {
    newErrors.vendor_whatsapp = 'WhatsApp vendor wajib diisi'
  } else if (!/^(\+62|62|0)[\d\s-]{8,13}$/.test(formData.vendor_whatsapp.replace(/\s/g, ''))) {
    newErrors.vendor_whatsapp = 'Format nomor WhatsApp tidak valid (contoh: +6281234567890)'
  }

  // URL validations (optional but must be valid if provided)
  const urlFields = ['vendor_tokopedia', 'vendor_shopee', 'vendor_bukalapak', 'vendor_website']
  urlFields.forEach(field => {
    if (formData[field] && !/^https?:\/\/.+/.test(formData[field])) {
      newErrors[field] = 'URL harus dimulai dengan http:// atau https://'
    }
  })

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
    // Prepare minimal submission data - only core fields to prevent schema errors
    const submissionData = {
      // Essential product information
      name: formData.name || '',
      description: formData.description || '',
      category: formData.category || 'equipment',
      
      // Vendor information (minimal)
      vendor_name: formData.vendor_name || '',
      vendor_whatsapp: formData.vendor_whatsapp || '',
      
      // Optional vendor contact fields
      vendor_instagram: formData.vendor_instagram || null,
      vendor_tokopedia: formData.vendor_tokopedia || null,
      vendor_shopee: formData.vendor_shopee || null,
      vendor_bukalapak: formData.vendor_bukalapak || null,
      vendor_website: formData.vendor_website || null,
      
      // Simple price range if provided
      price_range: formData.price_range || 'contact'
    }

    // Only add pricing fields if they exist
    if (formData.price_min) {
      submissionData.price_min = parseFloat(formData.price_min)
    }
    if (formData.price_max) {
      submissionData.price_max = parseFloat(formData.price_max)
    }
    
    // Only add shipping areas if provided
    if (formData.shipping_areas && Array.isArray(formData.shipping_areas)) {
      submissionData.shipping_areas = formData.shipping_areas
    }

    const result = await dataService.submitProductRequest(submissionData)
    
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
    description: '',
    category: '',
    features_text: '',
    price_range: '',
    availability: 'in-stock',
    shipping_areas: [],
    vendor_name: '',
    vendor_location: '',
    vendor_whatsapp: '',
    vendor_instagram: '',
    vendor_tokopedia: '',
    vendor_shopee: '',
    vendor_bukalapak: '',
    vendor_website: '',
    product_type: '',
    weight_volume: '',
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

.text-success {
  color: #198754 !important;
}

.bg-success {
  background-color: #198754 !important;
}

.btn-success {
  background-color: #198754;
  border-color: #198754;
}

.btn-success:hover {
  background-color: #157347;
  border-color: #146c43;
}

.form-text {
  font-size: 0.8rem;
  color: #6c757d;
}

.invalid-feedback {
  font-size: 0.8rem;
}
</style>
