import { defineModule } from "direct-vuex";

import { Person } from "../types";
import { moduleActionContext, ionicStore } from "../index";

const actionContext = (context: any) => moduleActionContext(context, modules);

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
  mutations: {
    SET_USER(state, user: Person) {
      state.user = user;
    },
    SET_TOKEN(state, token: string) {
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
  },
  namespaced: true,
});

export default modules;
