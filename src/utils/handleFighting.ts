import type { Gladiator, GladiatorStats } from "@/types";
import {
  handleStat,
  performAbility,
  checkForLevelUp,
  getRandomRange,
  createEnemy,
} from "@/utils";
import { StatAction, StatKey, FightTurn, BonusStatus } from "@/enums";
import type { Ref } from "vue";

export default function handleFighting(
  gladiator: Gladiator,
  enemy: Gladiator,
  updatedGladiatorStats: GladiatorStats,
  updatedEnemyStats: GladiatorStats,
  fightTurn: Ref<FightTurn>,
  stage: Ref<number>
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
    curAttacker.stats.stamina >= ability.stamina &&
    ability.cooldown >= ability.maxCooldown
  ) {
    performAbility(
      ability,
      curAttacker.stats,
      curDefender.stats,
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

    const isCrit = getRandomRange(0, 100) >= 80;
    const didEvade = getRandomRange(0, 100) >= 80;

    let minDamage = Math.max(
      1,
      Math.floor(curAttacker.stats.strength * 0.05 + curAttacker.stats.level)
    );
    let rawDamage =
      curAttacker.stats.strength * (100 / (100 + curDefender.stats.defense));
    let damage = Math.max(minDamage, Math.floor(rawDamage));

    if (isCrit) {
      damage *= 2;
    }

    if (didEvade) {
      damage = minDamage;
    }

    handleStat(
      curDefender.stats,
      StatKey.HEALTH,
      Math.floor(damage),
      StatAction.DECREASE,
      curDefenderStats
    );
  }

  if (gladiator.stats.health <= 0) {
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    fightTurn.value = FightTurn.NONE;
    stage.value = 1;
    return;
  } else if (enemy.stats.health <= 0) {
    handleStat(
      gladiator.stats,
      StatKey.GOLD,
      stage.value * 10,
      StatAction.INCREASE,
      updatedGladiatorStats
    );
    handleStat(
      gladiator.stats,
      StatKey.EXPERIENCE,
      stage.value * 50,
      StatAction.INCREASE,
      updatedGladiatorStats
    );
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    checkForLevelUp(gladiator.stats, updatedGladiatorStats);
    fightTurn.value = FightTurn.NONE;
    stage.value++;
    return;
  }
}
