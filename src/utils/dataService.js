import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase configuration is missing. Please check your environment variables.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Environment detection
export const isDev = import.meta.env.DEV || import.meta.env.VITE_ENVIRONMENT === 'development'
export const isProd = import.meta.env.PROD || import.meta.env.VITE_ENVIRONMENT === 'production'
export const currentEnvironment = isDev ? 'dev' : 'prod'

export class DataService {
  // Load companies with filtering
  async getCompanies(filters = {}) {
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
      console.error('Failed to load companies:', error)
      return []
    }
  }

  // Load single company by ID
  async getCompany(id) {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Failed to load company:', error)
      return null
    }
  }

  // Load products with filtering
  async getProducts(filters = {}) {
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
      console.error('Failed to load products:', error)
      return []
    }
  }

  // Submit company request (available in both dev and prod)
  async submitCompanyRequest(requestData) {
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

  // Submit product request (available in both dev and prod)
  async submitProductRequest(requestData) {
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
