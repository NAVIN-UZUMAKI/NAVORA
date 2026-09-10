import type { NavigationTab } from './index';

export type GuideMood =
  | 'gentle'
  | 'encouraging'
  | 'focused'
  | 'firm'
  | 'upset'
  | 'celebrating';

export interface TutorialStep {
  id: string;
  tab: NavigationTab;
  targetSelector?: string; // CSS selector or data-tutorial attribute
  title: string;
  subtitle: string;
  mood: GuideMood;
  dialogue: string;
  focusHint?: string;
}

export interface OnboardingState {
  hasCompletedTutorial: boolean;
  hasSkippedTutorial: boolean;
  completedAt?: string;
  lastStepIndex: number;
}
