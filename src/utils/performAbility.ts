import type { Ability, GladiatorStats } from "@/types";
import { handleStat } from "@/utils";
import { StatKey, StatAction, AbilityType } from "@/enums";

export default function performAbility(
  ability: Ability,
  curAttackerStats: GladiatorStats,
  curDefenderStats: GladiatorStats,
  curAttackerUpdatedStats: GladiatorStats,
  curDefenderUpdatedStats: GladiatorStats
) {
  handleStat(
    curAttackerStats,
    StatKey.RAGE,
    ability.rage,
    StatAction.DECREASE,
    curAttackerUpdatedStats
  );

  const attacks = ability.payload.filter(
    (item) => item.type === AbilityType.OFFENSIVE
  );
  const buffs = ability.payload.filter(
    (item) => item.type === AbilityType.DEFENSIVE
  );

  function calculateValue(valueObj: {
    stat: StatKey;
    operator?: string;
    modifier?: number;
  }) {
    if (!valueObj.operator) {
      return curAttackerStats[valueObj.stat];
    }
    switch (valueObj.operator) {
      case "*":
        return (
          curAttackerStats[valueObj.stat] *
          (valueObj?.modifier ?? 1) *
          (100 / (100 + curDefenderStats.defense))
        );
      case "/":
        return (
          (curAttackerStats[valueObj.stat] / (valueObj?.modifier ?? 1)) *
          (100 / (100 + curDefenderStats.defense))
        );
      default:
        return curAttackerStats[valueObj.stat];
    }
  }

  buffs.length &&
    buffs.forEach((buff) => {
      const bonus = calculateValue(buff);

      handleStat(
        curAttackerStats,
        buff.stat,
        bonus,
        StatAction.INCREASE,
        curAttackerUpdatedStats
      );
    });

  attacks.length &&
    attacks.forEach((attack) => {
      const damage = calculateValue(attack);

      handleStat(
        curDefenderStats,
        attack.stat,
        damage,
        StatAction.DECREASE,
        curDefenderUpdatedStats
      );
    });
}
