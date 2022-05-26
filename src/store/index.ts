import { createDirectStore } from "direct-vuex";

import userdata from "./modules/userdata";
import authentication from "./modules/authentication";
import { IonicStorage } from "./IonicStorage";

export const ionicStore = new IonicStorage();

(async () => {
  await ionicStore.init();
})();

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  modules: {
    userdata,
    authentication,
  },
});

export default store;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
};
