<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>{{modalProps.modalTitle}}</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :disabled="hasData">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-datetime
        v-if="modalProps.isBalanceOverview"
        v-model="expenseDate"
        presentation="date-time"
        :prefer-wheel="true">
    </ion-datetime>
    <ion-datetime
        v-if="modalProps.isMonthListView"
        v-model="newExpenseMonth"
        presentation="month-year"
        :prefer-wheel="true">
    </ion-datetime>
    <ion-list v-if="modalProps.isBalanceOverview">
      <ion-item>
        <ion-select interface="popover" placeholder="Expense Type" v-model="expenseType">
          <ion-select-option
              :value="item.value"
              v-for="(item,i) in modalProps.selectOptions"
              :key="i"
          >
            {{item.title}}
          </ion-select-option>
        </ion-select>
      </ion-item>
      <ion-item v-for="(item, i) in modalProps.items" :key="i" >
        <ion-label position="stacked">{{item.title}}</ion-label>
        <ion-input v-model="dataContainer[i]">{{item.value}}</ion-input>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {defineComponent, reactive, toRef} from "vue";
import { DateTime } from "luxon";

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
  IonDatetime,
  modalController,
    IonList,
    IonSelect,
  IonSelectOption

} from '@ionic/vue';

export default defineComponent({
  name: "DataEditModal",
  props:{
    modalProps: {
      type: Object,
      default: () => {},
    },
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
    IonInput,
    IonDatetime,
    IonList,
    IonSelect,
    IonSelectOption,

  },
  setup(props) {
    const dataContainer: string[] = reactive( [])

    const hasData = false;
    let expenseDate;
    let newExpenseMonth = "";
    newExpenseMonth = DateTime.now().toISO();
    // destructure the selectedItem

    let amount = toRef(props.modalProps.selectedItem,'amount');
    let date = toRef(props.modalProps.selectedItem,'date');
    let expenseType = toRef(props.modalProps.selectedItem, 'type');
    let recordId = toRef(props.modalProps.selectedItem, 'id');
    let location = toRef(props.modalProps.selectedItem,'location');

    // it is required to strip the comma from the date string for the modal to recognize it.
    const strippedDateString = date.value.toString().replace(/,/g, '');
    expenseDate = DateTime.fromFormat(strippedDateString, "LLLL dd yyyy");

    dataContainer[0] = location.value
    dataContainer[1] = amount.value



    return {
      dataContainer,
      props,
      expenseType,
      expenseDate,
      newExpenseMonth,
      hasData,
      amount, location, recordId

    }
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, 'cancel');
    },
    async confirm() {
      let data = {};
      // Used for MonthListView
      if(this.modalProps.isMonthListView){
        //console.log("we hit the isMonthListView block")
        data = {
          date : DateTime.fromISO(this.newExpenseMonth)
        }
      }
      if(this.modalProps.isBalanceOverview && this.modalProps.isEditModal){
        //console.log("we hit the isBalanceOverview and isEditModal block")

        data = {
          date: this.expenseDate,
          type: this.expenseType,
          location: this.dataContainer[0],
          amount: this.dataContainer[1],
          id: this.recordId,
        }
      }
      // Used for BalanceOverview Add modal
      if(this.modalProps.isBalanceOverview && this.modalProps.isAddModal){
        //console.log("we hit the isBalanceOverview and isAddModal block")
         data = {
           date: this.expenseDate,
           expenseType: this.expenseType,
           location: this.dataContainer[0],
           amount: this.dataContainer[1],
        }
      }

      return modalController.dismiss(data, 'confirm');
    },
  },
})
</script>

<style scoped>
ion-title {
  text-align: center;
}

ion-list {
margin: 5px
}
ion-datetime {
  margin: auto;

}
</style>