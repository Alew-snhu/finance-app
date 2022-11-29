import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AccountRegistrationPage from "@/views/AccountRegistrationPage.vue";
import ChoiceSelectPage from "../views/ChoiceSelectPage.vue";
import CurrentMonthPage from "@/views/CurrentMonthPage.vue";

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
  },
  {
    path: "/currentMonth",
    name: " Current Month",
    component: CurrentMonthPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
