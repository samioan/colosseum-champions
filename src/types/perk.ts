import type { Bonus } from "@/types";

export type Perk = {
  label: string;
  description: string;
  points: number;
  isUnlocked: boolean;
  isEquipped: boolean;
  bonuses: Bonus[];
};
