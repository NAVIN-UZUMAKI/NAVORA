import React, { useState } from 'react';
import WelcomeView from './WelcomeView';
import CreateAccountView from './CreateAccountView';
import AccountCreatedView from './AccountCreatedView';
import PersonalizeView from './PersonalizeView';
import GetToKnowYouView from './GetToKnowYouView';
import XpIntroductionView from './XpIntroductionView';
import AuraFirstMissionView from './AuraFirstMissionView';
import { onboardingService } from '../../services/onboardingService';
import GuestView from './GuestView';
import LoginView from './LoginView';

type OnboardingStep =
  | 'welcome'
  | 'create-account'
  | 'account-created'
  | 'personalize'
  | 'get-to-know-you'
  | 'xp-introduction'
  | 'aura-first-mission'
  | 'guest'
  | 'login';

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  onComplete,
}) => {
  const [step, setStep] = useState<OnboardingStep>('welcome');

  const handleComplete = () => {
    onboardingService.complete();
    onComplete();
  };

  switch (step) {
    case 'welcome':
      return (
        <WelcomeView
          onCreateAccount={() => setStep('create-account')}
          onLogin={() => setStep('login')}
          onGuest={() => setStep('guest')}
        />
      );

    case 'create-account':
      return (
        <CreateAccountView
          onBack={() => setStep('welcome')}
          onContinue={() => setStep('account-created')}
        />
      );

    case 'account-created':
      return (
        <AccountCreatedView
          onContinue={() => setStep('personalize')}
        />
      );

    case 'personalize':
      return (
        <PersonalizeView
          onBack={() => setStep('account-created')}
          onContinue={() => setStep('get-to-know-you')}
        />
      );

    case 'get-to-know-you':
      return (
        <GetToKnowYouView
          onBack={() => setStep('personalize')}
          onContinue={() => setStep('xp-introduction')}
        />
      );

    case 'xp-introduction':
      return (
        <XpIntroductionView
          onBack={() => setStep('get-to-know-you')}
          onContinue={() => setStep('aura-first-mission')}
        />
      );

    case 'aura-first-mission':
  return (
    <AuraFirstMissionView
      onBack={() => setStep('xp-introduction')}
      onComplete={handleComplete}
    />
  );

case 'guest':
  return (
    <GuestView
      onBack={() => setStep('welcome')}
      onContinue={() => setStep('personalize')}
    />
  );

case 'login':
  return (
    <LoginView
      onBack={() => setStep('welcome')}
      onLogin={handleComplete}
    />
  );

default:
  return null;

  }
};

export default OnboardingFlow;