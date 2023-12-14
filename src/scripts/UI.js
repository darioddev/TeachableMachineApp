export function initializeUI() {
    try {
    const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toogle = body.querySelector('.toogle'),
      searchBtn = body.querySelector('.search-box'),
      modeSwitch = body.querySelector('.toogle-switch'),
      modeText = body.querySelector('.mode-text')

    const setMode = (mode) => {
      body.classList.toggle('dark', mode === 'Dark mode')
      modeText.innerText = mode
      localStorage.setItem('background', mode)
    }

    modeSwitch.addEventListener('click', () => {
      const currentMode = localStorage.getItem('background')
      const newMode = currentMode === 'Dark mode' ? 'Light mode' : 'Dark mode'
      setMode(newMode)
    })

    document.addEventListener('DOMContentLoaded', () => {
      const storedMode = localStorage.getItem('background')
      if (storedMode) {
        setMode(storedMode)
      }
    })

    toogle.addEventListener('click', () => sidebar.classList.toggle('close'))
    searchBtn.addEventListener('click', () => sidebar.classList.remove('close'))

  } catch (error) {
      console.error(`Error en initializeUI: ${error.message}`)
      console.error(error)
  }
}
