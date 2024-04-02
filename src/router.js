import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    component: () => import('./pages/Login.vue'),
  },
  {
    path: '/home',
    component: () => import('./pages/Home.vue'),
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

router.beforeEach(to => {
  return true
})

// const checkToken = (token: string | null):boolean => {
//   return Boolean(token && token !== 'null' && token !== 'undefined')
// }

export default router
