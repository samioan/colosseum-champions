import { BonusStatus } from "@/enums";
import type { Ability, Gladiator } from "@/types";

export default function selectAbility(ability: Ability, gladiator: Gladiator) {
  if (ability.status === BonusStatus.LOCKED) {
    ability.status = BonusStatus.UNEQUIPPED;
    gladiator.stats.points -= ability.points;
  }

  ability.status =
    ability.status === BonusStatus.UNEQUIPPED
      ? BonusStatus.EQUIPPED
      : BonusStatus.UNEQUIPPED;
}
