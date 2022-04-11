<template>
  <section class="overview">
    <div style="display: flex">
      <select v-model.number="day" @change="fetchSchedules">
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
        <option value="0">Sunday</option>
      </select>

      <button @click="filtered = !filtered" :class="{ inactive: !filtered }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      </button>
    </div>

    <!-- <machine-item /> -->

    <!-- <ul> -->
    <span v-if="!schedulesLoaded">Loading...</span>

    <machine-item
      v-for="objects in schedulesFiltered"
      v-show="schedulesLoaded"
      :key="objects.machine"
      :filtered="filtered"
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
import router from "../router/index";

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
      filtered: true,
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
          empty: false,
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
      const parsed = this.parsed.find((parsed) => {
        return parsed.machine === uuid;
      });

      parsed.empty = true;
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
      return this.schedulesFiltered.every((parsed) => {
        return parsed.loaded;
      });
    },

    schedulesFiltered() {
      return this.parsed.filter((parsed) => {
        return this.filtered ? !parsed.empty : true;
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

    // Send the user too the start if no data is set
    if (this.persons.length === 0 || typeof this.location === "undefined") {
      router.push("/");
    }
  },
};
</script>

<style lang="scss" scoped>
.overview {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  select,
  button {
    margin: 0 0 1.5rem;
    height: 4rem;
  }

  select {
    flex: 1;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      stroke: #fff;
    }
  }

  .inactive {
    background-color: #e9e9ed;
    border: 1px solid #ced4da;

    svg {
      stroke: #000;
    }
  }

  button {
    width: 4rem;
    margin: 0 0 0 1rem;
  }

  .section {
    flex: 1;
    width: 100%;
    position: relative;
  }
}
</style>
