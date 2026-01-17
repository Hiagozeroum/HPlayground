import { createInjectionState } from '@vueuse/core'
import { ref, computed } from 'vue'

export interface FormData {
  name: string
  email: string
  age: string
  terms: boolean
}

export interface FormErrors {
  name?: string
  email?: string
  age?: string
  terms?: string
}

/**
 * Composable de contexto de formulário usando createInjectionState
 *
 * Este é um exemplo de como usar createInjectionState para gerenciar
 * estado de formulário em hierarquias de 3+ níveis de componentes.
 *
 * Vantagens:
 * - Type-safe automático
 * - Rastreabilidade (import explícito)
 * - Sem props drilling
 * - SSR-safe
 * - Contexto isolado (não global como Pinia)
 */
export const [useProvideFormContext, useFormContext] = createInjectionState(
  (initialData?: Partial<FormData>) => {
    // Estado do formulário
    const formData = ref<FormData>({
      name: initialData?.name || '',
      email: initialData?.email || '',
      age: initialData?.age || '',
      terms: initialData?.terms || false
    })

    // Erros de validação
    const errors = ref<FormErrors>({})

    // Status
    const isDirty = ref(false)
    const isSubmitting = ref(false)

    // Computed
    const isValid = computed(() => {
      return Object.keys(errors.value).length === 0
    })

    const hasChanges = computed(() => {
      return isDirty.value
    })

    // Métodos de validação
    function validateName(): boolean {
      if (!formData.value.name.trim()) {
        errors.value.name = 'Nome é obrigatório'
        return false
      }
      if (formData.value.name.length < 3) {
        errors.value.name = 'Nome deve ter no mínimo 3 caracteres'
        return false
      }
      delete errors.value.name
      return true
    }

    function validateEmail(): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.value.email.trim()) {
        errors.value.email = 'Email é obrigatório'
        return false
      }
      if (!emailRegex.test(formData.value.email)) {
        errors.value.email = 'Email inválido'
        return false
      }
      delete errors.value.email
      return true
    }

    function validateAge(): boolean {
      const age = parseInt(formData.value.age)
      if (!formData.value.age) {
        errors.value.age = 'Idade é obrigatória'
        return false
      }
      if (isNaN(age) || age < 18 || age > 120) {
        errors.value.age = 'Idade deve estar entre 18 e 120'
        return false
      }
      delete errors.value.age
      return true
    }

    function validateTerms(): boolean {
      if (!formData.value.terms) {
        errors.value.terms = 'Você deve aceitar os termos'
        return false
      }
      delete errors.value.terms
      return true
    }

    function validateAll(): boolean {
      const nameValid = validateName()
      const emailValid = validateEmail()
      const ageValid = validateAge()
      const termsValid = validateTerms()

      return nameValid && emailValid && ageValid && termsValid
    }

    // Métodos de atualização
    function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
      formData.value[field] = value
      isDirty.value = true

      // Validar campo específico
      switch (field) {
        case 'name':
          validateName()
          break
        case 'email':
          validateEmail()
          break
        case 'age':
          validateAge()
          break
        case 'terms':
          validateTerms()
          break
      }
    }

    // Submit
    async function submit(): Promise<boolean> {
      if (!validateAll()) {
        return false
      }

      isSubmitting.value = true

      try {
        // Simula chamada de API
        await new Promise(resolve => setTimeout(resolve, 1500))

        console.log('Formulário enviado:', formData.value)
        return true
      } catch (error) {
        console.error('Erro ao enviar formulário:', error)
        return false
      } finally {
        isSubmitting.value = false
      }
    }

    // Reset
    function reset() {
      formData.value = {
        name: '',
        email: '',
        age: '',
        terms: false
      }
      errors.value = {}
      isDirty.value = false
      isSubmitting.value = false
    }

    return {
      // Estado
      formData,
      errors,
      isDirty,
      isSubmitting,

      // Computed
      isValid,
      hasChanges,

      // Métodos
      updateField,
      validateName,
      validateEmail,
      validateAge,
      validateTerms,
      validateAll,
      submit,
      reset
    }
  }
)
