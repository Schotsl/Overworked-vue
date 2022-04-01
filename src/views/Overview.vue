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
      <machine-item 
        v-for="objects in parsed"

        :key="objects.uuid"
        :machine="objects.machine"
        :persons="objects.persons"
        :location="location"
      />
    <!-- </ul> -->
  </section>
</template>

<script>
// import store from "../store/index";
import MachineItem from "../components/MachineItem";
// import MachineBlock from "../components/MachineBlock";

export default {
  name: 'Overview',

  props: [
    'persons',
    'location',
  ],

  data() {
    return {
      day: 0,
      parsed: [],
    }
  },

  methods: {
    async fetchSchedules() {
      this.parsed = [];

      const domain = process.env.VUE_APP_DOMAIN
      const method = process.env.VUE_APP_METHOD;
      const version = process.env.VUE_APP_VERSION;
      
      const promises = this.persons.map(async person => {
        const response = await fetch(`${method}://${domain}/${version}/schedule?day=${this.day}&person=${person.uuid}&limit=99`);
        const parsed = await response.json();

        return { ...parsed, person };
      });

      const results = await Promise.all(promises);
      const complex = results.map(response => response.schedules);
      const schedules = complex.flat();

      schedules.forEach(schedule => {
        // We're gonna group by machine so search using machine UUID
        const person = this.persons.find(person => {
          return person.uuid == schedule.person;
        });

        const result = this.parsed.find(object => {
          return object.machine === schedule.machine
        });

        // Add the person UUID and return if the machine has been found
        if (result) {
          result.persons.push(person);
          return;
        }

        // If the machine doesn't exist we will create the entry
        this.parsed.push({
          machine: schedule.machine,
          persons: [ person ],
        });
      });
    },
  },

  components: {
    MachineItem,
    // MachineBlock
  },

  mounted() {
    const date = new Date();
    const day = date.getDay();

    this.day = day;
    this.fetchSchedules();
  }
}
</script>

<style lang="scss" scoped>
.overview {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  select {
    margin: 1.5rem 1.5rem 0rem;
    line-height: 1.65;
  }

  .section {
    flex: 1;
    width: 100%;
    position: relative;
  }
}
</style>