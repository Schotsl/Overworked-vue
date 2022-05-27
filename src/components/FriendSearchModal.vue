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
    <ion-content fullscreen flex>
      <ion-list>
        <ion-item>
          <ion-label position="stacked">Friend's Email</ion-label>
          <ion-input v-model="username"></ion-input>
        </ion-item>
      </ion-list>
      <ion-list>
        <template v-if="computedEmpty">
          <ion-text class="ion-text-center">😔 No results found</ion-text>
        </template>
        <template v-else-if="persons.length">
          <ion-item v-for="person in persons" :key="person.uuid">
            <ion-avatar slot="start">
              <img :src="person.photo ?? 'https://via.placeholder.com/50x50'" />
            </ion-avatar>
            <ion-label>
              <h2>{{ person.name }}</h2>
            </ion-label>
            <ion-button @click="addFriend(person)"> Add friend </ion-button>
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
  IonAvatar,
  IonList,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonSkeletonText,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/vue";

export default defineComponent({
  name: "FriendSearchModel",
  data(): {
    username: string;
    loading: boolean;
    persons: Array<Person>;
  } {
    return {
      username: "",
      loading: true,
      persons: [],
    };
  },
  watch: {
    async username() {
      this.loading = true;

      if (this.computedUsername.length > 0) {
        const results = await store.dispatch.userdata.SEARCH_FRIENDS({
          username: this.computedUsername,
        });

        this.persons = results;
        this.loading = false;
      } else {
        this.persons = [];
        this.loading = false;
      }
    },
  },
  computed: {
    computedEmpty() {
      return (
        !this.loading &&
        this.persons.length === 0 &&
        this.computedUsername.length !== 0
      );
    },
    computedUsername() {
      return this.username.trim();
    },
  },
  methods: {
    addFriend(person: Person) {
      store.dispatch.userdata.ADD_FRIEND(person);
    },
    closed() {
      this.$emit("closed");
    },
  },
  components: {
    IonModal,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonSkeletonText,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonLabel,
    IonInput,
    IonButton,
  },
  emits: ["closed"],
});
</script>

<style scoped>
ion-text {
  position: absolute;
  top: 43%;
  left: 50%;
  transform: translate(-50%, -50%) !important;
}

ion-list:nth-of-type(2) {
  height: 75%;
  position: relative;
}
</style>
