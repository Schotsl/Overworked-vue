import { defineModule } from "direct-vuex";

import { Person } from "../types";
import { moduleActionContext, moduleGetterContext, ionicStore } from "../index";

export interface UserState {
  user: Person | null;
  token: string | null;
}

const modules = defineModule({
  state: (): UserState => {
    return {
      user: null,
      token: null,
    };
  },
  getters: {
    isLoggedIn: (...args): boolean => {
      const { state } = getterContext(args);
      return state.token !== null && state.user !== null;
    },
  },
  mutations: {
    SET_USER(state, user: Person | null) {
      state.user = user;
    },
    SET_TOKEN(state, token: string | null) {
      state.token = token;
    },
  },
  actions: {
    /**
     * Restore the user from the local storage.
     * @returns {Promise<boolean>} Return true when the user was restored, false otherwise.
     */
    async RESTORE_AUTH(context): Promise<boolean> {
      const { commit } = actionContext(context);

      const user = await ionicStore.get("user");
      const token = await ionicStore.get("token");

      if (!user || !token) return false;

      commit.SET_TOKEN(token);
      commit.SET_USER(user);
      return true;
    },
    async SAVE_AUTH(context, { user, token }: { user: Person; token: string }) {
      const { commit } = actionContext(context);

      commit.SET_TOKEN(token);
      commit.SET_USER(user);

      await ionicStore.set("user", user);
      await ionicStore.set("token", token);
    },
    async LOGOUT(context) {
      const { commit } = actionContext(context);

      commit.SET_TOKEN(null);
      commit.SET_USER(null);

      await ionicStore.remove("user");
      await ionicStore.remove("token");
    },
  },
  namespaced: true,
});

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

export default modules;
