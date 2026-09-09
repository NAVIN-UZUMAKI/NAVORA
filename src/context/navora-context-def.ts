import { createContext } from 'react';
import type { 
  UserProfile, 
  Mission, 
  Achievement, 
  ProductivityStats, 
  NavigationTab,
  UserRank,
  MissionDifficulty
} from '../types';

export interface LevelUpInfo {
  isOpen: boolean;
  level: number;
  rank: UserRank;
  rankPromoted: boolean;
  levelsGained: number;
  xpAdded: number;
}

export interface NavoraContextType {
  user: UserProfile;
  missions: Mission[];
  achievements: Achievement[];
  stats: ProductivityStats;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isSoundMuted: boolean;
  toggleSound: () => void;
  createMission: (params: {
    title: string;
    description: string;
    difficulty: MissionDifficulty;
    category?: Mission['category'];
    customXp?: number;
    dueDate?: string;
  }) => void;
  toggleMission: (id: string) => void;
  deleteMission: (id: string) => void;
  updateUserName: (name: string) => void;
  resetAllData: () => void;
  levelUpInfo: LevelUpInfo | null;
  dismissLevelUp: () => void;
  triggerConfetti: () => void;
}

export const NavoraContext = createContext<NavoraContextType | undefined>(undefined);
