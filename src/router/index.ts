import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import GamePage from '../views/GamePage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/game'
  },
  {
    path: '/game',
    name: 'Game',
    component: GamePage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
