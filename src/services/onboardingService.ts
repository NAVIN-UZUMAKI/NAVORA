import { storageService } from './storage';

const ONBOARDING_COMPLETED_KEY = 'onboarding_completed';

export const onboardingService = {
  isCompleted(): boolean {
    return storageService.getItem<boolean>(
      ONBOARDING_COMPLETED_KEY,
      false
    );
  },

  complete(): void {
    storageService.setItem<boolean>(
      ONBOARDING_COMPLETED_KEY,
      true
    );
  },

  reset(): void {
    storageService.removeItem(ONBOARDING_COMPLETED_KEY);
  },
};