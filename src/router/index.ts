import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";

import PageEntries from "../views/PageEntries.vue";
import PageSchedule from "../views/PageSchedule.vue";
import PageFriends from "../views/PageFriends.vue";
import PageSettings from "../views/PageSettings.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/schedule",
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
