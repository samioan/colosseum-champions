import { createRouter, createWebHistory } from "vue-router";
import { CombatPage, GladiatorPage, HomePage } from "@/pages";
import { ROUTES } from "@/constants";

const routes = [
  {
    path: ROUTES.home,
    component: HomePage,
  },

  {
    path: ROUTES.gladiator,
    name: "Gladiator",
    component: GladiatorPage,
  },
  {
    path: ROUTES.combat,
    name: "Combat",
    component: CombatPage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: ROUTES.home,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
