/**
 * reCAPTCHA Enterprise utility functions
 * Provides helper functions for implementing reCAPTCHA Enterprise in forms
 */

// Get reCAPTCHA site key from environment variables
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY
const RECAPTCHA_ENABLED = import.meta.env.VITE_ENABLE_RECAPTCHA === 'true'

/**
 * Execute reCAPTCHA challenge for a specific action
 * @param {string} action - The action name (e.g., 'submit_form', 'contact', 'register')
 * @returns {Promise<string>} - Promise that resolves to the reCAPTCHA token
 */
export async function executeRecaptcha(action = 'submit') {
  if (!RECAPTCHA_ENABLED || !RECAPTCHA_SITE_KEY) {
    console.warn('reCAPTCHA is not enabled or site key is missing')
    return null
  }

  try {
    // Wait for reCAPTCHA to be ready
    await new Promise((resolve, reject) => {
      if (typeof grecaptcha === 'undefined') {
        reject(new Error('reCAPTCHA script not loaded'))
        return
      }

      grecaptcha.enterprise.ready(() => {
        resolve()
      })
    })

    // Execute reCAPTCHA
    const token = await grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
      action: action
    })

    return token
  } catch (error) {
    console.error('reCAPTCHA execution failed:', error)
    throw error
  }
}

/**
 * Validate form submission with reCAPTCHA
 * @param {string} action - The action name
 * @param {Function} onSuccess - Callback function to execute on success
 * @param {Function} onError - Callback function to execute on error
 */
export async function validateFormWithRecaptcha(action, onSuccess, onError) {
  try {
    const token = await executeRecaptcha(action)
    
    if (token) {
      // Include token in form submission
      await onSuccess(token)
    } else {
      // reCAPTCHA disabled, proceed without token
      await onSuccess(null)
    }
  } catch (error) {
    console.error('Form validation with reCAPTCHA failed:', error)
    if (onError) {
      onError(error)
    }
  }
}

/**
 * Check if reCAPTCHA is enabled and properly configured
 * @returns {boolean} - True if reCAPTCHA is enabled and configured
 */
export function isRecaptchaEnabled() {
  return RECAPTCHA_ENABLED && !!RECAPTCHA_SITE_KEY && typeof grecaptcha !== 'undefined'
}

/**
 * Get the reCAPTCHA site key (for debugging purposes)
 * @returns {string|null} - The site key if available
 */
export function getRecaptchaSiteKey() {
  return RECAPTCHA_SITE_KEY || null
}
