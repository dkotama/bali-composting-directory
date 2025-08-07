/**
 * Form submission service
 * Handles form submissions for different backends and services
 */

/**
 * Submit form data to external service (EmailJS, Formspree, etc.)
 * For Cloudflare Pages deployment
 */
export async function submitFormData(formName, data, options = {}) {
  const {
    method = 'POST',
    endpoint = null,
    useEmailJS = false,
    useFormspree = false
  } = options

  try {
    if (useEmailJS) {
      return await submitToEmailJS(formName, data)
    }
    
    if (useFormspree) {
      return await submitToFormspree(formName, data)
    }
    
    // Custom endpoint submission
    if (endpoint) {
      return await submitToCustomEndpoint(endpoint, data, method)
    }
    
    // Default: Log to console for development
    console.log(`Form submission: ${formName}`, data)
    return { success: true, message: 'Form submitted successfully (development mode)' }
    
  } catch (error) {
    console.error('Form submission failed:', error)
    throw error
  }
}

/**
 * Submit form using EmailJS (requires EmailJS service setup)
 */
async function submitToEmailJS(templateId, data) {
  // This would require EmailJS configuration
  // emailjs.send(SERVICE_ID, TEMPLATE_ID, data)
  throw new Error('EmailJS not configured')
}

/**
 * Submit form using Formspree (requires Formspree endpoint)
 */
async function submitToFormspree(formId, data) {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error('Formspree submission failed')
  }
  
  return await response.json()
}

/**
 * Submit to custom endpoint
 */
async function submitToCustomEndpoint(endpoint, data, method = 'POST') {
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return await response.json()
}

/**
 * Format company registration data for submission
 */
export function formatCompanyRegistration(formData, regions) {
  const selectedKabupaten = regions.kabupaten.find(k => k.id === formData.selectedKabupaten)
  const selectedKecamatan = regions.kecamatan
    .filter(k => formData.serviceAreas.includes(k.id))
    .map(k => k.name)

  return {
    form_name: 'company_registration',
    company_name: formData.name,
    description: formData.description,
    established: formData.established,
    kabupaten: selectedKabupaten?.name || '',
    service_areas: selectedKecamatan.join(', '),
    pickup_frequency: formData.pickupFrequency.join(', '),
    waste_types: formData.wasteTypes.join(', '),
    pricing_tier: formData.pricingTier,
    capacity: formData.capacity,
    whatsapp: formData.whatsapp,
    instagram: formData.instagram,
    email: formData.email,
    phone: formData.phone,
    availability: formData.availability,
    submission_date: new Date().toISOString(),
    submission_source: 'bali_composter_directory'
  }
}

/**
 * Validate Indonesian phone number format
 */
export function validateWhatsAppNumber(phone) {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Check if it starts with 62 (Indonesia country code) or 08
  if (cleaned.startsWith('62')) {
    return cleaned.length >= 10 && cleaned.length <= 15
  }
  
  if (cleaned.startsWith('08')) {
    return cleaned.length >= 10 && cleaned.length <= 13
  }
  
  return false
}

/**
 * Format Indonesian phone number for WhatsApp
 */
export function formatWhatsAppNumber(phone) {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('08')) {
    return '62' + cleaned.substring(1)
  }
  
  if (cleaned.startsWith('62')) {
    return cleaned
  }
  
  // Assume it's Indonesian number without prefix
  return '62' + cleaned
}
