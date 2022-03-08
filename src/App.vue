<template>
  <div id="nav">
    <router-link to="/">Who</router-link> |
    <router-link to="/where">Where</router-link> |
    <router-link to="/overview">Overview</router-link>
  </div>
  <router-view
    :persons="persons"
    :location="location"

    @selected-persons="selectedPersons"
    @selected-location="selectedLocation"  
  />
</template>

<script>
import router from './router';
import store from './store/index';

export default {
  name: 'App',

  data() {
    return {
      persons: store.getters.getPersons,
      location: store.getters.getLocation,
    }
  },

  methods: {
    selectedPersons(persons) {
      store.commit('setPersons', persons);
      this.persons = persons;
    },

    selectedLocation(location) {
      store.commit('setLocation', location);
      this.location = location;
    }
  },

  mounted() {
    if (typeof this.persons === "undefined" || typeof this.location === "undefined") {
      router.push('/');
    } else {
      router.push('/overview');
    }
  }
}
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
</style>
