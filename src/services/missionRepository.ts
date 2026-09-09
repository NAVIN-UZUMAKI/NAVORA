import type { Mission, MissionDifficulty, ProductivityStats } from '../types';
import { storageService } from './storage';

export const MISSIONS_STORAGE_KEY = 'missions_list';

export const DIFFICULTY_XP_MAP: Record<MissionDifficulty, { xp: number; label: string; color: string; badge: string }> = {
  'D-Rank': { xp: 25, label: 'D-Rank (Entry)', color: 'text-emerald-400', badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
  'C-Rank': { xp: 50, label: 'C-Rank (Moderate)', color: 'text-cyan-400', badge: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' },
  'B-Rank': { xp: 100, label: 'B-Rank (Challenging)', color: 'text-blue-400', badge: 'border-blue-500/30 bg-blue-500/10 text-blue-300' },
  'A-Rank': { xp: 200, label: 'A-Rank (High Focus)', color: 'text-purple-400', badge: 'border-purple-500/30 bg-purple-500/10 text-purple-300' },
  'S-Rank': { xp: 500, label: 'S-Rank (Master/Elite)', color: 'text-rose-400', badge: 'border-rose-500/30 bg-rose-500/10 text-rose-300' },
};

const DEFAULT_MISSIONS: Mission[] = [
  {
    id: 'msn_1',
    title: 'Morning Chakra Calibration',
    description: '15-minute mindfulness meditation & setting 3 high-impact objectives for today.',
    difficulty: 'D-Rank',
    xpReward: 25,
    status: 'completed',
    category: 'training',
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    completedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
  },
  {
    id: 'msn_2',
    title: 'Scroll Transcription & Architecture Review',
    description: 'Document key architecture diagrams and clean up pending notes repository.',
    difficulty: 'C-Rank',
    xpReward: 50,
    status: 'active',
    category: 'general',
    createdAt: new Date(Date.now() - 3600 * 1000 * 3).toISOString(),
  },
  {
    id: 'msn_3',
    title: 'Physical Conditioning (Taijutsu Session)',
    description: '45-minute intense resistance training or cardio workout to sharpen physical stamina.',
    difficulty: 'B-Rank',
    xpReward: 100,
    status: 'active',
    category: 'training',
    createdAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(),
  },
  {
    id: 'msn_4',
    title: 'Deep Infiltration Focus Kata',
    description: '90-minute uninterrupted deep work sprint on core NAVORA operating system features.',
    difficulty: 'A-Rank',
    xpReward: 200,
    status: 'active',
    category: 'focus',
    createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
  },
  {
    id: 'msn_5',
    title: 'Mastery of the Elements: MVP Launch',
    description: 'Deliver the full NAVORA dashboard, RPG loop, and responsive HUD interface.',
    difficulty: 'S-Rank',
    xpReward: 500,
    status: 'active',
    category: 'special',
    createdAt: new Date().toISOString(),
  },
];

export class MissionRepository {
  public getMissions(): Mission[] {
    return storageService.getItem<Mission[]>(MISSIONS_STORAGE_KEY, DEFAULT_MISSIONS);
  }

  public saveMissions(missions: Mission[]): void {
    storageService.setItem(MISSIONS_STORAGE_KEY, missions);
  }

  public createMission(params: {
    title: string;
    description: string;
    difficulty: MissionDifficulty;
    category?: Mission['category'];
    customXp?: number;
    dueDate?: string;
  }): Mission {
    const missions = this.getMissions();
    const xpReward = params.customXp ?? DIFFICULTY_XP_MAP[params.difficulty].xp;

    const newMission: Mission = {
      id: `msn_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      title: params.title.trim(),
      description: params.description.trim(),
      difficulty: params.difficulty,
      xpReward,
      status: 'active',
      category: params.category || 'general',
      createdAt: new Date().toISOString(),
      dueDate: params.dueDate,
    };

    missions.unshift(newMission);
    this.saveMissions(missions);
    return newMission;
  }

  public toggleMissionStatus(id: string): { mission: Mission; previousStatus: 'active' | 'completed' } | null {
    const missions = this.getMissions();
    const index = missions.findIndex((m) => m.id === id);
    if (index === -1) return null;

    const mission = missions[index];
    const previousStatus = mission.status;
    const newStatus = previousStatus === 'active' ? 'completed' : 'active';

    const updatedMission: Mission = {
      ...mission,
      status: newStatus,
      completedAt: newStatus === 'completed' ? new Date().toISOString() : undefined,
    };

    missions[index] = updatedMission;
    this.saveMissions(missions);

    return {
      mission: updatedMission,
      previousStatus,
    };
  }

  public updateMission(id: string, updates: Partial<Mission>): Mission | null {
    const missions = this.getMissions();
    const index = missions.findIndex((m) => m.id === id);
    if (index === -1) return null;

    const updatedMission: Mission = {
      ...missions[index],
      ...updates,
    };

    missions[index] = updatedMission;
    this.saveMissions(missions);
    return updatedMission;
  }

  public deleteMission(id: string): boolean {
    const missions = this.getMissions();
    const filtered = missions.filter((m) => m.id !== id);
    if (filtered.length === missions.length) return false;

    this.saveMissions(filtered);
    return true;
  }

  public resetToDefaults(): Mission[] {
    this.saveMissions(DEFAULT_MISSIONS);
    return DEFAULT_MISSIONS;
  }

  public calculateStats(currentStreak: number): ProductivityStats {
    const missions = this.getMissions();
    const totalMissions = missions.length;
    const completed = missions.filter((m) => m.status === 'completed');
    const completedMissions = completed.length;
    const completionRate = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;

    const todayStr = new Date().toISOString().split('T')[0];
    const completedToday = completed.filter((m) => m.completedAt && m.completedAt.startsWith(todayStr));
    const missionsCompletedToday = completedToday.length;
    const xpEarnedToday = completedToday.reduce((acc, m) => acc + m.xpReward, 0);

    const difficultyBreakdown: Record<MissionDifficulty, number> = {
      'D-Rank': 0,
      'C-Rank': 0,
      'B-Rank': 0,
      'A-Rank': 0,
      'S-Rank': 0,
    };

    completed.forEach((m) => {
      if (difficultyBreakdown[m.difficulty] !== undefined) {
        difficultyBreakdown[m.difficulty] += 1;
      }
    });

    return {
      totalMissions,
      completedMissions,
      completionRate,
      missionsCompletedToday,
      xpEarnedToday,
      currentStreak,
      difficultyBreakdown,
    };
  }
}

export const missionRepository = new MissionRepository();
