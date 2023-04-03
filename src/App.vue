<template>
  <ion-app>
    <Menu content-id="main-content"></Menu>
    <Suspense>
    <ion-router-outlet id="main-content" />
    </Suspense>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import {defineComponent} from 'vue';
import Menu from "@/components/ToolbarMenu.vue";


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    Menu
  },

});
</script>
<style>

</style>

