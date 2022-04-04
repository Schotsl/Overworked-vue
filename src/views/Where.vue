<template>
  <section class="where">
    <h1>Where are you gyming</h1>

    <form @submit.prevent="selectedLocation">
      <div v-for="location in locations" :key="location.uuid">
        <input
          :id="location.uuid"
          type="radio"
          name="location"
          v-model="location.checked"
        />
        <label :for="location.uuid">{{ location.title }}</label>
      </div>

      <button type="submit">Done</button>
    </form>
  </section>
</template>

<script>
import router from "../router/index";

export default {
  name: "Where",

  emits: ["selected-location"],

  data() {
    return {
      locations: [],
    };
  },

  methods: {
    async fetchLocations() {
      const domain = process.env.VUE_APP_DOMAIN;
      const method = process.env.VUE_APP_METHOD;
      const version = process.env.VUE_APP_VERSION;

      const response = await fetch(
        `${method}://${domain}/${version}/location?limit=99`
      );
      const parsed = await response.json();

      this.locations = parsed.locations.map((location) => {
        return { ...location, checked: false };
      });
    },

    selectedLocation() {
      let locations = this.locations;

      // Remove every location that isn't checked
      locations = locations.filter((location) => {
        return location.checked;
      });

      this.$emit("selected-location", locations[0]);

      router.push("/overview");
    },
  },

  mounted() {
    this.fetchLocations();
  },
};
</script>
