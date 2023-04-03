<template>
  <ion-page class="ion-page" id="main-content">
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button default-href="/dataAnalyticsDashboard"></ion-back-button>
      </ion-buttons>
      <ion-title>Back</ion-title>
      <ion-progress-bar type="indeterminate" v-if="vm.loading"></ion-progress-bar>
    </ion-toolbar>
    <ion-content>
      <div class="list-items">
        <ion-list :inset="true">
          <ion-item-group>
            <ion-item-divider color="medium">
              <ion-label>
                Current Month
              </ion-label>
              <ion-button slot="end" @click="loadPreviousMonths">
                Load Previous Months
              </ion-button>
              <ion-button slot="end" @click="openAddModal">
                Add
                <ion-icon slot="end" :icon="addOutline"></ion-icon>
              </ion-button>
            </ion-item-divider>
            <ion-item
                button detail
                v-for="(item, i) in vm.currentMonth"
                :key="i"
                :detailIcon="caretForwardOutline"
                @click="viewEntries(item)"
            >
              <ion-label>
                <h2>{{item}}</h2>
              </ion-label>
            </ion-item>
            <ion-item-divider color="medium" v-if="vm.previousMonths.length > 0">
              <ion-label>
                Previous Months
              </ion-label>
            </ion-item-divider>
            <ion-item
                button detail
                v-for="(item, i) in vm.previousMonths"
                :key="i"
                :detailIcon="caretForwardOutline"
                @click="viewEntries(item)">
              <ion-label>
                <h2>{{item}}</h2>
              </ion-label>
            </ion-item>
          </ion-item-group>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
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
  IonToolbar,
  IonProgressBar
} from "@ionic/vue";
import {modalController} from "@ionic/core/components";
import ExpenseModal from "@/components/ExpenseModal.vue";
import {addOutline, caretForwardOutline, pencilOutline, trashOutline} from "ionicons/icons";
import MonthListViewModel from "../../view-models/MonthListViewModel";
import ExpenseService from "@/services/expense-service";
import {IExpenseMonth} from "@/custom-types/IExpenseMonth";
import {useRouter} from "vue-router";


export default defineComponent( {
  name: "MonthListView",
  props:['category'],
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
    IonItemGroup,
    IonItemDivider,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonProgressBar
  },
  async setup() {
    const vm = reactive(new MonthListViewModel());
    const router = useRouter();

    //const es = new IncomeService();
    //vm.currentMonth = await es.getParentDocs(false)

    const viewEntries = (entryId: string) => {
      router.push({name: "ExpenseOverview", params: {entryId: entryId}})
    }
    return {
      vm,
      router,
      pencilOutline,
      trashOutline,
      addOutline,
      caretForwardOutline,
      viewEntries
    }
  },

  methods: {
    async openAddModal() {
      const addModalProps = {
        modalTitle: "Add Month",
        isMonthListView: true,
      }

      const modal = await modalController.create({
        component: ExpenseModal,
        componentProps: {
          modalProps: addModalProps
        }
      });

      await modal.present();

      const {data, role} = await modal.onWillDismiss();

      if (role === 'confirm' && data) {
        this.vm.loading = true;

        let em: IExpenseMonth = {
          date: data.date
        }

        const es = new ExpenseService();
        await es.setParentDocument(em);
        //this.vm.currentMonth = await es.getParentDocs(false)
        this.vm.loading = false;
      }
    },
    async loadPreviousMonths() {
      //const es = new ExpenseService()
      //this.vm.previousMonths = await es.getParentDocs(true)
    },


  }
})
</script>

<style scoped>
.list-items {
  max-width: 1000px;
  margin: auto;
}
</style>