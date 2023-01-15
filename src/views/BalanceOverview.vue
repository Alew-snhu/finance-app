<template>
  <ion-page class="ion-page" id="main-content">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/dataAnalyticsDashboard"></ion-back-button>
      </ion-buttons>
      <ion-title>Back</ion-title>
    </ion-toolbar>
    <ion-content>
      <AccountDataDisplay/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {
  IonBackButton, IonButton,
  IonButtons, IonCol,
  IonContent, IonGrid, IonInput,
  IonItem,
  IonLabel,
  IonList, IonModal,
  IonPage, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import PieChart from "@/components/DoughnutChart.vue";
import AccountDataDisplay from "@/components/AccountDataDisplay.vue";

export default defineComponent({
  name: "BalanceOverview",
  components: {
    PieChart,
    IonPage,
    IonToolbar,
    IonButtons,
    IonButton,
    IonModal,
    IonInput,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    AccountDataDisplay,
  },
  data(){

  },
  methods :{

  }

})
</script>

<style scoped>

ion-label {
  text-align: center;
}
ion-grid {
  --ion-grid-columns: 12;
}
</style>