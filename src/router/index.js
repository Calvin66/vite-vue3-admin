import {
  createRouter,
  createWebHashHistory
} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import(
          /* webpackChunkName: "home" */ '../views/Home/index.vue'
        )
    },
    {
      path: '/layout',
      name: 'home',
      component: () =>
        import(
          /* webpackChunkName: "home" */ '@/layout/index.vue'
        )
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "login" */ '../views/Login/index.vue'
        )
    }
  ]
})
export default router
