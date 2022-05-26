import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import PageLogin from "../views/PageLogin.vue";
import PageEntries from "../views/PageEntries.vue";
import PageFriends from "../views/PageFriends.vue";
import PageSchedule from "../views/PageSchedule.vue";
import PageSettings from "../views/PageSettings.vue";
import PageStart from "../views/PageStart.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: PageLogin,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
