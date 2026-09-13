import type { Achievement, Mission, UserProfile } from '../types';
import { storageService } from './storage';

export const ACHIEVEMENTS_STORAGE_KEY = 'achievements_list';

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  // ============================================================
  // MISSION MILESTONES
  // ============================================================

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
    id: 'ach_4',
    title: 'Scroll of Mastery',
    description: 'Successfully complete 5 different missions.',
    icon: 'Scroll',
    category: 'missions',
    isUnlocked: false,
    xpReward: 100,
  },
  {
    id: 'ach_7',
    title: 'Rising Shinobi',
    description: 'Successfully complete 10 missions.',
    icon: 'Target',
    category: 'missions',
    isUnlocked: false,
    xpReward: 150,
  },
  {
    id: 'ach_8',
    title: 'Veteran Shinobi',
    description: 'Successfully complete 25 missions.',
    icon: 'Shield',
    category: 'missions',
    isUnlocked: false,
    xpReward: 250,
  },
  {
    id: 'ach_9',
    title: 'Elite Operative',
    description: 'Successfully complete 50 missions.',
    icon: 'Award',
    category: 'missions',
    isUnlocked: false,
    xpReward: 500,
  },
  {
    id: 'ach_10',
    title: 'Master Shinobi',
    description: 'Successfully complete 100 missions.',
    icon: 'Crown',
    category: 'missions',
    isUnlocked: false,
    xpReward: 1000,
  },
  {
    id: 'ach_11',
    title: 'Shadow Legend',
    description: 'Successfully complete 250 missions.',
    icon: 'Star',
    category: 'missions',
    isUnlocked: false,
    xpReward: 2500,
  },
  {
    id: 'ach_12',
    title: 'Living Legend',
    description: 'Successfully complete 500 missions.',
    icon: 'Gem',
    category: 'missions',
    isUnlocked: false,
    xpReward: 5000,
  },
  {
    id: 'ach_13',
    title: 'Eternal Shinobi',
    description: 'Successfully complete 1,000 missions.',
    icon: 'Sparkles',
    category: 'missions',
    isUnlocked: false,
    xpReward: 10000,
  },

  // ============================================================
  // LEVEL MILESTONES
  // ============================================================

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
    id: 'ach_14',
    title: 'Chunin Ascension',
    description: 'Reach Level 10 and rise to Chunin-level mastery.',
    icon: 'Medal',
    category: 'levels',
    isUnlocked: false,
    xpReward: 300,
  },
  {
    id: 'ach_15',
    title: 'Jonin Ascension',
    description: 'Reach Level 15 and achieve Jonin-level mastery.',
    icon: 'Sword',
    category: 'levels',
    isUnlocked: false,
    xpReward: 500,
  },
  {
    id: 'ach_16',
    title: 'Kage Candidate',
    description: 'Reach Level 20 and prove yourself worthy of the Kage path.',
    icon: 'Crown',
    category: 'levels',
    isUnlocked: false,
    xpReward: 750,
  },
  {
    id: 'ach_17',
    title: 'Elite Shinobi',
    description: 'Reach Level 25 and enter the elite tier of NAVORA progression.',
    icon: 'Zap',
    category: 'levels',
    isUnlocked: false,
    xpReward: 1000,
  },
  {
    id: 'ach_18',
    title: 'Legendary Shinobi',
    description: 'Reach Level 50 and become a legendary force of discipline.',
    icon: 'Star',
    category: 'levels',
    isUnlocked: false,
    xpReward: 2500,
  },
  {
    id: 'ach_19',
    title: 'Mythic Shinobi',
    description: 'Reach Level 100 and achieve the highest major progression milestone.',
    icon: 'Sparkles',
    category: 'levels',
    isUnlocked: false,
    xpReward: 10000,
  },

  // ============================================================
  // STREAK MILESTONES
  // ============================================================

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
    id: 'ach_20',
    title: 'Seven Day Resolve',
    description: 'Maintain an active daily streak of 7 days or more.',
    icon: 'Flame',
    category: 'streak',
    isUnlocked: false,
    xpReward: 200,
  },
  {
    id: 'ach_21',
    title: 'Two Week Warrior',
    description: 'Maintain an active daily streak of 14 days or more.',
    icon: 'Flame',
    category: 'streak',
    isUnlocked: false,
    xpReward: 350,
  },
  {
    id: 'ach_22',
    title: 'Iron Discipline',
    description: 'Maintain an active daily streak of 30 days or more.',
    icon: 'Flame',
    category: 'streak',
    isUnlocked: false,
    xpReward: 750,
  },
  {
    id: 'ach_23',
    title: 'Unbreakable Will',
    description: 'Maintain an active daily streak of 60 days or more.',
    icon: 'Flame',
    category: 'streak',
    isUnlocked: false,
    xpReward: 1500,
  },
  {
    id: 'ach_24',
    title: 'Century of Discipline',
    description: 'Maintain an active daily streak of 100 days or more.',
    icon: 'Flame',
    category: 'streak',
    isUnlocked: false,
    xpReward: 3000,
  },
  {
    id: 'ach_25',
    title: 'Year of the Shinobi',
    description: 'Maintain an active daily streak of 365 days.',
    icon: 'Crown',
    category: 'streak',
    isUnlocked: false,
    xpReward: 10000,
  },

  // ============================================================
  // XP MILESTONES
  // ============================================================

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
    id: 'ach_26',
    title: 'Chakra Reservoir',
    description: 'Accumulate 500 total XP.',
    icon: 'Zap',
    category: 'special',
    isUnlocked: false,
    xpReward: 200,
  },
  {
    id: 'ach_27',
    title: 'Chakra Surge',
    description: 'Accumulate 1,000 total XP.',
    icon: 'Zap',
    category: 'special',
    isUnlocked: false,
    xpReward: 300,
  },
  {
    id: 'ach_28',
    title: 'Chakra Mastery',
    description: 'Accumulate 2,500 total XP.',
    icon: 'Zap',
    category: 'special',
    isUnlocked: false,
    xpReward: 500,
  },
  {
    id: 'ach_29',
    title: 'Chakra Overload',
    description: 'Accumulate 5,000 total XP.',
    icon: 'Zap',
    category: 'special',
    isUnlocked: false,
    xpReward: 1000,
  },
  {
    id: 'ach_30',
    title: 'Chakra Titan',
    description: 'Accumulate 10,000 total XP.',
    icon: 'Zap',
    category: 'special',
    isUnlocked: false,
    xpReward: 2000,
  },
  {
    id: 'ach_31',
    title: 'Chakra Legend',
    description: 'Accumulate 25,000 total XP.',
    icon: 'Gem',
    category: 'special',
    isUnlocked: false,
    xpReward: 4000,
  },
  {
    id: 'ach_32',
    title: 'Chakra Sovereign',
    description: 'Accumulate 50,000 total XP.',
    icon: 'Crown',
    category: 'special',
    isUnlocked: false,
    xpReward: 7500,
  },
  {
    id: 'ach_33',
    title: 'Infinite Chakra',
    description: 'Accumulate 100,000 total XP.',
    icon: 'Sparkles',
    category: 'special',
    isUnlocked: false,
    xpReward: 15000,
  },

  // ============================================================
  // S-RANK MASTERY
  // ============================================================

  {
    id: 'ach_6',
    title: 'Legendary Operative',
    description: 'Execute and complete a high-stakes S-Rank mission.',
    icon: 'Award',
    category: 'missions',
    isUnlocked: false,
    xpReward: 300,
  },
  {
    id: 'ach_34',
    title: 'S-Rank Hunter',
    description: 'Successfully complete 3 S-Rank missions.',
    icon: 'Sword',
    category: 'missions',
    isUnlocked: false,
    xpReward: 750,
  },
  {
    id: 'ach_35',
    title: 'S-Rank Master',
    description: 'Successfully complete 5 S-Rank missions.',
    icon: 'Crown',
    category: 'missions',
    isUnlocked: false,
    xpReward: 1500,
  },
  {
    id: 'ach_36',
    title: 'S-Rank Legend',
    description: 'Successfully complete 10 S-Rank missions.',
    icon: 'Gem',
    category: 'missions',
    isUnlocked: false,
    xpReward: 3000,
  },

  // ============================================================
  // DAILY PERFORMANCE
  // ============================================================

  {
    id: 'ach_37',
    title: 'Triple Strike',
    description: 'Complete 3 missions on the same day.',
    icon: 'Target',
    category: 'missions',
    isUnlocked: false,
    xpReward: 250,
  },
  {
    id: 'ach_38',
    title: 'Perfect Operation',
    description: 'Complete 5 missions on the same day.',
    icon: 'Target',
    category: 'missions',
    isUnlocked: false,
    xpReward: 500,
  },
  {
    id: 'ach_39',
    title: 'Mission Storm',
    description: 'Complete 10 missions on the same day.',
    icon: 'Flame',
    category: 'missions',
    isUnlocked: false,
    xpReward: 1000,
  },

  // ============================================================
  // CATEGORY MASTERY
  // ============================================================

  {
    id: 'ach_40',
    title: 'Four Paths',
    description: 'Complete at least one mission from every NAVORA mission category.',
    icon: 'Compass',
    category: 'special',
    isUnlocked: false,
    xpReward: 500,
  },
  {
    id: 'ach_41',
    title: 'Training Specialist',
    description: 'Complete 10 training-category missions.',
    icon: 'Dumbbell',
    category: 'special',
    isUnlocked: false,
    xpReward: 500,
  },
  {
    id: 'ach_42',
    title: 'Focus Specialist',
    description: 'Complete 10 focus-category missions.',
    icon: 'Target',
    category: 'special',
    isUnlocked: false,
    xpReward: 500,
  },
  {
    id: 'ach_43',
    title: 'Specialist Operative',
    description: 'Complete 10 special-category missions.',
    icon: 'Star',
    category: 'special',
    isUnlocked: false,
    xpReward: 500,
  },

  // ============================================================
  // LONG-TERM SPECIAL ACHIEVEMENTS
  // ============================================================

  {
    id: 'ach_44',
    title: 'Mission Architect',
    description: 'Create and complete 25 missions.',
    icon: 'Scroll',
    category: 'special',
    isUnlocked: false,
    xpReward: 750,
  },
  {
    id: 'ach_45',
    title: 'Relentless',
    description: 'Complete 50 missions while maintaining a streak of at least 7 days.',
    icon: 'Flame',
    category: 'special',
    isUnlocked: false,
    xpReward: 1000,
  },
  {
    id: 'ach_46',
    title: 'Path of Mastery',
    description: 'Reach Level 25 and complete at least 100 missions.',
    icon: 'Crown',
    category: 'special',
    isUnlocked: false,
    xpReward: 2500,
  },
  {
    id: 'ach_47',
    title: 'Legendary Path',
    description: 'Reach Level 50 and complete at least 250 missions.',
    icon: 'Gem',
    category: 'special',
    isUnlocked: false,
    xpReward: 5000,
  },
  {
    id: 'ach_48',
    title: 'Ultimate Shinobi',
    description: 'Reach Level 100 and complete at least 500 missions.',
    icon: 'Sparkles',
    category: 'special',
    isUnlocked: false,
    xpReward: 15000,
  },
];

