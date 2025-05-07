import { createRouter, createWebHistory } from 'vue-router'
import BookVue from '@/components/Book.vue'
import CardVue from '@/components/Card.vue'
import BorrowVue from '@/components/Borrow.vue'
import DAGVue from '@/components/components/DAG.vue'
import UsageInstructions from '@/components/components/UsageInstructions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/DAG'
    },
    {
      path: '/DAG',
      component: DAGVue
    },
    {
      path: '/instructions',
      name: 'UsageInstructions',
      component: UsageInstructions
    }
  ]
})

export default router
