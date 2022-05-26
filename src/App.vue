<template>
  <ion-app>
    <ion-router-outlet />

    <template v-if="loggedIn">
      <navigation-bar />
    </template>
  </ion-app>
</template>

<script lang="ts">
import store, { ionicStore } from "./store";
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
  computed: {
    loggedIn() {
      return store.getters.authentication.isLoggedIn;
    },
  },
  async beforeMount() {
    // Initialize local storage
    await ionicStore.init();

    // Get authorized user from local storage
    await store.dispatch.authentication.RESTORE_AUTH();
  },
});
</script>
>
