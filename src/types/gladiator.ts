import type { Ability, Perk, GladiatorStats, Item } from "@/types";
import { AbilityId, PerkId, ItemId } from "@/enums";

export type Gladiator = {
  name: string;
  stats: GladiatorStats;
  hasTurn: boolean;
  intervalId?: number;
  abilities: Record<AbilityId, Ability>;
  perks: Record<PerkId, Perk>;
  items: Record<ItemId, Item>;
};
