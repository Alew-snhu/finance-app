<template>
  <ion-page class="ion-page" id="main-content">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/monthListView"></ion-back-button>
      </ion-buttons>
      <ion-title>Back</ion-title>
      <ion-progress-bar type="indeterminate" v-if="vm.loading"></ion-progress-bar>
    </ion-toolbar>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="12">
            <div id="chart" class="chart">
              <apex-charts type="bar" :options="data.chartOptions" :series="data.series"></apex-charts>
            </div>
          </ion-col>
        </ion-row>
        <div class="list-items">
          <ion-list :inset="true">
            <ion-item-group>

              <ion-item-divider color="medium">
                <ion-label>

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
                    <h1>${{item.amount.toFixed(2)}}</h1>
                  </ion-label>
                </ion-item>

                <ion-item-options>
                  <ion-item-option @click="openEditModal(item)">
                    <ion-icon size="large" :icon="pencilOutline"></ion-icon>
                  </ion-item-option>
                  <ion-item-option color="danger" @click="deleteEntry(item)">
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
import {defineComponent, reactive} from "vue";
import ApexCharts from 'vue3-apexcharts'
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
  IonProgressBar,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/vue";


import ExpenseOverviewViewMode from "../../view-models/ExpenseOverviewViewMode";
import ExpenseService from "@/services/expense-service";
import {addOutline, pencilOutline, trashOutline} from "ionicons/icons";
import {modalController} from "@ionic/core/components";
import ExpenseModal from "@/components/ExpenseModal.vue";
import {IEditExpense} from "@/custom-types/IEditExpense";
import HorizontalBarChartViewModel from "../../view-models/HorizontalBarChartViewModel";

export default defineComponent({
  name: "ExpenseOverview",
  props:['entryId'],
  components: {
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
    IonIcon,
    IonItemDivider,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonItemGroup,
    IonProgressBar,
    ApexCharts,
  },
  async setup(props){
    const vm = reactive(new ExpenseOverviewViewMode());
    const chartVm = reactive(new HorizontalBarChartViewModel());
    const expenseService = new ExpenseService();
    let data;

    vm.expenseEntries = await expenseService.getSubDocs(props.entryId)
    chartVm.calculateTotals(vm.expenseEntries);
    data = chartVm.initializeChartData();

    return{
      vm,
      props,
      pencilOutline,
      trashOutline,
      addOutline,
      chartVm,
      data,
      expenseService,
    }

  },

  methods: {
    async openAddModal() {

      const modal = await modalController.create({
        component: ExpenseModal,
        componentProps: {
          modalProps: this.vm.addModalProps
        }
      });

      await modal.present();
      const {data, role} = await modal.onWillDismiss();

      if (role === 'confirm' && data) {
        this.vm.loading = true;
        const expense = this.vm.toExpenseModel(data);
        await this.expenseService.addSubDocument(expense);
        await this. refreshData()
        this.vm.loading = false;
      }
    },

    async openEditModal(item: IEditExpense) {

      const modal = await modalController.create({
        component: ExpenseModal,
        componentProps: {
          modalProps: this.vm.toEditModalProps(item)
        }
      });

      await modal.present();
      const {data, role} = await modal.onWillDismiss();

      if (role === 'confirm' && data) {
        this.vm.loading = true;
        const expense = this.vm.toEditExpenseModel(data)
        await this.expenseService.updateSubDocument(expense);
        await this.refreshData()
        this.vm.loading =  false;

      }
    },

    async deleteEntry(item:IEditExpense){
      this.vm.loading = true;
      await this.expenseService.deleteSubDocument(item);
      await this.refreshData()
      this.vm.loading = false;
    },

    async refreshData(){
      this.vm.expenseEntries = [];
      this.vm.expenseEntries = await this.expenseService.getSubDocs(this.props.entryId);
      this.chartVm.calculateTotals(this.vm.expenseEntries);
      this.data = this.chartVm.initializeChartData();
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
.chart{
  max-width: 800px;
  margin: auto;
}
ion-spinner{
  transform: scale(3);
}
</style>



