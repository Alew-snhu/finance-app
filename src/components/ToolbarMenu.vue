<template>
  <ion-menu :type="'overlay'" content-id="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Get Ahead Of The Game</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-list>
        <ion-item button @click="goHome">
          <ion-icon slot="end" :icon="analyticsOutline" size="lage"></ion-icon>
          <ion-label>Home</ion-label>
        </ion-item>
        <ion-item button @click="logOut">
          <ion-icon slot="end" :icon="logOutOutline" size="lage"></ion-icon>
          <ion-label >Log Out</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel, IonList,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar, menuController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import {analyticsOutline, logOutOutline} from 'ionicons/icons'
import {useRouter} from "vue-router";
import FirebaseConfig from "@/firebase-config";
export default defineComponent({
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonLabel,
    IonItem,
    IonList
  },
  setup() {
    const router = useRouter()
    const fbConfig = new FirebaseConfig()


    const goHome = () => {
      router.push('/dataAnalyticsDashboard')
      menuController.close()
    }
    const logOut = () => {
      fbConfig.signOut();
      router.push('/home')
      menuController.close()
    }
    return {
      goHome, logOut, analyticsOutline, logOutOutline
    }
  }
});
</script>

<style scoped>

ion-menu::part(backdrop) {
  background-color: rgb(11, 232, 63);
}

ion-menu::part(container) {
  border-radius: 0 20px 20px 0;
  box-shadow: 4px 0 16px rgba(0, 255, 51, 0.18);
}

ion-item {
  border: #707070 solid 3px;
  margin-bottom: 5px;
  padding: 5px;
}
</style>