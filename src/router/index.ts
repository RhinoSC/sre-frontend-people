import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScheduleView from '../views/ScheduleView.vue'
import PrizeView from '../views/PrizeView.vue'
import BidView from '../views/BidView.vue'
import DonationView from '../views/DonationView.vue'
import DonateView from '../views/DonateView.vue'

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
      path: '/donate',
      name: 'donate',
      component: DonateView,
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: ScheduleView,
    },
    {
      path: '/prizes',
      name: 'Prizes',
      component: PrizeView,
    },
    {
      path: '/bids',
      name: 'Bids',
      component: BidView,
    },
    {
      path: '/donations',
      name: 'Donations',
      component: DonationView,
    },
  ]
})

export default router
