<template>
  <form>
    {{ values }}
    <label for="fname">{{ cardio ? 'time' : 'weight' }}</label>
    <input type="number" id="fname" v-model="value" name="fname"> 

    <select v-model="person" @change="setValue">
      <option v-for="person in persons" :value="person.uuid" :key="person.uuid">{{ person.first }} {{ person.last }}</option>
    </select>

    <a href="#" @click="addEntry">Send</a>
  </form>
</template>

<script>
export default {
  name: 'MachineInput',

  data() {
    return {
      value: 0,
      person: null,
      values: [],
    }
  },


  props: {
    cardio: Boolean,
    persons: Array,
    machine: String,
    location: Object,
  },

    methods: {
      setValue() {
        const index = this.persons.findIndex((person) => {
          return this.person === person.uuid;
        });

        this.value = this.values[index];
      },

      async fetchEntry() {
        const domain = process.env.VUE_APP_DOMAIN
        const method = process.env.VUE_APP_METHOD;
        const version = process.env.VUE_APP_VERSION;   

        const promises = this.persons.map(person => {
          return new Promise((resolve, reject) => {
            fetch(`${method}://${domain}/${version}/entry?machine=${this.machine}&location=${this.location.uuid}&person=${person.uuid}`)
              .then(response => {
                response.json()
                  .then(parsed => {
                    const block = parsed.entries[0];
                    const value = block ? this.cardio ? block.weight : block.time : 0;
                    // console.log(value);
                    resolve(value);
                  })
                  .catch(error => {
                    reject(error);
                  });
              })
              .catch(error => {
                reject(error);
              });
          });
        });

        this.values = await Promise.all(promises);
        this.setValue();

        // console.log(parsed);
      },

      async addEntry() {
        const domain = process.env.VUE_APP_DOMAIN
        const method1 = process.env.VUE_APP_METHOD;
        const version = process.env.VUE_APP_VERSION;

        const headers = { 'Content-Type': 'application/json' };
        const method = "POST";
        const label = this.cardio ? 'time' : 'weight';
        const body = JSON.stringify({
          person: this.person,
          [label]: this.value,
          machine: this.machine,
          location: this.location.uuid
        });

        await fetch(`${method1}://${domain}/${version}/entry`, { headers, method, body });
      }
  },

  mounted() {
    this.fetchEntry();
    this.person = this.persons[0].uuid;
  }
}
</script>

<style scoped lang="scss">
li {
  border: 1px solid black;
  margin: 1rem 0;
}
</style>
