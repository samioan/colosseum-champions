import type { Ability, Gladiator } from "@/types";

export default function activateAbility(
  ability: Ability,
  gladiator: Gladiator
) {
  if (ability.isActive) ability.isActive = false;
  else {
    gladiator.abilities.forEach((a) => (a.isActive = false));
    ability.isActive = true;
  }
}
