<template>
  <li class="hello">
    <h1>{{ title }}</h1>

    <div style="display: flex;">
      <div>
        <h3>Sets</h3>
        {{ sets }}
      </div>

      <div>
        <h3>Reps</h3>
        {{ reps }}
      </div>
    </div>

    <form>
               <label for="fname">{{ isCardio ? 'time' : 'weight' }}</label>
<input type="number" id="fname" v-model="value" name="fname"> 
      <select v-model="person">
        <option v-for="person in persons" :value="person.uuid" :key="person.uuid">{{ person.first }} {{ person.last }}</option>
      </select>
      <a href="#" @click="addEntry">Send</a>
    </form>
  </li>
</template>

<script>
export default {
  name: 'MachineBlock',

  data() {
    return {
      title: null,
      image: null,

      reps: null,
      sets: null,
      time: null,


      person: null,
      value: 0,
    }
  },


  props: {
    persons: Array,
    machine: String,
    location: Object,
  },

    methods: {
      async fetchMachine() {
        const domain = process.env.VUE_APP_DOMAIN
        const method = process.env.VUE_APP_METHOD;
        const version = process.env.VUE_APP_VERSION;
        
        const response = await fetch(`${method}://${domain}/${version}/machine/${this.machine}`);
        const parsed = await response.json();

        this.title = parsed.title;
        this.image = parsed.image;

        this.reps = parsed.reps;
        this.sets = parsed.sets;
        this.time = parsed.time;
      },

      // async fetchEntry() {
      //   const domain = process.env.VUE_APP_DOMAIN
      //   const method = process.env.VUE_APP_METHOD;
      //   const version = process.env.VUE_APP_VERSION;   

      //   const response = await fetch(`${method}://${domain}/${version}/entry?machine=${this.machine}&location=${this.location.uuid}&person=`);
      //   const parsed = await response.json();
      //   console.log(parsed);
      // },

      async addEntry() {
        const domain = process.env.VUE_APP_DOMAIN
        const method1 = process.env.VUE_APP_METHOD;
        const version = process.env.VUE_APP_VERSION;

        const headers = { 'Content-Type': 'application/json' };
        const method = "POST";
        const label = this.isCardio ? 'time' : 'weight';
        const body = JSON.stringify({
          [label]: this.value,
          machine: this.machine,
          person: this.person,
          location: this.location.uuid
        });

        await fetch(`${method1}://${domain}/${version}/entry`, { headers, method, body });
      }
  },

  computed: {
    isCardio() {
      return typeof this.time !== "undefined";
    }
  },

  mounted() {
    this.fetchMachine();
    this.fetchEntry();
  }
}
</script>

<style scoped lang="scss">
li {
  border: 1px solid black;
  margin: 1rem 0;
}
</style>
