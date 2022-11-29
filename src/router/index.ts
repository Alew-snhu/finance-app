import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AccountRegistrationPage from "@/views/AccountRegistrationPage.vue";
import ChoiceSelectPage from "@/views/ChoiceSelectPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/signup',
    name: 'Signup',
    component: AccountRegistrationPage
  },
  {
    path: "/choiceSelection",
    name: "Choice Selection",
    component: ChoiceSelectPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
