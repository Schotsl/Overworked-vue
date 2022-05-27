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
          <ion-input v-model="username"></ion-input>
        </ion-item>
      </ion-list>
      <ion-list>
        <template v-if="persons.length">
          <ion-item v-for="person in persons" :key="person.uuid">
            <ion-avatar slot="start">
              <img :src="person.photo ?? 'https://via.placeholder.com/50x50'" />
            </ion-avatar>
            <ion-label>
              <h2>{{ person.name }}</h2>
            </ion-label>
            <ion-button>
              <ion-skeleton-text animated> </ion-skeleton-text>
              Add friend
            </ion-button>
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
  </ion-modal>
</template>

<script lang="ts">
import store from "../store";
import { Person } from "../store/types";
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
  data(): {
    username: string;
    persons: Array<Person>;
  } {
    return {
      username: "",
      persons: [],
    };
  },
  watch: {
    async username(username) {
      if (username.length > 0) {
        this.persons = await store.dispatch.userdata.SEARCH_FRIENDS({
          username,
        });
      }
    },
  },
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
