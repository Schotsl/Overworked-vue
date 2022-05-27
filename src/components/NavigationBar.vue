<template>
  <ion-tab-bar slot="bottom">
    <template v-if="hasActiveSession">
      <ion-tab-button tab="close" @click="onClickClose">
        <ion-icon :icon="returnDownBack"></ion-icon>
        <ion-label>Close</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="schedule" href="/schedule">
        <ion-icon :icon="calendarOutline"></ion-icon>
        <ion-label>Schedule</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="entries" href="/entries">
        <ion-icon :icon="listOutline"></ion-icon>
        <ion-label>Entries</ion-label>
      </ion-tab-button>
    </template>
    <template v-else>
      <ion-tab-button tab="session" href="/start">
        <ion-icon :icon="americanFootball"></ion-icon>
        <ion-label>Gym</ion-label>
      </ion-tab-button>
    </template>

    <ion-tab-button tab="friends" href="/friends">
      <ion-icon :icon="peopleOutline"></ion-icon>
      <ion-label>Friends</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="settings" href="/settings">
      <ion-icon :icon="cogOutline"></ion-icon>
      <ion-label>Settings</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/vue";

import {
  cogOutline,
  listOutline,
  peopleOutline,
  calendarOutline,
  returnDownBack,
  americanFootball,
} from "ionicons/icons";
import store from "@/store";

export default defineComponent({
  name: "NavigationBar",

  components: {
    IonIcon,
    IonLabel,
    IonTabBar,
    IonTabButton,
  },

  setup() {
    return {
      cogOutline,
      listOutline,
      peopleOutline,
      calendarOutline,
      returnDownBack,
      americanFootball,
    };
  },

  methods: {
    async onClickClose() {
      store.commit.userdata.SET_SESSION(null);
      await this.$router.push("/");
    },
  },

  computed: {
    hasActiveSession() {
      return store.getters.userdata.hasActiveSession;
    },
  },
});
</script>
