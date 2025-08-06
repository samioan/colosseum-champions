import type {
  CombatMessage,
  Ability,
  Perk,
  GladiatorStats,
  Item,
} from "@/types";
import { ActivityState } from "@/enums";

export type Gladiator = {
  id: string;
  gladiatorId?: string;
  name: string;
  stats: GladiatorStats;
  hasTurn: boolean;
  messages: CombatMessage[];
  activity: ActivityState;
  intervalId?: number;
  abilities: Ability[];
  perks: Perk[];
  items: Item[];
};
