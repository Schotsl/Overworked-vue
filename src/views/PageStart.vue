<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Starting a session</ion-title>
        <template v-if="currentPage === pages[pages.length - 1]">
          <ion-button slot="end" fill="clear" @click="saveSession"
            >Finish</ion-button
          >
        </template>
        <template v-else>
          <ion-button slot="end" fill="clear" @click="nextPage"
            >Next</ion-button
          >
        </template>
      </ion-toolbar>
    </ion-header>
    <template v-if="currentPage == 'Friend'">
      <ion-content>
        <ion-item>
          <ion-text color="primary">
            <h2>Who is participating in this session?</h2>
          </ion-text>
        </ion-item>
        <ion-list>
          <ion-item
            v-for="participant in participantsForm"
            :key="participant.item.uuid"
          >
            <ion-avatar slot="start">
              <img
                :src="
                  participant.item.photo ?? 'https://via.placeholder.com/50x50'
                "
              />
            </ion-avatar>
            <ion-label>{{ participant.item.name }}</ion-label>
            <ion-checkbox
              slot="end"
              v-model="participant.checked"
            ></ion-checkbox>
          </ion-item>
        </ion-list>
      </ion-content>
    </template>
    <template v-else-if="currentPage == 'Location'">
      <ion-content>
        <ion-item>
          <ion-text color="primary">
            <h2>Where is this session?</h2>
          </ion-text>
        </ion-item>
        <ion-list>
          <ion-radio-group v-model="locationForm">
            <ion-item v-for="location in locationList" :key="location.uuid">
              <ion-label>{{ location.title }}</ion-label>
              <ion-radio slot="end" :value="location.uuid"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </ion-content>
    </template>
    <template v-else-if="currentPage == 'Day'">
      <ion-content>
        <ion-item>
          <ion-text color="primary">
            <h2>Which schedule would you like?</h2>
          </ion-text>
        </ion-item>
        <ion-list>
          <ion-radio-group v-model="day">
            <ion-item>
              <ion-label>Monday</ion-label>
              <ion-radio slot="end" :value="1"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Tuesday</ion-label>
              <ion-radio slot="end" :value="2"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Wednesday</ion-label>
              <ion-radio slot="end" :value="3"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Thursday</ion-label>
              <ion-radio slot="end" :value="4"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Friday</ion-label>
              <ion-radio slot="end" :value="5"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Saturday</ion-label>
              <ion-radio slot="end" :value="6"></ion-radio>
            </ion-item>
            <ion-item>
              <ion-label>Sunday</ion-label>
              <ion-radio slot="end" :value="0"></ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
      </ion-content>
    </template>
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
  IonLabel,
  IonCheckbox,
  IonRadio,
  IonRadioGroup,
  IonAvatar,
  IonText,
} from "@ionic/vue";
import store from "@/store";
import { Person } from "@/store/types";

type CheckboxItem<T> = {
  item: T;
  checked: boolean;
};

export default defineComponent({
  name: "PageLogin",
  data(): {
    loading: boolean;
    pages: string[];
    currentPage: string;
    day: number;
    participantsForm: CheckboxItem<Person>[];
    locationForm: string;
  } {
    return {
      loading: false,
      pages: ["Friend", "Location", "Day"],
      currentPage: "Friend",
      day: new Date().getDay(),
      participantsForm: [],
      locationForm: "",
    };
  },
  components: {
    IonPage,
    IonTitle,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonRadio,
    IonRadioGroup,
    IonAvatar,
    IonText,
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
  methods: {
    nextPage() {
      const currentPageIndex = this.pages.indexOf(this.currentPage);
      if (currentPageIndex < this.pages.length - 1) {
        this.currentPage = this.pages[currentPageIndex + 1];
      }
    },
    saveSession() {
      this.loading = true;

      const participants = this.participantsForm
        .filter((p) => p.checked)
        .map((p) => p.item);
      const location = this.locationList.find(
        (l) => l.uuid === this.locationForm
      );

      if (!location) return;

      store.commit.userdata.SET_SESSION({
        day: this.day,
        location,
        participants,
      });

      this.loading = false;

      this.$router.push("/schedule");
    },
  },
  watch: {
    personList(newList: Person[]) {
      const part = newList.map((person) => ({
        item: person,
        checked: false,
      }));

      this.participantsForm = part;
    },
  },
  async mounted() {
    await store.dispatch.userdata.FETCH_FRIENDS();
    await store.dispatch.userdata.FETCH_LOCATIONS();
  },
});
</script>
