// Importa funciones y objetos necesarios de vue-router.
import { createRouter, createWebHistory } from 'vue-router'

// Importa componentes y API necesarios.
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'
import CuentasEspejoLayout from '../views/cuentas-espejo/CuentasEspejoLayout.vue'
import AuthAPI from '../api/AuthAPI'

// Crea un nuevo enrutador Vue.
const router = createRouter({
  // Configura el modo de historial basado en la ruta de la aplicación.
  history: createWebHistory(import.meta.env.BASE_URL),
  // Define las rutas de la aplicación.
  routes: [
    // Ruta principal ("/") con el componente HomeView asociado.
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // Ruta para la administración ("/admin") con un layout y un componente de vista de citas.
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAdmin: true }, // Configuración meta para verificar permisos de administrador.
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('../views/admin/AppointmentsView.vue'),
        }
      ]
    },
    {
      path: '/cuentas-espejo',
      name: 'cuentas-espejo',
      component: CuentasEspejoLayout,
      meta: {requiresAuth: true}
    },
    // Ruta para las reservaciones ("/reservaciones") con un layout y subrutas para diferentes vistas.
    {
      path: '/reservaciones',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: { requiresAuth: true }, // Configuración meta para verificar autenticación.
      children: [
        // Subruta para las citas del usuario ("/reservaciones").
        {
          path: '',
          name: 'my-appointments',
          component: () => import('../views/appointments/MyAppointmentsView.vue'),
        },
        // Subruta para crear una nueva cita ("/reservaciones/nueva").
        {
          path: 'nueva',
          component: () => import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
            // Subrutas para las etapas del proceso de creación de cita.
            {
                path: '',
                name: 'new-appointment',
                component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
                path: 'detalles',
                name: 'appointment-details',
                component: () => import('../views/appointments/AppointmentView.vue'),
            },
          ]
        },
        // Subruta para editar una cita existente ("/reservaciones/:id/editar").
        {
          path: ':id/editar',
          component: () => import('../views/appointments/EditAppointmentLayout.vue'),
          children: [
            // Subrutas para las etapas del proceso de edición de cita.
            {
                path: '',
                name: 'edit-appointment',
                component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
                path: 'detalles',
                name: 'edit-appointment-details',
                component: () => import('../views/appointments/AppointmentView.vue'),
            },
          ]
        }
      ]
    },
    // Rutas para la autenticación ("/auth") con diferentes vistas y subrutas.
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'registro',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue')
        },
        {
          path: 'confirmar-cuenta/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue')
        },
        {
          path: 'olvide-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'olvide-password/:token',
          name: 'new-password',
          component: () => import('../views/auth/NewPasswordView.vue')
        },
      ]
    }
  ]
})

// Hook de navegación que se ejecuta antes de cada cambio de ruta.
router.beforeEach( async (to, from, next) => {
 
    // Verifica si la ruta requiere autenticación.
    const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
    if(requiresAuth) {
      try {
        // Realiza una llamada a la API de autenticación para verificar el estado del usuario.
        const { data } = await AuthAPI.auth()
        // Si el usuario es un administrador, redirige a la página de administrador.
        if(data.admin) {
          next({name: 'admin'})
        } else {
          next() // Continúa con la navegación.
        }
      } catch (error) {
        next({name: 'login'}) // Redirige a la página de inicio de sesión en caso de error.
      }
    } else {
      next() // Continúa con la navegación si no se requiere autenticación.
    }
})

// Otro hook de navegación para verificar si la ruta requiere permisos de administrador.
router.beforeEach( async (to, from, next) => {
   
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin)
  if(requiresAdmin) {
    try {
      // Realiza una llamada a la API para verificar si el usuario tiene permisos de administrador.
      await AuthAPI.admin()
      next() // Continúa con la navegación si el usuario tiene permisos de administrador.
    } catch (error) {
      next({name: 'login'}) // Redirige a la página de inicio de sesión si no tiene permisos de administrador.
    }
  } else {
    next() // Continúa con la navegación si no se requieren permisos de administrador.
  }
})

// Exporta el enrutador configurado.
export default router
