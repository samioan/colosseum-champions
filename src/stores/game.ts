import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { ComputedRef } from "vue";
import { useRouter } from "vue-router";
import type { Gladiator, GladiatorStats } from "@/types";
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
  selectAbility,
  activateAbility,
  selectPerk,
  handleStat,
  useItem,
} from "@/utils";
import {
  INTRO_MESSAGES,
  ACTIVITY_TIMES,
  LABELS,
  COLORS,
  ROUTES,
} from "@/constants";
import { ActivityState, DrawerState, StatAction, StatKey } from "@/enums";

export const useGameStore = defineStore("game", () => {
  const router = useRouter();

  const gladiator = ref<Gladiator>(createGladiator());

  const enemy = ref<Gladiator>(
    createEnemy(gladiator.value.id, gladiator.value.stats.level)
  );
  const activityTimes = ref(ACTIVITY_TIMES);
  const drawer = ref<{ isOpen: boolean; state: DrawerState; title: string }>({
    isOpen: false,
    state: DrawerState.EMPTY,
    title: "",
  });

  const computedPerks: ComputedRef<GladiatorStats> = computed(() => {
    return calculatePerks(gladiator.value, gladiatorStats.value);
  });

  const gladiatorStats: ComputedRef<GladiatorStats> = computed(
    () =>
      Object.fromEntries(
        Object.entries(gladiator.value.stats).map((stat) => [
          stat[0],
          stat[1] + (computedPerks.value[stat[0] as StatKey] ?? 0),
        ])
      ) as GladiatorStats
  );

  const gladiatorHeaderProps = computed(() => ({
    name: gladiator.value.name,
    level: gladiatorStats.value.level,
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
      onSelect: () => selectAbility(ability, gladiator.value),
      onActivate: () => activateAbility(ability, gladiator.value),
    }));
  });

  const gladiatorPerks = computed(() => {
    return gladiator.value.perks.map((perk) => ({
      ...perk,
      onSelect: () => selectPerk(perk, gladiator.value),
    }));
  });

  const gladiatorSelectedAbilities = computed(() =>
    gladiator.value.abilities
      .filter((ability) => ability.isSelected)
      .map((ability) => ({
        label: ability.label,
        isActive: ability.isActive,
        onActivate: () => activateAbility(ability, gladiator.value),
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
        gladiator.value.stats.stamina < 5 ||
        gladiator.value.stats.gold < 10,
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
        gladiator.value.stats.stamina < 5,
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
        gladiator.value.stats.gold < 10 ||
        (gladiator.value.stats.health === gladiator.value.stats.maxHealth &&
          gladiator.value.stats.stamina === gladiator.value.stats.maxStamina),
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

  const gladiatorItems = computed(() => {
    return gladiator.value.items.map((item) => ({
      ...item,
      onBuy: () => {
        handleStat(
          gladiator.value,
          StatKey.GOLD,
          item.gold,
          StatAction.DECREASE
        );
        item.amount += 1;
      },
    }));
  });

  const gladiatorSelectedItems = computed(() => {
    return gladiator.value.items.map((item) => ({
      ...item,
      onUse: () => useItem(item, gladiator.value),
    }));
  });

  const enemyHeaderProps = computed(() => ({
    name: enemy.value.name,
    level: enemy.value.stats.level,
  }));

  const enemyMainStats = computed(() => [
    {
      label: LABELS.HEALTH,
      stat: enemy.value.stats.health,
      maxStat: enemy.value.stats.maxHealth,
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
      gladiator.value.stats.health <= 0 ||
      gladiator.value.stats.stamina <= 0 ||
      enemy.value?.stats.health <= 0 ||
      enemy.value?.stats.stamina <= 0,
    onClick: () =>
      router.push(
        ROUTES[
          gladiator.value.stats.health <= 0 ||
          gladiator.value.stats.stamina <= 0
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
    enemy.value = createEnemy(gladiator.value.id, gladiator.value.stats.level);
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
    gladiatorItems,
    gladiatorSelectedItems,
    toggleDrawer,
    train,
    fight,
    rest,
    init,
  };
});
