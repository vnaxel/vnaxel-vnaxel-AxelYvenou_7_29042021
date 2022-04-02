import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/trombinoscope',
    name: 'Team',
    component: () => import('../views/Team.vue')
  },
  {
    path: '/timeline',
    name: 'Timeline',
    component: () => import('../views/Timeline')
  },
  {
    path: '/team/:userId',
    name: 'OneUser',
    props: true,
    component: () => import('../views/OneUser')
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
