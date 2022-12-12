<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>{{modalProps.modalTitle}}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item v-for="(item, i) in modalProps.items" :key="i">
      <ion-label position="stacked">{{item.title}}</ion-label>
      <ion-input>{{item.value}}</ion-input>
    </ion-item>
  </ion-content>
</template>

<script lang="ts">
import {defineComponent} from "vue";

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
} from '@ionic/vue';

export default defineComponent({
  name: "DataEditModal",
  props:{
    name: {
      type: String,
      default: "",
    },
    modalProps: Object,

  },
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput
  },
  data(){
    return{
      name1: name
    }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, 'cancel');
    },
    confirm(): any {
      return modalController.dismiss(this.name1, 'confirm');
    },
  },
})
</script>

<style scoped>
ion-title {
  text-align: center;
}
ion-content {
  top: 30%;
}
ion-item {
  margin-bottom: 15px;
}
</style>