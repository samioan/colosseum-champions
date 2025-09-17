import { AbilityId, BonusStatus } from "@/enums";

export type Ability = {
  id: AbilityId;
  label: string;
  description: string;
  image: string;
  points: number;
  energy: number;
  cooldown: number;
  maxCooldown: number;
  status: BonusStatus;
};
