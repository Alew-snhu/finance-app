<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/choiceSelection"></ion-back-button>
      </ion-buttons>
      <ion-title>Back</ion-title>
    </ion-toolbar>
    <ion-content>
      <ion-card>
        <ion-card-content>
          Here's some card content in der mmm
        </ion-card-content>
      </ion-card>


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
  IonCard,
  IonCardContent,
  IonContent, IonItem, IonLabel, IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";

export default defineComponent({
  name: "CurrentMonthPage",
  components: {
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
  }
})
</script>

<style scoped>

</style>