import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import PrizeView from '../views/PrizeView.vue'
import BidView from '../views/BidView.vue'
import DonationView from '../views/DonationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: ScheduleView,
      meta: { requiresAuth: true }
    },
    {
      path: '/prizes',
      name: 'Prizes',
      component: PrizeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/bids',
      name: 'Bids',
      component: BidView,
      meta: { requiresAuth: true }
    },
    {
      path: '/donations',
      name: 'Donations',
      component: DonationView,
      meta: { requiresAuth: true }
    },
  ]
})

export default router
