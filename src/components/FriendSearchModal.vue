<template>
  <ion-modal :is-open="true" @didDismiss="closed()">
    <ion-header>
      <ion-toolbar>
        <ion-title>Search for friends</ion-title>
        <ion-button slot="end" fill="clear" size="small" @click="closed()">
          Close
        </ion-button>
      </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Friend's Email</ion-label>
          <ion-input></ion-input>
        </ion-item>
      </ion-list>
      <ion-list>
        <!-- <ion-item v-for="i in 5" :key="i">
          <ion-avatar slot="start">
            <ion-skeleton-text></ion-skeleton-text>
          </ion-avatar>
          <ion-label>
            <ion-skeleton-text animated></ion-skeleton-text>
          </ion-label>
        </ion-item> -->
      </ion-list>
    </ion-content>
  </ion-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonModal,
  IonContent,
  IonList,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/vue";

export default defineComponent({
  name: "FriendSearchModel",
  components: {
    IonModal,
    IonContent,
    IonList,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonInput,
    IonButton,
  },
  methods: {
    closed() {
      this.$emit("closed");
    },
  },
  emits: ["closed"],
});
</script>
