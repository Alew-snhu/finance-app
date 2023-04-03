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
            <ion-input type="text" v-model="vm.userCredentials.userEmail"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input type="password" v-model="vm.userCredentials.userPassword"></ion-input>
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
            <ion-button
                expand="block"
                @click="submit(vm.userCredentials.userEmail,vm.userCredentials.userPassword)">
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
import RegistrationPageViewModel from "../../view-models/RegistrationPageViewModel";
import {useRouter} from "vue-router";
import {defineComponent} from "vue";
import FirebaseConfig from "@/firebase-config";
export default defineComponent({
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
    const vm = new RegistrationPageViewModel();
    const fbConfig = new FirebaseConfig();
    const router = useRouter()

    const createAccount = () => {
      router.push("/signup")
    }
    const submit = (userEmail:string, userPassword:string) => {
      fbConfig.signIn(userEmail, userPassword)
      router.push("/dataAnalyticsDashboard");
    }
    // const checkDate = () => {
    //   const date1 = DateTime.fromFormat('January 2023', 'LLLL yyyy');
    //   const date2 = DateTime.fromFormat('February 2023', 'LLLL yyyy');
    //   // console.log(`date1: month => ${date1.month} year => ${date1.year}`);
    //   // console.log(`date2: month => ${date2.month} year => ${date2.year}`);
    //   // console.log(date1 < date2);
    //   const currentDocId = DateTime.now().toFormat('LLLL yyyy')
    //   console.log(currentDocId)
    // }
    return{
      vm, router,createAccount, submit,fbConfig
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
