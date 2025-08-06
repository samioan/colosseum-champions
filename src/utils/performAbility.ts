import type { Ability, Gladiator } from "@/types";
import { handleStat } from "@/utils";
import { StatKey, StatAction, AbilityType } from "@/enums";

export default function performAbility(
  ability: Ability,
  curAttacker: Gladiator,
  curDefender: Gladiator
) {
  handleStat(curAttacker, StatKey.RAGE, ability.rage, StatAction.DECREASE);

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
      return curAttacker.stats[valueObj.stat];
    }
    switch (valueObj.operator) {
      case "*":
        return curAttacker.stats[valueObj.stat] * (valueObj?.modifier ?? 1);
      case "/":
        return curAttacker.stats[valueObj.stat] / (valueObj?.modifier ?? 1);
      default:
        return curAttacker.stats[valueObj.stat];
    }
  }

  buffs.length &&
    buffs.forEach((buff) => {
      const bonus = calculateValue(buff);

      handleStat(curAttacker, buff.stat, bonus, StatAction.INCREASE);
    });

  attacks.length &&
    attacks.forEach((attack) => {
      const damage = calculateValue(attack);

      handleStat(curDefender, attack.stat, damage, StatAction.DECREASE);
    });
}
