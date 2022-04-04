import { createStore } from "vuex";

export default createStore({
  state: {
    persons: null,
    location: null,
  },
  mutations: {
    setPersons(state, payload) {
      updateStorage(state, "persons", payload);
    },
    setLocation(state, payload) {
      updateStorage(state, "location", payload);
    },
  },
  getters: {
    getPersons(state) {
      return checkStorage(state, "persons");
    },
    getLocation(state) {
      return checkStorage(state, "location");
    },
  },
});

function checkStorage(state, name) {
  if (state[name] === null) {
    // Fetch the JSON string from the (persistent) LocalStorage API
    const result = localStorage.getItem(name);

    if (result === null) {
      return;
    }

    // Transform the JSON into JavaScript objects
    const parsed = JSON.parse(result);

    // Update the state so we won't have to use the LocalStorage API twice
    state[name] = parsed;

    // Return the requested value
    return parsed;
  }

  return state[name];
}

function updateStorage(state, name, payload) {
  // Transform the JavaScript objects into a JSON string
  const parsed = JSON.stringify(payload);

  // Store the JSON values using the LocalStorage API
  localStorage.setItem(name, parsed);

  // Update the state so we won't have to use the LocalStorage API to fetch it later
  state[name] = parsed;
}
