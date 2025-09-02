import { createRouter, createWebHistory } from "vue-router";
import { CombatPage, CutscenePage, CharacterPage, MenuPage } from "@/pages";
import { ROUTES } from "@/constants";

const routes = [
  {
    path: ROUTES.menu,
    component: MenuPage,
  },
  {
    path: ROUTES.cutscene,
    component: CutscenePage,
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
