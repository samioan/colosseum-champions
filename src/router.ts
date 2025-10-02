import { createRouter, createWebHistory } from "vue-router";
import { CombatPage, EndingPage, CharacterPage, MenuPage } from "@/pages";
import { ROUTES } from "@/constants";

const routes = [
  {
    path: ROUTES.menu,
    component: MenuPage,
  },
  {
    path: ROUTES.ending,
    component: EndingPage,
  },
  {
    path: ROUTES.character,
    component: CharacterPage,
  },
  {
    path: ROUTES.combat,
    component: CombatPage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: ROUTES.menu,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
