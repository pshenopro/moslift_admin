import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
  },
  {
    path: '/home',
    component: () => import('./pages/Home.vue'),
    children: [
      {
        path: '/mail',
        name: 'mail',
        component: () => import('./pages/mail/Home.vue')
      },
      {
        path: '/mail/:id',
        name: 'mail-id',
        component: () => import('./pages/mail/Id.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('./pages/Profile.vue'),
      },
      {
        path: '/favorite',
        name: 'favorite',
        component: () => import('./pages/Favorite.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    }

    return {
      top: 0,
      behavior: 'smooth'
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const profile = JSON.parse(localStorage.getItem('user'))

  if (!profile?.name) {
    if (to.name !== 'login') {
      next('/login')
    }
  }

  next()
})

// const checkToken = (token: string | null):boolean => {
//   return Boolean(token && token !== 'null' && token !== 'undefined')
// }

export default router
