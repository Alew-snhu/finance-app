<template>
  <ion-page class="ion-page" id="main-content">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/monthListView"></ion-back-button>
      </ion-buttons>
      <ion-title>Back</ion-title>
    </ion-toolbar>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <DoughnutChart class="chart-container"></DoughnutChart>
          </ion-col>
        </ion-row>
        <div class="list-items">
          <ion-list :inset="true">
            <ion-item-group>

              <ion-item-divider color="medium">
                <ion-label>
                  December
                </ion-label>
                <ion-button slot="end" @click="openAddModal">
                  Add
                  <ion-icon slot="end" :icon="addOutline"></ion-icon>
                </ion-button>
              </ion-item-divider>

              <ion-item-sliding v-for="(item, i) in vm.expenseEntries" :key="i">

                <ion-item>
                  <ion-label class="expense-type">
                    <p>Type</p>
                    <h1>{{item.type}}</h1>
                  </ion-label>
                  <ion-label class="expense-info">
                    <p>{{item.date}}</p>
                    <h1>{{item.location}}</h1>
                  </ion-label>
                  <ion-label class="expense-amount">
                    <p>Amount</p>
                    <h1>${{item.amount}}</h1>
                  </ion-label>
                </ion-item>

                <ion-item-options>
                  <ion-item-option @click="openEditModal(item)">
                    <ion-icon size="large" :icon="pencilOutline"></ion-icon>
                  </ion-item-option>
                  <ion-item-option color="danger">
                    <ion-icon size="large" :icon="trashOutline"></ion-icon>
                  </ion-item-option>
                </ion-item-options>
              </ion-item-sliding>

            </ion-item-group>
          </ion-list>
        </div>
      </ion-grid>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive} from "vue";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import PieChart from "@/components/DoughnutChart.vue";

import BalanceOverviewViewMode from "../../view-models/BalanceOverviewViewMode";
import ExpenseService from "@/services/expense-service";
import {addOutline, pencilOutline, trashOutline} from "ionicons/icons";
import {modalController} from "@ionic/core/components";
import DataEditModal from "@/components/DataEditModal.vue";
import {IExpense} from "@/custom-types/IExpense";
import DoughnutChart from "@/components/DoughnutChart.vue";
import {IEditExpense} from "@/custom-types/IEditExpense";


export default defineComponent({
  name: "BalanceOverview",
  props:['entryId'],
  components: {
    PieChart,
    IonPage,
    IonToolbar,
    IonButtons,
    IonButton,
    IonModal,
    IonInput,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    DoughnutChart,
    IonIcon,
    IonItemDivider,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonItemGroup,
  },
  setup(props){
    const vm = reactive(new BalanceOverviewViewMode())
    onMounted(async() =>{
      const es = new ExpenseService();
      vm.expenseEntries = await es.getSubDocs(props.entryId)
    })
    return{
      vm,
      props,
      pencilOutline,
      trashOutline,
      addOutline,
    }

  },

  methods: {
    async openEditModal(item: IEditExpense) {

      const selectedEntry = reactive({
        date: item.date,
        type: item.type,
        location: item.location,
        amount: item.amount,
        id: item.id
      })
      const editModalProps = {
        modalTitle: "Edit Entry",
        isBalanceOverview: true,
        isEditModal: true,
        selectOptions: this.vm.modalSelectOptions,
        items: this.vm.modalItems,
        selectedItem: selectedEntry
      }

      const modal = await modalController.create({
        component: DataEditModal,
        componentProps: {
          modalProps: editModalProps
        }
      });
      await modal.present();

      const {data, role} = await modal.onWillDismiss();

      if (role === 'confirm' && data) {
        const expense: IEditExpense = {
          date: data.date,
          type: data.type,
          location: data.location,
          amount: data.amount,
          id: data.id
        }
        const es = new ExpenseService();
        await es.updateSubDocument(expense);
        this.vm.expenseEntries = [];
        this.vm.expenseEntries = await es.getSubDocs(this.props.entryId);
      }
    },

    async openAddModal() {

      const addModalProps = {
        modalTitle: "Add Entry",
        isBalanceOverview: true,
        isAddModal: true,
        selectOptions: this.vm.modalSelectOptions,
        items: this.vm.modalItems
      }

      const modal = await modalController.create({
        component: DataEditModal,
        componentProps: {
          modalProps: addModalProps
        }
      });

      await modal.present();

      const {data, role} = await modal.onWillDismiss();

      if (role === 'confirm' && data) {
        this.vm.loading = true;

        const expense: IExpense = {
          date: data.date,
          type: data.expenseType,
          location: data.location,
          amount: data.amount,
        }
        const es = new ExpenseService();
        await es.setSubDocument(expense);
        this.vm.expenseEntries = [];
        this.vm.expenseEntries = await es.getSubDocs(this.props.entryId)

        this.vm.loading = false;
      }
    }
  }
})
</script>

<style scoped>

ion-label {
  text-align: center;
}
ion-grid {
  --ion-grid-columns: 12;
}
p {
  font-size: 10px;
}
.list-items {
  max-width: 800px;
  margin: auto;
}
.expense-type{
  text-align: start;
}
.expense-info{
  text-align: center;
}
.expense-amount {
  text-align: end;
}
.chart-container{
  max-height: 800px;
  max-width: 800px;
  margin: auto;
}
</style>