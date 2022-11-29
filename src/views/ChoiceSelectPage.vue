<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>Back</ion-title>
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div id="container">
        <div style="margin: 0 25% 0 ;">
          <ion-button expand="block">
            <ion-icon slot="end" :icon="pieChart"></ion-icon>
            Current Month
          </ion-button>
          <ion-button expand="block">
            <ion-icon slot="end" :icon="addCircle"></ion-icon>
            Start A New Log
          </ion-button>
          <ion-button expand="block">
            <ion-icon slot="end" :icon="book"></ion-icon>
            Past Entries
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import {defineComponent} from "vue";
import {IonBackButton, IonButton, IonButtons, IonContent, IonIcon, IonPage, IonTitle, IonToolbar} from "@ionic/vue";
import {pieChart, book, addCircle} from 'ionicons/icons'
export default defineComponent({
  name: "ChoiceSelectPage",
  components: {
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonIcon,
    IonButton,
    IonContent,
  },
  setup(){
    return {
      pieChart, book, addCircle
    }
  },
  data(){
    return {
    }
  },
  methods: {

  }
})
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>