import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      name: 'layoutContainer',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      redirect: '/userList',
      children: [
        {
          path: '/userList',
          name: 'userList',
          component: () => import('@/views/user/UserList.vue')
        },
        {
          path: '/orderList',
          name: 'orderList',
          component: () => import('@/views/order/OrderList.vue')
        }
      ]
    }
  ]
})

export default router
