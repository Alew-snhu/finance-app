<template>
    <ion-page class="ion-page" id="main-content">
      <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
      </ion-toolbar>
      </ion-header>
      <ion-content >
        <ion-grid>
          <ion-row>
            <ion-col size="12">
                <BarChart class="chart-container" ></BarChart>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
                <LineChart class="chart-container" :chart-id="'chart'" :chartData="vm.chartData"></LineChart>
            </ion-col>
          </ion-row>
          <div class="list-items">
          <ion-list :inset="true">
            <ion-item-group>
              <ion-item button detail @Click="openMonthListView" :detailIcon="caretForwardOutline">
                <ion-label>
                  <h1>Expenses</h1>
                </ion-label>
              </ion-item>
              <ion-item button detail :detailIcon="caretForwardOutline">
                <ion-label>
                  <h1>Payments</h1>
                </ion-label>
              </ion-item>
              <ion-item button detail :detailIcon="caretForwardOutline">
                <ion-label>
                  <h1>Debts</h1>
                </ion-label>
              </ion-item>
              <ion-item button detail :detailIcon="caretForwardOutline">
                <ion-label>
                  <h1>Bill Information</h1>
                </ion-label>
              </ion-item>
            </ion-item-group>
          </ion-list>
          </div>
        </ion-grid>
      </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonMenu,
  IonHeader,
  IonMenuButton,
  IonItemDivider,
  IonItemGroup, IonButton, IonItemOptions, IonItemSliding, IonItemOption,
} from "@ionic/vue";
import {caretForwardOutline, addOutline, trashOutline} from 'ionicons/icons'
import {useRouter} from "vue-router";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import DataAnalyticsDashboardViewModel from "../../view-models/DataAnalyticsDashboardViewModel";
import {reactive} from "vue";


export default {
  name: 'DataAnalyticsDashboard',
  props:{

  },
  components:{
    LineChart,
    BarChart,
    IonPage,
    IonGrid,
    IonRow,
    IonToolbar,
    IonMenu,
    IonMenuButton,
    IonButtons,
    IonHeader,
    IonTitle,
    IonCol,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonIcon,
    IonButton,
    IonItemDivider,
    IonItemGroup,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  },
  setup() {
    const name = "DataAnalyticsDashboard";
    const router = useRouter();
    const vm = reactive(new DataAnalyticsDashboardViewModel())
    const contentId = 'main-content'

    const openMonthListView = () => {
      router.push('/monthListView')
    }
    return {
      name,
      vm,
      addOutline,
      trashOutline,
      caretForwardOutline,
      contentId,
      openMonthListView
    }
  }
}
</script>

<style scoped>



.chart-container{
  max-height: 275px;
  max-width: 800px;
  margin: auto;
}

ion-grid {
  --ion-grid-columns: 12;
}

.list-items {
  max-width: 1000px;
  margin: auto;
}

</style>