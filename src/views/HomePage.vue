<template>
  <ion-page class="ion-page">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{vm.title}}</ion-title>
      </ion-toolbar>
    </ion-header>

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
          <ion-button expand="block" @click="createAccount">Create An Account</ion-button>
          <ion-button expand="block" @click="submit">Submit</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  createAnimation, useIonRouter,
} from '@ionic/vue';
import HomePageViewModel from "../../view-models/home-page-view-model";
import {useRouter} from "vue-router";

export default {
  name: 'HomePage',
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  },
  setup() {
    const vm = new HomePageViewModel();
    const router = useRouter()


    const createAccount = () => {
      router.push("/signup")
    }
    const submit = () => {
      router.push("/dataAnalyticsDashboard")
    }

    return{
      vm, router, createAccount, submit
    }
  }
};

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
