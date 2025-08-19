import type { Gladiator, Ability, Perk } from "@/types";
import { createName, getRandomRange } from "@/utils";
import {
  ENEMY_STAT_RANGES,
  ABILITIES,
  PERKS,
  ITEMS,
  EQUIPMENT,
} from "@/constants";
import {
  StatKey,
  AbilityId,
  PerkId,
  EquipmentId,
  EquipmentSlot,
} from "@/enums";

export default function createEnemy(gladiatorLevel: number = 1) {
  const ranges = ENEMY_STAT_RANGES;

  const maxHealth =
    getRandomRange(ranges.HEALTH.min, ranges.HEALTH.max) * gladiatorLevel;
  const maxStamina =
    getRandomRange(ranges.STAMINA.min, ranges.STAMINA.max) * gladiatorLevel;
  const strength =
    getRandomRange(ranges.STRENGTH.min, ranges.STRENGTH.max) * gladiatorLevel;
  const defense =
    getRandomRange(ranges.DEFENSE.min, ranges.DEFENSE.max) * gladiatorLevel;
  const dexterity =
    getRandomRange(ranges.DEXTERITY.min, ranges.DEXTERITY.max) * gladiatorLevel;

  function generateRandomAbilities() {
    const keys = Object.keys(ABILITIES) as AbilityId[];

    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return Object.fromEntries(
      keys.map((key) => [
        key,
        {
          ...ABILITIES[key],
          isActive: key === randomKey,
          isEquipped: key === randomKey,
        },
      ])
    ) as Record<AbilityId, Ability>;
  }

  function generateRandomPerks() {
    const keys = Object.keys(PERKS) as PerkId[];

    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return Object.fromEntries(
      keys.map((key) => [
        key,
        {
          ...PERKS[key],
          isEquipped: key === randomKey,
        },
      ])
    ) as Record<PerkId, Perk>;
  }

  function equipRandomFromEachSlot() {
    const equips = EQUIPMENT;

    for (const id in equips) {
      equips[id as EquipmentId].isEquipped = false;
    }

    const slotGroups: Record<EquipmentSlot, EquipmentId[]> = {} as any;
    for (const [id, item] of Object.entries(equips)) {
      if (!slotGroups[item.slot]) {
        slotGroups[item.slot] = [];
      }
      slotGroups[item.slot].push(id as EquipmentId);
    }

    for (const slot in slotGroups) {
      const items = slotGroups[slot as EquipmentSlot];
      const randomId = items[Math.floor(Math.random() * items.length)];
      equips[randomId].isEquipped = true;
    }

    return equips;
  }

  const enemy: Gladiator = {
    name: createName(),
    stats: {
      [StatKey.LEVEL]: gladiatorLevel,
      [StatKey.HEALTH]: maxHealth,
      [StatKey.MAX_HEALTH]: maxHealth,
      [StatKey.STAMINA]: maxStamina,
      [StatKey.MAX_STAMINA]: maxStamina,
      [StatKey.STRENGTH]: strength,
      [StatKey.MAX_STRENGTH]: strength,
      [StatKey.DEFENSE]: defense,
      [StatKey.MAX_DEFENSE]: defense,
      [StatKey.DEXTERITY]: dexterity,
      [StatKey.MAX_DEXTERITY]: dexterity,
      [StatKey.EXPERIENCE]: 0,
      [StatKey.MAX_EXPERIENCE]: 0,
      [StatKey.POINTS]: 0,
      [StatKey.GOLD]: 0,
    },
    hasTurn: false,
    abilities: generateRandomAbilities(),
    perks: generateRandomPerks(),
    items: ITEMS,
    equipment: equipRandomFromEachSlot(),
  };

  return enemy;
}
