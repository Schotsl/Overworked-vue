<template>
  <section class="where">
    <h1>Where are you gyming</h1>

    <form @submit.prevent="selectedLocation">
      <div v-for="object in locations" :key="object.uuid">
        <input
          :id="object.uuid"
          :value="object"

          type="radio"
          name="location"

          v-model="location"
        />
        <label :for="object.uuid">{{ object.title }}</label>
      </div>

      <button type="submit">Done</button>
    </form>
  </section>
</template>

<script>
import router from "../router/index";
import store from "../store/index";

export default {
  name: "Where",

  emits: ["selected-location"],

  data() {
    return {
      location: null,
      locations: [],
    };
  },

  methods: {
    async fetchLocations() {
      const date = new Date();
      const day = date.getDay();

      const domain = process.env.VUE_APP_DOMAIN;
      const method = process.env.VUE_APP_METHOD;
      const version = process.env.VUE_APP_VERSION;

      const response = await fetch(
        `${method}://${domain}/${version}/location?limit=99`
      );

      const parsed = await response.json();
      const schedules = store.getters.getSchedule;
      const schedule = schedules[day];

      this.locations = parsed.locations;
      this.location = this.locations.find(location => {
        return location.uuid === schedule.location;
      });
    },

    selectedLocation() {
      // Select the current day from the schedule
      const date = new Date();
      const day = date.getDay();

      const schedules = store.getters.getSchedule;
      const schedule = schedules[day];

      // Store the location UUID in the store based on the current day
      schedule.location = this.location.uuid;

      this.$emit("selected-location", this.location);

      store.commit("setSchedule", schedules);
      router.push("/overview");
    },
  },

  mounted() {
    this.fetchLocations();
  },
};
</script>
