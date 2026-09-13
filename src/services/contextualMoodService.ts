import type { Mission, UserProfile } from '../types';
import type { GuideMood } from '../types/guide';

export interface ContextualMoodResult {
  mood: GuideMood;
  reason: string;
}

interface MoodContext {
  user: UserProfile;
  missions: Mission[];
  completedToday: number;
  recentCompleted: number;
  recentTotal: number;
}

const isCompleted = (mission: Mission): boolean =>
  mission.status === 'completed';

const isActive = (mission: Mission): boolean =>
  mission.status === 'active';

const isOverdue = (mission: Mission): boolean => {
  if (!mission.dueDate || !isActive(mission)) return false;

  const dueDate = new Date(mission.dueDate);

  if (Number.isNaN(dueDate.getTime())) return false;

  return dueDate.getTime() < Date.now();
};

const getDateKey = (date: Date): string =>
  date.toISOString().slice(0, 10);

const getRecentMissionStats = (
  missions: Mission[],
  days: number,
): {
  completed: number;
  total: number;
} => {
  const now = new Date();
  const start = new Date(now);

  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));

  const completed = missions.filter((mission) => {
    if (!isCompleted(mission) || !mission.completedAt) return false;

    const completedAt = new Date(mission.completedAt);

    return (
      !Number.isNaN(completedAt.getTime()) &&
      completedAt.getTime() >= start.getTime()
    );
  }).length;

  const total = missions.filter((mission) => {
    const createdAt = new Date(mission.createdAt);

    return (
      !Number.isNaN(createdAt.getTime()) &&
      createdAt.getTime() >= start.getTime()
    );
  }).length;

  return {
    completed,
    total,
  };
};

const getCompletedToday = (missions: Mission[]): number => {
  const today = getDateKey(new Date());

  return missions.filter((mission) => {
    if (!isCompleted(mission) || !mission.completedAt) return false;

    const completedAt = new Date(mission.completedAt);

    return (
      !Number.isNaN(completedAt.getTime()) &&
      getDateKey(completedAt) === today
    );
  }).length;
};

const buildContext = (
  user: UserProfile,
  missions: Mission[],
): MoodContext => {
  const recentStats = getRecentMissionStats(missions, 7);

  return {
    user,
    missions,
    completedToday: getCompletedToday(missions),
    recentCompleted: recentStats.completed,
    recentTotal: recentStats.total,
  };
};

export const getContextualMood = (
  user: UserProfile,
  missions: Mission[],
): ContextualMoodResult => {
  const context = buildContext(user, missions);

  const activeMissions = context.missions.filter(isActive);
  const overdueMissions = activeMissions.filter(isOverdue);

  /*
   * 1. Strong positive momentum
   *
   * Celebration gets the highest priority when the user
   * is actively completing missions and maintaining momentum.
   */
  if (
    context.completedToday >= 3 ||
    (context.user.streak >= 7 && context.completedToday >= 1)
  ) {
    return {
      mood: 'celebrating',
      reason: 'You are building strong momentum today.',
    };
  }

  /*
   * 2. Overload / pressure
   *
   * AURA becomes focused when there is significant workload
   * or several overdue missions competing for attention.
   */
  if (
    overdueMissions.length >= 2 ||
    activeMissions.length >= 8
  ) {
    return {
      mood: 'focused',
      reason: 'There is a lot competing for your attention right now.',
    };
  }

  /*
   * 3. Good progress
   *
   * Encourage the user when recent activity shows
   * consistent forward movement.
   */
  if (
    context.recentCompleted >= 3 ||
    context.user.streak >= 3 ||
    context.user.currentXp > 0
  ) {
    return {
      mood: 'encouraging',
      reason: 'You are making steady progress.',
    };
  }

  /*
   * 4. Low energy
   *
   * Chakra energy is already part of the user profile,
   * so we can use it as a lightweight signal.
   */
  if (context.user.chakraEnergy <= 20) {
    return {
      mood: 'gentle',
      reason: 'Your energy looks low, so I will keep things calm.',
    };
  }

  /*
   * 5. No activity / quiet state
   */
  if (
    context.recentTotal === 0 &&
    context.user.streak === 0 &&
    activeMissions.length === 0
  ) {
    return {
      mood: 'gentle',
      reason: 'This is a quiet moment. We can start with something small.',
    };
  }

  /*
   * 6. Default state
   */
  return {
    mood: 'encouraging',
    reason: 'Keep moving forward one mission at a time.',
  };
};