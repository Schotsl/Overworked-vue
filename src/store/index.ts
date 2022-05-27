import { createDirectStore } from "direct-vuex";

import userdata from "./modules/userdata";
import authentication from "./modules/authentication";
import app from "./modules/app";
import { IonicStorage } from "./IonicStorage";

export const ionicStore = new IonicStorage();

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
    app,
  },
});

export default store;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
};
