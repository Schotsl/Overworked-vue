<template>
  <section class="overview">
    <select v-model.number="day" @change="fetchSchedules">
      <option value="1">Monday</option>
      <option value="2">Tuesday</option>
      <option value="3">Wednesday</option>
      <option value="4">Thursday</option>
      <option value="5">Friday</option>
      <option value="6">Saturday</option>
      <option value="0">Sunday</option>
    </select>

    <!-- <machine-item /> -->

    <!-- <ul> -->
    <span v-if="!schedulesLoaded">Loading...</span>

    <machine-item
      v-for="objects in parsed"
      v-show="schedulesLoaded"
      :key="objects.machine"
      :machine="objects.machine"
      :persons="objects.persons"
      :location="location"
      :toggled="objects.toggled"
      @dropdown-loaded="dropdownLoaded"
      @dropdown-emptied="dropdownEmptied"
      @dropdown-toggled="dropdownToggled"
    />
    <!-- </ul> -->
  </section>
</template>

<script>
import MachineItem from "../components/MachineItem";

const DOMAIN = process.env.VUE_APP_DOMAIN;
const METHOD = process.env.VUE_APP_METHOD;
const VERSION = process.env.VUE_APP_VERSION;

export default {
  name: "Overview",

  props: ["persons", "location"],

  data() {
    return {
      day: 0,
      parsed: [],
    };
  },

  methods: {
    async fetchSchedules() {
      this.parsed = [];

      const promises = this.persons.map(async (person) => {
        const response = await fetch(
          `${METHOD}://${DOMAIN}/${VERSION}/schedule?day=${this.day}&person=${person.uuid}&limit=99`
        );
        const parsed = await response.json();

        return { ...parsed, person };
      });

      const results = await Promise.all(promises);
      const complex = results.map((response) => response.schedules);
      const schedules = complex.flat();

      schedules.forEach((schedule) => {
        // We're gonna group by machine so search using machine UUID
        const person = this.persons.find((person) => {
          return person.uuid == schedule.person;
        });

        const result = this.parsed.find((object) => {
          return object.machine === schedule.machine;
        });

        // Add the person UUID and return if the machine has been found
        if (result) {
          result.persons.push(person);
          return;
        }

        // If the machine doesn't exist we will create the entry
        this.parsed.push({
          loaded: false,
          toggled: false,
          machine: schedule.machine,
          persons: [person],
        });
      });
    },

    dropdownLoaded(uuid) {
      const parsed = this.parsed.find((parsed) => {
        return parsed.machine === uuid;
      });

      parsed.loaded = true;
    },

    dropdownEmptied(uuid) {
      this.parsed = this.parsed.filter((parsed) => {
        return parsed.machine !== uuid;
      });
    },

    dropdownToggled(uuid) {
      this.parsed.forEach((parsed) => {
        if (parsed.machine !== uuid) {
          parsed.toggled = false;
        } else {
          parsed.toggled = !parsed.toggled;
        }
      });
    },
  },

  computed: {
    schedulesLoaded() {
      return this.parsed.every((parsed) => {
        return parsed.loaded;
      });
    },
  },

  components: {
    MachineItem,
  },

  mounted() {
    const date = new Date();
    const day = date.getDay();

    this.day = day;
    this.fetchSchedules();
  },
};
</script>

<style lang="scss" scoped>
.overview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  select {
    margin: 0 0 1.5rem;
    line-height: 1.65;
  }

  .section {
    flex: 1;
    width: 100%;
    position: relative;
  }
}
</style>
