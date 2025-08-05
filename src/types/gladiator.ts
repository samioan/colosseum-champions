import type { CombatMessage, Ability, Perk } from "@/types";
import { ActivityState, StatKey } from "@/enums";

export type Gladiator = {
  id: string;
  gladiatorId?: string;
  name: string;
  [StatKey.LEVEL]: number;
  [StatKey.HEALTH]: number;
  [StatKey.MAX_HEALTH]: number;
  [StatKey.STAMINA]: number;
  [StatKey.MAX_STAMINA]: number;
  [StatKey.RAGE]: number;
  [StatKey.MAX_RAGE]: number;
  [StatKey.STRENGTH]: number;
  [StatKey.DEXTERITY]: number;
  [StatKey.DEFENSE]: number;
  [StatKey.EXPERIENCE]: number;
  [StatKey.MAX_EXPERIENCE]: number;
  [StatKey.POINTS]: number;
  [StatKey.GOLD]: number;
  hasTurn: boolean;
  messages: CombatMessage[];
  activity: ActivityState;
  intervalId?: number;
  abilities: Ability[];
  perks: Perk[];
};
