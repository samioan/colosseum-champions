import type { Ability, Gladiator } from "@/types";

export default function selectAbility(ability: Ability, gladiator: Gladiator) {
  if (!ability.isUnlocked) {
    if (gladiator.stats.points >= 5) {
      ability.isUnlocked = true;
      gladiator.stats.points -= 5;
    } else return;
  }
  const selectedAbilities = Object.values(gladiator.abilities).filter(
    (a) => a.isSelected === true
  );
  if (selectedAbilities.length > 2 && !ability.isSelected) {
    return;
  } else {
    ability.isSelected = !ability.isSelected;
    if (!ability.isSelected) ability.isActive = false;
  }
}
