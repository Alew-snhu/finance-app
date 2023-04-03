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
          <ion-row style="margin-top:20px">
            <ion-col size="12">
                <LineChart class="chart-container" ></LineChart>
            </ion-col>
          </ion-row>
          <div class="list-items">
          <ion-list :inset="true">
            <ion-item-group>
              <ion-item button detail @Click="openMonthListView(NavigationEnums.Expenses)" :detailIcon="caretForwardOutline">
                <ion-label>
                  <h1>Expenses</h1>
                </ion-label>
              </ion-item>
              <ion-item button detail @Click="openMonthListView(NavigationEnums.Income)" :detailIcon="caretForwardOutline">
                <ion-label>
                  <h1>Income</h1>
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
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {addOutline, caretForwardOutline, trashOutline} from 'ionicons/icons'
import {useRouter} from "vue-router";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import DataAnalyticsDashboardViewModel from "../../view-models/DataAnalyticsDashboardViewModel";
import {reactive} from "vue";
import {NavigationEnums} from "@/Enums/NavigationEnums";


export default {
  name: 'DataAnalyticsDashboard',
  computed: {
    NavigationEnums() {
      return NavigationEnums
    }
  },
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

    const openMonthListView = (navEnum:NavigationEnums) => {
      switch(navEnum){
        case NavigationEnums.Expenses:{
          router.push({name: "ExpenseMonthListView", params: {category: navEnum}})
          break;
        }
        case NavigationEnums.Income:{
          router.push({name: "IncomeMonthListView", params: {category: navEnum}})
          break;
        }
      }

    }
    return {
      name,
      vm,
      addOutline,
      trashOutline,
      caretForwardOutline,
      openMonthListView,
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