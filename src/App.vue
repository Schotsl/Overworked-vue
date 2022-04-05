<template>
  <router-view
    :persons="persons"
    :location="location"
    @selected-persons="selectedPersons"
    @selected-location="selectedLocation"
  />
</template>

<script>
import router from "./router";
import store from "./store/index";

export default {
  name: "App",

  data() {
    return {
      persons: store.getters.getPersons,
      location: store.getters.getLocation,
    };
  },

  methods: {
    selectedPersons(persons) {
      // store.commit("setPersons", persons);
      this.persons = persons;
    },

    selectedLocation(location) {
      // store.commit("setLocation", location);
      this.location = location;
    },
  },

  mounted() {
    // Send the user too the start if no data is set
    if (this.persons.length === 0 || typeof this.location === "undefined") {
      router.push("/");
    } else {
      router.push("/overview");
    }
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

@media only screen and (min-width: 600px) {
  html {
    font-size: 2.5vw;
  }
}

@media only screen and (min-width: 768px) {
  html {
    font-size: 2vw;
  }
}

@media only screen and (min-width: 992px) {
  html {
    font-size: 1.5vw;
  }
}

@media only screen and (min-width: 1366px) {
  html {
    font-size: 1.25vw;
  }
}

@media only screen and (min-width: 1920px) {
  html {
    font-size: 1vw;
  }
}

@media only screen and (min-width: 2560px) {
  html {
    font-size: 0.75vw;
  }
}

html,
body {
  margin: 0px;
  padding: 0px;
}

#app {
  height: 100vh;
  padding: 1.5rem 1.5rem 0rem;

  box-sizing: border-box;
}

form,
section {
  display: flex;

  flex-direction: column;
}

section {
  height: 100%;
}

form {
  flex: 1;

  div {
    display: flex;
    margin-bottom: 0.5rem;
    justify-content: flex-start;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

h1 {
  text-align: left;
  margin-bottom: 1rem;
}

input,
button,
select {
  border: 1px solid #ced4da;
  padding: 0.375rem 0.75rem;

  font-size: 1.5rem;
  text-align: center;
  line-height: 1.5;
  border-radius: 5rem;
}

select {
  padding: 0.475rem 2.25rem 0.575rem 1rem;
  appearance: none;
  text-align: left;

  background-size: 16px 12px;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.3rem center;
}

button {
  color: #fff;
  border: 1px solid #e26600;
  background: #ff7c13;

  font-weight: 400;
  text-transform: uppercase;

  margin-top: auto;
  margin-bottom: 1.5rem;
}

input[type="button"] {
  padding: 0.375rem 1.3rem 0.375rem 0.75rem;
}

input[type="checkbox"],
input[type="radio"] {
  margin: 0px;
  transform: scale(1.25);
}

label {
  font-size: 1.25rem;
  margin-left: 0.5rem;
}

.invalid {
  color: #dc3545;
  border-color: #dc3545;
}
</style>
