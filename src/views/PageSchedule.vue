<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Schedule</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Schedule</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-list-header>
          <ion-label>Name</ion-label>
        </ion-list-header>

        <ion-item>
          <ion-label>Sjors van Holst</ion-label>
          <ion-checkbox slot="end"></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>Martin Goes</ion-label>
          <ion-checkbox slot="end"></ion-checkbox>
        </ion-item>

        <ion-item>
          <ion-label>Lanxiang Vermeulen</ion-label>
          <ion-checkbox slot="end"></ion-checkbox>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-radio-group value="biff">
          <ion-list-header>
            <ion-label>Location</ion-label>
          </ion-list-header>

          <ion-item>
            <ion-label>Basic-Fit Toolenburg</ion-label>
            <ion-radio slot="start" value="biff"></ion-radio>
          </ion-item>

          <ion-item>
            <ion-label>Basic-Fit Nieuw-Vennep</ion-label>
            <ion-radio slot="start" value="griff"></ion-radio>
          </ion-item>

          <ion-item>
            <ion-label>Basic-Fit J.C. Beetslaan</ion-label>
            <ion-radio slot="start" value="buford"></ion-radio>
          </ion-item>
        </ion-radio-group>
      </ion-list>

      <ion-item>
        <ion-label>Day</ion-label>
        <ion-select value="0" ok-text="Okay" cancel-text="Dismiss">
          <ion-select-option value="0">Monday</ion-select-option>
          <ion-select-option value="1">Tuesday</ion-select-option>
          <ion-select-option value="2">Wednesday</ion-select-option>
          <ion-select-option value="3">Thursday</ion-select-option>
          <ion-select-option value="4">Friday</ion-select-option>
          <ion-select-option value="5">Saturday</ion-select-option>
          <ion-select-option value="6">Sunday</ion-select-option>
        </ion-select>
      </ion-item>
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
  IonCheckbox,
} from "@ionic/vue";

export default defineComponent({
  name: "PageSchedule",
  components: {
    IonPage,
    IonTitle,
    IonHeader,
    IonContent,
    IonToolbar,
    IonCheckbox,
  },
});
</script>
