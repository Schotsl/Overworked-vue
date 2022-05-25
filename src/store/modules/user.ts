import { defineModule } from "direct-vuex";
import { moduleGetterContext } from "../index";

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);

export interface UserState {
  name: string;
  email: string;
  token: string;
}

const modules = defineModule({
  state: (): UserState => {
    return {
      name: "",
      email: "",
      token: "",
    };
  },
  getters: {
    name(...args): string {
      const { state } = getterContext(args);
      return state.name;
    },
  },
  mutations: {
    SET_NAME(state, name: string) {
      state.name = name;
    },
    SET_EMAIL(state, email: string) {
      state.email = email;
    },
    SET_TOKEN(state, token: string) {
      state.token = token;
    },
  },
  namespaced: true,
});

export default modules;
