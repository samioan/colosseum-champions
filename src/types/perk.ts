import type { BonusStatus } from "@/enums";
import type { Bonus } from "@/types";

export type Perk = {
  label: string;
  description: string;
  image: string;
  points: number;
  status: BonusStatus;
  bonuses: Bonus[];
};
