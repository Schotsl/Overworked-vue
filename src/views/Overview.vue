<template>
  <section class="where">
    <h1>Let's fucking hit it</h1>
    <ul>
      <machine-block 
        v-for="parsedSchedule in parsedSchedules"

        :key="parsedSchedule.uuid"
        :machine="parsedSchedule.machine"
        :persons="parsedSchedule.persons"
        :location="location"
      />
    </ul>
  </section>
</template>

<script>
// import store from "../store/index";
import MachineBlock from "../components/MachineBlock";

export default {
  name: 'Overview',

  props: [
    'persons',
    'location',
  ],

  data() {
    return {
      schedules: [],
    }
  },

  methods: {
    async fetchSchedules() {
      const domain = process.env.VUE_APP_DOMAIN
      const method = process.env.VUE_APP_METHOD;
      const version = process.env.VUE_APP_VERSION;
      
      const date = new Date();
      const day = date.getDay() - 1;

      const promises = this.persons.map(async person => {
        const response = await fetch(`${method}://${domain}/${version}/schedule?day=${day}&person=${person.uuid}&limit=99`);
        const parsed = await response.json();

        return { ...parsed, person };
      });

      const results = await Promise.all(promises);
      const complex = results.map(response => response.schedules);
      const schedules = complex.flat();

      this.schedules = schedules;
    },
  },

  computed: {
    parsedSchedules() {
      const machines = [];

      const persons = this.persons;
      const schedules = this.schedules;

      schedules.forEach(schedule => {
        // We're gonna group by machine so search using machine UUID
        const person = persons.find(person => {
          return person.uuid == schedule.person;
        });

        const result = machines.find(object => {
          return object.machine === schedule.machine
        });

        // Add the person UUID and return if the machine has been found
        if (result) {
          result.persons.push(person);
          return;
        }

        // If the machine doesn't exist we will create the entry
        machines.push({
          machine: schedule.machine,
          persons: [ person ],
        });
      });

      return machines;
    }
  },

  components: {
    MachineBlock
  },

  mounted() {
    this.fetchSchedules();
  }
}
</script>
