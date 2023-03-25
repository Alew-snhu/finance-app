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
              <ion-input v-model="vm.userCredentials.userEmail"></ion-input>
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
            <ion-button
                expand="block"
                @click="fbConfig.createAccount(vm.userCredentials.userEmail, vm.userCredentials.userPassword)">
              Submit</ion-button>
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
  IonLabel,
  IonCol,
  IonRow, IonGrid
} from '@ionic/vue';
import { defineComponent } from 'vue';
import RegistrationPageViewModel from "../../view-models/RegistrationPageViewModel";
import FirebaseConfig from "@/firebase-config";

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
    IonCol,
    IonRow,
    IonGrid,

  },
  setup() {
    return {
      vm: new RegistrationPageViewModel(),
      fbConfig: new FirebaseConfig()

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
