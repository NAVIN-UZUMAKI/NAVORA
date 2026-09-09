import React, { useState, useEffect, useCallback } from 'react';
import { GuideContext } from './guide-context-def';
import { useNavora } from './useNavora';
import { TUTORIAL_STEPS } from '../services/tutorialData';
import { storageService } from '../services/storage';
import { audioService } from '../services/audioService';
import type { GuideMood, OnboardingState } from '../types/guide';

const ONBOARDING_STORAGE_KEY = 'onboarding_state';

const DEFAULT_ONBOARDING: OnboardingState = {
  hasCompletedTutorial: false,
  hasSkippedTutorial: false,
  lastStepIndex: 0,
};

export const GuideProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setActiveTab, triggerConfetti } = useNavora();

  const [onboardingState, setOnboardingState] = useState<OnboardingState>(() => {
    return storageService.getItem<OnboardingState>(ONBOARDING_STORAGE_KEY, DEFAULT_ONBOARDING);
  });

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  
  // Auto-launch tutorial on first visit if neither completed nor skipped
  const [isTutorialActive, setIsTutorialActive] = useState<boolean>(() => {
    const saved = storageService.getItem<OnboardingState>(ONBOARDING_STORAGE_KEY, DEFAULT_ONBOARDING);
    return !saved.hasCompletedTutorial && !saved.hasSkippedTutorial;
  });

  const [mood, setMood] = useState<GuideMood>('gentle');
  const [isCompanionOpen, setCompanionOpen] = useState<boolean>(false);
  const [companionDialogue, setCompanionDialogue] = useState<string | null>(null);

  const currentStep = TUTORIAL_STEPS[currentStepIndex] || TUTORIAL_STEPS[0];
  const totalSteps = TUTORIAL_STEPS.length;

  const saveState = useCallback((updates: Partial<OnboardingState>) => {
    setOnboardingState((prev) => {
      const next = { ...prev, ...updates };
      storageService.setItem(ONBOARDING_STORAGE_KEY, next);
      return next;
    });
  }, []);

  // Whenever currentStep changes during an active tutorial, automatically switch the active tab!
  useEffect(() => {
    if (isTutorialActive && currentStep) {
      setActiveTab(currentStep.tab);
      setMood(currentStep.mood);
    }
  }, [isTutorialActive, currentStepIndex, currentStep, setActiveTab]);

  const startTutorial = () => {
    audioService.playClick();
    setCurrentStepIndex(0);
    setIsTutorialActive(true);
    setCompanionOpen(false);
    setActiveTab(TUTORIAL_STEPS[0].tab);
  };

  const restartTutorial = () => {
    startTutorial();
  };

  const skipTutorial = () => {
    audioService.playClick();
    setIsTutorialActive(false);
    saveState({
      hasSkippedTutorial: true,
      lastStepIndex: currentStepIndex,
    });
    // Return to Command Center
    setActiveTab('command-center');
  };

  const nextStep = () => {
    audioService.playClick();
    if (currentStepIndex < totalSteps - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      saveState({ lastStepIndex: nextIdx });
    } else {
      // Completed all 9 steps!
      setIsTutorialActive(false);
      saveState({
        hasCompletedTutorial: true,
        hasSkippedTutorial: false,
        completedAt: new Date().toISOString(),
        lastStepIndex: totalSteps - 1,
      });
      triggerConfetti();
      audioService.playLevelUp();
      setActiveTab('command-center');
    }
  };

  const prevStep = () => {
    audioService.playClick();
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      saveState({ lastStepIndex: prevIdx });
    }
  };

  const speak = (dialogue: string, newMood?: GuideMood) => {
    setCompanionDialogue(dialogue);
    if (newMood) setMood(newMood);
    setCompanionOpen(true);
  };

  return (
    <GuideContext.Provider
      value={{
        isTutorialActive,
        currentStepIndex,
        currentStep,
        totalSteps,
        mood,
        setMood,
        startTutorial,
        skipTutorial,
        nextStep,
        prevStep,
        restartTutorial,
        isCompanionOpen,
        setCompanionOpen,
        companionDialogue,
        speak,
        hasCompletedOnboarding: onboardingState.hasCompletedTutorial,
        onboardingState,
      }}
    >
      {children}
    </GuideContext.Provider>
  );
};
