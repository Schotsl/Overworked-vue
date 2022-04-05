<template>
  <section class="who">
    <h1>Who are you gyming with</h1>

    <form @submit.prevent="selectedPersons">
      <div v-for="person in persons" :key="person.uuid">
        <input :id="person.uuid" type="checkbox" v-model="person.checked" />
        <label :for="person.uuid">{{ person.first }} {{ person.last }}</label>
      </div>

      <button type="submit">Done</button>
    </form>
  </section>
</template>

<script>
import router from "../router/index";
import store from "../store/index";

export default {
  name: "Who",

  emits: ["selected-persons"],

  data() {
    return {
      persons: [],
    };
  },

  methods: {
    async fetchPersons() {
      const date = new Date();
      const day = date.getDay();

      const domain = process.env.VUE_APP_DOMAIN;
      const method = process.env.VUE_APP_METHOD;
      const version = process.env.VUE_APP_VERSION;

      const response = await fetch(
        `${method}://${domain}/${version}/person?limit=99`
      );

      const parsed = await response.json();
      const schedules = store.getters.getSchedule;

      const schedule = schedules[day];
      const persons = schedule.persons;

      this.persons = parsed.persons.map((person) => {
        return { ...person, checked: persons.includes(person.uuid) };
      });
    },

    selectedPersons() {
      // Remove every person that isn't checked
      const persons = this.persons.filter((person) => {
        return person.checked;
      });

      // Select the current day from the schedule
      const date = new Date();
      const day = date.getDay();

      const schedules = store.getters.getSchedule;
      const schedule = schedules[day];

      // Store the persons UUID in the store based on the current day
      schedule.persons = persons.map((person) => {
        return person.uuid;
      });

      this.$emit("selected-persons", persons);

      store.commit("setSchedule", schedules);
      router.push("/where");
    },
  },

  mounted() {
    this.fetchPersons();
  },
};
</script>
