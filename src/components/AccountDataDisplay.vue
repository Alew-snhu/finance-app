<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <PieChart class="chart-container"/>
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

          <ion-item-sliding>

            <ion-item>
              <ion-label>
                <p>12/10/2022</p>
                <h2>Expense Desc</h2>
              </ion-label>
              <ion-label class="expense-amount">
                <p>expense</p>
                <h2>$5233.44</h2>
              </ion-label>
            </ion-item>

            <ion-item-options>
              <ion-item-option @click="openEditModal">
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
</template>

<script lang="ts">
import {defineComponent} from "vue";
import PieChart from "@/components/DoughnutChart.vue";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { modalController } from '@ionic/core/components';
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
import DataEditModal from "@/components/DataEditModal.vue";
import {pencilOutline, trashOutline, addOutline} from 'ionicons/icons'
export default defineComponent({
  name: "AccountDataDisplay",
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
    IonIcon,
    IonItemGroup,
    IonItemDivider,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
  },

  data() {
    return {
     message: 'this is a god damn message.',
      editModalProps: {
        modalTitle: "Edit Entry",
        items: [
            {title: "Date", value: "12/10/2022"},
            {title: "Location", value: "Kwik Trip"},
            {title: "Amount", value: "$34.33"}
        ]
      },
      addModalProps: {
       modalTitle: "Add Entry",
        items: [
          {title: "Date", value: ""},
          {title: "Location", value: ""},
          {title: "Amount", value: ""}
        ]
      },
      pencilOutline,
      trashOutline,
      addOutline,
      ChartDataLabels
    }
  },
  methods: {
    async openEditModal() {
      const modal = await modalController.create({
        component: DataEditModal,
        componentProps: {
          modalProps: this.editModalProps
        }
      });
      await modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.message = `Hello, ${data}!`;
      }
    },
    async openAddModal() {
      const modal = await modalController.create({
        component: DataEditModal,
        componentProps: {
          modalProps: this.addModalProps
        }
      });
      await modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === 'confirm') {
        this.message = `Hello, ${data}!`;
      }
    }
  },

})

</script>

<style scoped>
p {
  font-size: 10px;
}
.list-items {
  max-width: 1000px;
  margin: auto;
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