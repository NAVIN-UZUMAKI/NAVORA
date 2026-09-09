import type { TutorialStep } from '../types/guide';

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 'command-center',
    tab: 'command-center',
    targetSelector: '[data-tutorial="command-persona"]',
    title: 'COMMAND CENTER',
    subtitle: 'Your Central Tactical Dashboard',
    mood: 'gentle',
    dialogue: `Welcome to NAVORA, Navin. I'm here to help you understand your new command center. Let me show you around.

This is your Command Center — your daily operating environment. Here, you can monitor your XP progression, current Shinobi Rank (starting as an Academy Student), daily consistency streak, and today's vital missions at a single glance.`,
    focusHint: 'Dashboard overview, XP progression bar, and daily streak monitor.',
  },
  {
    id: 'missions',
    tab: 'missions',
    targetSelector: '[data-tutorial="mission-board"]',
    title: 'MISSION SYSTEM',
    subtitle: 'Daily Katas & Tactical Objectives',
    mood: 'encouraging',
    dialogue: `Missions are the core lifeblood of your discipline. Each mission is inscribed with a difficulty tier — from D-Rank entry tasks to legendary S-Rank operations.

Completing missions rewards you with XP that surges your level, elevates your rank, and proves your consistency. You can inscribe custom missions, set deadlines, and track your active objectives right here.`,
    focusHint: 'Mission Board with difficulty tiers (D to S-Rank) and instant execution checkboxes.',
  },
  {
    id: 'calendar',
    tab: 'calendar',
    targetSelector: '[data-tutorial="calendar-view"]',
    title: 'CHRONO-CALENDAR',
    subtitle: 'Temporal Alignment & Scheduling',
    mood: 'focused',
    dialogue: `Your Chrono-Calendar allows you to schedule missions across days and weeks, plan upcoming sprints, and anticipate high-stakes deadlines.

By distributing your training and work evenly across the calendar, you prevent chakra burnout and maintain an unbroken rhythm of execution.`,
    focusHint: 'Weekly and monthly timeline scheduler with milestone tracking.',
  },
  {
    id: 'projects',
    tab: 'projects',
    targetSelector: '[data-tutorial="projects-view"]',
    title: 'TACTICAL PROJECTS',
    subtitle: 'Campaign Roadmaps & Sub-Tasks',
    mood: 'focused',
    dialogue: `Large breakthroughs require structured campaigns. In the Projects module, you can group related missions under ambitious strategic goals.

Set key milestones, break objectives into tactical sub-tasks, and track your campaign progress bars as each phase is systematically conquered.`,
    focusHint: 'Campaign orchestrator with milestone meters and nested sub-tasks.',
  },
  {
    id: 'archive',
    tab: 'notes', // We will route 'notes' to the Archive/Scroll Archive view
    targetSelector: '[data-tutorial="archive-view"]',
    title: 'SCROLL ARCHIVE',
    subtitle: 'Historical Records & Retrospectives',
    mood: 'gentle',
    dialogue: `Every mission you execute is permanently chronicled in your Scroll Archive.

Here you can review historical activity, verify previous achievements, inspect past XP gains, and write retrospective reflections to learn from your journey.`,
    focusHint: 'Chronological mission archive with completion timestamps and XP logs.',
  },
  {
    id: 'achievements',
    tab: 'achievements',
    targetSelector: '[data-tutorial="achievements-view"]',
    title: 'HONOR & ACHIEVEMENTS',
    subtitle: 'Shinobi Seals & Milestones',
    mood: 'encouraging',
    dialogue: `Your perseverance does not go unnoticed. As you meet milestones — like landing your first victory, maintaining streaks, or conquering an S-Rank challenge — you unlock official Shinobi Seals.

Each unlocked achievement bestows bonus Honor XP to accelerate your ascendance to Chunin, Jonin, and ultimately Kage.`,
    focusHint: 'Milestone seals with unlock conditions and bonus honor rewards.',
  },
  {
    id: 'statistics',
    tab: 'statistics',
    targetSelector: '[data-tutorial="statistics-view"]',
    title: 'TACTICAL TELEMETRY',
    subtitle: 'Productivity Analytics & Velocity',
    mood: 'focused',
    dialogue: `To master yourself, you must measure your habits. The Statistics dashboard reveals your execution ratio, total XP velocity, streak records, and tier breakdown.

Use these insights to recognize when your momentum is soaring and where your discipline needs reinforcement.`,
    focusHint: 'Productivity charts, tier distributions, and momentum telemetry.',
  },
  {
    id: 'ai-companion',
    tab: 'ai-companion',
    targetSelector: '[data-tutorial="ai-companion-view"]',
    title: 'AI SENSEI COMPANION',
    subtitle: 'Your Personal Tactical Guide',
    mood: 'gentle',
    dialogue: `I am always here to guide you, Navin. You can ask me what to prioritize next, ask for a day plan, or seek encouragement when feeling overwhelmed.

And remember... if you find yourself hesitating or procrastinating, I will step in with gentle firmness to help you take that crucial first step. Soon, I'll be directly integrated with your live task data.`,
    focusHint: 'Interactive AI companion terminal with proactive guidance.',
  },
  {
    id: 'settings',
    tab: 'settings',
    targetSelector: '[data-tutorial="settings-view"]',
    title: 'SYSTEM CONFIGURATION',
    subtitle: 'Preferences & Cloud Architecture',
    mood: 'encouraging',
    dialogue: `Finally, System Settings is where you control your operating environment. Customize your operative call-sign, toggle sensory audio feedback, export secure JSON backups, and manage your preferences.

You can also restart this tutorial at any time. You are now fully oriented and ready to forge your path, Navin. Let us evolve together!`,
    focusHint: 'Call-sign personalization, audio toggle, data backups, and tutorial restart.',
  },
];
