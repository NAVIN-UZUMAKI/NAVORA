import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import type { 
  UserProfile, 
  Mission, 
  Achievement, 
  NavigationTab,
  MissionDifficulty
} from '../types';
import { userRepository } from '../services/userRepository';
import { missionRepository } from '../services/missionRepository';
import { achievementRepository } from '../services/achievementRepository';
import { audioService } from '../services/audioService';
import { NavoraContext, type LevelUpInfo } from './navora-context-def';

export const NavoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => userRepository.checkAndUpdateStreak());
  const [missions, setMissions] = useState<Mission[]>(() => missionRepository.getMissions());
  const [achievements, setAchievements] = useState<Achievement[]>(() => achievementRepository.getAchievements());
  const [activeTab, setActiveTab] = useState<NavigationTab>('command-center');
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(() => audioService.getMuted());
  const [levelUpInfo, setLevelUpInfo] = useState<LevelUpInfo | null>(null);

  // Re-calculate statistics dynamically whenever missions or user updates
  const stats = missionRepository.calculateStats(user.streak);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#a855f7', '#ff2a5f', '#f59e0b'],
      });
    } catch {
      // fallback safe
    }
  }, []);

  const toggleSound = () => {
    const nextState = !isSoundMuted;
    setIsSoundMuted(nextState);
    audioService.setMuted(nextState);
    if (!nextState) {
      audioService.playClick();
    }
  };

  const createMission = (params: {
    title: string;
    description: string;
    difficulty: MissionDifficulty;
    category?: Mission['category'];
    customXp?: number;
    dueDate?: string;
  }) => {
    missionRepository.createMission(params);
    const updatedMissions = missionRepository.getMissions();
    setMissions(updatedMissions);
    audioService.playClick();

    // Check achievements
    const { newlyUnlocked } = achievementRepository.checkAndUnlock(user, updatedMissions);
    if (newlyUnlocked.length > 0) {
      setAchievements(achievementRepository.getAchievements());
    }
  };

  const toggleMission = (id: string) => {
    const result = missionRepository.toggleMissionStatus(id);
    if (!result) return;

    const { mission, previousStatus } = result;
    const updatedMissions = missionRepository.getMissions();
    setMissions(updatedMissions);

    if (mission.status === 'completed' && previousStatus === 'active') {
      // Award XP
      audioService.playMissionComplete();
      const xpResult = userRepository.addXp(mission.xpReward);
      setUser(xpResult.user);

      // Check level up or promotion
      if (xpResult.leveledUp) {
        audioService.playLevelUp();
        triggerConfetti();
        setLevelUpInfo({
          isOpen: true,
          level: xpResult.user.level,
          rank: xpResult.user.rank,
          rankPromoted: xpResult.newRankPromoted,
          levelsGained: xpResult.levelsGained,
          xpAdded: xpResult.xpAdded,
        });
      }

      // Check achievements
      const { newlyUnlocked } = achievementRepository.checkAndUnlock(xpResult.user, updatedMissions);
      if (newlyUnlocked.length > 0) {
        setAchievements(achievementRepository.getAchievements());
      }
    } else if (mission.status === 'active' && previousStatus === 'completed') {
      // Mission uncompleted -> deduct XP safely
      audioService.playClick();
      const updatedUser = userRepository.removeXp(mission.xpReward);
      setUser(updatedUser);
    }
  };

  const deleteMission = (id: string) => {
    const success = missionRepository.deleteMission(id);
    if (success) {
      audioService.playClick();
      setMissions(missionRepository.getMissions());
    }
  };

  const updateUserName = (name: string) => {
    if (!name.trim()) return;
    const updated = userRepository.updateProfile({ name: name.trim().toUpperCase() });
    setUser(updated);
  };

  const resetAllData = () => {
    const defaultU = userRepository.resetUser();
    const defaultM = missionRepository.resetToDefaults();
    const defaultA = achievementRepository.resetAchievements();
    setUser(defaultU);
    setMissions(defaultM);
    setAchievements(defaultA);
    audioService.playClick();
  };

  const dismissLevelUp = () => {
    setLevelUpInfo(null);
  };

  return (
    <NavoraContext.Provider
      value={{
        user,
        missions,
        achievements,
        stats,
        activeTab,
        setActiveTab,
        isSoundMuted,
        toggleSound,
        createMission,
        toggleMission,
        deleteMission,
        updateUserName,
        resetAllData,
        levelUpInfo,
        dismissLevelUp,
        triggerConfetti,
      }}
    >
      {children}
    </NavoraContext.Provider>
  );
};

