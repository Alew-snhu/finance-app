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
              <div class="chart-container">
                <BarChart ></BarChart>
              </div>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="12">
              <div class="chart-container">
                <LineChart :chart-id="'chart'" :chartData="vm.chartData"></LineChart>
              </div>
            </ion-col>
          </ion-row>
          <div>
          <ion-list :inset="true">
            <ion-item button detail @Click="balanceOverview" :detailIcon="caretForwardOutline">
              <ion-label>
                <p>Account Balance</p>
                <h2>$5233.44</h2>
              </ion-label>
            </ion-item>
            <ion-item button detail :detailIcon="caretForwardOutline">
              <ion-label>
                <p>Credit Card Balance</p>
                <h2>$4988.33</h2>
              </ion-label>
            </ion-item>
            <ion-item button detail :detailIcon="caretForwardOutline">
              <ion-label>
                <p>Paypal Balance</p>
                <h2>$3170.56</h2>
              </ion-label>
            </ion-item>
            <ion-item button detail :detailIcon="caretForwardOutline">
              <ion-label>
                <p>Student Loan Balance</p>
                <h2>$40,000.00</h2>
              </ion-label>
            </ion-item>
            <ion-item button detail :detailIcon="caretForwardOutline">
              <ion-label>
                <p>Paragraph</p>
                <h1>Heading</h1>
              </ion-label>
            </ion-item>
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
} from "@ionic/vue";
import {caretForwardOutline} from 'ionicons/icons'
import {useRouter} from "vue-router";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import LineChartViewModel from "../../view-models/LineChartViewModel";

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
  },
  setup() {
    const name = "DataAnalyticsDashboard";
    const router = useRouter();
    const vm = new LineChartViewModel()
    const contentId = 'main-content'

    const balanceOverview = () => {
      router.push('/balanceOverview')
    }
    return {
      name,
      vm,
      caretForwardOutline,
      contentId,
      balanceOverview
    }
  }
}
</script>

<style scoped>



.chart-container{

}

ion-grid {
  --ion-grid-columns: 12;
}

ion-list {

}

</style>