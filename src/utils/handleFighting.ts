import type { Gladiator, GladiatorStats } from "@/types";
import {
  handleStat,
  performAbility,
  checkForLevelUp,
  calculateDamage,
} from "@/utils";
import { StatAction, StatKey, FightTurn, BonusStatus } from "@/enums";
import type { Ref } from "vue";

export default function handleFighting(
  gladiator: Gladiator,
  enemy: Gladiator,
  updatedGladiatorStats: GladiatorStats,
  updatedEnemyStats: GladiatorStats,
  fightTurn: Ref<FightTurn>,
  stage: Ref<number>,
  pointsCollected: Ref<number>,
  goldCollected: Ref<number>
) {
  if (fightTurn.value === FightTurn.NONE) {
    fightTurn.value = Math.random() < 0.5 ? FightTurn.PLAYER : FightTurn.ENEMY;
  } else if (fightTurn.value === FightTurn.PLAYER) {
    fightTurn.value = FightTurn.ENEMY;
  } else if (fightTurn.value === FightTurn.ENEMY) {
    fightTurn.value = FightTurn.PLAYER;
  }

  const isPlayersTurn = fightTurn.value === FightTurn.PLAYER;
  const curAttacker = isPlayersTurn ? gladiator : enemy;
  const curDefender = isPlayersTurn ? enemy : gladiator;
  const curAttackerStats = isPlayersTurn
    ? updatedGladiatorStats
    : updatedEnemyStats;
  const curDefenderStats = isPlayersTurn
    ? updatedEnemyStats
    : updatedGladiatorStats;

  const ability = Object.values(curAttacker?.abilities)?.find(
    (ability) => ability.status === BonusStatus.ACTIVE
  );
  const attackerAbilities = Object.values(curAttacker?.abilities)?.filter(
    (ability) =>
      ability.status === BonusStatus.EQUIPPED ||
      ability.status === BonusStatus.ACTIVE
  );

  if (
    ability &&
    curAttacker.stats.stamina >= ability.energy &&
    ability.cooldown >= ability.maxCooldown
  ) {
    performAbility(
      ability,
      curAttacker,
      curDefender,
      curAttackerStats,
      curDefenderStats
    );
  } else {
    if (attackerAbilities) {
      attackerAbilities.forEach((ability) => {
        if (ability.cooldown >= ability.maxCooldown) {
          ability.cooldown = ability.maxCooldown;
        } else ability.cooldown += 1;
      });
    }

    handleStat(
      curDefender.stats,
      StatKey.HEALTH,
      calculateDamage(curAttacker, curDefender),
      StatAction.DECREASE,
      curDefenderStats
    );
  }

  if (gladiator.stats.health <= 0) {
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    fightTurn.value = FightTurn.NONE;
    return;
  } else if (enemy.stats.health <= 0) {
    handleStat(
      gladiator.stats,
      StatKey.GOLD,
      stage.value * 10,
      StatAction.INCREASE,
      updatedGladiatorStats
    );
    goldCollected.value += stage.value * 10;
    handleStat(
      gladiator.stats,
      StatKey.EXPERIENCE,
      stage.value * 50,
      StatAction.INCREASE,
      updatedGladiatorStats
    );
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    checkForLevelUp(gladiator.stats, updatedGladiatorStats, pointsCollected);
    fightTurn.value = FightTurn.NONE;
    return;
  }
}
