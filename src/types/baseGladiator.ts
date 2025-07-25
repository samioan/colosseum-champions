export interface BaseGladiator {
  id: string;
  name: string;
  level: number;
  health: number;
  maxHealth: number;
  stamina: number;
  maxStamina: number;
  strength: number;
  dexterity: number;
  defense: number;
  hasTurn: boolean;
  messages: { from: string; text: string; time: number }[];
}
