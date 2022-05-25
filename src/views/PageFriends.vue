<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Friends</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Friends</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <ion-item v-for="friend in friends" :key="friend.uuid">
          <ion-avatar slot="start">
            <img src="https://via.placeholder.com/50x50" />
          </ion-avatar>
          <ion-label>
            <h2>{{ friend.first }} {{ friend.last }}</h2>
          </ion-label>
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
  IonAvatar,
  IonLabel,
} from "@ionic/vue";

import store from "@/store";

export default defineComponent({
  name: "PageFriends",
  components: {
    IonPage,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
  },
  data: () => ({
    store,
  }),
  methods: {
    async fetchFriends() {
      await store.dispatch.gym.FETCH_FRIENDS();
    },
  },
  computed: {
    friends() {
      return store.state.gym.friends;
    },
  },
  mounted() {
    if (store.state.gym.friends.length === 0) {
      this.fetchFriends();
    }
  },
});
</script>
