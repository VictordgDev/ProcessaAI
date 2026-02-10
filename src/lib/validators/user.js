export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function validatePassword(password) {
  return password && password.length >= 6
}

export function validateUserData(data) {
  const errors = {}

  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres'
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Email inválido'
  }

  if (!validatePassword(data.password)) {
    errors.password = 'Senha deve ter pelo menos 6 caracteres'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
