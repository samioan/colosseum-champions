import { StatKey } from "@/enums";

export type Perk = {
  label: string;
  description: string;
  isUnlocked: boolean;
  isSelected: boolean;
  bonuses: {
    stat: StatKey;
    operator: string;
    value: number;
    requirements?: { stat: StatKey; operator: string; value: number }[];
  }[];
};
