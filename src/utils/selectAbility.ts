import type { Ability, Gladiator } from "@/types";

export default function selectAbility(ability: Ability, gladiator: Gladiator) {
  if (!ability.isUnlocked) {
    if (gladiator.stats.points >= ability.points) {
      ability.isUnlocked = true;
      gladiator.stats.points -= ability.points;
    } else return;
  }
  const selectedAbilities = Object.values(gladiator.abilities).filter(
    (a) => a.isEquipped === true
  );
  if (selectedAbilities.length > 2 && !ability.isEquipped) {
    return;
  } else {
    ability.isEquipped = !ability.isEquipped;
    if (!ability.isEquipped) ability.isActive = false;
  }
}
