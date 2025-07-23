import type { Gladiator, Enemy } from "@/types";
import {
  handleStat,
  endActivity,
  removeGladiator,
  createEnemy,
  findGladiator,
} from "@/utils";
import type { Ref } from "vue";

export default function handleFighting(
  gladiator: Gladiator,
  selectedGladiators: Ref<Gladiator[]>,
  enemyGladiators: Ref<Enemy[]>
) {
  let enemy = findGladiator(enemyGladiators.value as Gladiator[], gladiator.id);

  if (!enemy) return;

  handleStat(gladiator, "health", enemy.strength, "decrement");
  handleStat(gladiator, "stamina", 1, "decrement");
  handleStat(gladiator, "trainingDays", 0, "set");
  handleStat(gladiator, "restingDays", 0, "set");
  handleStat(enemy as Gladiator, "health", gladiator.strength, "decrement");
  handleStat(enemy as Gladiator, "stamina", 1, "decrement");

  if (gladiator.health <= 0 || gladiator.stamina <= 0) {
    endActivity(gladiator, "isFighting");
    removeGladiator(selectedGladiators, gladiator);
    removeGladiator(enemyGladiators as Ref<Gladiator[]>, gladiator);
  }

  if (enemy.health <= 0) {
    handleStat(gladiator, "fightingMatches", 1, "increment");
    removeGladiator(enemyGladiators as Ref<Gladiator[]>, gladiator);
    createEnemy(gladiator.id, enemyGladiators.value);

    enemy = findGladiator(enemyGladiators.value as Gladiator[], gladiator.id);

    if (gladiator.fightingMatches >= gladiator.maxFightingMatches) {
      endActivity(gladiator, "isFighting");
    }
  }
}
