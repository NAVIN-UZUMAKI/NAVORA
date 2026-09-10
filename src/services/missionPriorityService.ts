import type { Mission } from '../types';

export interface MissionPriorityResult {
  mission: Mission;
  score: number;
  priority: 'critical' | 'high' | 'medium' | 'low';
  reasons: string[];
}

const DIFFICULTY_WEIGHT: Record<Mission['difficulty'], number> = {
  'D-Rank': 1,
  'C-Rank': 2,
  'B-Rank': 3,
  'A-Rank': 4,
  'S-Rank': 5,
};

const CATEGORY_WEIGHT: Record<Mission['category'], number> = {
  general: 1,
  training: 1,
  focus: 2,
  special: 2,
};

const getDueDateScore = (dueDate?: string): {
  score: number;
  reason?: string;
} => {
  if (!dueDate) {
    return { score: 0 };
  }

  const now = new Date();
  const due = new Date(dueDate);

  if (Number.isNaN(due.getTime())) {
    return { score: 0 };
  }

  const differenceMs = due.getTime() - now.getTime();
  const hoursUntilDue = differenceMs / (1000 * 60 * 60);

  if (hoursUntilDue < 0) {
    return {
      score: 100,
      reason: 'Overdue',
    };
  }

  if (hoursUntilDue <= 6) {
    return {
      score: 80,
      reason: 'Due within 6 hours',
    };
  }

  if (hoursUntilDue <= 24) {
    return {
      score: 60,
      reason: 'Due today',
    };
  }

  if (hoursUntilDue <= 72) {
    return {
      score: 35,
      reason: 'Due within 3 days',
    };
  }

  if (hoursUntilDue <= 168) {
    return {
      score: 15,
      reason: 'Due within a week',
    };
  }

  return {
    score: 5,
    reason: 'Has a future deadline',
  };
};

const getXpScore = (mission: Mission): number => {
  return Math.min(mission.xpReward / 10, 50);
};

const getDifficultyScore = (mission: Mission): number => {
  return DIFFICULTY_WEIGHT[mission.difficulty] * 5;
};

const getCategoryScore = (mission: Mission): number => {
  return CATEGORY_WEIGHT[mission.category] * 3;
};

export const calculateMissionPriority = (
  mission: Mission
): MissionPriorityResult => {
  const dueDateResult = getDueDateScore(mission.dueDate);
  const xpScore = getXpScore(mission);
  const difficultyScore = getDifficultyScore(mission);
  const categoryScore = getCategoryScore(mission);

  const score =
    dueDateResult.score +
    xpScore +
    difficultyScore +
    categoryScore;

  const reasons: string[] = [];

  if (dueDateResult.reason) {
    reasons.push(dueDateResult.reason);
  }

  if (mission.xpReward >= 200) {
    reasons.push(`High XP reward (+${mission.xpReward} XP)`);
  } else if (mission.xpReward >= 100) {
    reasons.push(`Good XP reward (+${mission.xpReward} XP)`);
  }

  if (
    mission.difficulty === 'A-Rank' ||
    mission.difficulty === 'S-Rank'
  ) {
    reasons.push(`${mission.difficulty} difficulty`);
  }

  if (mission.category === 'focus') {
    reasons.push('Focus-category mission');
  }

  if (mission.category === 'special') {
    reasons.push('Special mission');
  }

  let priority: MissionPriorityResult['priority'];

  if (score >= 100) {
    priority = 'critical';
  } else if (score >= 70) {
    priority = 'high';
  } else if (score >= 40) {
    priority = 'medium';
  } else {
    priority = 'low';
  }

  return {
    mission,
    score: Math.round(score),
    priority,
    reasons,
  };
};

export const rankActiveMissions = (
  missions: Mission[]
): MissionPriorityResult[] => {
  return missions
    .filter((mission) => mission.status === 'active')
    .map(calculateMissionPriority)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return (
        new Date(a.mission.createdAt).getTime() -
        new Date(b.mission.createdAt).getTime()
      );
    });
};

export const getTopPriorityMission = (
  missions: Mission[]
): MissionPriorityResult | null => {
  const rankedMissions = rankActiveMissions(missions);

  return rankedMissions.length > 0
    ? rankedMissions[0]
    : null;
};