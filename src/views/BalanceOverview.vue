<template>
  <ion-page class="ion-page" id="main-content">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/dataAnalyticsDashboard"></ion-back-button>
      </ion-buttons>
      <ion-title>Back</ion-title>
    </ion-toolbar>
    <ion-content>

        <PieChart/>



      <ion-list :inset="true">
        <ion-item>
          <ion-label>Item 1</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Item 2</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Item 3</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>Item 4</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>item 5</ion-label>
        </ion-item>
      </ion-list>


    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import PieChart from "@/components/DoughnutChart.vue";

export default defineComponent({
  name: "BalanceOverview",
  components: {
    PieChart,
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
  }
})
</script>

<style scoped>

</style>