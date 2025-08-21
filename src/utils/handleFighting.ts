import type { Gladiator, GladiatorStats } from "@/types";
import {
  handleStat,
  performAbility,
  checkForLevelUp,
  getRandomRange,
} from "@/utils";
import { StatAction, StatKey } from "@/enums";

export default function handleFighting(
  gladiator: Gladiator,
  enemy: Gladiator,
  updatedGladiatorStats: GladiatorStats,
  updatedEnemyStats: GladiatorStats
) {
  const curAttacker = gladiator.hasTurn ? gladiator : enemy;
  const curDefender = gladiator.hasTurn ? enemy : gladiator;
  const curAttackerStats = gladiator.hasTurn
    ? updatedGladiatorStats
    : updatedEnemyStats;
  const curDefenderStats = gladiator.hasTurn
    ? updatedEnemyStats
    : updatedGladiatorStats;

  const ability = Object.values(curAttacker?.abilities)?.find(
    (ability) => ability.isActive
  );
  const attackerAbilities = Object.values(curAttacker?.abilities)?.filter(
    (ability) => ability.isEquipped
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

    const didEvade = getRandomRange(0, 100) >= 80;

    const damage = didEvade
      ? 0
      : (() => {
          let damage =
            curAttacker.stats.strength *
            (100 / (100 + curDefender.stats.defense));

          const isCrit = getRandomRange(0, 100) >= 80;

          if (isCrit) {
            damage *= 2;
          }

          return Math.floor(damage);
        })();

    handleStat(
      curDefender.stats,
      StatKey.HEALTH,
      damage,
      StatAction.DECREASE,
      curDefenderStats
    );
  }

  if (gladiator.stats.health <= 0) {
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    return;
  } else if (enemy.stats.health <= 0) {
    handleStat(
      gladiator.stats,
      StatKey.GOLD,
      500,
      StatAction.INCREASE,
      updatedGladiatorStats
    );
    handleStat(
      gladiator.stats,
      StatKey.EXPERIENCE,
      500,
      StatAction.INCREASE,
      updatedGladiatorStats
    );
    [
      StatKey.HEALTH,
      StatKey.STAMINA,
      StatKey.STRENGTH,
      StatKey.DEFENSE,
    ].forEach((stat) => {
      const maxStat = `max${stat[0].toUpperCase()}${stat.slice(1)}` as StatKey;
      handleStat(
        gladiator.stats,
        stat,
        updatedGladiatorStats[maxStat],
        StatAction.SET,
        updatedGladiatorStats
      );
    });
    if (attackerAbilities) {
      attackerAbilities.forEach((ability) => {
        ability.cooldown = 0;
      });
    }
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    checkForLevelUp(gladiator.stats, updatedGladiatorStats);
    return;
  }

  curAttacker.hasTurn = false;
  curDefender.hasTurn = true;
}
