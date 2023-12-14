import { showConfirmationDialog } from './alert-function.js'

export const logout = async () => {
  const confirmed = await showConfirmationDialog(
    'Cerrar sesión',
    '¿Está seguro que desea cerrar sesión?',
    'Si',
    'Cancelar'
  )
  if (confirmed) {
    localStorage.removeItem('user')
    window.location.href = '/'
  }
}

export const handleSubmit = async (event, callback) => {
  const user = event.target.user.value
  const password = event.target.password.value
  const action = event.target.dataset.action

  const classAlea = `class ${Math.ceil(Math.random() * 3)}`

  if (action === 'login') {
    await callback(user, password, classAlea)
  } else {
      const direccion = {
          calle: event.target.calle.value,
          numero: event.target.numero.value,
          cp: event.target.cp.value,
          provincia: event.target.provincia.value || '',
          ciudad: event.target.ciudad.value || '',
          pais : event.target.pais.value
      }
      await callback(user,password,classAlea,direccion)

  }
}
