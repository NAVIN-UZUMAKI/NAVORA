export type UserRank = 
  | 'Academy Student' 
  | 'Genin' 
  | 'Chunin' 
  | 'Jonin' 
  | 'Elite Shinobi' 
  | 'Kage';

export type MissionDifficulty = 'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank';

export type MissionStatus = 'active' | 'completed';

export type MissionCategory = 'general' | 'training' | 'focus' | 'special';

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: MissionDifficulty;
  xpReward: number;
  status: MissionStatus;
  category: MissionCategory;
  createdAt: string;
  completedAt?: string;
  dueDate?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  title: string;
  rank: UserRank;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalXp: number;
  streak: number;
  lastActiveDate: string;
  chakraEnergy: number; // 0 - 100 %
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'missions' | 'streak' | 'levels' | 'special';
  unlockedAt?: string;
  isUnlocked: boolean;
  xpReward: number;
}

export interface ProductivityStats {
  totalMissions: number;
  completedMissions: number;
  completionRate: number;
  missionsCompletedToday: number;
  xpEarnedToday: number;
  currentStreak: number;
  difficultyBreakdown: {
    'D-Rank': number;
    'C-Rank': number;
    'B-Rank': number;
    'A-Rank': number;
    'S-Rank': number;
  };
}

export type NavigationTab = 
  | 'command-center' 
  | 'missions' 
  | 'calendar' 
  | 'projects' 
  | 'notes' 
  | 'achievements' 
  | 'statistics' 
  | 'ai-companion' 
  | 'settings';
