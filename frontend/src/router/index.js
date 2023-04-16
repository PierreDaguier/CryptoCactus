// Composables
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import dotenv from 'dotenv';

const routes = [
  {
    path: '/',
    // component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: App,
      },
    ],
  },
]
dotenv.config();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
