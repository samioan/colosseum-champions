import type { Gladiator } from "@/types";
import { handleStat, performAbility, checkForLevelUp } from "@/utils";
import { StatAction, StatKey } from "@/enums";

export default function handleFighting(gladiator: Gladiator, enemy: Gladiator) {
  const curAttacker = gladiator.hasTurn ? gladiator : enemy;
  const curDefender = gladiator.hasTurn ? enemy : gladiator;

  const ability = Object.values(curAttacker?.abilities)?.find(
    (ability) => ability.isActive
  );

  if (ability && curAttacker.stats.rage >= ability.rage) {
    performAbility(ability, curAttacker, curDefender);
  } else {
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

    handleStat(curAttacker, StatKey.STAMINA, 5, StatAction.DECREASE);
    handleStat(curAttacker, StatKey.RAGE, 5, StatAction.INCREASE);
    handleStat(curDefender, StatKey.HEALTH, damage, StatAction.DECREASE);
  }

  if (gladiator.stats.health <= 0) {
    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    return;
  } else if (enemy.stats.health <= 0 || enemy.stats.stamina <= 0) {
    handleStat(gladiator, StatKey.GOLD, 500, StatAction.INCREASE);
    handleStat(gladiator, StatKey.EXPERIENCE, 500, StatAction.INCREASE);
    handleStat(gladiator, StatKey.RAGE, 0, StatAction.SET);
    [
      StatKey.HEALTH,
      StatKey.STAMINA,
      StatKey.STRENGTH,
      StatKey.DEFENSE,
      StatKey.DEXTERITY,
    ].forEach((stat) => {
      const maxStat = `max${stat[0].toUpperCase()}${stat.slice(1)}` as StatKey;
      handleStat(gladiator, stat, gladiator.stats[maxStat], StatAction.SET);
    });
    checkForLevelUp(gladiator);

    clearInterval(gladiator.intervalId);
    gladiator.intervalId = undefined;
    return;
  }

  curAttacker.hasTurn = false;
  curDefender.hasTurn = true;
}
