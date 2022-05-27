import { createRouter, createWebHistory } from "@ionic/vue-router";
import { NavigationGuardWithThis, RouteRecordRaw } from "vue-router";

import PageLogin from "../views/PageLogin.vue";
import PageEntries from "../views/PageEntries.vue";
import PageFriends from "../views/PageFriends.vue";
import PageSchedule from "../views/PageSchedule.vue";
import PageSettings from "../views/PageSettings.vue";
import PageStart from "../views/PageStart.vue";
import store, { ionicStore } from "@/store";

const redirectLogin: NavigationGuardWithThis<any> = async (to, _from, next) => {
  // Initialize local storage
  await ionicStore.init();

  // Get authorized user from local storage
  await store.dispatch.authentication.RESTORE_AUTH();

  if (to.name === "Login" || store.getters.authentication.isLoggedIn) {
    next();
    return;
  }
  next("/login");
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Root",
    redirect: { name: "Start" },
    beforeEnter: redirectLogin,
  },
  {
    path: "/entries",
    name: "Entries",
    component: PageEntries,
    beforeEnter: redirectLogin,
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: PageSchedule,
    beforeEnter: redirectLogin,
  },
  {
    path: "/friends",
    name: "Friends",
    component: PageFriends,
    beforeEnter: redirectLogin,
  },
  {
    path: "/settings",
    name: "Settings",
    component: PageSettings,
    beforeEnter: redirectLogin,
  },
  {
    path: "/start",
    name: "Start",
    component: PageStart,
    beforeEnter: redirectLogin,
  },
  {
    path: "/login",
    name: "Login",
    component: PageLogin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
