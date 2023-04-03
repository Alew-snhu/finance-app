import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import AccountRegistrationPage from "@/views/AccountRegistrationPage.vue";
import DataAnalyticsDashboard from "@/views/DataAnalyticsDashboard.vue";
import ExpenseMonthListView from "@/views/ExpenseMonthListView.vue";
import ExpenseOverview from "@/views/ExpenseOverview.vue";
import IncomeMonthListView from "@/views/IncomeMonthListView.vue";

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
    name: "ExpenseOverview",
    component: ExpenseOverview,
    props: true
  },
  {
    path: "/expenseMonthListView/:category",
    name: "ExpenseMonthListView",
    component: ExpenseMonthListView,
    props: true
  },
  {
    path: "/incomeMonthListView/:category",
    name: "IncomeMonthListView",
    component:IncomeMonthListView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
