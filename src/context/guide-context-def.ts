import { createContext } from 'react';
import type { GuideMood, TutorialStep, OnboardingState } from '../types/guide';

export interface GuideContextType {
  isTutorialActive: boolean;
  currentStepIndex: number;
  currentStep: TutorialStep;
  totalSteps: number;
  mood: GuideMood;
  setMood: (mood: GuideMood) => void;
  startTutorial: () => void;
  skipTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  restartTutorial: () => void;
  isCompanionOpen: boolean;
  setCompanionOpen: (open: boolean) => void;
  companionDialogue: string | null;
  speak: (dialogue: string, mood?: GuideMood) => void;
  hasCompletedOnboarding: boolean;
  onboardingState: OnboardingState;
}

export const GuideContext = createContext<GuideContextType | undefined>(undefined);
