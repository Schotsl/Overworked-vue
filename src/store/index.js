import { createStore } from "vuex";

export default createStore({
  state: {
    loaded: [],
    persons: [],
    location: null,
    schedule: [
      {
        persons: [],
        location: null,
      },
      {
        persons: [],
        location: null,
      },
      {
        persons: [],
        location: null,
      },
      {
        persons: [],
        location: null,
      },
      {
        persons: [],
        location: null,
      },
      {
        persons: [],
        location: null,
      },
      {
        persons: [],
        location: null,
      },
    ],
  },
  mutations: {
    setPersons(state, payload) {
      updateStorage(state, "persons", payload);
    },
    setLocation(state, payload) {
      updateStorage(state, "location", payload);
    },
    setSchedule(state, payload) {
      updateStorage(state, "schedule", payload);
    },
  },
  getters: {
    getPersons(state) {
      return checkStorage(state, "persons");
    },
    getLocation(state) {
      return checkStorage(state, "location");
    },
    getSchedule(state) {
      return checkStorage(state, "schedule");
    },
  },
});

function checkStorage(state, name) {
  if (!state.loaded.includes(name)) {
    // Fetch the JSON string from the (persistent) LocalStorage API
    const result = localStorage.getItem(name);

    if (result === null) {
      return state[name];
    }

    const parsed = JSON.parse(result);

    // Update the state and loaded array so we won't have to use the LocalStorage API twice
    state[name] = parsed;
    state.loaded.push(name);

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
  state[name] = payload;
}
