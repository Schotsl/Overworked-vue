import { defineModule } from "direct-vuex";
import { moduleActionContext, moduleGetterContext } from "../index";

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

interface Friend {
  first: string;
  last: string;
  uuid: string;
}

export interface GymState {
  friends: Friend[];
}

const modules = defineModule({
  state: (): GymState => {
    return {
      friends: [],
    };
  },
  getters: {
    friends(...args): Friend[] {
      const { state } = getterContext(args);
      return state.friends;
    },
  },
  mutations: {
    SET_FRIENDS(state, friends: Friend[]) {
      state.friends = friends;
    },
  },
  actions: {
    async FETCH_FRIENDS(context) {
      const { commit } = actionContext(context);
      const response = await fetch(
        "https://api.overworked.sjorsvanholst.nl/v1/person?limit=99"
      );

      const data = await response.json();
      commit.SET_FRIENDS(data.persons);
    },
  },
  namespaced: true,
});

export default modules;
