import { createRouter, createWebHistory } from "vue-router";
import { CombatPage, GladiatorPage, HomePage, RecruitsPage } from "@/pages";
import { ROUTES } from "@/constants";

const routes = [
  {
    path: ROUTES.home,
    component: HomePage,
  },
  {
    path: ROUTES.recruits,
    name: "Recruits",
    component: RecruitsPage,
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
