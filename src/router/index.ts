import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/AppScreen.vue'),
    children: [
      {
        path: '',
        name: 'favorecidos',
        component: () => import('@/views/ReceiversView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
