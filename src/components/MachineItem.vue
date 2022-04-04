<template>
  <div class="machine">
    <div class="container" @click="toggled = !toggled">
      <h2>{{ machine }} {{ title }}</h2>
    </div>

    <div class="dropdown" v-if="toggled">
      <template v-if="entry.backup">
        <div class="row">
          <div class="labels">
            <h3 class="warning">
              You've never done this workout on this location!
            </h3>
          </div>
        </div>
      </template>

      <div class="row">
        <template v-if="isUsed">
          <template v-if="isCardio">
            <div class="labels">
              <h3>Time</h3>
              <h4>{{ time }}</h4>
            </div>

            <div class="labels">
              <h3>Speed</h3>
              <h4>{{ entry.speed }}</h4>
            </div>
          </template>

          <template v-else>
            <div class="labels">
              <h3>Sets</h3>
              <h4>{{ sets }}</h4>
            </div>

            <div class="labels">
              <h3>Reps</h3>
              <h4>{{ reps }}</h4>
            </div>

            <div class="labels right">
              <h3>Weight</h3>
              <h4>{{ entry.weight }}</h4>
            </div>
          </template>
        </template>

        <template v-else>
          <div class="labels">
            <h3>There's a first for everything</h3>
            <h4>Goodluck!</h4>
          </div>
        </template>
      </div>

      <div class="row">
        <div class="labels">
          <span>Person</span>

          <select v-model="entry" @change="value = entryValue">
            <option
              v-for="entry in entryFiltered"
              :key="entry.person"
              :value="entry"
            >
              {{ entry.first }} {{ entry.last }}
            </option>
          </select>
        </div>
      </div>

      <div class="row">
        <div class="labels">
          <span :class="{ invalid: isInvalid }">{{ entryType }}</span>
          <input
            v-model="value"
            :class="{ invalid: isInvalid }"
            type="number"
            max="999"
            min="0"
          />
        </div>
      </div>

      <button @click="addEntry">Add entry</button>
    </div>
  </div>
</template>

<script>
const DOMAIN = process.env.VUE_APP_DOMAIN;
const METHOD = process.env.VUE_APP_METHOD;
const VERSION = process.env.VUE_APP_VERSION;

