<template>
  <ion-page class="ion-page" id="main-content">
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>{{vm.title}}</ion-title>
      </ion-toolbar>
    </ion-header>

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
          <ion-col size="8" size-lg="2" size-xl="2">
            <ion-button expand="block" @click="createAccount">Create An Account</ion-button>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>
        <ion-row>
          <ion-col></ion-col>
          <ion-col size="8" size-lg="2" size-xl="2">
            <ion-button expand="block" @click="submit">Submit</ion-button>
          </ion-col>
          <ion-col></ion-col>
        </ion-row>

      </ion-grid>
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
  IonRow,
  IonCol,
  IonGrid,
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
    IonGrid,
    IonRow,
    IonCol,
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