const getCompletedMissionsToday = (missions: Mission[]): number => {
  const today = new Date();

  return missions.filter((mission) => {
    if (mission.status !== 'completed' || !mission.completedAt) {
      return false;
    }

    const completedDate = new Date(mission.completedAt);

    return (
      completedDate.getFullYear() === today.getFullYear() &&
      completedDate.getMonth() === today.getMonth() &&
      completedDate.getDate() === today.getDate()
    );
  }).length;
};

const getCompletedMissionsByCategory = (
  missions: Mission[],
  category: Mission['category']
): number => {
  return missions.filter(
    (mission) =>
      mission.status === 'completed' &&
      mission.category === category
  ).length;
};

const getCompletedSRankMissions = (missions: Mission[]): number => {
  return missions.filter(
    (mission) =>
      mission.status === 'completed' &&
      mission.difficulty === 'S-Rank'
  ).length;
};

export class AchievementRepository {
  public getAchievements(): Achievement[] {
    const stored = storageService.getItem<Achievement[]>(
      ACHIEVEMENTS_STORAGE_KEY,
      []
    );

    if (stored.length === 0) {
      storageService.setItem(
        ACHIEVEMENTS_STORAGE_KEY,
        DEFAULT_ACHIEVEMENTS
      );

      return DEFAULT_ACHIEVEMENTS;
    }

    const storedMap = new Map(
      stored.map((achievement) => [achievement.id, achievement])
    );

    const mergedAchievements = DEFAULT_ACHIEVEMENTS.map(
      (defaultAchievement) =>
        storedMap.get(defaultAchievement.id) || defaultAchievement
    );

    const hasNewAchievements =
      mergedAchievements.length !== stored.length;

    if (hasNewAchievements) {
      storageService.setItem(
        ACHIEVEMENTS_STORAGE_KEY,
        mergedAchievements
      );
    }

    return mergedAchievements;
  }

