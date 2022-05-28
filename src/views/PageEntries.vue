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
            <h2>{{ getPerson(entry.person)?.name ?? "Invalid Person" }}</h2>
            <p>
              <ion-icon :icon="barbellOutline"></ion-icon>
              <ion-text>{{ entry.weight }}KG</ion-text>
              <ion-icon :icon="readerOutline"></ion-icon>
              <ion-text>{{
                getMachine(entry.machine)?.title ?? "Invalid Machine"
              }}</ion-text>
            </p>
          </ion-label>
          <ion-icon @click="deleteEntry(entry)" :icon="hammerOutline" />
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
  IonText,
} from "@ionic/vue";
import store from "@/store";
import { Entry, Machine, Person } from "@/store/types";
import { hammerOutline, barbellOutline, readerOutline } from "ionicons/icons";

export default defineComponent({
  name: "PageEntries",
  setup() {
    return {
      hammerOutline,
      barbellOutline,
      readerOutline,
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
    IonText,
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
    getPerson(uuid: string): Person | null {
      return (
        store.state.userdata.session?.participants.find(
          (p) => p.uuid === uuid
        ) ?? null
      );
    },
    getMachine(uuid: string): Machine | null {
      return (
        store.state.userdata.session?.machines.machines.find(
          (m) => m.uuid === uuid
        ) ?? null
      );
    },
  },
});
</script>

<style>
ion-icon {
  margin-bottom: -2.2px;
  margin-right: 4px;
}

ion-text {
  margin-right: 10px;
}
</style>
