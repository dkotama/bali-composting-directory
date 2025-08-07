import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

// Debug environment variables (remove in production)
console.log('Environment variables check:', {
  supabaseUrl: supabaseUrl ? 'Set' : 'Missing',
  supabaseKey: supabaseKey ? 'Set' : 'Missing',
  env: import.meta.env.MODE,
  allEnvVars: Object.keys(import.meta.env)
})

// Check if Supabase is properly configured
const isSupabaseConfigured = !!(supabaseUrl && supabaseKey)

let supabase = null
if (isSupabaseConfigured) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
    console.log('Supabase client initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
  }
} else {
  const missingVars = []
  if (!supabaseUrl) missingVars.push('VITE_SUPABASE_PROJECT_URL')
  if (!supabaseKey) missingVars.push('VITE_SUPABASE_API_KEY')
  
  console.warn(`Supabase not configured. Missing variables: ${missingVars.join(', ')}. App will run in JSON-only mode.`)
}

export { supabase, isSupabaseConfigured }

// Environment detection
export const isDev = import.meta.env.DEV || import.meta.env.VITE_ENVIRONMENT === 'development'
export const isProd = import.meta.env.PROD || import.meta.env.VITE_ENVIRONMENT === 'production'
export const currentEnvironment = isDev ? 'dev' : 'prod'

export class DataService {
  // Load companies with filtering
  async getCompanies(filters = {}) {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not available, falling back to JSON data')
      return this.getCompaniesFromJSON(filters)
    }

    try {
      let query = supabase.from('companies').select('*')
      
      if (filters.serviceAreas?.length) {
        query = query.overlaps('service_areas', filters.serviceAreas)
      }
      
      if (filters.availability && filters.availability !== 'all') {
        query = query.eq('availability', filters.availability)
      }
      
      if (filters.pricingTier && filters.pricingTier !== 'all') {
        query = query.eq('pricing_tier', filters.pricingTier)
      }

      if (filters.wasteTypes?.length) {
        query = query.overlaps('waste_types', filters.wasteTypes)
      }

      if (filters.pickupFrequency?.length) {
        query = query.overlaps('pickup_frequency', filters.pickupFrequency)
      }
      
      const { data, error } = await query.order('name')
      
      if (error) {
        console.error('Error loading companies:', error)
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('Failed to load companies from Supabase:', error)
      console.log('Falling back to JSON data')
      return this.getCompaniesFromJSON(filters)
    }
  }

  // Fallback method to load companies from JSON
  async getCompaniesFromJSON(filters = {}) {
    try {
      const response = await fetch('/data/companies.json')
      if (!response.ok) throw new Error('Failed to load companies.json')
      const data = await response.json()
      
      let companies = data.companies || []
      
      // Apply basic filtering
      if (filters.serviceAreas?.length) {
        companies = companies.filter(company => 
          company.service_areas?.some(area => filters.serviceAreas.includes(area))
        )
      }
      
      return companies
    } catch (error) {
      console.error('Failed to load companies from JSON:', error)
      return []
    }
  }

  // Load single company by ID
  async getCompany(id) {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not available, falling back to JSON data')
      return this.getCompanyFromJSON(id)
    }

    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Failed to load company from Supabase:', error)
      return this.getCompanyFromJSON(id)
    }
  }

  // Fallback method to load single company from JSON
  async getCompanyFromJSON(id) {
    try {
      const response = await fetch('/data/companies.json')
      if (!response.ok) throw new Error('Failed to load companies.json')
      const data = await response.json()
      
      const companies = data.companies || []
      return companies.find(company => company.id === id) || null
    } catch (error) {
      console.error('Failed to load company from JSON:', error)
      return null
    }
  }

  // Load products with filtering
  async getProducts(filters = {}) {
    if (!isSupabaseConfigured || !supabase) {
      console.warn('Supabase not available, falling back to JSON data')
      return this.getProductsFromJSON(filters)
    }

    try {
      let query = supabase.from('products').select('*')
      
      if (filters.category && filters.category !== 'all') {
        query = query.eq('category', filters.category)
      }

      if (filters.priceRange && filters.priceRange !== 'all') {
        query = query.eq('price_range', filters.priceRange)
      }
      
      const { data, error } = await query.order('name')
      
      if (error) {
        console.error('Error loading products:', error)
        throw error
      }
      
      return data || []
    } catch (error) {
      console.error('Failed to load products from Supabase:', error)
      return this.getProductsFromJSON(filters)
    }
  }

  // Fallback method to load products from JSON
  async getProductsFromJSON(filters = {}) {
    try {
      const response = await fetch('/data/products.json')
      if (!response.ok) throw new Error('Failed to load products.json')
      const data = await response.json()
      
      let products = data.products || []
      
      // Apply basic filtering
      if (filters.category && filters.category !== 'all') {
        products = products.filter(product => product.category === filters.category)
      }
      
      return products
    } catch (error) {
      console.error('Failed to load products from JSON:', error)
      return []
    }
  }

  // Submit company request (requires Supabase)
  async submitCompanyRequest(requestData) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Form submission requires Supabase configuration. Please contact the administrator.')
    }

    try {
      const submissionData = {
        ...requestData,
        environment: currentEnvironment,
        submitted_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('company_requests')
        .insert(submissionData)
        .select()
        .single()
      
      if (error) {
        console.error('Error submitting company request:', error)
        throw error
      }
      
      console.log(`Company request submitted successfully in ${currentEnvironment}:`, data.id)
      return data
    } catch (error) {
      console.error('Failed to submit company request:', error)
      throw error
    }
  }

  // Submit product request (requires Supabase)
  async submitProductRequest(requestData) {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error('Form submission requires Supabase configuration. Please contact the administrator.')
    }

    try {
      const submissionData = {
        ...requestData,
        environment: currentEnvironment,
        submitted_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('product_requests')
        .insert(submissionData)
        .select()
        .single()
      
      if (error) {
        console.error('Error submitting product request:', error)
        throw error
      }
      
      console.log(`Product request submitted successfully in ${currentEnvironment}:`, data.id)
      return data
    } catch (error) {
      console.error('Failed to submit product request:', error)
      throw error
    }
  }

  // Get request statistics (for admin/monitoring)
  async getRequestStats() {
    if (!isSupabaseConfigured || !supabase) {
      return { companies: { total: 0 }, products: { total: 0 } }
    }

    try {
      const [companyStats, productStats] = await Promise.all([
        supabase
          .from('company_requests')
          .select('status, environment', { count: 'exact' })
          .eq('environment', currentEnvironment),
        supabase
          .from('product_requests')
          .select('status, environment', { count: 'exact' })
          .eq('environment', currentEnvironment)
      ])

      return {
        companies: {
          total: companyStats.count || 0,
          environment: currentEnvironment
        },
        products: {
          total: productStats.count || 0,
          environment: currentEnvironment
        }
      }
    } catch (error) {
      console.error('Failed to load request stats:', error)
      return { companies: { total: 0 }, products: { total: 0 } }
    }
  }

  // Load pending requests (for admin interface)
  async getPendingRequests(type = 'company') {
    if (!isSupabaseConfigured || !supabase) {
      return []
    }

    try {
      const table = type === 'company' ? 'company_requests' : 'product_requests'
      
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('status', 'pending')
        .eq('environment', currentEnvironment)
        .order('submitted_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error(`Failed to load pending ${type} requests:`, error)
      return []
    }
  }
}

export const dataService = new DataService()
