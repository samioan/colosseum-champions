import { Operator, StatKey } from "@/enums";

export type Item = {
  label: string;
  description: string;
  gold: number;
  amount: number;
  bonuses: {
    stat: StatKey;
    operator: Operator;
    value: {
      stat: StatKey;
      operator: Operator;
      modifier: number;
    };
  }[];
};
