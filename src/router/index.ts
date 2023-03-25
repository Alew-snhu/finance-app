import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AccountRegistrationPage from "@/views/AccountRegistrationPage.vue";
import BalanceOverview from "@/views/BalanceOverview.vue";
import DataAnalyticsDashboard from "@/views/DataAnalyticsDashboard.vue";
import MonthListView from "@/components/MonthListView.vue";

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
    path: "/dataAnalyticsDashboard",
    name: "DataAnalyticsDashboard",
    component: DataAnalyticsDashboard
  },
  {
    path: "/balanceOverview/:entryId",
    name: "BalanceOverview",
    component: BalanceOverview,
    props: true
  },
  {
    path: "/monthListView",
    name: "MonthListView",
    component: MonthListView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
