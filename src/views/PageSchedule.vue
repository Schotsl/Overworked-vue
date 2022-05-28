<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Schedule</ion-title>
        <ion-item slot="end">
          <ion-select v-model="dayForm" ok-text="Okay" cancel-text="Dismiss">
            <ion-select-option :value="1">Monday</ion-select-option>
            <ion-select-option :value="2">Tuesday</ion-select-option>
            <ion-select-option :value="3">Wednesday</ion-select-option>
            <ion-select-option :value="4">Thursday</ion-select-option>
            <ion-select-option :value="5">Friday</ion-select-option>
            <ion-select-option :value="6">Saturday</ion-select-option>
            <ion-select-option :value="0">Sunday</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Schedule</ion-title>
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
  IonSelect,
  IonItem,
  IonSelectOption,
} from "@ionic/vue";
import store from "@/store";

export default defineComponent({
  name: "PageSchedule",
  components: {
    IonPage,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonSelect,
    IonSelectOption,
    IonItem,
  },
  data() {
    return {
      dayForm: store.state.userdata.session?.day || 0,
    };
  },
  watch: {
    dayForm(formInput: number) {
      store.commit.userdata.SET_SESSION_DAY(formInput);
    },
    day(storeChange: number) {
      this.dayForm = storeChange;
    },
  },
  computed: {
    day() {
      return store.state.userdata.session?.day || 0;
    },
  },
});
</script>
