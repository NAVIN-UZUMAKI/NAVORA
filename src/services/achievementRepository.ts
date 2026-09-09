import type { Achievement, Mission, UserProfile } from '../types';
import { storageService } from './storage';

export const ACHIEVEMENTS_STORAGE_KEY = 'achievements_list';

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_1',
    title: 'First Blood',
    description: 'Complete your first ever mission in NAVORA.',
    icon: 'Sword',
    category: 'missions',
    isUnlocked: true,
    unlockedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
    xpReward: 50,
  },
  {
    id: 'ach_2',
    title: 'Way of the Shinobi',
    description: 'Promote beyond the Academy to become an official Genin (Level 5).',
    icon: 'Shield',
    category: 'levels',
    isUnlocked: false,
    xpReward: 150,
  },
  {
    id: 'ach_3',
    title: 'Unbroken Discipline',
    description: 'Maintain an active daily streak of 3 days or more.',
    icon: 'Flame',
    category: 'streak',
    isUnlocked: true,
    unlockedAt: new Date().toISOString(),
    xpReward: 100,
  },
  {
    id: 'ach_4',
    title: 'Scroll of Mastery',
    description: 'Successfully complete 5 different missions.',
    icon: 'Scroll',
    category: 'missions',
    isUnlocked: false,
    xpReward: 100,
  },
  {
    id: 'ach_5',
    title: 'Chakra Awakening',
    description: 'Accumulate over 250 total XP across your training.',
    icon: 'Zap',
    category: 'special',
    isUnlocked: false,
    xpReward: 120,
  },
  {
    id: 'ach_6',
    title: 'Legendary Operative',
    description: 'Execute and complete a high-stakes S-Rank mission.',
    icon: 'Award',
    category: 'missions',
    isUnlocked: false,
    xpReward: 300,
  },
];

export class AchievementRepository {
  public getAchievements(): Achievement[] {
    return storageService.getItem<Achievement[]>(ACHIEVEMENTS_STORAGE_KEY, DEFAULT_ACHIEVEMENTS);
  }

  public saveAchievements(achievements: Achievement[]): void {
    storageService.setItem(ACHIEVEMENTS_STORAGE_KEY, achievements);
  }

  public checkAndUnlock(user: UserProfile, missions: Mission[]): { newlyUnlocked: Achievement[] } {
    const list = this.getAchievements();
    const completedMissions = missions.filter((m) => m.status === 'completed');
    const newlyUnlocked: Achievement[] = [];

    const updated = list.map((ach) => {
      if (ach.isUnlocked) return ach;

      let shouldUnlock = false;
      switch (ach.id) {
        case 'ach_1':
          shouldUnlock = completedMissions.length >= 1;
          break;
        case 'ach_2':
          shouldUnlock = user.level >= 5;
          break;
        case 'ach_3':
          shouldUnlock = user.streak >= 3;
          break;
        case 'ach_4':
          shouldUnlock = completedMissions.length >= 5;
          break;
        case 'ach_5':
          shouldUnlock = user.totalXp >= 250;
          break;
        case 'ach_6':
          shouldUnlock = completedMissions.some((m) => m.difficulty === 'S-Rank');
          break;
      }

      if (shouldUnlock) {
        const unlockedAch = {
          ...ach,
          isUnlocked: true,
          unlockedAt: new Date().toISOString(),
        };
        newlyUnlocked.push(unlockedAch);
        return unlockedAch;
      }
      return ach;
    });

    if (newlyUnlocked.length > 0) {
      this.saveAchievements(updated);
    }

    return { newlyUnlocked };
  }

  public resetAchievements(): Achievement[] {
    this.saveAchievements(DEFAULT_ACHIEVEMENTS);
    return DEFAULT_ACHIEVEMENTS;
  }
}

export const achievementRepository = new AchievementRepository();
