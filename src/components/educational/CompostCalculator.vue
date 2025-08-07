<template>
  <div class="compost-calculator">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="calculator-section">
          <div class="text-center mb-4">
            <h2>
              <i class="fas fa-calculator text-primary-green me-2"></i>
              Kalkulator Kompos
            </h2>
            <p class="text-muted">
              Hitung estimasi waktu dan hasil kompos berdasarkan sampah organik Anda
            </p>
          </div>

          <!-- Input Form -->
          <form @submit.prevent="calculateCompost">
            <div class="row g-3">
              <!-- Waste Amount Input -->
              <div class="col-md-6">
                <label for="wasteAmount" class="form-label fw-bold">
                  <i class="fas fa-weight-hanging me-1"></i>
                  Jumlah Sampah per Minggu (kg)
                </label>
                <input 
                  type="number" 
                  class="form-control" 
                  id="wasteAmount"
                  v-model.number="calculatorForm.wasteAmount"
                  min="0.1"
                  max="100"
                  step="0.1"
                  required
                  placeholder="contoh: 5.5"
                >
                <small class="text-muted">Masukkan berat sampah organik per minggu dalam kilogram</small>
              </div>

              <!-- Composting Method -->
              <div class="col-md-6">
                <label class="form-label fw-bold">
                  <i class="fas fa-cogs me-1"></i>
                  Metode Komposting
                </label>
                <div class="mt-2">
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="method" 
                      id="biopore"
                      value="biopore"
                      v-model="calculatorForm.method"
                    >
                    <label class="form-check-label" for="biopore">
                      <i class="fas fa-seedling me-1 text-success"></i>
                      Biopore (dalam tanah)
                    </label>
                  </div>
                  <div class="form-check">
                    <input 
                      class="form-check-input" 
                      type="radio" 
                      name="method" 
                      id="bin"
                      value="bin"
                      v-model="calculatorForm.method"
                    >
                    <label class="form-check-label" for="bin">
                      <i class="fas fa-box me-1 text-primary"></i>
                      Komposter Bin (wadah)
                    </label>
                  </div>
                </div>
              </div>

              <!-- Climate Condition -->
              <div class="col-md-6">
                <label for="climate" class="form-label fw-bold">
                  <i class="fas fa-cloud-sun me-1"></i>
                  Kondisi Iklim Saat Ini
                </label>
                <select class="form-select" id="climate" v-model="calculatorForm.climate">
                  <option value="dry">Musim Kemarau (April - September)</option>
                  <option value="wet">Musim Hujan (Oktober - Maret)</option>
                </select>
              </div>

              <!-- Maintenance Level -->
              <div class="col-md-6">
                <label for="maintenance" class="form-label fw-bold">
                  <i class="fas fa-hand-holding-heart me-1"></i>
                  Tingkat Perawatan
                </label>
                <select class="form-select" id="maintenance" v-model="calculatorForm.maintenance">
                  <option value="basic">Dasar (jarang diaduk/disiram)</option>
                  <option value="regular">Rutin (seminggu sekali)</option>
                  <option value="intensive">Intensif (hampir setiap hari)</option>
                </select>
              </div>

              <!-- Submit Button -->
              <div class="col-12 text-center mt-4">
                <button type="submit" class="btn btn-primary btn-lg">
                  <i class="fas fa-calculator me-2"></i>
                  Hitung Kompos
                </button>
              </div>
            </div>
          </form>

          <!-- Results -->
          <div v-if="results.calculated" class="calculator-result mt-5">
            <h3 class="text-primary-green mb-4">
              <i class="fas fa-chart-line me-2"></i>
              Hasil Perhitungan
            </h3>

            <div class="row g-4">
              <!-- Timeline -->
              <div class="col-md-6">
                <div class="result-card">
                  <div class="result-icon">
                    <i class="fas fa-clock"></i>
                  </div>
                  <h5>Waktu Kompos Matang</h5>
                  <p class="result-value">{{ results.timelineWeeks }} minggu</p>
                  <small class="text-muted">({{ results.timelineMonths }} bulan)</small>
                </div>
              </div>

              <!-- Yield -->
              <div class="col-md-6">
                <div class="result-card">
                  <div class="result-icon">
                    <i class="fas fa-weight"></i>
                  </div>
                  <h5>Hasil Kompos</h5>
                  <p class="result-value">{{ results.yieldAmount }} kg</p>
                  <small class="text-muted">per batch kompos</small>
                </div>
              </div>

              <!-- Monthly Yield -->
              <div class="col-md-6">
                <div class="result-card">
                  <div class="result-icon">
                    <i class="fas fa-calendar-alt"></i>
                  </div>
                  <h5>Hasil per Bulan</h5>
                  <p class="result-value">{{ results.monthlyYield }} kg</p>
                  <small class="text-muted">setelah produksi stabil</small>
                </div>
              </div>

              <!-- Cost Savings -->
              <div class="col-md-6">
                <div class="result-card">
                  <div class="result-icon">
                    <i class="fas fa-coins"></i>
                  </div>
                  <h5>Hemat Pupuk</h5>
                  <p class="result-value">Rp {{ formatCurrency(results.savingsPerMonth) }}</p>
                  <small class="text-muted">per bulan</small>
                </div>
              </div>
            </div>

            <!-- Recommendations -->
            <div class="recommendations mt-4">
              <h5 class="text-primary-green mb-3">
                <i class="fas fa-lightbulb me-2"></i>
                Rekomendasi untuk Anda
              </h5>
              <div class="alert alert-info">
                <ul class="mb-0">
                  <li v-for="recommendation in results.recommendations" :key="recommendation">
                    {{ recommendation }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-buttons text-center mt-4">
              <button class="btn btn-outline-primary me-3" @click="printResults">
                <i class="fas fa-print me-2"></i>
                Cetak Hasil
              </button>
              <button class="btn btn-success" @click="$emit('navigate', 'products')">
                <i class="fas fa-shopping-cart me-2"></i>
                Beli Perlengkapan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Emits
defineEmits(['navigate'])

// Reactive data
const calculatorForm = reactive({
  wasteAmount: 5,
  method: 'bin',
  climate: 'dry',
  maintenance: 'regular'
})

const results = reactive({
  calculated: false,
  timelineWeeks: 0,
  timelineMonths: 0,
  yieldAmount: 0,
  monthlyYield: 0,
  savingsPerMonth: 0,
  recommendations: []
})

// Methods
const calculateCompost = () => {
  // Calculate timeline based on method, climate, and maintenance
  let baseTimelineWeeks = 0
  let yieldRatio = 0

  // Base timeline and yield by method
  if (calculatorForm.method === 'biopore') {
    baseTimelineWeeks = 12 // 3 months
    yieldRatio = 0.3 // 30% of input becomes compost
  } else {
    baseTimelineWeeks = 8 // 2 months
    yieldRatio = 0.4 // 40% of input becomes compost
  }

  // Adjust for climate
  let climateMultiplier = 1
  if (calculatorForm.climate === 'dry') {
    climateMultiplier = 1.2 // Takes longer in dry season
  } else {
    climateMultiplier = 0.9 // Faster in wet season
  }

  // Adjust for maintenance
  let maintenanceMultiplier = 1
  switch (calculatorForm.maintenance) {
    case 'basic':
      maintenanceMultiplier = 1.3
      break
    case 'regular':
      maintenanceMultiplier = 1
      break
    case 'intensive':
      maintenanceMultiplier = 0.8
      break
  }

  // Calculate results
  const finalTimelineWeeks = Math.round(baseTimelineWeeks * climateMultiplier * maintenanceMultiplier)
  const finalTimelineMonths = Math.round(finalTimelineWeeks / 4.33 * 10) / 10

  const yieldAmount = Math.round(calculatorForm.wasteAmount * yieldRatio * 10) / 10
  const monthlyYield = Math.round(calculatorForm.wasteAmount * 4.33 * yieldRatio * 10) / 10
  const savingsPerMonth = Math.round(monthlyYield * 15000) // Assuming Rp 15,000 per kg fertilizer

  // Generate recommendations
  const recommendations = generateRecommendations()

  // Update results
  results.calculated = true
  results.timelineWeeks = finalTimelineWeeks
  results.timelineMonths = finalTimelineMonths
  results.yieldAmount = yieldAmount
  results.monthlyYield = monthlyYield
  results.savingsPerMonth = savingsPerMonth
  results.recommendations = recommendations
}

const generateRecommendations = () => {
  const recs = []

  // Based on method
  if (calculatorForm.method === 'biopore') {
    recs.push('Pastikan lokasi biopore tidak tergenang air')
    recs.push('Potong sampah menjadi ukuran kecil untuk mempercepat proses')
  } else {
    recs.push('Aduk kompos setiap 2 minggu untuk aerasi yang baik')
    recs.push('Jaga kelembaban kompos sekitar 40-60%')
  }

  // Based on climate
  if (calculatorForm.climate === 'dry') {
    recs.push('Siram kompos lebih sering selama musim kemarau')
    recs.push('Tutup komposter untuk mengurangi penguapan')
  } else {
    recs.push('Pastikan drainase baik untuk mencegah kompos terlalu basah')
    recs.push('Tambahkan bahan kering seperti daun atau sekam')
  }

  // Based on maintenance
  if (calculatorForm.maintenance === 'basic') {
    recs.push('Pertimbangkan menambah frekuensi perawatan untuk hasil lebih cepat')
  } else if (calculatorForm.maintenance === 'intensive') {
    recs.push('Perawatan intensif Anda akan menghasilkan kompos berkualitas tinggi')
  }

  // Based on waste amount
  if (calculatorForm.wasteAmount > 10) {
    recs.push('Jumlah sampah cukup besar, pertimbangkan membuat beberapa komposter')
  }

  return recs
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID').format(amount)
}

const printResults = () => {
  window.print()
}
</script>

<style scoped>
.calculator-section {
  background-color: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.calculator-result {
  background-color: var(--background-cream);
  border-radius: 15px;
  padding: 2rem;
  border-left: 5px solid var(--primary-green);
}

.result-card {
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: 100%;
}

.result-icon {
  font-size: 2rem;
  color: var(--primary-green);
  margin-bottom: 1rem;
}

.result-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-green);
  margin: 0.5rem 0;
}

.recommendations ul {
  padding-left: 1.5rem;
}

.recommendations li {
  margin-bottom: 0.5rem;
}

.action-buttons {
  border-top: 1px solid #dee2e6;
  padding-top: 1.5rem;
}

.form-check {
  margin-bottom: 0.5rem;
}

.form-check-label {
  cursor: pointer;
}

@media (max-width: 768px) {
  .calculator-section {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  .calculator-result {
    padding: 1.5rem;
  }
  
  .result-card {
    margin-bottom: 1rem;
    padding: 1rem;
  }
  
  .result-value {
    font-size: 1.5rem;
  }
}

/* Print styles */
@media print {
  .action-buttons {
    display: none !important;
  }
  
  .calculator-section {
    box-shadow: none;
    border: 1px solid #ccc;
  }
}
</style>