  public saveAchievements(achievements: Achievement[]): void {
    storageService.setItem(
      ACHIEVEMENTS_STORAGE_KEY,
      achievements
    );
  }

  public checkAndUnlock(
    user: UserProfile,
    missions: Mission[]
  ): { newlyUnlocked: Achievement[] } {
    const list = this.getAchievements();

    const completedMissions = missions.filter(
      (mission) => mission.status === 'completed'
    );

    const completedMissionCount = completedMissions.length;
    const completedTodayCount = getCompletedMissionsToday(missions);

    const trainingCount = getCompletedMissionsByCategory(
      missions,
      'training'
    );

    const focusCount = getCompletedMissionsByCategory(
      missions,
      'focus'
    );

    const specialCount = getCompletedMissionsByCategory(
      missions,
      'special'
    );

    const sRankCount = getCompletedSRankMissions(missions);

    const hasEveryCategory =
      getCompletedMissionsByCategory(missions, 'general') > 0 &&
      trainingCount > 0 &&
      focusCount > 0 &&
      specialCount > 0;

    const newlyUnlocked: Achievement[] = [];

    const updated = list.map((achievement) => {
      if (achievement.isUnlocked) {
        return achievement;
      }

      let shouldUnlock = false;

      switch (achievement.id) {
        // Mission milestones
        case 'ach_1':
          shouldUnlock = completedMissionCount >= 1;
          break;

        case 'ach_4':
          shouldUnlock = completedMissionCount >= 5;
          break;

        case 'ach_7':
          shouldUnlock = completedMissionCount >= 10;
          break;

        case 'ach_8':
          shouldUnlock = completedMissionCount >= 25;
          break;

        case 'ach_9':
          shouldUnlock = completedMissionCount >= 50;
          break;

        case 'ach_10':
          shouldUnlock = completedMissionCount >= 100;
          break;

        case 'ach_11':
          shouldUnlock = completedMissionCount >= 250;
          break;

        case 'ach_12':
          shouldUnlock = completedMissionCount >= 500;
          break;

        case 'ach_13':
          shouldUnlock = completedMissionCount >= 1000;
          break;

        // Level milestones
        case 'ach_2':
          shouldUnlock = user.level >= 5;
          break;

        case 'ach_14':
          shouldUnlock = user.level >= 10;
          break;

        case 'ach_15':
          shouldUnlock = user.level >= 15;
          break;

        case 'ach_16':
          shouldUnlock = user.level >= 20;
          break;

        case 'ach_17':
          shouldUnlock = user.level >= 25;
          break;

        case 'ach_18':
          shouldUnlock = user.level >= 50;
          break;

        case 'ach_19':
          shouldUnlock = user.level >= 100;
          break;

        // Streak milestones
        case 'ach_3':
          shouldUnlock = user.streak >= 3;
          break;

        case 'ach_20':
          shouldUnlock = user.streak >= 7;
          break;

        case 'ach_21':
          shouldUnlock = user.streak >= 14;
          break;

        case 'ach_22':
          shouldUnlock = user.streak >= 30;
          break;

        case 'ach_23':
          shouldUnlock = user.streak >= 60;
          break;

        case 'ach_24':
          shouldUnlock = user.streak >= 100;
          break;

        case 'ach_25':
          shouldUnlock = user.streak >= 365;
          break;

        // XP milestones
        case 'ach_5':
          shouldUnlock = user.totalXp >= 250;
          break;

        case 'ach_26':
          shouldUnlock = user.totalXp >= 500;
          break;

        case 'ach_27':
          shouldUnlock = user.totalXp >= 1000;
          break;

        case 'ach_28':
          shouldUnlock = user.totalXp >= 2500;
          break;

        case 'ach_29':
          shouldUnlock = user.totalXp >= 5000;
          break;

        case 'ach_30':
          shouldUnlock = user.totalXp >= 10000;
          break;

        case 'ach_31':
          shouldUnlock = user.totalXp >= 25000;
          break;

        case 'ach_32':
          shouldUnlock = user.totalXp >= 50000;
          break;

        case 'ach_33':
          shouldUnlock = user.totalXp >= 100000;
          break;

        // S-Rank milestones
        case 'ach_6':
          shouldUnlock = sRankCount >= 1;
          break;

        case 'ach_34':
          shouldUnlock = sRankCount >= 3;
          break;

        case 'ach_35':
          shouldUnlock = sRankCount >= 5;
          break;

        case 'ach_36':
          shouldUnlock = sRankCount >= 10;
          break;

        // Daily performance
        case 'ach_37':
          shouldUnlock = completedTodayCount >= 3;
          break;

        case 'ach_38':
          shouldUnlock = completedTodayCount >= 5;
          break;

        case 'ach_39':
          shouldUnlock = completedTodayCount >= 10;
          break;

        // Category mastery
        case 'ach_40':
          shouldUnlock = hasEveryCategory;
          break;

        case 'ach_41':
          shouldUnlock = trainingCount >= 10;
          break;

        case 'ach_42':
          shouldUnlock = focusCount >= 10;
          break;

        case 'ach_43':
          shouldUnlock = specialCount >= 10;
          break;

        // Long-term special achievements
        case 'ach_44':
          shouldUnlock = completedMissionCount >= 25;
          break;

        case 'ach_45':
          shouldUnlock =
            completedMissionCount >= 50 &&
            user.streak >= 7;
          break;

        case 'ach_46':
          shouldUnlock =
            user.level >= 25 &&
            completedMissionCount >= 100;
          break;

        case 'ach_47':
          shouldUnlock =
            user.level >= 50 &&
            completedMissionCount >= 250;
          break;

        case 'ach_48':
          shouldUnlock =
            user.level >= 100 &&
            completedMissionCount >= 500;
          break;
      }

      if (shouldUnlock) {
        const unlockedAchievement: Achievement = {
          ...achievement,
          isUnlocked: true,
          unlockedAt: new Date().toISOString(),
        };

        newlyUnlocked.push(unlockedAchievement);

        return unlockedAchievement;
      }

      return achievement;
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
