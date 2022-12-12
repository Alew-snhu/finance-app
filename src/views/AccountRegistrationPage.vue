<template>
  <ion-page class="ion-page" id="main-content">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>Back</ion-title>
    </ion-toolbar>

    <ion-content>
      <ion-grid>

        <ion-row>
          <ion-col></ion-col>
          <ion-col size="8" size-lg="3" size-xl="2">
            <ion-item>
              <ion-label position="floating">User Name</ion-label>
              <ion-input v-model="vm.userCredentials.userName"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input v-model="vm.userCredentials.userPassword"></ion-input>
            </ion-item>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>

        <ion-row>
          <ion-col></ion-col>
          <ion-col size="8" size-lg="2" size-xl="1">
            <ion-button expand="block">Submit</ion-button>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>


  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  IonTitle,
  IonButtons,
  IonButton,
  IonToolbar,
  IonBackButton,
  IonItem,
  IonInput,
  IonLabel
} from '@ionic/vue';
import { defineComponent } from 'vue';
import HomePageViewModel from "../../view-models/home-page-view-model";

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  },
  data() {
    return {
      vm: new HomePageViewModel(),

    }
  },
  methods: {

  }
});

</script>

<style scoped>
ion-content {
  top:30%;
}

ion-item {
  margin-bottom: 15px;
}

ion-grid {
  --ion-grid-columns: 12;
}
</style>
