import { BonusStatus } from "@/enums";
import type { Ability, Gladiator } from "@/types";

export default function activateAbility(
  ability: Ability,
  gladiator: Gladiator
) {
  if (ability.status === BonusStatus.ACTIVE)
    ability.status = BonusStatus.EQUIPPED;
  else {
    Object.values(gladiator.abilities).forEach((a) => {
      if (a.status === BonusStatus.ACTIVE) a.status = BonusStatus.EQUIPPED;
    });
    ability.status = BonusStatus.ACTIVE;
  }
}
