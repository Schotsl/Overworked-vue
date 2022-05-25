<template>
  <ion-app>
    <ion-router-outlet />
    <navigation-bar />
  </ion-app>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonRouterOutlet, IonApp } from "@ionic/vue";

import NavigationBar from "./components/NavigationBar.vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    NavigationBar,
  },
});
</script>
