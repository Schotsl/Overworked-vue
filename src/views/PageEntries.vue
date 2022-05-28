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
          <template>
            <ion-list>
              <ion-item v-for="entry in sessionEntries" :key="entry.uuid">
                <ion-label>
                  <h2>{{ entry.person }}</h2>
                  <p>{{ entry.machine }}</p>
                </ion-label>
                <ion-button slot="end" fill="clear" @click="deleteEntry(entry)">
                  <ion-icon name="trash"></ion-icon>
                </ion-button>
              </ion-item>
            </ion-list>
          </template>
        </ion-toolbar>
      </ion-header>
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
} from "@ionic/vue";
import store from "@/store";
import { Entry } from "@/store/types";

export default defineComponent({
  name: "PageEntries",
  components: {
    IonPage,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
  },
  data() {
    return {
      loading: true,
    };
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
  },
  async mounted() {
    this.loading = true;
    await store.dispatch.userdata.FETCH_SESSION_ENTRIES();
    this.loading = false;
  },
});
</script>
