<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Start</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="container">
        <ion-text class="title">🏋️</ion-text>

        <ion-text color="primary">
          <h2>Who are you gyming with?</h2>
        </ion-text>
        <ion-list> </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonText,
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
} from "@ionic/vue";

export default defineComponent({
  name: "PageLogin",

  data() {
    return {
      loading: false,
    };
  },

  components: {
    IonText,
    IonPage,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
  },
  methods: {},
});
</script>

<style>
.title {
  margin: 1.5rem 1.5rem 2rem;
  font-size: 5rem;
}

.login {
  width: 100%;
  margin: 0.75rem;
  font-size: 1.15rem;
}

.spinner {
  width: 3em;
  margin: 6rem;
  height: 3em;
}

.container {
  margin: 2rem 2.5rem 2.5rem;
  display: flex;

  align-items: center;
  flex-direction: column;
}
</style>
