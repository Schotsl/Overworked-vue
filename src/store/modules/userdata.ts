import { defineModule } from "direct-vuex";
import { getRequest } from "../fetch";
import { moduleActionContext, moduleGetterContext } from "../index";

import { Person, Machine, PersonCollection, MachineCollection } from "../types";

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

      const responseBody = await getRequest<PersonCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/person?persons=${rootState.authentication.user?.uuid}`
      );

      commit.SET_FRIENDS(responseBody.persons);
    },
    async FETCH_MACHINES(context) {
      const { commit, rootState } = actionContext(context);

      const responseBody = await getRequest<MachineCollection>(
        `https://api.overworked.sjorsvanholst.nl/v1/machine?persons=${rootState.authentication.user?.uuid}`
      );

      commit.SET_MACHINES(responseBody.machines);
    },
  },
  namespaced: true,
});

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

export default modules;
