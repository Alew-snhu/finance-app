<template>
  <ion-page>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/home"></ion-back-button>
      </ion-buttons>
      <ion-title>Back Button</ion-title>
    </ion-toolbar>

    <ion-content :fullscreen="true">
      <div id="container">
        <ion-item class="textInput">
          <ion-label position="floating">User Name</ion-label>
          <ion-input v-model="vm.userCredentials.userName"></ion-input>
        </ion-item>
        <ion-item class="textInput">
          <ion-label position="floating">Password</ion-label>
          <ion-input v-model="vm.userCredentials.userPassword"></ion-input>
        </ion-item>
        <div style="margin: 0 25% 0 ;">
          <ion-button expand="block">Create An Account</ion-button>
        </div>
      </div>
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
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
.textInput {
  margin-right: 25%;
  margin-left: 25%;
  margin-bottom: 75px;
}
</style>
