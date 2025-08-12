import type { Gladiator, GladiatorStats } from "@/types";
import { handleStat, performAbility, checkForLevelUp } from "@/utils";
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

  if (ability && curAttacker.stats.rage >= ability.rage) {
    performAbility(
      ability,
      curAttacker.stats,
      curDefender.stats,
      curAttackerStats,
      curDefenderStats
    );
  } else if (curAttacker.stats.stamina >= 5) {
    const didEvade =
      Math.random() <
      gladiator.stats.dexterity / (gladiator.stats.dexterity + 100);

    const damage = didEvade
      ? 0
      : (() => {
          let damage =
            curAttacker.stats.strength *
            (100 / (100 + curDefender.stats.defense));

          const critChance =
            curAttacker.stats.dexterity / (curAttacker.stats.dexterity + 200);
          const isCrit = Math.random() < critChance;

          if (isCrit) {
            damage *= 5;
          }

          return Math.floor(damage);
        })();

    handleStat(
      curAttacker.stats,
      StatKey.STAMINA,
      5,
      StatAction.DECREASE,
      curAttackerStats
    );
    handleStat(
      curAttacker.stats,
      StatKey.RAGE,
      5,
      StatAction.INCREASE,
      curAttackerStats
    );
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
  } else if (enemy.stats.health <= 0 || enemy.stats.stamina <= 0) {
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
    handleStat(
      gladiator.stats,
      StatKey.RAGE,
      0,
      StatAction.SET,
      updatedGladiatorStats
    );
    [
      StatKey.HEALTH,
      StatKey.STAMINA,
      StatKey.STRENGTH,
      StatKey.DEFENSE,
      StatKey.DEXTERITY,
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
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    checkForLevelUp(gladiator.stats, updatedGladiatorStats);
    return;
  }

  curAttacker.hasTurn = false;
  curDefender.hasTurn = true;
}
