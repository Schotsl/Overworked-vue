import { defineModule } from "direct-vuex";
import { getRequest, postRequest, deleteRequest } from "../fetch";
import { moduleActionContext, moduleGetterContext } from "../index";

import {
  Person,
  PersonCollection,
  MachineCollection,
  Location,
  LocationCollection,
  Entry,
  EntryCollection,
  Machine,
  ScheduleMachineCollection,
} from "../types";

export interface UserDataState {
  friends: Person[];
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
  machines: MachineCollection;
  schedule: ScheduleMachineCollection;
}

async function recursiveFetch<T>(
  url: string,
  itemName: string,
  offset = 0
): Promise<T[]> {
  const responseBody = await getRequest<any>(
    `${url}${offset ? `&offset=${offset}` : ""}`
  );

  if (responseBody.total > responseBody.offset + responseBody.limit) {
    const additionalData = await recursiveFetch<T>(
      url,
      itemName,
      responseBody.offset + responseBody.limit
    );

    if (responseBody[itemName])
      return [...responseBody[itemName], ...additionalData];
  }
  return responseBody[itemName] || [];
}

const modules = defineModule({
  state: (): UserDataState => {
    return {
      friends: [],
      locations: [],
      session: null,
    };
  },
  getters: {
    friends(...args): Person[] {
      const { state } = getterContext(args);
      return state.friends;
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
    SET_SESSION_MACHINES(state, machines: MachineCollection) {
      if (state.session) state.session.machines = machines;
    },
    SET_SESSION_SCHEDULE(state, schedule: ScheduleMachineCollection) {
      if (state.session) state.session.schedule = schedule;
    },
    ADD_FRIENDS(state, friend: Person) {
      state.friends.push(friend);
    },
    ADD_LOCATIONS(state, location: Location) {
      state.locations.push(location);
    },
  },
  actions: {
    async FETCH_FRIENDS(context) {
      const { commit } = actionContext(context);

      const responseBody = await getRequest<PersonCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/person/friend?limit=99`
      );

      if (responseBody) commit.SET_FRIENDS(responseBody.persons);
    },
    async FETCH_SESSION_MACHINES(context) {
      const { state, commit } = actionContext(context);
      if (!state.session) return;

      const personsString = state.session?.participants
        .map((p) => p.uuid)
        .join(",");

      const machines = await recursiveFetch<Machine>(
        `https://api.overworked.sjorsvanholst.nl/v1/machine?persons=${personsString}&limit=99`,
        "machines"
      );

      machines.map((m) => {
        m.created = new Date(m.created);
        m.updated = new Date(m.updated);
      });

      commit.SET_SESSION_MACHINES({
        machines,
        total: machines.length,
        limit: machines.length,
        offset: 0,
      });
    },
    async FETCH_LOCATIONS(context) {
      const { commit } = actionContext(context);

      const responseBody = await getRequest<LocationCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/location?limit=99`
      );

      responseBody.locations.map((l) => {
        l.created = new Date(l.created);
        l.updated = new Date(l.updated);
      });

      if (responseBody) commit.SET_LOCATIONS(responseBody.locations);
    },
    async FETCH_SESSION_ENTRIES(context) {
      const { commit, state } = actionContext(context);

      if (!state.session) return;

      const personsString = state.session?.participants
        .map((p) => p.uuid)
        .join(",");

      const responseBody = await getRequest<EntryCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/entry?persons=${personsString}&limit=99`
      );

      responseBody.entries.map((e) => {
        e.created = new Date(e.created);
        e.updated = new Date(e.updated);
      });

      if (responseBody) commit.SET_SESSION_ENTRIES(responseBody.entries);
    },
    async FETCH_SESSION_SCHEDULE(context) {
      const { commit, state } = actionContext(context);

      if (!state.session) return;

      const personsString = state.session?.participants
        .map((p) => p.uuid)
        .join(",");

      const responseBody = await getRequest<ScheduleMachineCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/overview?persons=${personsString}&day=${state.session.day}&limit=99`
      );

      responseBody.machines.map((m) => {
        m.created = new Date(m.created);
        m.updated = new Date(m.updated);
        m.entries.map((e) => {
          e.created = new Date(e.created);
          e.updated = new Date(e.updated);
        });
      });

      commit.SET_SESSION_SCHEDULE(responseBody);
    },
    async SEARCH_FRIENDS(_context, payload: UserSearch) {
      const responseBody = await getRequest<PersonCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/person/search?query=${payload.username}`
      );

      responseBody.persons.map((p) => {
        p.created = new Date(p.created);
        p.updated = new Date(p.updated);
      });

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
        `https://api.overworked.sjorsvanholst.nl/v1/friend`,
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
        `https://api.overworked.sjorsvanholst.nl/v1/friend/${payload.friend}`
      );
    },
  },
  namespaced: true,
});

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

export default modules;
