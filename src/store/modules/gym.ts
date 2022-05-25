import { defineModule } from "direct-vuex";
import { moduleActionContext, moduleGetterContext } from "../index";

const getterContext = (args: [any, any, any, any]) =>
  moduleGetterContext(args, modules);
const actionContext = (context: any) => moduleActionContext(context, modules);

interface Friend {
  first: string;
  last: string;
  uuid: string;
  iconUrl: string | undefined;
}

interface Machines {
  uuid: string;
  title: string;
  reps: number;
  sets: number;
}

export interface GymState {
  friends: Friend[];
  machines: Machines[];
}

const modules = defineModule({
  state: (): GymState => {
    return {
      friends: [],
      machines: [],
    };
  },
  getters: {
    friends(...args): Friend[] {
      const { state } = getterContext(args);
      return state.friends;
    },
    machines(...args): Machines[] {
      const { state } = getterContext(args);
      return state.machines;
    },
  },
  mutations: {
    SET_FRIENDS(state, friends: Friend[]) {
      state.friends = friends;
    },
    SET_MACHINES(state, machines: Machines[]) {
      state.machines = machines;
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
    async FETCH_MACHINES(context) {
      const { commit } = actionContext(context);
      const response = await fetch(
        "https://api.overworked.sjorsvanholst.nl/v1/machine?limit=99"
      );

      const data = await response.json();
      commit.SET_MACHINES(data.machines);
    },
  },
  namespaced: true,
});

export default modules;
