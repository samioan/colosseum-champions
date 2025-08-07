import type { Gladiator, Perk } from "@/types";

export default function selectPerk(perk: Perk, gladiator: Gladiator) {
  if (!perk.isUnlocked) {
    if (gladiator.stats.points >= 5) {
      perk.isUnlocked = true;
      gladiator.stats.points -= 5;
    } else return;
  }
  const selectedPerks = Object.values(gladiator.perks).filter(
    (a) => a.isSelected === true
  );
  if (selectedPerks.length > 2 && !perk.isSelected) {
    return;
  } else {
    perk.isSelected = !perk.isSelected;
  }
}
