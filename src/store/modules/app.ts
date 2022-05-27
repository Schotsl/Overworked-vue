import { defineModule } from "direct-vuex";

export interface AppState {
  startPage: {
    currentPage: string;
  };
}

const modules = defineModule({
  state: (): AppState => {
    return {
      startPage: {
        currentPage: "Friend",
      },
    };
  },
  mutations: {
    SET_STARTPAGE_CURRENTPAGE(state, page: string) {
      state.startPage.currentPage = page;
    },
    RESET_STARTPAGE_CURRENTPAGE(state) {
      state.startPage.currentPage = "Friend";
    },
  },
  namespaced: true,
});

export default modules;
