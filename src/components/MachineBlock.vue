<template>
  <li class="hello">
    <h1>{{ title }}</h1>
    <b v-if="isCardio" style="color: red">Is cardio</b>
    <b v-else style="color: green">Is weight</b>

    <div style="display: flex">
      <div>
        <h3>Sets</h3>
        {{ sets }}
      </div>

      <div>
        <h3>Reps</h3>
        {{ reps }}
      </div>
    </div>

    <machine-input
      :cardio="isCardio"
      :machine="machine"
      :persons="persons"
      :location="location"
    />
  </li>
</template>

<script>
import MachineInput from "./MachineInput.vue";

export default {
  name: "MachineBlock",

  data() {
    return {
      title: null,
      image: null,

      reps: null,
      sets: null,
      time: null,

      person: null,
      value: 0,
    };
  },

  props: {
    persons: Array,
    machine: String,
    location: Object,
  },

  methods: {
    async fetchMachine() {
      const domain = process.env.VUE_APP_DOMAIN;
      const method = process.env.VUE_APP_METHOD;
      const version = process.env.VUE_APP_VERSION;

      const response = await fetch(
        `${method}://${domain}/${version}/machine/${this.machine}`
      );
      const parsed = await response.json();

      this.title = parsed.title;
      this.image = parsed.image;

      this.reps = parsed.reps;
      this.sets = parsed.sets;
      this.time = parsed.time;
    },
  },

  computed: {
    isCardio() {
      return typeof this.time !== "undefined";
    },
  },

  components: {
    MachineInput,
  },

  mounted() {
    this.fetchMachine();
  },
};
</script>

<style scoped lang="scss">
li {
  border: 1px solid black;
  margin: 1rem 0;
}
</style>
