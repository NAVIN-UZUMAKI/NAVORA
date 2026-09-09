import type { UserProfile, UserRank } from '../types';
import { storageService } from './storage';

export const USER_STORAGE_KEY = 'user_profile';

export const RANKS_HIERARCHY: { minLevel: number; rank: UserRank; description: string; badgeColor: string }[] = [
  { minLevel: 1, rank: 'Academy Student', description: 'Initiate mastering fundamental chakras and daily discipline.', badgeColor: 'text-slate-400 border-slate-500/40 bg-slate-500/10' },
  { minLevel: 5, rank: 'Genin', description: 'Certified operative undertaking field tasks and squad objectives.', badgeColor: 'text-leaf-400 border-leaf-500/40 bg-leaf-500/10' },
  { minLevel: 10, rank: 'Chunin', description: 'Battle-tested leader capable of tactical planning and project execution.', badgeColor: 'text-chakra-400 border-chakra-500/40 bg-chakra-500/10' },
  { minLevel: 20, rank: 'Jonin', description: 'Master shinobi demonstrating elite focus, resilience, and high output.', badgeColor: 'text-lightning-400 border-lightning-500/40 bg-lightning-500/10' },
  { minLevel: 30, rank: 'Elite Shinobi', description: 'Legendary agent operating at peak cognitive velocity and consistency.', badgeColor: 'text-amberSeal-400 border-amberSeal-500/40 bg-amberSeal-500/10' },
  { minLevel: 45, rank: 'Kage', description: 'Supreme leader and guardian of the realm. Supreme productivity mastery.', badgeColor: 'text-flame-400 border-flame-500/40 bg-flame-500/10' },
];

export function calculateRank(level: number): UserRank {
  for (let i = RANKS_HIERARCHY.length - 1; i >= 0; i--) {
    if (level >= RANKS_HIERARCHY[i].minLevel) {
      return RANKS_HIERARCHY[i].rank;
    }
  }
  return 'Academy Student';
}

export function getXpRequiredForLevel(level: number): number {
  // Smooth progressive RPG curve
  if (level === 1) return 100;
  return Math.round(100 * Math.pow(1.22, level - 1));
}

const getTodayString = () => new Date().toISOString().split('T')[0];

export const DEFAULT_USER: UserProfile = {
  id: 'usr_navin_prime',
  name: 'NAVIN',
  title: 'Academy Student',
  rank: 'Academy Student',
  level: 1,
  currentXp: 40,
  xpToNextLevel: 100,
  totalXp: 40,
  streak: 3,
  lastActiveDate: getTodayString(),
  chakraEnergy: 92,
};

export interface XpGainResult {
  user: UserProfile;
  leveledUp: boolean;
  levelsGained: number;
  newRankPromoted: boolean;
  previousRank: UserRank;
  currentRank: UserRank;
  xpAdded: number;
}

export class UserRepository {
  public getUser(): UserProfile {
    const user = storageService.getItem<UserProfile>(USER_STORAGE_KEY, DEFAULT_USER);
    // Ensure all computed values are synchronized
    const expectedRank = calculateRank(user.level);
    if (user.rank !== expectedRank) {
      user.rank = expectedRank;
      user.title = expectedRank;
      this.saveUser(user);
    }
    return user;
  }

  public saveUser(user: UserProfile): void {
    storageService.setItem(USER_STORAGE_KEY, user);
  }

  public addXp(amount: number): XpGainResult {
    const user = this.getUser();
    const previousRank = user.rank;
    const initialLevel = user.level;

    let currentXp = user.currentXp + amount;
    let level = user.level;
    let xpToNext = user.xpToNextLevel;
    let totalXp = user.totalXp + amount;

    // Handle multiple level ups if huge XP is awarded
    while (currentXp >= xpToNext) {
      currentXp -= xpToNext;
      level += 1;
      xpToNext = getXpRequiredForLevel(level);
    }

    const currentRank = calculateRank(level);
    const leveledUp = level > initialLevel;
    const levelsGained = level - initialLevel;
    const newRankPromoted = currentRank !== previousRank;

    // Boost chakra slightly upon completing missions
    const chakraEnergy = Math.min(100, user.chakraEnergy + Math.round(amount * 0.1));

    const updatedUser: UserProfile = {
      ...user,
      level,
      currentXp,
      xpToNextLevel: xpToNext,
      totalXp,
      rank: currentRank,
      title: currentRank,
      chakraEnergy,
    };

    this.saveUser(updatedUser);

    return {
      user: updatedUser,
      leveledUp,
      levelsGained,
      newRankPromoted,
      previousRank,
      currentRank,
      xpAdded: amount,
    };
  }

  public removeXp(amount: number): UserProfile {
    const user = this.getUser();
    let currentXp = user.currentXp - amount;
    let totalXp = Math.max(0, user.totalXp - amount);
    let level = user.level;
    let xpToNext = user.xpToNextLevel;

    // Handle de-leveling gracefully if needed
    while (currentXp < 0 && level > 1) {
      level -= 1;
      xpToNext = getXpRequiredForLevel(level);
      currentXp += xpToNext;
    }

    if (currentXp < 0) {
      currentXp = 0;
    }

    const currentRank = calculateRank(level);

    const updatedUser: UserProfile = {
      ...user,
      level,
      currentXp,
      xpToNextLevel: xpToNext,
      totalXp,
      rank: currentRank,
      title: currentRank,
    };

    this.saveUser(updatedUser);
    return updatedUser;
  }

  public checkAndUpdateStreak(): UserProfile {
    const user = this.getUser();
    const today = getTodayString();

    if (user.lastActiveDate === today) {
      return user;
    }

    const lastActive = new Date(user.lastActiveDate);
    const nowDate = new Date(today);
    const diffDays = Math.round((nowDate.getTime() - lastActive.getTime()) / (1000 * 3600 * 24));

    let newStreak = user.streak;
    if (diffDays === 1) {
      // Consecutive day!
      newStreak += 1;
    } else if (diffDays > 1) {
      // Streak broken, restart
      newStreak = 1;
    }

    const updatedUser: UserProfile = {
      ...user,
      streak: newStreak,
      lastActiveDate: today,
    };

    this.saveUser(updatedUser);
    return updatedUser;
  }

  public updateProfile(updates: Partial<UserProfile>): UserProfile {
    const user = this.getUser();
    const updated = { ...user, ...updates };
    this.saveUser(updated);
    return updated;
  }

  public resetUser(): UserProfile {
    this.saveUser(DEFAULT_USER);
    return DEFAULT_USER;
  }
}

export const userRepository = new UserRepository();
