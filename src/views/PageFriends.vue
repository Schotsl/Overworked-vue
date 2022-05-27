<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Friends</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <friend-search-modal v-if="modal" @closed="closeModal" />
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="openModal">
          <ion-icon :icon="add" />
        </ion-fab-button>
      </ion-fab>

      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Friends</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <template v-if="computedEmpty">
          <ion-text class="ion-text-center"
            >You don't have any friends yet, you can find some by clicking
            <span @click="openModal">here</span>!</ion-text
          >
        </template>
        <template v-else-if="computedFriends.length">
          <ion-item v-for="friend in computedFriends" :key="friend.uuid">
            <ion-avatar slot="start">
              <img :src="friend.photo ?? 'https://via.placeholder.com/50x50'" />
            </ion-avatar>
            <ion-label>
              <h2>{{ friend.name }}</h2>
            </ion-label>
          </ion-item>
        </template>
        <template v-else>
          <ion-item v-for="i in 5" :key="i">
            <ion-avatar slot="start">
              <ion-skeleton-text></ion-skeleton-text>
            </ion-avatar>
            <ion-label>
              <ion-skeleton-text animated></ion-skeleton-text>
            </ion-label>
          </ion-item>
        </template>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { add } from "ionicons/icons";
import { Person } from "../store/types";
import { defineComponent } from "vue";
import {
  IonPage,
  IonTitle,
  IonText,
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
  IonIcon,
} from "@ionic/vue";

import store from "@/store";
import FriendSearchModal from "../components/FriendSearchModal.vue";

export default defineComponent({
  name: "PageFriends",

  data(): {
    modal: boolean;
    loading: boolean;
  } {
    return {
      modal: false,
      loading: true,
    };
  },

  methods: {
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
  },

  computed: {
    computedEmpty(): boolean {
      return !this.loading && this.computedFriends.length === 0;
    },
    computedFriends(): Person[] {
      return store.state.userdata.friends;
    },
  },

  setup() {
    return {
      add,
    };
  },

  // TODO: Shouldn't be needed since we'll load everything at the start of the app
  async mounted() {
    this.loading = true;
    await store.dispatch.userdata.FETCH_FRIENDS();
    this.loading = false;
  },

  components: {
    IonPage,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonText,
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
});
</script>

<style scoped>
ion-text {
  top: 43%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%) !important;
}

ion-list {
  height: 100%;
  position: relative;
}

span {
  color: var(--ion-color-primary);
  cursor: pointer;
  text-decoration: underline;
}
</style>
