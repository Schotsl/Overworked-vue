<template>
  <ion-tabs>
    <ion-router-outlet>
      <Route path="/settings" component="{PageSettings}" exact />
      <Route path="/schedule" component="{PageSchedule}" exact />
      <Route path="/entries" component="{PageEntries}" exact />
      <Route path="/friends" component="{PageFriends}" exact />
    </ion-router-outlet>

    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="schedule" href="/schedule">
        <ion-icon :icon="calendarOutline"></ion-icon>
        <ion-label>Schedule</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="entries" href="/entries">
        <ion-icon :icon="listOutline"></ion-icon>
        <ion-label>Entries</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="friends" href="/friends">
        <ion-icon :icon="peopleOutline"></ion-icon>
        <ion-label>Friends</ion-label>
      </ion-tab-button>

      <ion-tab-button tab="settings" href="/settings">
        <ion-icon :icon="cogOutline"></ion-icon>
        <ion-label>Settings</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonIcon,
  IonTabs,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
} from "@ionic/vue";

import {
  cogOutline,
  listOutline,
  peopleOutline,
  calendarOutline,
} from "ionicons/icons";

export default defineComponent({
  name: "NavigationBar",

  components: {
    IonIcon,
    IonTabs,
    IonLabel,
    IonTabBar,
    IonTabButton,
    IonRouterOutlet,
  },

  setup() {
    return {
      cogOutline,
      listOutline,
      peopleOutline,
      calendarOutline,
    };
  },
});
</script>
