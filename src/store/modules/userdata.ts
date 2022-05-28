import { defineModule } from "direct-vuex";
import { getRequest, postRequest, deleteRequest } from "../fetch";
import { moduleActionContext, moduleGetterContext } from "../index";

import {
  Person,
  Machine,
  PersonCollection,
  MachineCollection,
  Location,
  LocationCollection,
  Entry,
  EntryCollection,
} from "../types";

export interface UserDataState {
  friends: Person[];
  machines: Machine[];
  locations: Location[];
  session: Session | null;
}

export interface UserSearch {
  username: string;
}

export interface Session {
  participants: Person[];
  location: Location;
  day: number;
  entries: Entry[];
}

const modules = defineModule({
  state: (): UserDataState => {
    return {
      friends: [],
      machines: [],
      locations: [],
      session: null,
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
    hasActiveSession(...args): boolean {
      const { state } = getterContext(args);
      return state.session !== null;
    },
    session(...args): Session | null {
      const { state } = getterContext(args);
      return state.session;
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
    SET_SESSION(state, session: Session | null) {
      state.session = session;
    },
    SET_SESSION_DAY(state, day: number) {
      if (state.session) state.session.day = day;
    },
    SET_SESSION_ENTRIES(state, entries: Entry[]) {
      if (state.session) state.session.entries = entries;
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
    async FETCH_SESSION_ENTRIES(context) {
      const { commit, state } = actionContext(context);

      const personsString = state.session?.participants
        .map((p) => p.uuid)
        .join(",");

      const responseBody = await getRequest<EntryCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/entry?persons=${personsString}&limit=99`
      );

      if (responseBody) commit.SET_SESSION_ENTRIES(responseBody.entries);
    },
    async SEARCH_FRIENDS(_context, payload: UserSearch) {
      const responseBody = await getRequest<PersonCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/person/search?query=${payload.username}`
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
    async DELETE_FRIEND(context, payload: Person) {
      const { commit } = actionContext(context);

      const friends = context.getters.friends.filter((person: Person) => {
        return person.uuid !== payload.uuid;
      });

      commit.SET_FRIENDS(friends);

      await deleteRequest(
        `https://api.overworked.sjorsvanholst.nl/v1/friends/${payload.friend}`
      );
    },
  },
  namespaced: true,
});

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

export default modules;
