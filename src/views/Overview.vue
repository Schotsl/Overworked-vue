<template>
  <section class="where">
    <h1>Let's fucking hit it</h1>
    {{ parsedSchedules }}
  </section>
</template>

<script>
// import store from "../store/index";

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
      const day = date.getDay();

      const promises = this.persons.map(async person => {
        const response = await fetch(`${method}://${domain}/${version}/schedule?day=${day}&person=${person}&limit=99`);
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
      const schedules = this.schedules;

      schedules.forEach(schedule => {
        // We're gonna group by machine so search using machine UUID
        const result = machines.find(object => {
          return object.machine == schedule.machine
        });

        // Add the person UUID and return if the machine has been found
        if (result) {
          result.persons.push(schedule.person);
          return;
        }

        // If the machine doesn't exist we will create the entry
        machines.push({
          machine: schedule.machine,
          persons: [ schedule.person ],
        });
      });

      return machines;
    }
  },

  // components: {
  //   // HelloWorld
  // },

  mounted() {
    this.fetchSchedules();
  }
}
</script>
