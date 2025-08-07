<template>
  <div class="company-form-page">
    <!-- Hero Section -->
    <section class="hero-section py-5 mb-4" style="background: linear-gradient(135deg, #174735 0%, #2d5a47 100%);">
      <div class="container">
        <div class="row justify-content-center text-center text-white">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4">
              Daftarkan Layanan Komposting Anda
            </h1>
            <p class="lead mb-4">
              Bergabunglah dengan Direktori dan Edukasi Komposting Bali untuk menjangkau lebih banyak 
              pelanggan yang peduli lingkungan di seluruh Bali
            </p>
            <div class="d-flex justify-content-center gap-4 mb-3">
              <div class="d-flex align-items-center">
                <i class="bi bi-check-circle-fill me-2"></i>
                <span>Gratis Selamanya</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-people-fill me-2"></i>
                <span>Jangkauan Lebih Luas</span>
              </div>
              <div class="d-flex align-items-center">
                <i class="bi bi-shield-check-fill me-2"></i>
                <span>Terverifikasi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <div class="container mb-5">
      <div class="row g-4 justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="text-center">
            <div class="feature-icon bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
              <i class="bi bi-search fs-4"></i>
            </div>
            <h5 class="fw-bold">Mudah Ditemukan</h5>
            <p class="text-muted">Pelanggan dapat menemukan layanan Anda berdasarkan lokasi dan kebutuhan spesifik</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="text-center">
            <div class="feature-icon bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
              <i class="bi bi-chat-dots fs-4"></i>
            </div>
            <h5 class="fw-bold">Kontak Langsung</h5>
            <p class="text-muted">Integrasi WhatsApp dan Instagram untuk komunikasi langsung dengan calon pelanggan</p>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="text-center">
            <div class="feature-icon bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
              <i class="bi bi-graph-up fs-4"></i>
            </div>
            <h5 class="fw-bold">Berkembang Bersama</h5>
            <p class="text-muted">Bergabung dengan komunitas penyedia layanan komposting terpercaya di Bali</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-12">
          <CompanySubmissionForm />
        </div>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="container mb-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card border-0 bg-light">
            <div class="card-body p-4">
              <h5 class="text-primary mb-3">
                <i class="bi bi-info-circle me-2"></i>
                Proses Setelah Pendaftaran
              </h5>
              <div class="row g-4">
                <div class="col-md-4">
                  <div class="d-flex align-items-start">
                    <div class="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1">Review</h6>
                      <p class="text-muted mb-0 small">Tim kami akan meninjau informasi yang Anda berikan dalam 1-2 hari kerja</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex align-items-start">
                    <div class="step-number bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1">Verifikasi</h6>
                      <p class="text-muted mb-0 small">Kami akan menghubungi Anda untuk konfirmasi dan verifikasi layanan</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="d-flex align-items-start">
                    <div class="step-number bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h6 class="fw-bold mb-1">Publikasi</h6>
                      <p class="text-muted mb-0 small">Layanan Anda akan tampil di direktori dan dapat ditemukan pelanggan</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <hr class="my-4">
              
              <div class="text-center">
                <h6 class="fw-bold text-primary mb-2">Butuh Bantuan?</h6>
                <p class="text-muted mb-3">
                  Tim kami siap membantu Anda dalam proses pendaftaran
                </p>
                <div class="d-flex justify-content-center gap-3 flex-wrap">
                  <a href="mailto:admin@balikomposting.org" class="btn btn-outline-primary btn-sm">
                    <i class="bi bi-envelope me-1"></i>
                    Email Kami
                  </a>
                  <a href="https://wa.me/6281234567890" class="btn btn-outline-success btn-sm" target="_blank">
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
import CompanySubmissionForm from '../components/forms/CompanySubmissionForm.vue'

// Set page title
onMounted(() => {
  document.title = 'Daftarkan Layanan Komposting - Direktori dan Edukasi Komposting Bali'
})
</script>

<style scoped>
.company-form-page {
  min-height: 100vh;
  background-color: #faf9f5;
}

.hero-section {
  background: linear-gradient(135deg, #174735 0%, #2d5a47 100%);
}

.feature-icon {
  width: 60px;
  height: 60px;
}

.step-number {
  width: 32px;
  height: 32px;
  font-size: 0.875rem;
  font-weight: bold;
}

.bg-primary {
  background-color: #174735 !important;
}

.text-primary {
  color: #174735 !important;
}

.btn-outline-primary {
  color: #174735;
  border-color: #174735;
}

.btn-outline-primary:hover {
  background-color: #174735;
  border-color: #174735;
}

@media (max-width: 768px) {
  .display-4 {
    font-size: 2rem;
  }
  
  .step-number {
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
