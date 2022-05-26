<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Settings</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-item>
        <ion-label>{{ fullName }}</ion-label>
        <ion-button slot="end" fill="clear" size="small" @click="logout">
          Logout
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  IonItem,
  IonButton,
  IonLabel,
} from "@ionic/vue";

import store from "@/store";
import router from "@/router";

export default defineComponent({
  name: "PageSettings",
  components: {
    IonPage,
    IonTitle,
    IonHeader,
    IonLabel,
    IonToolbar,
    IonContent,
    IonItem,
    IonButton,
  },
  methods: {
    logout() {
      console.log("Logging out...");
      store.dispatch.authentication.LOGOUT();
      router.push("/");
    },
  },
  computed: {
    fullName() {
      return `${store.state.authentication.user?.first} ${store.state.authentication.user?.last}`;
    },
  },
});
</script>
