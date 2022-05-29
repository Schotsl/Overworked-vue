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
      <ion-list>
        <ion-item v-for="machine in sessionMachines" :key="machine.uuid">
          <ion-label>
            <h2>{{ machine.title }}</h2>
            <div v-for="entry in machine.entries" :key="entry.uuid">
              <h4>{{ getPerson(entry.person)?.name }}</h4>
            </div>
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
  IonSelect,
  IonItem,
  IonSelectOption,
  IonList,
  IonLabel,
} from "@ionic/vue";
import store from "@/store";
import { Machine, Person } from "@/store/types";

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
    IonList,
    IonLabel,
  },
  data() {
    return {
      dayForm: store.state.userdata.session?.day || 0,
    };
  },
  watch: {
    async dayForm(formInput: number) {
      store.commit.userdata.SET_SESSION_DAY(formInput);
      await store.dispatch.userdata.FETCH_SESSION_ENTRIES();
      await store.dispatch.userdata.FETCH_SESSION_MACHINES();
      await store.dispatch.userdata.FETCH_SESSION_SCHEDULE();
    },
    day(storeChange: number) {
      this.dayForm = storeChange;
    },
  },
  computed: {
    day() {
      return store.state.userdata.session?.day || 0;
    },
    sessionMachines() {
      return store.state.userdata.session?.schedule.machines || [];
    },
  },
  methods: {
    getPerson(uuid: string): Person | null {
      return (
        store.state.userdata.session?.participants.find(
          (p) => p.uuid === uuid
        ) ?? null
      );
    },
    getMachine(uuid: string): Machine | null {
      return (
        store.state.userdata.session?.machines.machines.find(
          (m) => m.uuid === uuid
        ) ?? null
      );
    },
  },
});
</script>
