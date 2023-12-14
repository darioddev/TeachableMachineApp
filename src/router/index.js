import { createRouter, createWebHistory } from 'vue-router'
import loginComponent from '@/views/loginView.vue'
import registroComponent from '@/views/registerView.vue'
import homeComponent from '@/views/homeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: loginComponent,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: loginComponent,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/registro',
      name: 'registro',
      component: registroComponent,
      meta: {
        title: 'Registro'
      }
    },
    {
      path: '/home',
      name: 'inicio',
      component: homeComponent,
      meta: {
        title: 'Inicio'
      },
      props: true
    }
  ]
})

// Actualiza el título del documento antes de cada cambio de ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Crud App'
  const noAcces = ['login', 'registro']
  if (!noAcces.includes(to.name) && !localStorage.getItem('user'))
    next({ name: 'login' })
  else if (noAcces.includes(to.name) && localStorage.getItem('user'))
    next({ name: 'inicio' })
  else next()
})

export default router
