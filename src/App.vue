<template>
  <ion-app>
    <ion-tabs v-if="!loading">
      <ion-router-outlet />
      <navigation-bar v-if="loggedIn" />
    </ion-tabs>
  </ion-app>
</template>

<script lang="ts">
import store, { ionicStore } from "./store";
import { defineComponent } from "vue";
import { IonApp, IonTabs, IonRouterOutlet } from "@ionic/vue";

import NavigationBar from "./components/NavigationBar.vue";
import router from "./router";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    NavigationBar,
    IonTabs,
    IonRouterOutlet,
  },
  computed: {
    loggedIn() {
      return store.getters.authentication.isLoggedIn;
    },
  },
  data: () => ({
    loading: true,
  }),
  async created() {
    window.screen.orientation.lock("portrait");
    // Initialize local storage
    await ionicStore.init();

    // Get authorized user from local storage
    await store.dispatch.authentication.RESTORE_AUTH();

    // Send user to login if the storage was empty
    if (!store.getters.authentication.isLoggedIn) {
      router.push("/");
    }
    this.loading = false;
  },
});
</script>
>
