<template>
  <div class="product-form-page">
    <!-- Hero Section -->
    <section class="hero-section py-5 mb-4" style="background: linear-gradient(135deg, #198754 0%, #20a960 100%);">
      <div class="container">
        <div class="row justify-content-center text-center text-white">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4">
              Tambahkan Produk Komposting
            </h1>
            <p class="lead mb-4">
              Bagikan produk komposting terbaik Anda dengan komunitas pecinta lingkungan di Bali.
              Mulai dari peralatan, bahan, hingga layanan komposting.
            </p>
            <div class="d-flex justify-content-center gap-4 mb-3">
              <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-2"></i>
                <span>Gratis Posting</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-people-fill me-2"></i>
                <span>Reach Pelanggan Luas</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-cart-check-fill me-2"></i>
                <span>Boost Penjualan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Categories Info -->
    <div class="container mb-5">
      <div class="row g-4">
        <div class="col-md-6 col-lg-3">
          <div class="text-center">
            <div class="category-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
              <i class="bi bi-tools fs-4"></i>
            </div>
            <h6 class="fw-bold">Peralatan</h6>
            <p class="text-muted small">Komposter bin, ember bokashi, biopore kit</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="text-center">
            <div class="category-icon bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
              <i class="bi bi-droplet fs-4"></i>
            </div>
            <h6 class="fw-bold">Bahan/Pupuk</h6>
            <p class="text-muted small">Aktivator kompos, sekam bakar, cacing tanah</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="text-center">
            <div class="category-icon bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
              <i class="bi bi-wrench fs-4"></i>
            </div>
            <h6 class="fw-bold">Alat Bantu</h6>
            <p class="text-muted small">Termometer kompos, sarung tangan, pengaduk</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-3">
          <div class="text-center">
            <div class="category-icon bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
              <i class="bi bi-gear fs-4"></i>
            </div>
            <h6 class="fw-bold">Layanan</h6>
            <p class="text-muted small">Konsultasi, instalasi, maintenance</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-12">
          <ProductSubmissionForm />
        </div>
      </div>
    </div>

    <!-- Guidelines & Tips -->
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card border-0 bg-light">
            <div class="card-body p-4">
              <h5 class="text-success mb-4">
                <i class="bi bi-lightbulb me-2"></i>
                Tips Sukses Menjual Produk Komposting
              </h5>
              
              <div class="row g-4">
                <div class="col-md-6">
                  <div class="d-flex align-items-start">
                    <div class="tip-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      <i class="bi bi-camera fs-6"></i>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1">Foto Produk Berkualitas</h6>
                      <p class="text-muted mb-0 small">Gunakan foto produk yang jelas, dengan pencahayaan baik, dan tunjukkan produk dari berbagai sudut.</p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="d-flex align-items-start">
                    <div class="tip-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      <i class="bi bi-chat-text fs-6"></i>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1">Deskripsi Lengkap</h6>
                      <p class="text-muted mb-0 small">Jelaskan manfaat, cara penggunaan, dan spesifikasi produk secara detail dan mudah dipahami.</p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="d-flex align-items-start">
                    <div class="tip-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      <i class="bi bi-tags fs-6"></i>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1">Harga Kompetitif</h6>
                      <p class="text-muted mb-0 small">Tentukan harga yang wajar dan kompetitif. Pertimbangkan kualitas, biaya produksi, dan harga pasaran.</p>
                    </div>
                  </div>
                </div>
                
                <div class="col-md-6">
                  <div class="d-flex align-items-start">
                    <div class="tip-icon bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      <i class="bi bi-truck fs-6"></i>
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1">Pengiriman & Layanan</h6>
                      <p class="text-muted mb-0 small">Tawarkan opsi pengiriman yang fleksibel dan layanan after-sales yang baik untuk kepuasan pelanggan.</p>
                    </div>
                  </div>
                </div>
              </div>

              <hr class="my-4">

              <div class="row">
                <div class="col-md-6">
                  <h6 class="fw-bold text-success mb-2">Produk yang Direkomendasikan:</h6>
                  <ul class="list-unstyled text-muted small">
                    <li><i class="bi bi-check-circle-fill text-success me-2"></i>Produk ramah lingkungan</li>
                    <li><i class="bi bi-check-circle-fill text-success me-2"></i>Berkualitas dan tahan lama</li>
                    <li><i class="bi bi-check-circle-fill text-success me-2"></i>Cocok untuk iklim tropis Bali</li>
                    <li><i class="bi bi-check-circle-fill text-success me-2"></i>Mudah digunakan pemula</li>
                  </ul>
                </div>
                <div class="col-md-6">
                  <h6 class="fw-bold text-success mb-2">Proses Review:</h6>
                  <ul class="list-unstyled text-muted small">
                    <li><i class="bi bi-1-circle text-success me-2"></i>Produk direview tim dalam 1-2 hari</li>
                    <li><i class="bi bi-2-circle text-success me-2"></i>Konfirmasi melalui WhatsApp</li>
                    <li><i class="bi bi-3-circle text-success me-2"></i>Publikasi di marketplace</li>
                    <li><i class="bi bi-4-circle text-success me-2"></i>Mulai terima order pelanggan</li>
                  </ul>
                </div>
              </div>

              <div class="text-center mt-4">
                <h6 class="fw-bold text-success mb-2">Butuh Bantuan?</h6>
                <p class="text-muted mb-3">
                  Tim kami siap membantu Anda mengoptimalkan listing produk
                </p>
                <div class="d-flex justify-content-center gap-3 flex-wrap">
                  <a href="mailto:admin@balikomposting.org" class="btn btn-outline-success btn-sm">
                    <i class="bi bi-envelope me-1"></i>
                    Email Support
                  </a>
                  <a href="https://wa.me/6281234567890" class="btn btn-success btn-sm" target="_blank">
                    <i class="bi bi-whatsapp me-1"></i>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import ProductSubmissionForm from '../components/forms/ProductSubmissionForm.vue'

// Set page title
onMounted(() => {
  document.title = 'Tambahkan Produk Komposting - Direktori dan Edukasi Komposting Bali'
})
</script>

<style scoped>
.product-form-page {
  min-height: 100vh;
  background-color: #faf9f5;
}

.hero-section {
  background: linear-gradient(135deg, #198754 0%, #20a960 100%);
}

.category-icon {
  width: 60px;
  height: 60px;
}

.tip-icon {
  width: 32px;
  height: 32px;
  font-size: 0.875rem;
}

.bg-success {
  background-color: #198754 !important;
}

.text-success {
  color: #198754 !important;
}

.btn-success {
  background-color: #198754;
  border-color: #198754;
}

.btn-success:hover {
  background-color: #157347;
  border-color: #146c43;
}

.btn-outline-success {
  color: #198754;
  border-color: #198754;
}

.btn-outline-success:hover {
  background-color: #198754;
  border-color: #198754;
}

@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem;
  }
  
  .tip-icon {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }
  
  .d-flex.gap-4 {
    gap: 1rem !important;
    flex-direction: column;
    align-items: center;
  }
}
</style>
