<template>
  <section class="who">
    <h1>Who are you gyming with</h1>
    
    <form @submit.prevent="selectedPersons">
      <div v-for="person in persons" :key="person.uuid">
        <input :id="person.uuid" type="checkbox" v-model="person.checked">
        <label :for="person.uuid">{{ person.first }} {{ person.last }}</label>
      </div>

      <div>
        <button type="submit">Done</button>
      </div>
    </form>

  </section>
</template>

<script>
import router from "../router/index";

export default {
  name: 'Who',

  emits: [
    'selected-persons'
  ],

  data() {
    return {
      persons: []
    }
  },

  methods: {
    async fetchPersons() {
      const domain = process.env.VUE_APP_DOMAIN
      const method = process.env.VUE_APP_METHOD;
      const version = process.env.VUE_APP_VERSION;
      
      const response = await fetch(`${method}://${domain}/${version}/person?limit=99`);
      const parsed = await response.json();

      this.persons = parsed.persons.map(person => {
        return { ...person, checked: false };
      });
    },

    selectedPersons() {
      let persons = this.persons;

      // Remove every person that isn't checked
      persons = persons.filter(person => {
        return person.checked;
      });

      this.$emit('selected-persons', persons);

      router.push('/where');
    }
  },

  mounted() {
    this.fetchPersons();
  }
}
</script>
