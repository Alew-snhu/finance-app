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

              <ion-item-divider color="medium">
                <ion-label>
                  Balances
                </ion-label>
                <ion-button slot="end">
                  Add
                  <ion-icon slot="end" :icon="addOutline"></ion-icon>
                </ion-button>
              </ion-item-divider>
              <ion-item-sliding>
                <ion-item button detail @Click="balanceOverview" :detailIcon="caretForwardOutline">
                  <ion-label>
                    <p>Account Balance</p>
                    <h2>$5233.44</h2>
                  </ion-label>
                </ion-item>

                <ion-item-options>
                  <ion-item-option color="danger">
                    <ion-icon size="large" :icon="trashOutline">
                    </ion-icon>
                  </ion-item-option>
                </ion-item-options>

              </ion-item-sliding>
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
    const vm = new LineChartViewModel()
    const contentId = 'main-content'

    const balanceOverview = () => {
      router.push('/balanceOverview')
    }
    return {
      name,
      vm,
      addOutline,
      trashOutline,
      caretForwardOutline,
      contentId,
      balanceOverview
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