export default {
  name: "MachineItem",

  emits: [
    "dropdown-toggled",
    "dropdown-emptied",
  ],

  data() {
    return {
      title: null,
      image: null,

      reps: null,
      sets: null,
      time: null,

      value: 0,
      entry: null,
      person: null,
      entries: [],

      invalid: false,
      toggled: false,
    };
  },

  props: {
    persons: Array,
    machine: String,
    location: Object,
  },

  methods: {
    async fetchMachine() {
      const response = await fetch(
        `${METHOD}://${DOMAIN}/${VERSION}/machine/${this.machine}`
      );

      const parsed = await response.json();

      this.reps = parsed.reps;
      this.sets = parsed.sets;
      this.time = parsed.time;
      this.title = parsed.title;
    },

    async fetchEntry(person) {
      let response = await fetch(
        `${METHOD}://${DOMAIN}/${VERSION}/entry?limit=1&machine=${this.machine}&location=${this.location.uuid}&person=${person.uuid}`
      );

      let parsed = await response.json();
      let backup = false;

      if (parsed.entries.length === 0) {
        response = await fetch(
          `${METHOD}://${DOMAIN}/${VERSION}/entry?limit=1&machine=${this.machine}&person=${person.uuid}`
        );

        parsed = await response.json();
        backup = true;
      }

      const empty = parsed.entries.length === 0;

      const speed = empty ? null : parsed.entries[0].speed;
      const weight = empty ? null : parsed.entries[0].weight;
      const updated = empty ? null : parsed.entries[0].updated;

      return {
        last: person.last,
        first: person.first,
        person: person.uuid,

        speed,
        weight,
        backup,
        updated,
      };
    },

    async addEntry() {
      if (this.isInvalid) return;

      const headers = { "Content-Type": "application/json" };
      const method = "POST";
      const label = this.entryType.toLowerCase();
      const body = JSON.stringify({
        person: this.entry.person,
        [label]: this.value,
        machine: this.machine,
        location: this.location.uuid,
      });

      await fetch(`${METHOD}://${DOMAIN}/${VERSION}/entry`, {
        headers,
        method,
        body,
      });

      // Update the updated property so it can be marked as "done" for the day
      this.entry.updated = new Date();

      // If we've updated every entry we can remove the machine from the list
      if (this.entryFiltered.length === 0) {
        this.$emit("dropdown-emptied", this.machine);
        return;
      }

      // Switch to the next entry / person
      this.entry = this.entryFiltered[0];
      this.value = this.entryValue;
    },
  },

  computed: {
    isInvalid() {
      const isSmall = this.value >= 0 && this.value <= 32767;
      const isInteger = Number.isInteger(this.value);

      return !isInteger || !isSmall;
    },
    isCardio() {
      return typeof this.time === "number";
    },
    isUsed() {
      return this.isCardio ? this.entry.speed : this.entry.weight;
    },

    entryFiltered() {
      return this.entries.filter((entry) => {
        const today = new Date();
        const check = new Date(entry.updated);

        today.setHours(0, 0, 0, 0);
        check.setHours(0, 0, 0, 0);

        return today.getTime() !== check.getTime();
      });
    },
    entryValue() {
      return this.isUsed
        ? this.isCardio
          ? this.entry.speed
          : this.entry.weight
        : 0;
    },
    entryType() {
      return this.isCardio ? "Time" : "Weight";
    },
  },

  async mounted() {
    // TODO: these promises could be combined into one
    const promises = this.persons.map((person) => this.fetchEntry(person));

    this.entries = await Promise.all(promises);
    this.fetchMachine();

    // If we've updated every entry we can remove the machine from the list
    if (this.entryFiltered.length === 0) {
      this.$emit("dropdown-emptied", this.machine);
      return;
    }

    this.entry = this.entryFiltered[0];
    this.value = this.entryValue;
  },
};
</script>

<style scoped lang="scss">
.machine {
  margin: 0.75rem 0;
  border: 1px solid rgba(0, 0, 0, 0.125);

  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  border-radius: 2.5rem;

  .container {
    height: 5rem;
    cursor: pointer;
    overflow: hidden;
    position: relative;

    user-select: none;
    border-radius: 5rem;

    &::before {
      top: 0;
      left: 0;

      content: "";
      position: absolute;

      width: 100%;
      height: 100%;
      filter: brightness(50%);

      background-size: cover;
      background-image: url("~@/assets/banner.jpg");
      background-position: center;
    }

    h2 {
      top: 50%;
      left: 2rem;
      color: #fff;
      margin: 0;

      position: absolute;
      transform: translateY(-50%);

      font-size: 1.25rem;
      text-transform: uppercase;
    }
  }

  .dropdown {
    display: flex;
    padding: 2rem 1rem;
    border-radius: 2.5rem;
    flex-direction: column;
    background-color: #fff;

    .row {
      margin: 0 0 1.25rem 0;
      display: flex;
      flex-direction: row;

      .labels {
        flex: 1;
        display: flex;
        padding: 0 1rem;

        min-width: 0;
        text-align: left;
        flex-direction: column;

        &.right {
          text-align: right;
        }

        h3 {
          font-size: 1.2rem;
        }

        h4 {
          font-size: 2rem;
          font-weight: 300;
        }

        span {
          opacity: 0.65;
          font-size: 1.2rem;
          line-height: 1;
          margin-bottom: 0.85rem;
        }
      }

      .warning {
        color: red;
      }

      &:first-of-type {
        margin: 0 0 2rem;
      }

      &:last-of-type,
      &:nth-of-type(2) {
        margin: 0 0 3rem;
      }
    }

    input,
    select {
      appearance: none;
      border-top-left-radius: 0;
    }

    button {
      margin: 0 1rem;
    }
  }
}
</style>
