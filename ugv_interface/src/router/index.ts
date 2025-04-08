import { createRouter, createWebHistory } from 'vue-router'
import InterfaceView from '@/views/InterfaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InterfaceView,
    },
  ],
})

export default router
