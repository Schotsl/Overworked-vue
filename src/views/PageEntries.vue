<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Entries</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Entries</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item v-for="entry in sessionEntries" :key="entry.uuid">
          <ion-label>
            <h2>{{ personName(entry.person) }}</h2>
            <p>{{ machineTitle(entry.machine) }}</p>
          </ion-label>
          <ion-icon @click="deleteEntry(entry)" :icon="expandOutline" />
        </ion-item>
      </ion-list>
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
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
} from "@ionic/vue";
import store from "@/store";
import { Entry } from "@/store/types";
import { expandOutline } from "ionicons/icons";

export default defineComponent({
  name: "PageEntries",
  setup() {
    return {
      expandOutline,
    };
  },
  components: {
    IonPage,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
  },
  computed: {
    sessionEntries() {
      return store.state.userdata.session?.entries ?? [];
    },
  },
  methods: {
    async deleteEntry(entry: Entry) {
      console.log("Not Impemented", entry);
      // await store.dispatch("deleteEntry", entry);
    },
    personName(uuid: string): string {
      return (
        store.state.userdata.session?.participants.find((p) => p.uuid === uuid)
          ?.name ?? ""
      );
    },
    machineTitle(uuid: string): string {
      return (
        store.state.userdata.session?.machines.find((m) => m.uuid === uuid)
          ?.title ?? ""
      );
    },
  },
});
</script>
