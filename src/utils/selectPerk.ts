import type { Gladiator, Perk } from "@/types";

export default function selectPerk(perk: Perk, gladiator: Gladiator) {
  if (!perk.isUnlocked) {
    if (gladiator.stats.points >= perk.points) {
      perk.isUnlocked = true;
      gladiator.stats.points -= perk.points;
    } else return;
  }
  const selectedPerks = Object.values(gladiator.perks).filter(
    (a) => a.isEquipped === true
  );
  if (selectedPerks.length > 2 && !perk.isEquipped) {
    return;
  } else {
    perk.isEquipped = !perk.isEquipped;
  }
}
