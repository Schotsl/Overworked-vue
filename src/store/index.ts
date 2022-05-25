import { createStore, MutationTree } from "vuex";

export type State = {
  name?: string;
  email?: string;
  token?: string;
};

const state: State = {};

export const enum MUTATIONS {
  SET_NAME = "SET_NAME",
  SET_EMAIL = "SET_EMAIL",
  SET_TOKEN = "SET_TOKEN",
}

const mutations: MutationTree<State> = {
  [MUTATIONS.SET_NAME](state, name: string) {
    state.name = name;
  },
  [MUTATIONS.SET_EMAIL](state, email: string) {
    state.email = email;
  },
  [MUTATIONS.SET_EMAIL](state, token: string) {
    state.token = token;
  },
};

export const store = createStore<State>({ state, mutations });