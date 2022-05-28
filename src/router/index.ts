import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import PageLogin from "../views/PageLogin.vue";
import PageEntries from "../views/PageEntries.vue";
import PageFriends from "../views/PageFriends.vue";
import PageSchedule from "../views/PageSchedule.vue";
import PageSettings from "../views/PageSettings.vue";
import PageStart from "../views/PageStart.vue";
import store, { ionicStore } from "@/store";
import { SplashScreen } from "@capacitor/splash-screen";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Root",
    redirect: { name: "Start" },
  },
  {
    path: "/entries",
    name: "Entries",
    component: PageEntries,
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: PageSchedule,
  },
  {
    path: "/friends",
    name: "Friends",
    component: PageFriends,
  },
  {
    path: "/settings",
    name: "Settings",
    component: PageSettings,
  },
  {
    path: "/start",
    name: "Start",
    component: PageStart,
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

router.beforeEach(async (to, from, next) => {
  // Initialize local storage
  await ionicStore.init();

  // Get authorized user from local storage
  await store.dispatch.authentication.RESTORE_AUTH();

  // Redirect to login page if user is not logged in
  if (!store.getters.authentication.isLoggedIn) {
    if (to.name !== "Login") {
      next({ name: "Login" });
      SplashScreen.hide();
      return;
    }
  }

  // Redirect to start page if user is logged in
  if (store.getters.authentication.isLoggedIn) {
    if (to.name === "Login") {
      next({ path: "/" });
      SplashScreen.hide();
      return;
    }
  }

  next();
});

export default router;
