import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Who',
    component: () => import(/* webpackChunkName: "who" */ '../views/Who.vue')
  },
  {
    path: '/where',
    name: 'Where',
    component: () => import(/* webpackChunkName: "where" */ '../views/Where.vue')
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import(/* webpackChunkName: "overview" */ '../views/Overview.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
