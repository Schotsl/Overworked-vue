<template>
  <ion-app>
    <ion-router-outlet />

    <template v-if="loggedIn">
      <navigation-bar />
    </template>
  </ion-app>
</template>

<script lang="ts">
// import { store } from "./store";
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
      // TODO: Move this to the VueX store
      return (
        // store.state.user.name &&
        // store.state.user.email &&
        // store.state.user.token
        true
      );
    },
  },
});
</script>
