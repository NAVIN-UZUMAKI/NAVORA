import React, { useState } from 'react';
import { NavoraProvider } from './context/NavoraContext';
import { useNavora } from './context/useNavora';
import { GuideProvider } from './context/GuideContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { CommandCenter } from './components/dashboard/CommandCenter';
import { MissionBoard } from './components/missions/MissionBoard';
import { CalendarView } from './components/calendar/CalendarView';
import { ProjectsView } from './components/projects/ProjectsView';
import { ArchiveView } from './components/archive/ArchiveView';
import { AchievementsView } from './components/achievements/AchievementsView';
import { StatisticsView } from './components/statistics/StatisticsView';
import { AiCompanionView } from './components/ai/AiCompanionView';
import { SettingsView } from './components/settings/SettingsView';
import { CreateMissionModal } from './components/missions/CreateMissionModal';
import { LevelUpModal } from './components/ui/LevelUpModal';
import { GuideTutorialOverlay } from './components/guide/GuideTutorialOverlay';
import { GuideCompanionWidget } from './components/guide/GuideCompanionWidget';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import { onboardingService } from './services/onboardingService';

const MainLayout: React.FC = () => {
  const { activeTab, levelUpInfo, dismissLevelUp } = useNavora();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCreateMissionModalOpen, setIsCreateMissionModalOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'command-center':
        return <CommandCenter onOpenCreateMission={() => setIsCreateMissionModalOpen(true)} />;
      case 'missions':
        return <MissionBoard onOpenCreateMission={() => setIsCreateMissionModalOpen(true)} />;
      case 'calendar':
        return <CalendarView onOpenCreateMission={() => setIsCreateMissionModalOpen(true)} />;
      case 'projects':
        return <ProjectsView />;
      case 'notes':
        return <ArchiveView />;
      case 'achievements':
        return <AchievementsView />;
      case 'statistics':
        return <StatisticsView />;
      case 'ai-companion':
        return <AiCompanionView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <CommandCenter onOpenCreateMission={() => setIsCreateMissionModalOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-shinobi-950 text-slate-100 flex flex-col font-sans relative">
      {/* Top Navigation / HUD Status */}
      <Header
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenCreateMission={() => setIsCreateMissionModalOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar Navigation */}
        <Sidebar
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-full overflow-x-hidden">
          {renderActiveView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav onOpenCreateMission={() => setIsCreateMissionModalOpen(true)} />

      {/* Persistent AI Mentor Guide Companion Widget */}
      <GuideCompanionWidget />

      {/* Interactive Onboarding Tutorial Overlay & Spotlighting */}
      <GuideTutorialOverlay />

      {/* Modals */}
      <CreateMissionModal
        isOpen={isCreateMissionModalOpen}
        onClose={() => setIsCreateMissionModalOpen(false)}
      />

      {levelUpInfo && (
        <LevelUpModal
          isOpen={levelUpInfo.isOpen}
          level={levelUpInfo.level}
          rank={levelUpInfo.rank}
          rankPromoted={levelUpInfo.rankPromoted}
          levelsGained={levelUpInfo.levelsGained}
          xpAdded={levelUpInfo.xpAdded}
          onClose={dismissLevelUp}
        />
      )}
    </div>
  );
};

export function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(
    () => onboardingService.isCompleted()
  );

  if (!onboardingComplete) {
    return (
      <OnboardingFlow
        onComplete={() => setOnboardingComplete(true)}
      />
    );
  }

  return (
    <NavoraProvider>
      <GuideProvider>
        <MainLayout />
      </GuideProvider>
    </NavoraProvider>
  );
}

export default App;
