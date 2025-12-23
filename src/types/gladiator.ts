import type { Ability, Perk, GladiatorStats, Item, Equipment } from "@/types";
import { AbilityId, PerkId, ItemId, EquipmentId } from "@/enums";

export type Gladiator = {
  name: string;
  stats: GladiatorStats;
  intervalId?: number;
  abilities: Record<AbilityId, Ability>;
  perks: Record<PerkId, Perk>;
  items: Record<ItemId, Item>;
  equipment: Record<EquipmentId, Equipment>;
};
