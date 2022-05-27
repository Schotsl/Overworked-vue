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

import { initializeApp, FirebaseOptions } from "firebase/app";

// TODO: This should be moved to a .env file
const firebaseConfig: FirebaseOptions = {
  appId: "1:863141653950:web:86813dbabb9bbec54dddef",
  apiKey: "AIzaSyB7R5pFg9qeoDVGha2mBpCMzziQ7x0rfyA",
  projectId: "test-49d01",
  authDomain: "test-49d01.firebaseapp.com",
  storageBucket: "test-49d01.appspot.com",
  messagingSenderId: "863141653950",
};

initializeApp(firebaseConfig);

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
