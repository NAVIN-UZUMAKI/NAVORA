import type { Mission, UserProfile } from '../types';

export interface ProgressSnapshot {
  level: number;
  rank: string;
  totalXp: number;
  completedMissions: number;
  activeMissions: number;
  totalMissions: number;
  completionRate: number;
  streak: number;
  recentCompletedMissions: number;
  recentXp: number;
  previousCompletedMissions: number;
  previousXp: number;
  missionTrend: 'improving' | 'stable' | 'slowing';
  strongestCategory: Mission['category'] | null;
  weakestCategory: Mission['category'] | null;
}

const getCompletedMissions = (missions: Mission[]) =>
  missions.filter((mission) => mission.status === 'completed');

const getDate = (mission: Mission): number => {
  const date = mission.completedAt || mission.createdAt;
  const timestamp = new Date(date).getTime();

  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const getCategoryCounts = (
  missions: Mission[],
): Record<Mission['category'], number> => {
  const counts: Record<Mission['category'], number> = {
    general: 0,
    training: 0,
    focus: 0,
    special: 0,
  };

  missions.forEach((mission) => {
    counts[mission.category] += 1;
  });

  return counts;
};

export const calculateProgressSnapshot = (
  user: UserProfile,
  missions: Mission[],
): ProgressSnapshot => {
  const completed = getCompletedMissions(missions);
  const active = missions.filter((mission) => mission.status === 'active');

  const totalMissions = missions.length;

  const completionRate =
    totalMissions > 0
      ? Math.round((completed.length / totalMissions) * 100)
      : 0;

  const now = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;
  const fourteenDays = 14 * 24 * 60 * 60 * 1000;

  const recentCompleted = completed.filter((mission) => {
    const timestamp = getDate(mission);
    return timestamp >= now - sevenDays;
  });

  const previousCompleted = completed.filter((mission) => {
    const timestamp = getDate(mission);

    return (
      timestamp >= now - fourteenDays &&
      timestamp < now - sevenDays
    );
  });

  const recentXp = recentCompleted.reduce(
    (total, mission) => total + mission.xpReward,
    0,
  );

  const previousXp = previousCompleted.reduce(
    (total, mission) => total + mission.xpReward,
    0,
  );

  let missionTrend: ProgressSnapshot['missionTrend'] = 'stable';

  if (recentCompleted.length > previousCompleted.length) {
    missionTrend = 'improving';
  } else if (recentCompleted.length < previousCompleted.length) {
    missionTrend = 'slowing';
  }

  const categoryCounts = getCategoryCounts(completed);
  const categories = Object.entries(categoryCounts) as Array<
    [Mission['category'], number]
  >;

  const categoriesWithMissions = categories.filter(
    ([, count]) => count > 0,
  );

  const strongestCategory =
    categoriesWithMissions.length > 0
      ? categoriesWithMissions.reduce((best, current) =>
          current[1] > best[1] ? current : best,
        )[0]
      : null;

  const weakestCategory =
    categoriesWithMissions.length > 1
      ? categoriesWithMissions.reduce((weakest, current) =>
          current[1] < weakest[1] ? current : weakest,
        )[0]
      : null;

  return {
    level: user.level,
    rank: user.rank,
    totalXp: user.totalXp,
    completedMissions: completed.length,
    activeMissions: active.length,
    totalMissions,
    completionRate,
    streak: user.streak,
    recentCompletedMissions: recentCompleted.length,
    recentXp,
    previousCompletedMissions: previousCompleted.length,
    previousXp,
    missionTrend,
    strongestCategory,
    weakestCategory,
  };
};

export const getProgressSummary = (
  user: UserProfile,
  missions: Mission[],
): string[] => {
  const progress = calculateProgressSnapshot(user, missions);
  const insights: string[] = [];

  if (progress.completedMissions === 0) {
    insights.push('No missions have been completed yet.');
  } else {
    insights.push(
      `${progress.completedMissions} missions completed with ${progress.completionRate}% overall completion.`,
    );
  }

  if (progress.activeMissions > 0) {
    insights.push(
      `${progress.activeMissions} active mission${
        progress.activeMissions === 1 ? '' : 's'
      } currently remain.`,
    );
  }

  if (progress.streak > 0) {
    insights.push(
      `Current discipline streak: ${progress.streak} day${
        progress.streak === 1 ? '' : 's'
      }.`,
    );
  }

  if (progress.missionTrend === 'improving') {
    insights.push(
      `Recent activity is improving: ${progress.recentCompletedMissions} missions completed in the last 7 days.`,
    );
  } else if (progress.missionTrend === 'slowing') {
    insights.push(
      `Recent activity has slowed: ${progress.recentCompletedMissions} missions completed in the last 7 days.`,
    );
  } else if (progress.recentCompletedMissions > 0) {
    insights.push(
      `Recent activity is stable with ${progress.recentCompletedMissions} missions completed this week.`,
    );
  }

  if (progress.strongestCategory) {
    insights.push(
      `Strongest mission area: ${progress.strongestCategory}.`,
    );
  }

  if (progress.weakestCategory) {
    insights.push(
      `Area needing more attention: ${progress.weakestCategory}.`,
    );
  }

  return insights;
};