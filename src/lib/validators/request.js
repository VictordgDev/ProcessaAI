export function validateRequest(data) {
  const errors = {}

  if (!data.title || data.title.trim().length < 5) {
    errors.title = 'Título deve ter pelo menos 5 caracteres'
  }

  if (!data.description || data.description.trim().length < 20) {
    errors.description = 'Descrição deve ter pelo menos 20 caracteres'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
