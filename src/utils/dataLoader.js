/**
 * Data loading utilities for the Bali Composting Platform
 * Handles loading and caching of JSON data files
 */

// Cache for loaded data
const dataCache = new Map()

/**
 * Generic data loader with caching and error handling
 * @param {string} endpoint - The data endpoint (e.g., '/data/regions.json')
 * @param {boolean} useCache - Whether to use cached data
 * @returns {Promise<Object>} - Loaded data object
 */
async function loadData(endpoint, useCache = true) {
  try {
    // Check cache first
    if (useCache && dataCache.has(endpoint)) {
      return dataCache.get(endpoint)
    }

    // Fetch data
    const response = await fetch(endpoint)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    
    // Cache the data
    if (useCache) {
      dataCache.set(endpoint, data)
    }
    
    return data
  } catch (error) {
    console.error(`Error loading data from ${endpoint}:`, error)
    throw new Error(`Failed to load data from ${endpoint}`)
  }
}

/**
 * Load regions data (Kabupaten and Kecamatan)
 * @param {boolean} useCache - Whether to use cached data
 * @returns {Promise<Object>} - Regions data with kabupaten and kecamatan
 */
export async function loadRegionsData(useCache = true) {
  try {
    const data = await loadData('/data/regions.json', useCache)
    return {
      regions: data,
      kabupaten: data.kabupaten || [],
      kecamatan: data.kabupaten?.flatMap(kab => kab.kecamatan || []) || []
    }
  } catch (error) {
    console.error('Error loading regions data:', error)
    return {
      regions: { kabupaten: [] },
      kabupaten: [],
      kecamatan: []
    }
  }
}

/**
 * Load companies data
 * @param {boolean} useCache - Whether to use cached data
 * @returns {Promise<Object>} - Companies data
 */
export async function loadCompaniesData(useCache = true) {
  try {
    const data = await loadData('/data/companies.json', useCache)
    return {
      companies: data.companies || []
    }
  } catch (error) {
    console.error('Error loading companies data:', error)
    return {
      companies: []
    }
  }
}

/**
 * Load products data
 * @param {boolean} useCache - Whether to use cached data
 * @returns {Promise<Object>} - Products data
 */
export async function loadProductsData(useCache = true) {
  try {
    const data = await loadData('/data/products.json', useCache)
    return {
      products: data.products || []
    }
  } catch (error) {
    console.error('Error loading products data:', error)
    return {
      products: []
    }
  }
}

/**
 * Clear data cache
 * @param {string} endpoint - Optional specific endpoint to clear, or all if not specified
 */
export function clearCache(endpoint = null) {
  if (endpoint) {
    dataCache.delete(endpoint)
  } else {
    dataCache.clear()
  }
}

/**
 * Preload all data for better performance
 * @returns {Promise<Object>} - All loaded data
 */
export async function preloadAllData() {
  try {
    const [regions, companies, products] = await Promise.all([
      loadRegionsData(),
      loadCompaniesData(),
      loadProductsData()
    ])
    
    return {
      regions,
      companies,
      products
    }
  } catch (error) {
    console.error('Error preloading data:', error)
    throw error
  }
}

/**
 * Data validation schemas and helpers
 */
export const validators = {
  /**
   * Validate region ID format
   * @param {string} regionId - Region ID to validate
   * @returns {boolean} - Whether the region ID is valid
   */
  isValidRegionId(regionId) {
    return typeof regionId === 'string' && regionId.includes('-') && regionId.length > 3
  },

  /**
   * Validate company data structure
   * @param {Object} company - Company object to validate
   * @returns {boolean} - Whether the company data is valid
   */
  isValidCompany(company) {
    return (
      company &&
      typeof company.id === 'string' &&
      typeof company.name === 'string' &&
      Array.isArray(company.serviceAreas) &&
      company.services &&
      company.contact
    )
  },

  /**
   * Validate product data structure
   * @param {Object} product - Product object to validate
   * @returns {boolean} - Whether the product data is valid
   */
  isValidProduct(product) {
    return (
      product &&
      typeof product.id === 'string' &&
      typeof product.name === 'string' &&
      typeof product.category === 'string' &&
      product.vendor &&
      product.vendor.contact
    )
  }
}

/**
 * Helper functions for data processing
 */
export const helpers = {
  /**
   * Find a kecamatan by ID
   * @param {Array} kecamatan - Array of kecamatan objects
   * @param {string} kecamatanId - ID to search for
   * @returns {Object|null} - Found kecamatan or null
   */
  findKecamatanById(kecamatan, kecamatanId) {
    return kecamatan.find(kec => kec.id === kecamatanId) || null
  },

  /**
   * Find companies serving a specific area
   * @param {Array} companies - Array of company objects
   * @param {string} areaId - Area ID to search for
   * @returns {Array} - Companies serving the area
   */
  findCompaniesByArea(companies, areaId) {
    return companies.filter(company => 
      company.serviceAreas && company.serviceAreas.includes(areaId)
    )
  },

  /**
   * Filter companies by availability
   * @param {Array} companies - Array of company objects
   * @param {string} availability - Availability status ('accepting', 'waitlist', 'full')
   * @returns {Array} - Filtered companies
   */
  filterCompaniesByAvailability(companies, availability) {
    return companies.filter(company => company.availability === availability)
  },

  /**
   * Filter products by category
   * @param {Array} products - Array of product objects
   * @param {string} category - Product category
   * @returns {Array} - Filtered products
   */
  filterProductsByCategory(products, category) {
    return products.filter(product => product.category === category)
  },

  /**
   * Generate WhatsApp click-to-chat URL
   * @param {string} phoneNumber - Phone number (with or without country code)
   * @param {string} message - Pre-filled message (optional)
   * @returns {string} - WhatsApp URL
   */
  generateWhatsAppUrl(phoneNumber, message = '') {
    // Clean phone number and ensure it starts with country code
    let cleanPhone = phoneNumber.replace(/\D/g, '')
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1)
    } else if (!cleanPhone.startsWith('62')) {
      cleanPhone = '62' + cleanPhone
    }
    
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/${cleanPhone}${message ? `?text=${encodedMessage}` : ''}`
  },

  /**
   * Format currency in Indonesian Rupiah
   * @param {number|string} amount - Amount to format
   * @returns {string} - Formatted currency
   */
  formatCurrency(amount) {
    const numAmount = typeof amount === 'string' ? parseInt(amount) : amount
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numAmount)
  }
}
