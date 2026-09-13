import type { Mission, UserProfile } from '../types';

export interface AuraPersonalContext {
  userName: string;
  title: string;
  rank: UserProfile['rank'];
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalXp: number;
  streak: number;
  chakraEnergy: number;

  totalMissions: number;
  activeMissions: number;
  completedMissions: number;
  completedToday: number;

  overdueMissions: number;
  urgentMissions: number;

  recentCompletedMissions: string[];
  completedTodayTitles: string[];
  overdueMissionTitles: string[];
  urgentMissionTitles: string[];
  activeMissionTitles: string[];
}

const isToday = (date?: string): boolean => {
  if (!date) return false;

  const target = new Date(date);

  if (Number.isNaN(target.getTime())) {
    return false;
  }

  const today = new Date();

  return (
    target.getFullYear() === today.getFullYear() &&
    target.getMonth() === today.getMonth() &&
    target.getDate() === today.getDate()
  );
};

const getValidDate = (date?: string): Date | null => {
  if (!date) return null;

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const isOverdue = (mission: Mission): boolean => {
  if (!mission.dueDate || mission.status !== 'active') {
    return false;
  }

  const dueDate = getValidDate(mission.dueDate);

  if (!dueDate) {
    return false;
  }

  return dueDate.getTime() < Date.now();
};

const isUrgent = (mission: Mission): boolean => {
  if (!mission.dueDate || mission.status !== 'active') {
    return false;
  }

  const dueDate = getValidDate(mission.dueDate);

  if (!dueDate) {
    return false;
  }

  const hoursUntilDue =
    (dueDate.getTime() - Date.now()) / (1000 * 60 * 60);

  return hoursUntilDue >= 0 && hoursUntilDue <= 24;
};

export const buildAuraPersonalContext = (
  user: UserProfile,
  missions: Mission[]
): AuraPersonalContext => {
  const completedMissions = missions.filter(
    (mission) => mission.status === 'completed'
  );

  const activeMissions = missions.filter(
    (mission) => mission.status === 'active'
  );

  const completedTodayMissions = completedMissions.filter(
    (mission) => isToday(mission.completedAt)
  );

  const overdueMissionList = activeMissions.filter(isOverdue);

  const urgentMissionList = activeMissions.filter(isUrgent);

  const recentCompletedMissions = completedMissions
    .filter((mission) => mission.completedAt)
    .sort((a, b) => {
      const aDate = getValidDate(a.completedAt)?.getTime() ?? 0;
      const bDate = getValidDate(b.completedAt)?.getTime() ?? 0;

      return bDate - aDate;
    })
    .slice(0, 5)
    .map((mission) => mission.title);

  const completedTodayTitles = completedTodayMissions
    .sort((a, b) => {
      const aDate = getValidDate(a.completedAt)?.getTime() ?? 0;
      const bDate = getValidDate(b.completedAt)?.getTime() ?? 0;

      return bDate - aDate;
    })
    .map((mission) => mission.title);

  const overdueMissionTitles = overdueMissionList
    .map((mission) => mission.title);

  const urgentMissionTitles = urgentMissionList
    .map((mission) => mission.title);

  const activeMissionTitles = activeMissions
    .map((mission) => mission.title);

  return {
    userName: user.name,
    title: user.title,
    rank: user.rank,
    level: user.level,
    currentXp: user.currentXp,
    xpToNextLevel: user.xpToNextLevel,
    totalXp: user.totalXp,
    streak: user.streak,
    chakraEnergy: user.chakraEnergy,

    totalMissions: missions.length,
    activeMissions: activeMissions.length,
    completedMissions: completedMissions.length,
    completedToday: completedTodayMissions.length,

    overdueMissions: overdueMissionList.length,
    urgentMissions: urgentMissionList.length,

    recentCompletedMissions,
    completedTodayTitles,
    overdueMissionTitles,
    urgentMissionTitles,
    activeMissionTitles,
  };
};