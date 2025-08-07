<template>
  <div class="howto-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4">
              Panduan Komposting di Rumah
            </h1>
            <p class="lead mb-4">
              Pelajari cara mengolah sampah organik menjadi kompos berkualitas 
              dengan mudah dan ramah lingkungan
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content Sections -->
    <div class="container my-5">
      <!-- Navigation Tabs -->
      <div class="row">
        <div class="col-12">
          <ul class="nav nav-tabs nav-pills mb-4" id="howtoTabs" role="tablist">
            <li class="nav-item" role="presentation">
              <button 
                class="nav-link active" 
                id="basics-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#basics" 
                type="button" 
                role="tab"
              >
                <i class="fas fa-seedling me-2"></i>Dasar Komposting
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button 
                class="nav-link" 
                id="calculator-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#calculator" 
                type="button" 
                role="tab"
              >
                <i class="fas fa-calculator me-2"></i>Kalkulator
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button 
                class="nav-link" 
                id="products-tab" 
                data-bs-toggle="tab" 
                data-bs-target="#products" 
                type="button" 
                role="tab"
              >
                <i class="fas fa-shopping-cart me-2"></i>Produk
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tab Content -->
      <div class="tab-content" id="howtoTabsContent">
        
        <!-- Basics Tab -->
        <div class="tab-pane fade show active" id="basics" role="tabpanel">
          <div class="row">
            <div class="col-md-6">
              <div class="card mb-4">
                <div class="card-header bg-primary-green text-white">
                  <h5 class="mb-0">
                    <i class="fas fa-leaf me-2"></i>Komposting dengan Biopore
                  </h5>
                </div>
                <div class="card-body">
                  <p>Biopore adalah lubang di tanah yang membantu penyerapan air dan pembuatan kompos secara alami.</p>
                  <div class="steps">
                    <h6>Langkah-langkah:</h6>
                    <ol class="list-group list-group-numbered">
                      <li class="list-group-item">Buat lubang dengan diameter 10cm, kedalaman 100cm</li>
                      <li class="list-group-item">Masukkan sampah organik ke dalam lubang</li>
                      <li class="list-group-item">Tutup dengan daun atau kompos matang</li>
                      <li class="list-group-item">Siram secukupnya jika musim kering</li>
                      <li class="list-group-item">Kompos siap dalam 2-3 bulan</li>
                    </ol>
                  </div>
                  <div class="mt-3">
                    <small class="text-muted">
                      <i class="fas fa-clock me-1"></i>Waktu: 2-3 bulan | 
                      <i class="fas fa-dollar-sign me-1"></i>Biaya: Rp 200.000 - 300.000
                    </small>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-md-6">
              <div class="card mb-4">
                <div class="card-header bg-primary-green text-white">
                  <h5 class="mb-0">
                    <i class="fas fa-box me-2"></i>Komposter Bin
                  </h5>
                </div>
                <div class="card-body">
                  <p>Komposter bin adalah wadah khusus untuk mengolah sampah organik menjadi kompos.</p>
                  <div class="steps">
                    <h6>Langkah-langkah:</h6>
                    <ol class="list-group list-group-numbered">
                      <li class="list-group-item">Siapkan komposter bin dengan ventilasi yang baik</li>
                      <li class="list-group-item">Masukkan sampah organik yang sudah dipotong kecil</li>
                      <li class="list-group-item">Tambahkan aktivator kompos atau cacing tanah</li>
                      <li class="list-group-item">Aduk setiap 2 minggu sekali</li>
                      <li class="list-group-item">Kompos siap dalam 1-2 bulan</li>
                    </ol>
                  </div>
                  <div class="mt-3">
                    <small class="text-muted">
                      <i class="fas fa-clock me-1"></i>Waktu: 1-2 bulan | 
                      <i class="fas fa-dollar-sign me-1"></i>Biaya: Rp 500.000 - 750.000
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tips Section -->
          <div class="row mt-4">
            <div class="col-12">
              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">
                    <i class="fas fa-lightbulb me-2 text-warning"></i>Tips Komposting di Bali
                  </h5>
                </div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-md-6">
                      <h6 class="text-primary-green">Musim Kemarau (April - September)</h6>
                      <ul>
                        <li>Siram kompos lebih sering untuk menjaga kelembaban</li>
                        <li>Tutup komposter untuk mengurangi penguapan</li>
                        <li>Tambahkan lebih banyak bahan basah (sisa buah, sayur)</li>
                      </ul>
                    </div>
                    <div class="col-md-6">
                      <h6 class="text-primary-green">Musim Hujan (Oktober - Maret)</h6>
                      <ul>
                        <li>Pastikan drainase komposter baik</li>
                        <li>Tambahkan bahan kering (daun, sekam)</li>
                        <li>Lindungi dari hujan berlebihan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Calculator Tab -->
        <div class="tab-pane fade" id="calculator" role="tabpanel">
          <CompostCalculator />
        </div>

        <!-- Products Tab -->
        <div class="tab-pane fade" id="products" role="tabpanel">
          <ProductMarketplace @navigate="$emit('navigate', 'product-form')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import CompostCalculator from '../components/educational/CompostCalculator.vue'
import ProductMarketplace from '../components/educational/ProductMarketplace.vue'

// Emits
defineEmits(['navigate'])

// Methods
onMounted(() => {
  // Initialize Bootstrap tabs if needed
})
</script>

<style scoped>
.howto-page {
  min-height: 100vh;
}

.nav-pills .nav-link {
  border-radius: 25px;
  margin-right: 0.5rem;
  color: var(--primary-green);
  border: 1px solid var(--primary-green);
  background-color: transparent;
}

.nav-pills .nav-link.active {
  background-color: var(--primary-green);
  color: white;
}

.list-group-numbered .list-group-item {
  border: none;
  padding: 0.5rem 0;
  background-color: transparent;
}

.steps ol {
  counter-reset: step-counter;
}

.steps li {
  counter-increment: step-counter;
  padding-left: 1rem;
  position: relative;
  margin-bottom: 0.5rem;
}

.steps li::before {
  content: counter(step-counter);
  position: absolute;
  left: -2rem;
  top: 0.25rem;
  background-color: var(--primary-green);
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .nav-pills .nav-link {
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
    margin-bottom: 0.5rem;
  }
}
</style>
