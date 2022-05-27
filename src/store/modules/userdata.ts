import { defineModule } from "direct-vuex";
import { getRequest, postRequest } from "../fetch";
import { moduleActionContext, moduleGetterContext } from "../index";

import {
  Person,
  Machine,
  PersonCollection,
  MachineCollection,
  Location,
  LocationCollection,
} from "../types";

export interface UserDataState {
  friends: Person[];
  machines: Machine[];
  locations: Location[];
}

export interface UserSearch {
  username: string;
}

const modules = defineModule({
  state: (): UserDataState => {
    return {
      friends: [],
      machines: [],
      locations: [],
    };
  },
  getters: {
    friends(...args): Person[] {
      const { state } = getterContext(args);
      return state.friends;
    },
    machines(...args): Machine[] {
      const { state } = getterContext(args);
      return state.machines;
    },
    locations(...args): Location[] {
      const { state } = getterContext(args);
      return state.locations;
    },
  },
  mutations: {
    SET_FRIENDS(state, friends: Person[]) {
      state.friends = friends;
    },
    SET_MACHINES(state, machines: Machine[]) {
      state.machines = machines;
    },
    SET_LOCATIONS(state, locations: Location[]) {
      state.locations = locations;
    },
    ADD_FRIENDS(state, friend: Person) {
      state.friends.push(friend);
    },
    ADD_MACHINES(state, machine: Machine) {
      state.machines.push(machine);
    },
    ADD_LOCATIONS(state, location: Location) {
      state.locations.push(location);
    },
  },
  actions: {
    async FETCH_FRIENDS(context) {
      const { commit } = actionContext(context);

      const responseBody = await getRequest<PersonCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/person/friends`
      );

      if (responseBody) commit.SET_FRIENDS(responseBody.persons);
    },
    async FETCH_MACHINES(context) {
      const { commit, rootState } = actionContext(context);

      const responseBody = await getRequest<MachineCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/machine?persons=${rootState.authentication.user?.uuid}`
      );

      if (responseBody) commit.SET_MACHINES(responseBody.machines);
    },
    async FETCH_LOCATIONS(context) {
      const { commit, rootState } = actionContext(context);

      const responseBody = await getRequest<LocationCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/location?persons=${rootState.authentication.user?.uuid}&limit=99`
      );

      if (responseBody) commit.SET_LOCATIONS(responseBody.locations);
    },
    async SEARCH_FRIENDS(_context, payload: UserSearch) {
      const responseBody = await getRequest<PersonCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/person/search?username=${payload.username}`
      );

      return responseBody?.persons;
    },
    async ADD_FRIEND(context, payload: Person) {
      const { rootState } = actionContext(context);

      const options: RequestInit = {
        body: JSON.stringify({
          origin: rootState.authentication.user?.uuid,
          target: payload.uuid,
          approved: true,
        }),
      };

      await postRequest<PersonCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/friends`,
        options
      );
      await context.dispatch("FETCH_FRIENDS");
    },
  },
  namespaced: true,
});

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

export default modules;
