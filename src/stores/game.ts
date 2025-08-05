import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import { useRouter } from "vue-router";
import type { Gladiator } from "@/types";
import {
  setActivity,
  handleTraining,
  handleFighting,
  handleResting,
  createMessage,
  createEnemy,
  createGladiator,
  allocatePoint,
  calculatePerks,
} from "@/utils";
import {
  INTRO_MESSAGES,
  ACTIVITY_TIMES,
  LABELS,
  COLORS,
  ROUTES,
} from "@/constants";
import { ActivityState, DrawerState, StatKey } from "@/enums";

export const useGameStore = defineStore("game", () => {
  const router = useRouter();

  const gladiator = ref<Gladiator>(createGladiator());

  const enemy = ref<Gladiator>(
    createEnemy(gladiator.value.id, gladiator.value.level)
  );
  const activityTimes = ref(ACTIVITY_TIMES);
  const drawer = ref<{ isOpen: boolean; state: DrawerState; title: string }>({
    isOpen: false,
    state: DrawerState.EMPTY,
    title: "",
  });

  const computedPerks = computed(() => {
    return calculatePerks(gladiator.value, gladiatorStats.value);
  });

  const gladiatorStats: ComputedRef<{
    health: number;
    maxHealth: number;
    stamina: number;
    maxStamina: number;
    rage: number;
    maxRage: number;
    strength: number;
    dexterity: number;
    defense: number;
    experience: number;
    maxExperience: number;
    gold: number;
    level: number;
    points: number;
  }> = computed(() => ({
    health:
      gladiator.value.health + (computedPerks.value?.[StatKey.HEALTH] ?? 0),
    maxHealth:
      gladiator.value.maxHealth +
      (computedPerks.value?.[StatKey.MAX_HEALTH] ?? 0),
    stamina: gladiator.value.stamina + (computedPerks.value?.["stamina"] ?? 0),
    maxStamina:
      gladiator.value.maxStamina + (computedPerks.value?.["maxStamina"] ?? 0),
    rage: gladiator.value.rage + (computedPerks.value?.["rage"] ?? 0),
    maxRage: gladiator.value.maxRage + (computedPerks.value?.["maxRage"] ?? 0),
    strength:
      gladiator.value.strength + (computedPerks.value?.["strength"] ?? 0),
    dexterity:
      gladiator.value.dexterity + (computedPerks.value?.["dexterity"] ?? 0),
    defense: gladiator.value.defense + (computedPerks.value?.["defense"] ?? 0),
    experience: gladiator.value.experience,
    maxExperience: gladiator.value.maxExperience,
    gold: gladiator.value.gold,
    level: gladiator.value.level,
    points: gladiator.value.points,
  }));

  const gladiatorHeaderProps = computed(() => ({
    name: gladiator.value.name,
    level: gladiator.value.level,
  }));

  const gladiatorMainStats = computed(() => [
    {
      label: LABELS.HEALTH,
      stat: gladiatorStats.value.health,
      maxStat: gladiatorStats.value.maxHealth,
      colorClass: COLORS.HEALTH,
    },
    {
      label: LABELS.STAMINA,
      stat: gladiatorStats.value.stamina,
      maxStat: gladiatorStats.value.maxStamina,
      colorClass: COLORS.STAMINA,
    },
    {
      label: LABELS.RAGE,
      stat: gladiatorStats.value.rage,
      maxStat: gladiatorStats.value.maxRage,
      colorClass: COLORS.RAGE,
    },
  ]);

  const gladiatorMainExtraStats = computed(() => [
    {
      label: LABELS.EXPERIENCE,
      stat: gladiatorStats.value.experience,
      maxStat: gladiatorStats.value.maxExperience,
      colorClass: COLORS.EXPERIENCE,
    },
    {
      label: LABELS.GOLD,
      stat: gladiatorStats.value.gold,
      colorClass: COLORS.GOLD,
    },
  ]);

  const gladiatorSecondaryStats = computed(() => [
    {
      label: LABELS.HEALTH,
      stat: gladiatorStats.value.maxHealth,
      onClick: () =>
        allocatePoint(gladiator.value, [
          { statKey: StatKey.MAX_HEALTH, value: 10 },
          { statKey: StatKey.HEALTH, value: 10 },
        ]),
    },
    {
      label: LABELS.STAMINA,
      stat: gladiatorStats.value.maxStamina,
      onClick: () =>
        allocatePoint(gladiator.value, [
          { statKey: StatKey.MAX_STAMINA, value: 10 },
          { statKey: StatKey.STAMINA, value: 10 },
        ]),
    },
    {
      label: LABELS.STRENGTH,
      stat: gladiatorStats.value.strength,
      onClick: () =>
        allocatePoint(gladiator.value, [
          { statKey: StatKey.STRENGTH, value: 1 },
        ]),
    },
    {
      label: LABELS.DEFENSE,
      stat: gladiatorStats.value.defense,
      onClick: () =>
        allocatePoint(gladiator.value, [
          { statKey: StatKey.DEFENSE, value: 1 },
        ]),
    },
    {
      label: LABELS.DEXTERITY,
      stat: gladiatorStats.value.dexterity,
      onClick: () =>
        allocatePoint(gladiator.value, [
          { statKey: StatKey.DEXTERITY, value: 1 },
        ]),
    },
  ]);

  const gladiatorAbilities = computed(() => {
    return gladiator.value.abilities.map((ability) => ({
      ...ability,
      onSelect: () => {
        if (!ability.isUnlocked) {
          if (gladiator.value.points >= 5) {
            ability.isUnlocked = true;
            gladiator.value.points -= 5;
          } else return;
        }
        const selectedAbilities = gladiator.value.abilities.filter(
          (a) => a.isSelected === true
        );
        if (selectedAbilities.length > 2 && !ability.isSelected) {
          return;
        } else {
          ability.isSelected = !ability.isSelected;
          if (!ability.isSelected) ability.isActive = false;
        }
      },
      onActivate: () => {
        if (ability.isActive) ability.isActive = false;
        else {
          gladiator.value.abilities.forEach((a) => (a.isActive = false));
          ability.isActive = true;
        }
      },
    }));
  });

  const gladiatorPerks = computed(() => {
    return gladiator.value.perks.map((perk) => ({
      ...perk,
      onSelect: () => {
        if (!perk.isUnlocked) {
          if (gladiator.value.points >= 5) {
            perk.isUnlocked = true;
            gladiator.value.points -= 5;
          } else return;
        }
        const selectedPerks = gladiator.value.perks.filter(
          (a) => a.isSelected === true
        );
        if (selectedPerks.length > 2 && !perk.isSelected) {
          return;
        } else {
          perk.isSelected = !perk.isSelected;
        }
      },
    }));
  });

  const gladiatorSelectedAbilities = computed(() =>
    gladiator.value.abilities
      .filter((ability) => ability.isSelected)
      .map((ability) => ({
        label: ability.label,
        isActive: ability.isActive,
        onActivate: () => {
          if (ability.isActive) ability.isActive = false;
          else {
            gladiator.value.abilities.forEach((a) => (a.isActive = false));
            ability.isActive = true;
          }
        },
      }))
  );

  const gladiatorSelectedPerks = computed(() =>
    gladiator.value.perks
      .filter((perk) => perk.isSelected)
      .map((perk) => perk.label)
  );

  const gladiatorActivityButtons = computed(() => [
    {
      onClick: () => toggleDrawer(DrawerState.CHARACTER, "Codex"),
      label: LABELS.CODEX,
      colorClasses: COLORS.STATS_BUTTON,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ARMORY, "Armory"),
      label: LABELS.ARMORY,
      colorClasses: COLORS.STATS_BUTTON,
    },
    {
      onClick: () => toggleDrawer(DrawerState.ITEMS, "Items"),
      label: LABELS.ITEMS,
      colorClasses: COLORS.STATS_BUTTON,
    },
    {
      disabled:
        gladiator.value.activity === ActivityState.FIGHTING ||
        gladiator.value.activity === ActivityState.RESTING ||
        gladiator.value.stamina < 5 ||
        gladiator.value.gold < 10,
      onClick:
        gladiator.value.activity === ActivityState.TRAINING
          ? () => setActivity(gladiator.value, ActivityState.IDLE)
          : () => train(),
      label:
        LABELS[
          gladiator.value.activity === ActivityState.TRAINING ? "STOP" : "TRAIN"
        ],
      colorClasses: COLORS.TRAIN_BUTTON,
    },
    {
      disabled:
        gladiator.value.activity === ActivityState.TRAINING ||
        gladiator.value.activity === ActivityState.RESTING ||
        gladiator.value.stamina < 5,
      onClick:
        gladiator.value.activity === ActivityState.FIGHTING
          ? () => setActivity(gladiator.value, ActivityState.IDLE)
          : () => {
              router.push(ROUTES.combat);
              fight(gladiator.value.id);
            },
      label:
        LABELS[
          gladiator.value.activity === ActivityState.FIGHTING ? "STOP" : "FIGHT"
        ],
      colorClasses: COLORS.FIGHT_BUTTON,
    },
    {
      disabled:
        gladiator.value.activity === ActivityState.FIGHTING ||
        gladiator.value.activity === ActivityState.TRAINING ||
        gladiator.value.gold < 10 ||
        (gladiator.value.health === gladiator.value.maxHealth &&
          gladiator.value.stamina === gladiator.value.maxStamina),
      onClick:
        gladiator.value.activity === ActivityState.RESTING
          ? () => setActivity(gladiator.value, ActivityState.IDLE)
          : () => rest(),
      label:
        gladiator.value.activity === ActivityState.RESTING
          ? LABELS.STOP
          : LABELS.REST,
      colorClasses: COLORS.REST_BUTTON,
    },
  ]);

  const enemyHeaderProps = computed(() => ({
    name: enemy.value.name,
    level: enemy.value.level,
  }));

  const enemyMainStats = computed(() => [
    {
      label: LABELS.HEALTH,
      stat: enemy.value.health,
      maxStat: enemy.value.maxHealth,
      colorClass: COLORS.HEALTH,
    },
  ]);

  const combatMessages = computed(() => {
    const msgs = [
      ...gladiator.value.messages,
      ...(enemy.value?.messages ?? []),
    ].sort((a, b) => b.time - a.time);

    return {
      gladiatorId: gladiator.value.id,
      messages: msgs.slice(0, 1),
    };
  });

  const combatModalProps = computed(() => ({
    isVisible:
      gladiator.value.health <= 0 ||
      gladiator.value.stamina <= 0 ||
      enemy.value?.health <= 0 ||
      enemy.value?.stamina <= 0,
    onClick: () =>
      router.push(
        ROUTES[
          gladiator.value.health <= 0 || gladiator.value.stamina <= 0
            ? "home"
            : "gladiator"
        ]
      ),
  }));

  const combatModalMessage = computed(
    () => combatMessages.value.messages[0]?.text
  );

  function toggleDrawer(state: DrawerState, title: string) {
    drawer.value.isOpen = !drawer.value.isOpen;
    drawer.value.state = state;
    drawer.value.title = title;
  }

  function train() {
    setActivity(
      gladiator.value,
      ActivityState.TRAINING,
      () => handleTraining(gladiator.value),
      activityTimes.value.training
    );
  }

  function fight(id: string) {
    enemy.value = createEnemy(gladiator.value.id, gladiator.value.level);
    gladiator.value.messages = [];
    createMessage(
      gladiator.value.messages,
      INTRO_MESSAGES,
      id,
      gladiator.value.name
    );
    setActivity(
      gladiator.value,
      ActivityState.FIGHTING,
      () => handleFighting(gladiator.value, enemy.value),
      activityTimes.value.fighting
    );
  }

  function rest() {
    setActivity(
      gladiator.value,
      ActivityState.RESTING,
      () => handleResting(gladiator.value),
      activityTimes.value.resting
    );
  }

  function init() {
    gladiator.value = createGladiator();
  }

  return {
    gladiator,
    enemy,
    activityTimes,
    gladiatorHeaderProps,
    gladiatorMainStats,
    gladiatorMainExtraStats,
    gladiatorSecondaryStats,
    gladiatorActivityButtons,
    enemyHeaderProps,
    enemyMainStats,
    combatMessages,
    combatModalProps,
    combatModalMessage,
    drawer,
    gladiatorAbilities,
    gladiatorSelectedAbilities,
    gladiatorPerks,
    gladiatorSelectedPerks,
    gladiatorStats,
    computedPerks,
    toggleDrawer,
    train,
    fight,
    rest,
    init,
  };
});
