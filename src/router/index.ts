import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/AppScreen.vue'),
    children: [
      {
        path: 'favorecidos',
        name: 'favorecidos',
        component: () => import('@/views/FavoredView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
