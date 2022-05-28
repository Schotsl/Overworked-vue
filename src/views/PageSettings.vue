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
        <ion-label>{{ name }}</ion-label>
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
    async logout() {
      await store.dispatch.authentication.LOGOUT();
      store.commit.app.RESET_STARTPAGE_CURRENTPAGE();
      store.commit.userdata.SET_FRIENDS([]);
      store.commit.userdata.SET_LOCATIONS([]);
      store.commit.userdata.SET_MACHINES([]);
      store.commit.userdata.SET_SESSION(null);
      router.push("/");
    },
  },
  computed: {
    name() {
      return `${store.state.authentication.user?.name}`;
    },
  },
});
</script>
