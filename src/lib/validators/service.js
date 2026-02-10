export function validateService(data) {
  const errors = {}

  if (!data.title || data.title.trim().length < 3) {
    errors.title = 'Título deve ter pelo menos 3 caracteres'
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Descrição deve ter pelo menos 10 caracteres'
  }

  if (!data.category) {
    errors.category = 'Categoria é obrigatória'
  }

  if (data.price && isNaN(parseFloat(data.price))) {
    errors.price = 'Preço inválido'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
