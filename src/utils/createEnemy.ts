import type { Gladiator, Ability, Perk, Equipment } from "@/types";
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
  BonusStatus,
} from "@/enums";

export default function createEnemy(level: number = 1) {
  const ranges = ENEMY_STAT_RANGES;

  const maxHealth =
    getRandomRange(ranges.HEALTH.min, ranges.HEALTH.max) * level;
  const maxStamina =
    getRandomRange(ranges.STAMINA.min, ranges.STAMINA.max) * level;
  const strength =
    getRandomRange(ranges.STRENGTH.min, ranges.STRENGTH.max) * level;
  const defense =
    getRandomRange(ranges.DEFENSE.min, ranges.DEFENSE.max) * level;

  function generateRandomAbilities() {
    if (level < 10) return ABILITIES;

    const keys = Object.keys(ABILITIES) as AbilityId[];

    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return Object.fromEntries(
      keys.map((key) => [
        key,
        {
          ...ABILITIES[key],
          status: key === randomKey ? BonusStatus.ACTIVE : BonusStatus.LOCKED,
        },
      ])
    ) as Record<AbilityId, Ability>;
  }

  function generateRandomPerks() {
    if (level < 10) return PERKS;

    const keys = Object.keys(PERKS) as PerkId[];

    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return Object.fromEntries(
      keys.map((key) => [
        key,
        {
          ...PERKS[key],
          status: key === randomKey ? BonusStatus.EQUIPPED : BonusStatus.LOCKED,
        },
      ])
    ) as Record<PerkId, Perk>;
  }

  function equipRandomFromEachSlot() {
    const equips: Record<EquipmentId, Equipment> = JSON.parse(
      JSON.stringify(EQUIPMENT)
    );

    if (level < 10) return equips;

    for (const id in equips) {
      equips[id as EquipmentId].status = BonusStatus.EQUIPPED;
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
      equips[randomId].status = BonusStatus.EQUIPPED;
    }

    return equips;
  }

  const enemy: Gladiator = {
    name: createName(),
    stats: {
      [StatKey.LEVEL]: level,
      [StatKey.HEALTH]: maxHealth,
      [StatKey.MAX_HEALTH]: maxHealth,
      [StatKey.STAMINA]: maxStamina,
      [StatKey.MAX_STAMINA]: maxStamina,
      [StatKey.STRENGTH]: strength,
      [StatKey.MAX_STRENGTH]: strength,
      [StatKey.DEFENSE]: defense,
      [StatKey.MAX_DEFENSE]: defense,
      [StatKey.EXPERIENCE]: 0,
      [StatKey.MAX_EXPERIENCE]: 0,
      [StatKey.POINTS]: 0,
      [StatKey.GOLD]: 0,
    },
    abilities: generateRandomAbilities(),
    perks: generateRandomPerks(),
    items: ITEMS,
    equipment: equipRandomFromEachSlot(),
  };

  return enemy;
}
