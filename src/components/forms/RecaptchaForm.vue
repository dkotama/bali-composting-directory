<template>
  <div class="recaptcha-form-wrapper">
    <slot 
      :submitWithRecaptcha="submitWithRecaptcha" 
      :isRecaptchaEnabled="isRecaptchaEnabled"
      :submitting="submitting"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { validateFormWithRecaptcha, isRecaptchaEnabled } from '../../utils/recaptcha.js'

// Props
const props = defineProps({
  action: {
    type: String,
    default: 'submit_form'
  },
  onSuccess: {
    type: Function,
    required: true
  },
  onError: {
    type: Function,
    default: (error) => {
      console.error('Form submission error:', error)
      alert('Terjadi kesalahan saat mengirim formulir. Silakan coba lagi.')
    }
  }
})

// Reactive data
const submitting = ref(false)

// Methods
const submitWithRecaptcha = async (formData) => {
  submitting.value = true
  
  await validateFormWithRecaptcha(
    props.action,
    async (recaptchaToken) => {
      try {
        const dataWithToken = {
          ...formData,
          ...(recaptchaToken && { 'g-recaptcha-response': recaptchaToken })
        }
        
        await props.onSuccess(dataWithToken)
      } catch (error) {
        throw error
      }
    },
    (error) => {
      props.onError(error)
    }
  )
  
  submitting.value = false
}
</script>

<style scoped>
/* No additional styles needed - this is a wrapper component */
</style>
