<template>
  <div id="app">
    <!-- Navigation Header -->
    <nav class="navbar navbar-expand-lg navbar-dark">
      <div class="container">
        <a class="navbar-brand" href="#">
          🌱 Platform Komposting Bali
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" href="#beranda" @click="currentPage = 'home'">Beranda</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#panduan" @click="currentPage = 'howto'">Panduan</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#daftar-perusahaan" @click="currentPage = 'company-form'">Daftar Perusahaan</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main>
      <!-- Homepage -->
      <HomePage v-if="currentPage === 'home'" @navigate="handleNavigation" />
      
      <!-- How-To Page -->
      <HowToPage v-if="currentPage === 'howto'" @navigate="handleNavigation" />
      
      <!-- Company Form Page -->
      <CompanyFormPage v-if="currentPage === 'company-form'" @navigate="handleNavigation" />
    </main>

    <!-- Footer -->
    <footer class="bg-primary-green text-white py-4 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5>Platform Komposting Bali</h5>
            <p class="mb-0">Menghubungkan warga Bali dengan layanan komposting berkelanjutan</p>
          </div>
          <div class="col-md-6 text-md-end">
            <p class="mb-0">
              <small>© 2025 Platform Komposting Bali. Dibuat untuk lingkungan yang lebih bersih.</small>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomePage from './pages/HomePage.vue'
import HowToPage from './pages/HowToPage.vue'
import CompanyFormPage from './pages/CompanyFormPage.vue'

// Reactive data
const currentPage = ref('home')

// Navigation handler
const handleNavigation = (page) => {
  console.log('Navigating to:', page)
  
  // Map navigation requests to available pages
  const pageMap = {
    'home': 'home',
    'howto': 'howto',
    'company-form': 'company-form',
    'product-form': 'company-form', // Redirect to company form for now
    'products': 'howto', // Redirect to howto page with products tab
    'calculator': 'howto', // Redirect to howto page with calculator tab
  }
  
  const targetPage = pageMap[page] || 'home'
  currentPage.value = targetPage
  
  // Handle special tab activations
  setTimeout(() => {
    if (page === 'products') {
      const productsTab = document.getElementById('products-tab')
      if (productsTab) {
        productsTab.click()
      }
    } else if (page === 'calculator') {
      const calculatorTab = document.getElementById('calculator-tab')
      if (calculatorTab) {
        calculatorTab.click()
      }
    }
  }, 100)
}
</script>

<style>
/* Additional app-specific styles can go here */
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
