<template>
  <div class="machine">
    <div class="container" @click="toggled = !toggled">
      <h2>{{ title }}</h2>
    </div>

    <div class="dropdown" v-if="toggled">
      <div class="row">
        <template v-if="isUsed">
        <template v-if="isMuscle">
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
            <h4>{{ value }}</h4>
          </div>
        </template>
        
        <template v-else-if="isCardio">
          <div class="labels">
            <h3>Time</h3>
            <h4>{{ time }}</h4>
          </div>

          <div class="labels">
            <h3>Speed</h3>
            <h4>?</h4>
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

          <select @change="setValue(person.uuid)">
            <option v-for="person in persons" :key="person.uuid" :value="person.uuid">
              {{ person.first }} {{ person.last }}
            </option>
          </select>
        </div>
      </div>

      <!--
        <div class="row">
          <div class="labels">
            <span>Type</span>

            <select>
              <option value="muscle">Muscle</option>
              <option value="cardio">Cardio</option>
            </select>
          </div>
        </div>
      -->

      <div class="row">
        <div class="labels">
          <span :class="{ invalid : isInvalid }">Weight</span>
          <input
            v-model="input"
            :class="{ invalid : isInvalid }"
            type="number"
            max="999"
            min="0"
          />
        </div>
      </div>

      <!--
        <div class="row">
          <div class="labels">
            <span>Time</span>
            <select v-model="selectedTemplate.time">
              <option v-for="time in times" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>

          <div class="labels">
            <span>Speed</span>
            <input
              v-model.number="selectedTemplate.speed"
              :class="{ invalid: errors.speed }"
              @input="errors.speed = false"
              type="number"
              min="0"
              max="999"
            />
          </div>
        </div>
      -->

      <button>Add entry</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MachineItem',

  data() {
    return {
      title: null,
      image: null,

      reps: null,
      sets: null,
      time: null,

      value: 0,
      input: 0,

      weights: [],
      invalid: false,
      toggled: false,
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

      async fetchEntry(person) {
        const domain = process.env.VUE_APP_DOMAIN
        const method = process.env.VUE_APP_METHOD;
        const version = process.env.VUE_APP_VERSION;   

        const response = await fetch(`${method}://${domain}/${version}/entry?limit=1&machine=${this.machine}&location=${this.location.uuid}&person=${person.uuid}`);
        const parsed = await response.json();
        const weight = parsed.entries.length > 0 ? parsed.entries[0].weight : null;

        return weight;
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
      },

      setValue(uuid) {
        const index = this.persons.findIndex(person => person.uuid === uuid);
        const value = this.weights[index];

        this.input = value;
        this.value = value;
      }
  },

  computed: {
    isUsed() {
      return this.value !== null;
    },
    isCardio() {
      return typeof this.time !== "undefined";
    },
    isMuscle() {
      return typeof this.reps !== "undefined" && this.sets !== "undefined";
    },
    isInvalid() {
      const isInteger = Number.isInteger(this.input)
      const isSmall = this.input >= 0 && this.input <= 32767;
      
      return !isInteger || !isSmall;
    }
  },

  async mounted() {
    const promises = this.persons.map(person => this.fetchEntry(person));

    this.weights = await Promise.all(promises);
    this.fetchMachine();

    this.setValue(this.persons[0].uuid);
  }
}
</script>

<style scoped lang="scss">
.machine {
  margin: .75rem 0;
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
