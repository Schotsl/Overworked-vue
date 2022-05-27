<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Start</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-text color="primary">
        <h2>Who are you gyming with?</h2>
      </ion-text>
      <ion-list>
        <ion-list-header>
          <ion-label>Name</ion-label>
        </ion-list-header>

        <ion-item v-for="person in personList" :key="person.uuid">
          <ion-label>{{ person.name }}</ion-label>
          <ion-checkbox slot="end"></ion-checkbox>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header>
          <ion-label>Locations</ion-label>
        </ion-list-header>

        <ion-radio-group>
          <ion-item v-for="location in locationList" :key="location.uuid">
            <ion-label>{{ location.title }}</ion-label>
            <ion-radio slot="end"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonText,
  IonPage,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonContent,
  onIonViewWillEnter,
  IonList,
  IonListHeader,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonRadio,
  IonRadioGroup,
} from "@ionic/vue";
import store from "@/store";

export default defineComponent({
  name: "PageLogin",
  data() {
    onIonViewWillEnter(() => {
      store.dispatch.userdata.FETCH_FRIENDS();
      store.dispatch.userdata.FETCH_LOCATIONS();
    });
    return {
      loading: false,
    };
  },
  components: {
    IonText,
    IonPage,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonRadio,
    IonRadioGroup,
  },
  computed: {
    personList() {
      return store.getters.userdata.friends;
    },
    machineList() {
      return store.getters.userdata.machines;
    },
    locationList() {
      return store.getters.userdata.locations;
    },
  },
});
</script>
