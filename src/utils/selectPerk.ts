import type { Gladiator, Perk } from "@/types";
import { BonusStatus } from "@/enums";

export default function selectPerk(perk: Perk, gladiator: Gladiator) {
  if (perk.status === BonusStatus.LOCKED) {
    perk.status = BonusStatus.UNEQUIPPED;
    gladiator.stats.points -= perk.points;
  }

  perk.status =
    perk.status === BonusStatus.UNEQUIPPED
      ? BonusStatus.EQUIPPED
      : BonusStatus.UNEQUIPPED;
}
