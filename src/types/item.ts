import { StatKey } from "@/enums";

export type Item = {
  id: string;
  label: string;
  description: string;
  gold: number;
  amount: number;
  bonuses: {
    stat: StatKey;
    operator: string;
    value: {
      stat: StatKey;
      operator: string;
      modifier: number;
    };
  }[];
};
