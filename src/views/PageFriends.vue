<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Friends</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <friend-search-modal v-if="searchModal" @close="searchModal = false" />
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="searchModal = true">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Friends</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list v-if="friends.length > 0">
        <ion-item v-for="friend in friends" :key="friend.uuid">
          <ion-avatar slot="start">
            <img :src="friend.photo ?? 'https://via.placeholder.com/50x50'" />
          </ion-avatar>
          <ion-label>
            <h2>{{ friend.name }}</h2>
          </ion-label>
        </ion-item>
      </ion-list>
      <ion-list v-else>
        <div class="skeleton-friends">
          <ion-item v-for="i in 5" :key="i">
            <ion-avatar slot="start">
              <ion-skeleton-text></ion-skeleton-text>
            </ion-avatar>
            <ion-label>
              <ion-skeleton-text animated></ion-skeleton-text>
            </ion-label>
          </ion-item>
        </div>
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
  IonSkeletonText,
  onIonViewWillEnter,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/vue";

import { add } from "ionicons/icons";

import store from "@/store";
import FriendSearchModal from "../components/FriendSearchModal.vue";

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
    IonSkeletonText,
    IonFab,
    IonFabButton,
    FriendSearchModal,
    IonIcon,
  },
  data: () => ({
    store,
    add,
    searchModal: false,
  }),
  computed: {
    friends() {
      return store.state.userdata.friends;
    },
  },
  setup() {
    onIonViewWillEnter(async () => {
      console.log("PageFriends:onIonViewWillEnter");
      if (store.state.userdata.friends.length === 0) {
        await store.dispatch.userdata.FETCH_FRIENDS();
      }
    });
  },
});
</script>
