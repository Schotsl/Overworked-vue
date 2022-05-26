import { defineModule } from "direct-vuex";
import { moduleActionContext, moduleGetterContext } from "../index";

import { Person, Machine } from "../types";

export interface UserDataState {
  friends: Person[];
  machines: Machine[];
}

const modules = defineModule({
  state: (): UserDataState => {
    return {
      friends: [],
      machines: [],
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
  },
  mutations: {
    SET_FRIENDS(state, friends: Person[]) {
      state.friends = friends;
    },
    SET_MACHINES(state, machines: Machine[]) {
      state.machines = machines;
    },
  },
  actions: {
    async FETCH_FRIENDS(context) {
      const { commit, rootState } = actionContext(context);

      const response = await fetch(
        `https://api.overworked.sjorsvanholst.nl/v1/person?persons=${rootState.authentication.user?.uuid}`,
        {
          headers: {
            Authorization: `Bearer ${rootState.authentication.token}`,
          },
        }
      );

      const data = await response.json();
      commit.SET_FRIENDS(data.persons);
    },
    async FETCH_MACHINES(context) {
      const { commit, rootState } = actionContext(context);
      const response = await fetch(
        "https://api.overworked.sjorsvanholst.nl/v1/machine?limit=99",
        {
          headers: {
            Authorization: `Bearer ${rootState.authentication.token}`,
          },
        }
      );

      const data = await response.json();
      commit.SET_MACHINES(data.machines);
    },
  },
  namespaced: true,
});

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

export default modules;
