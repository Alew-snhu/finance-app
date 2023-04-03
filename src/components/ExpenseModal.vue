<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>{{modalProps.modalTitle}}</ion-title>
      <ion-buttons slot="end">
        <ion-button
            @click="confirm"
            :disabled="!vm.validData">
          Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-datetime
        v-if="modalProps.isBalanceOverview"
        v-model="vm.expenseDate"
        presentation="date-time"
        :prefer-wheel="true">
    </ion-datetime>
    <ion-datetime
        v-if="modalProps.isMonthListView"
        v-model="vm.newExpenseMonth"
        presentation="month-year"
        :prefer-wheel="true">
    </ion-datetime>
    <ion-list v-if="modalProps.isBalanceOverview">
      <ion-item>
        <ion-select interface="popover" placeholder="Expense Type" v-model="vm.expenseType">
          <ion-select-option
              :value="item.value"
              v-for="(item,i) in modalProps.selectOptions"
              :key="i"
          >
            {{item.title}}
          </ion-select-option>
        </ion-select>
        <ion-note v-if="!vm.validType" color="danger" slot="end">Required</ion-note>
      </ion-item>
        <ion-item>
          <ion-label position="stacked">{{modalProps.items[0].title}}</ion-label>
            <ion-input type="text" v-model="vm.location">
              {{modalProps.items[0].value}}
            </ion-input>
          <ion-note v-if="!vm.validLocation" color="danger" slot="end">Required</ion-note>
        </ion-item>
      <ion-item>
        <ion-label position="stacked">{{modalProps.items[1].title}}</ion-label>
        <ion-input  type="number" v-model.number="vm.amount">
          {{modalProps.items[1].value}}
        </ion-input>
        <ion-note v-if="!vm.validAmount" color="danger" slot="end">Incorrect Format</ion-note>
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  modalController,
} from '@ionic/vue';
import {ExpenseModalViewModel} from "../../view-models/ExpenseModalViewModel";

export default defineComponent({
  name: "ExpenseModal",
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
    IonNote
  },
  setup(props) {
    const vm = reactive(new ExpenseModalViewModel())

    if(props.modalProps.isMonthListView){
      vm.initMonthListView()
    }

    if(props.modalProps.isAddModal){
      vm.initAddModal()
    }

    if(props.modalProps.isEditModal){
      vm.initEditModal(props.modalProps.selectedItem)
    }


    return {
      props,
      vm,
    }
  },
  methods: {
    cancel() {

      return modalController.dismiss(null, 'cancel');

    },
    async confirm() {
      let data = {};

      if(this.modalProps.isMonthListView){
        data = this.vm.toMonthListModel()
      }
      if(this.modalProps.isAddModal) {
         data = this.vm.toAddModalModel();
      }
      if(this.modalProps.isEditModal) {
        data = this.vm.toEditModalModel();
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