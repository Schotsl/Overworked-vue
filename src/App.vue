<template>
  <ion-app>
    <ion-tabs>
      <ion-router-outlet />
      <navigation-bar v-if="loggedIn" />
    </ion-tabs>
  </ion-app>
</template>

<script lang="ts">
import store from "./store";
import { defineComponent } from "vue";
import { IonApp, IonTabs, IonRouterOutlet } from "@ionic/vue";

import NavigationBar from "./components/NavigationBar.vue";

import { SplashScreen } from "@capacitor/splash-screen";

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
  async created() {
    try {
      await window.screen.orientation.lock("portrait");
    } catch (error) {
      console.error("Could not lock screen orientation, are we in a browser?");
    }
  },
  mounted() {
    SplashScreen.hide();
  },
});
</script>
>
