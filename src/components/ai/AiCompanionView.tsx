import React, { useState } from 'react';
import { Send, Sparkles, Target, Flame, Zap, TrendingUp } from 'lucide-react';
import { useNavora } from '../../context/useNavora';
import { AuraAvatar } from '../guide/AuraAvatar';
import {
  getTopPriorityMission,
  rankActiveMissions,
} from '../../services/missionPriorityService';
import { achievementRepository } from '../../services/achievementRepository';
import {
  calculateProgressSnapshot,
} from '../../services/progressIntelligenceService';
import {
  getContextualMood,
} from '../../services/contextualMoodService';
import {
  buildAuraPersonalContext,
} from '../../services/auraPersonalizationService';
import type { GuideMood } from '../../types/guide';

const DIFFICULTY_ORDER: Record<
  'D-Rank' | 'C-Rank' | 'B-Rank' | 'A-Rank' | 'S-Rank',
  number
> = {
  'D-Rank': 1,
  'C-Rank': 2,
  'B-Rank': 3,
  'A-Rank': 4,
  'S-Rank': 5,
};

interface Message {
  sender: 'ai' | 'user';
  text: string;
  time: string;
  mood?: GuideMood;
}

const formatCategory = (category: string): string =>
  category.charAt(0).toUpperCase() + category.slice(1);

export const AiCompanionView: React.FC = () => {
  const { user, missions } = useNavora();
  const [input, setInput] = useState('');
  const [activeMood, setActiveMood] = useState<GuideMood>('gentle');

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text:
        `Greetings, ${user.name}.\n\n` +
        `I am Aura, your personal shinobi sensei and AI companion.\n\n` +
        `You are currently an ${user.rank} at Level ${user.level} with an unbroken ${user.streak}-day consistency streak.\n\n` +
        `What objective or tactical obstacle shall we conquer today?`,
      time: 'Just now',
      mood: 'gentle',
    },
  ]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || input).trim();

    if (!text) return;

    const contextualMood = getContextualMood(user, missions);

    // Build AURA's current personal context from the real NAVORA state.
    const personalContext = buildAuraPersonalContext(user, missions);

    setActiveMood(contextualMood.mood);

    const newMsg: Message = {
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);

    if (!textToSend) {
      setInput('');
    }

    setTimeout(() => {
      let reply =
  `A disciplined inquiry, ${personalContext.userName}.\n\n` +
  `You currently have ${personalContext.activeMissions} active mission${
    personalContext.activeMissions === 1 ? '' : 's'
  } and a ${personalContext.streak}-day consistency streak.\n\n` +
  `${
    personalContext.overdueMissions > 0
  ? `I can see ${personalContext.overdueMissions} overdue mission${
      personalContext.overdueMissions === 1 ? '' : 's'
    }${
      personalContext.overdueMissionTitles.length > 0
        ? ` — "${personalContext.overdueMissionTitles[0]}".`
        : '.'
    } That deserves attention first.\n\n`
      : personalContext.urgentMissions > 0
  ? `You have ${personalContext.urgentMissions} mission${
      personalContext.urgentMissions === 1 ? '' : 's'
    } due within the next 24 hours${
      personalContext.urgentMissionTitles.length > 0
        ? ` — "${personalContext.urgentMissionTitles[0]}".`
        : '.'
    } Let's handle those before lower-priority work.\n\n`
        : personalContext.completedToday > 0
  ? `You've already completed ${personalContext.completedToday} mission${
      personalContext.completedToday === 1 ? '' : 's'
    } today${
      personalContext.completedTodayTitles.length > 0
        ? ` — including "${personalContext.completedTodayTitles[0]}".`
        : '.'
    } Your momentum is already moving.\n\n`
          : ''
  }` +
  `Direct your focus to ${
  personalContext.activeMissionTitles.length > 0
    ? `"${personalContext.activeMissionTitles[0]}"`
    : 'the next meaningful objective'
} rather than trying to conquer everything at once.\n\n` +
  `${
    personalContext.recentCompletedMissions.length > 0
      ? `Your recent victories show that you're capable of making steady progress.\n\n`
      : ''
  }` +
  `${
  personalContext.completedToday > 0
    ? `You've already made ${personalContext.completedToday} win${
        personalContext.completedToday === 1 ? '' : 's'
      } today. Keep that momentum alive with your next focused move.`
    : personalContext.overdueMissions > 0
      ? `Clear the overdue work first. One completed mission can turn pressure into momentum.`
      : personalContext.urgentMissions > 0
        ? `Handle the approaching deadline first. Protect your momentum before taking on more.`
        : personalContext.streak >= 7
          ? `Your ${personalContext.streak}-day streak shows strong consistency. Protect that rhythm and keep moving forward.`
          : personalContext.activeMissions > 0
            ? `You have ${personalContext.activeMissions} active mission${
                personalContext.activeMissions === 1 ? '' : 's'
              }. Choose one, focus fully, and build momentum.`
            : `Consistency builds legendary chakra reserves.`
}`;

      // Contextual Mood Intelligence provides the default mood.
      // Specialized intelligence branches below can override it
      // when the user's message clearly requires a specific response.
      const lower = text.toLowerCase();

      let replyMood: GuideMood = contextualMood.mood;

      // ============================================================
      // PROGRESS INTELLIGENCE
      // ============================================================
      // This branch comes before streak intelligence so that
      // "How am I doing?" is treated as a full progress question.
      if (
        lower.includes('how am i doing') ||
        lower.includes('how is my progress') ||
        lower.includes('how am i progressing') ||
        lower.includes('am i improving') ||
        lower.includes('am i getting better') ||
        lower.includes('how productive am i') ||
        lower.includes('how productive was i') ||
        lower.includes('how productive have i been') ||
        lower.includes('my productivity') ||
        lower.includes('my overall progress') ||
        lower.includes('overall progress') ||
        lower.includes('progress report') ||
        lower.includes('progress summary') ||
        lower.includes('my performance') ||
        lower.includes('how is my performance') ||
        lower.includes('what am i good at') ||
        lower.includes('what am i doing well') ||
        lower.includes('my strongest area') ||
        lower.includes('my weakest area') ||
        lower.includes('where am i weak') ||
        lower.includes('where do i need improvement') ||
        lower.includes('how many missions have i completed') ||
        lower.includes('missions have i completed') ||
        lower.includes('how much xp have i earned') ||
        lower.includes('how much xp do i have') ||
        lower.includes('what level am i') ||
        lower.includes('what rank am i')
      ) {
        const progress = calculateProgressSnapshot(user, missions);

        const isMissionQuestion =
          lower.includes('how many missions') ||
          lower.includes('missions have i completed');

        const isXpQuestion =
          lower.includes('how much xp') ||
          lower.includes('how much experience');

        const isLevelQuestion =
          lower.includes('what level') ||
          lower.includes('what rank');

        const isStrengthQuestion =
          lower.includes('good at') ||
          lower.includes('doing well') ||
          lower.includes('strongest');

        const isWeaknessQuestion =
          lower.includes('weakest') ||
          lower.includes('where am i weak') ||
          lower.includes('need improvement');

        replyMood =
          progress.missionTrend === 'improving'
            ? 'celebrating'
            : progress.missionTrend === 'slowing'
              ? 'focused'
              : 'encouraging';

        if (isMissionQuestion) {
          reply =
  `MISSION PROGRESS\n\n` +
  `You have completed ${progress.completedMissions} mission${
    progress.completedMissions === 1 ? '' : 's'
  }, ${user.name}.\n\n` +
  `Overall completion rate: ${progress.completionRate}%\n` +
  `Active missions: ${progress.activeMissions}\n\n` +
  `${
    personalContext.completedToday > 0
      ? `You've already completed ${personalContext.completedToday} mission${
          personalContext.completedToday === 1 ? '' : 's'
        } today.`
      : personalContext.streak > 0
        ? `Your ${personalContext.streak}-day streak shows that you're maintaining consistency.`
        : `Every completed mission is a step toward building consistency.`
  }\n\n` +
  `Keep building one completed mission at a time.`;
        } else if (isXpQuestion) {
          reply =
  `CHAKRA STATUS\n\n` +
  `Total XP: ${progress.totalXp} XP\n` +
  `Current Level: ${progress.level}\n` +
  `Rank: ${progress.rank}\n\n` +
  `${
    personalContext.completedToday > 0
      ? `You've earned progress today by completing ${personalContext.completedToday} mission${
          personalContext.completedToday === 1 ? '' : 's'
        }.\n\n`
      : personalContext.activeMissions > 0
        ? `You currently have ${personalContext.activeMissions} active mission${
            personalContext.activeMissions === 1 ? '' : 's'
          } available to earn more XP.\n\n`
        : `You've earned every point through your progress.\n\n`
  }` +
  `Keep completing missions to strengthen your chakra reserves.`;
        } else if (isLevelQuestion) {
          reply =
  `SHINOBI STATUS\n\n` +
  `Level: ${progress.level}\n` +
  `Rank: ${progress.rank}\n` +
  `Total XP: ${progress.totalXp} XP\n\n` +
  `${
    personalContext.streak >= 7
      ? `Your ${personalContext.streak}-day streak shows strong consistency alongside your current rank.\n\n`
      : personalContext.completedToday > 0
        ? `You've already completed ${personalContext.completedToday} mission${
            personalContext.completedToday === 1 ? '' : 's'
          } today, so you're actively building toward your next milestone.\n\n`
        : `Your current rank reflects the level you've reached so far.\n\n`
  }` +
  `Keep progressing and the next promotion will follow.`;
        } else if (isStrengthQuestion) {
          reply =
  `YOUR STRENGTHS\n\n` +
  `Your strongest completed mission area is:\n` +
  `• ${progress.strongestCategory ? formatCategory(progress.strongestCategory) : 'Not enough data yet'}\n\n` +
  `Completed missions: ${progress.completedMissions}\n` +
  `Current streak: ${progress.streak} days\n` +
  `Recent missions: ${progress.recentCompletedMissions} this week\n\n` +
  `${
    personalContext.completedToday > 0
      ? `You've already completed ${personalContext.completedToday} mission${
          personalContext.completedToday === 1 ? '' : 's'
        } today. Keep using your strongest area to maintain that momentum.\n\n`
      : personalContext.activeMissions > 0
        ? `You have ${personalContext.activeMissions} active mission${
            personalContext.activeMissions === 1 ? '' : 's'
          } available right now. Your strongest area can help you build confidence on the next objective.\n\n`
        : `Keep using this strength while gradually developing your weaker areas.\n\n`
  }` +
  `AURA'S GUIDANCE\n` +
  `Use your strength as a foundation, not a limit. Keep developing across different mission types.`;
        } else if (isWeaknessQuestion) {
          reply =
  `AREA TO DEVELOP\n\n` +
  `The area currently needing more attention is:\n` +
  `• ${progress.weakestCategory ? formatCategory(progress.weakestCategory) : 'Not enough data yet'}\n\n` +
  `This is not a failure, ${user.name}.\n\n` +
  `It simply shows where your next growth opportunity may be.\n\n` +
  `${
    personalContext.activeMissions > 0
      ? `You currently have ${personalContext.activeMissions} active mission${
          personalContext.activeMissions === 1 ? '' : 's'
        }. If one belongs to this area, use it as your next practice opportunity.\n\n`
      : `There are no active missions right now, so you can choose your next objective intentionally.\n\n`
  }` +
  `Focus on one mission in this area rather than trying to fix everything at once.`;
        } else {
          const trendText =
            progress.missionTrend === 'improving'
              ? `Your recent activity is improving. You completed ${progress.recentCompletedMissions} mission${
                  progress.recentCompletedMissions === 1 ? '' : 's'
                } in the last 7 days.`
              : progress.missionTrend === 'slowing'
                ? `Your recent activity has slowed. You completed ${progress.recentCompletedMissions} mission${
                    progress.recentCompletedMissions === 1 ? '' : 's'
                  } in the last 7 days.`
                : `Your recent activity is stable with ${progress.recentCompletedMissions} mission${
                    progress.recentCompletedMissions === 1 ? '' : 's'
                  } completed this week.`;

          reply =
            `PROGRESS REPORT\n\n` +
            `${user.name}, here is your current shinobi progress.\n\n` +
            `LEVEL & RANK\n` +
            `• Level ${progress.level}\n` +
            `• ${progress.rank}\n` +
            `• ${progress.totalXp} total XP\n\n` +
            `MISSION PERFORMANCE\n` +
            `• ${progress.completedMissions} completed\n` +
            `• ${progress.activeMissions} active\n` +
            `• ${progress.completionRate}% completion rate\n\n` +
            `DISCIPLINE\n` +
            `• ${progress.streak}-day streak\n\n` +
            `RECENT PERFORMANCE\n` +
            `${trendText}\n` +
            `• ${progress.recentXp} XP earned this week\n\n` +
            `STRONGEST AREA\n` +
            `• ${progress.strongestCategory ? formatCategory(progress.strongestCategory) : 'Building data'}\n\n` +
            `NEXT GROWTH AREA\n` +
            `• ${progress.weakestCategory ? formatCategory(progress.weakestCategory) : 'Keep exploring different mission types'}\n\n` +
            `AURA'S GUIDANCE\n` +
`${
  progress.missionTrend === 'improving'
    ? personalContext.completedToday > 0
      ? `You're moving in the right direction, and you've already completed ${personalContext.completedToday} mission${
          personalContext.completedToday === 1 ? '' : 's'
        } today. Keep that momentum going.`
      : `You're moving in the right direction. Keep the momentum going and turn that progress into another meaningful win.`
    : progress.missionTrend === 'slowing'
      ? personalContext.overdueMissions > 0
        ? `Your progress has slowed a little, and you currently have ${personalContext.overdueMissions} overdue mission${
            personalContext.overdueMissions === 1 ? '' : 's'
          }. Clear the most urgent one first and rebuild momentum.`
        : `Your progress has slowed a little. Don't panic. Choose one meaningful mission and rebuild momentum.`
      : personalContext.streak >= 7
        ? `Your progress is steady, and your ${personalContext.streak}-day streak shows strong consistency. Keep protecting that rhythm.`
        : `Your progress is steady. Consistency matters more than trying to rush your growth.`
}`;
        }
      }

      // ============================================================
      // WORKLOAD MANAGEMENT
      // ============================================================
      else if (
        lower.includes('too much') ||
        lower.includes('too many missions') ||
        lower.includes('too many tasks') ||
        lower.includes('overwhelmed') ||
        lower.includes('overloaded') ||
        lower.includes('reduce my workload') ||
        lower.includes('manage my workload') ||
        lower.includes('help me manage') ||
        lower.includes('help me reduce')
      ) {
        const rankedMissions = rankActiveMissions(missions);
        const activeCount = rankedMissions.length;

        if (activeCount === 0) {
          replyMood = 'encouraging';

          reply =
            `Your workload is currently clear, ${user.name}.\n\n` +
            `You have no active missions to manage right now.\n\n` +
            `Take a moment to recharge or create one focused objective.`;
        } else if (activeCount === 1) {
          replyMood = 'encouraging';

          const { mission } = rankedMissions[0];

          reply =
            `Your workload is manageable, ${user.name}.\n\n` +
            `ACTIVE MISSION\n` +
            `• ${mission.title}\n\n` +
            `Focus on this single objective instead of worrying about the whole workload.\n\n` +
            `Once it is complete, reassess what comes next.`;
        } else {
          replyMood = 'focused';

          const topMission = rankedMissions[0];
          const secondMission = rankedMissions[1];

          reply =
            `You have ${activeCount} active missions, ${user.name}.\n\n` +
            `${
  personalContext.overdueMissions > 0
    ? `You have ${personalContext.overdueMissions} overdue mission${
        personalContext.overdueMissions === 1 ? '' : 's'
      }, so clearing overdue work should come before adding anything new.\n\n`
    : personalContext.urgentMissions > 0
      ? `You have ${personalContext.urgentMissions} mission${
          personalContext.urgentMissions === 1 ? '' : 's'
        } approaching their deadlines, so let's handle those before lower-priority work.\n\n`
      : personalContext.completedToday > 0
        ? `You've already completed ${personalContext.completedToday} mission${
            personalContext.completedToday === 1 ? '' : 's'
          } today. Keep the workload focused rather than pushing yourself to do everything.\n\n`
        : `Do not try to attack everything at once.\n\n`
}` +
            `FIRST OBJECTIVE\n` +
            `• ${topMission.mission.title}\n` +
            `Highest current priority.\n\n` +
            `SECOND OBJECTIVE\n` +
            `• ${secondMission.mission.title}\n\n` +
            `Let the remaining ${activeCount - 2} mission${
              activeCount - 2 === 1 ? '' : 's'
            } wait until these are handled.\n\n` +
            `One objective at a time.`;
        }
      }

      // ============================================================
      // QUICK WIN
      // ============================================================
      else if (
        lower.includes('quick win') ||
        lower.includes('quick-win') ||
        lower.includes('finish quickly') ||
        lower.includes('finish something quickly') ||
        lower.includes('easy mission') ||
        lower.includes('easy task') ||
        lower.includes('what can i finish') ||
        lower.includes('something easy') ||
        lower.includes('small task')
      ) {
        const rankedMissions = rankActiveMissions(missions);

        if (rankedMissions.length === 0) {
          replyMood = 'encouraging';

          reply =
            `No active missions right now, ${user.name}.\n\n` +
            `Create one small objective and make that your quick victory.`;
        } else {
          const quickWin = [...rankedMissions].sort((a, b) => {
            const difficultyDifference =
              DIFFICULTY_ORDER[a.mission.difficulty] -
              DIFFICULTY_ORDER[b.mission.difficulty];

            if (difficultyDifference !== 0) {
              return difficultyDifference;
            }

            if (a.mission.xpReward !== b.mission.xpReward) {
              return a.mission.xpReward - b.mission.xpReward;
            }

            return a.score - b.score;
          })[0];

          const { mission } = quickWin;

          replyMood = 'encouraging';

          reply =
            `Let's get you a quick victory first, ${user.name}.\n\n` +
            `QUICK-WIN MISSION\n` +
            `• ${mission.title}\n\n` +
            `Rank: ${mission.difficulty}\n` +
            `Reward: +${mission.xpReward} XP\n\n` +
            `${
  personalContext.completedToday > 0
    ? `You've already made progress today. This is a good way to keep that momentum going.\n\n`
    : personalContext.streak > 0
      ? `Your ${personalContext.streak}-day streak is worth protecting. This is a low-friction way to keep moving.\n\n`
      : `Finish this smaller objective first.\n\n`
}` +
            `Then we can take on something bigger.`;
        }
      }

      // ============================================================
      // MISSION BREAKDOWN
      // ============================================================
      else if (
        lower.includes('too big') ||
        lower.includes('break this down') ||
        lower.includes('break it down') ||
        lower.includes('break down') ||
        lower.includes('split this mission') ||
        lower.includes('split the mission') ||
        lower.includes('smaller steps') ||
        lower.includes('small steps') ||
        lower.includes('where do i start') ||
        lower.includes('how do i start') ||
        lower.includes('how should i start') ||
        lower.includes('big mission') ||
        lower.includes('big task')
      ) {
        const rankedMissions = rankActiveMissions(missions);

        if (rankedMissions.length === 0) {
          replyMood = 'encouraging';

          reply =
            `You don't have any active missions to break down right now, ${user.name}.\n\n` +
            `Create a mission first, and I'll help turn it into smaller steps.`;
        } else {
          const requestedMission = rankedMissions.find((result) =>
            lower.includes(result.mission.title.toLowerCase())
          );

          const selectedMission =
            requestedMission?.mission || rankedMissions[0].mission;

          replyMood = 'focused';

          reply =
            `Let's make "${selectedMission.title}" easier to approach, ${user.name}.\n\n` +
            `MISSION\n` +
            `${selectedMission.title}\n\n` +
            `RANK\n` +
            `${selectedMission.difficulty}\n\n` +
            `BREAKDOWN\n` +
            `1. Prepare your workspace and remove distractions.\n` +
            `2. Define the exact outcome you need.\n` +
            `3. Work on the first small part for 25 minutes.\n` +
            `4. Review what you completed and continue with the next part.\n` +
            `5. Finish the remaining work, verify the result, and mark the mission complete.\n\n` +
            `AURA'S GUIDANCE\n` +
`Do not think about the entire mission at once.\n` +
`Focus only on the next step.\n\n` +
`This mission is worth +${selectedMission.xpReward} XP, so every small step moves you closer to your next level.\n` +
`You currently have ${personalContext.activeMissions} active mission${
  personalContext.activeMissions === 1 ? '' : 's'
}.`;
        }
      }

      // ============================================================
      // DAILY PLANNING
      // ============================================================
      else if (
        lower.includes('plan my day') ||
        lower.includes('plan my day today') ||
        lower.includes('daily plan') ||
        lower.includes('plan for today') ||
        lower.includes('what should i do today') ||
        lower.includes('what do i do today') ||
        lower.includes('schedule my day') ||
        lower.includes('organize my day')
      ) {
        const rankedMissions = rankActiveMissions(missions);

        if (rankedMissions.length === 0) {
          replyMood = 'encouraging';

          reply =
            `DAILY PLAN\n\n` +
            `Your mission board is clear, ${user.name}.\n\n` +
            `You have no active missions scheduled right now.\n\n` +
            `Use this time to recharge or create one focused mission for today.`;
        } else {
          replyMood = 'focused';

          const planMissions = rankedMissions.slice(0, 4);

          const planLines = planMissions
            .map((result, index) => {
              const { mission } = result;

              return (
                `${index + 1}. ${mission.title}\n` +
                `   Rank: ${mission.difficulty} | +${mission.xpReward} XP`
              );
            })
            .join('\n\n');

          reply =
            `DAILY PLAN\n\n` +
            `${
  personalContext.completedToday > 0
    ? `You've already completed ${personalContext.completedToday} mission${
        personalContext.completedToday === 1 ? '' : 's'
      } today. Here is the best way to continue, ${user.name}.\n\n`
    : personalContext.overdueMissions > 0
      ? `You have ${personalContext.overdueMissions} overdue mission${
          personalContext.overdueMissions === 1 ? '' : 's'
        }. We'll put the most urgent work first, ${user.name}.\n\n`
      : `Here is your recommended mission order for today, ${user.name}.\n\n`
}` +
            `${planLines}\n\n` +
            `FOCUS RULE\n` +
            `Complete each mission before moving to the next one.\n\n` +
            `If your energy drops, pause briefly and return to the current objective.\n\n` +
            `AURA'S GUIDANCE\n` +
            `Do not try to conquer the entire day at once.\n` +
            `Win the current mission first. ${
  personalContext.streak > 0
    ? `Your ${personalContext.streak}-day streak is worth protecting.`
    : `Every completed mission builds your momentum.`
}`;
        }
      }

      // ============================================================
      // STREAK INTELLIGENCE
      // ============================================================
      else if (
        lower.includes('streak') ||
        lower.includes('discipline') ||
        lower.includes('consistency')
      ) {
        const today = new Date();

        const completedToday = missions.filter((mission) => {
          if (mission.status !== 'completed' || !mission.completedAt) {
            return false;
          }

          const completedDate = new Date(mission.completedAt);

          return (
            completedDate.getFullYear() === today.getFullYear() &&
            completedDate.getMonth() === today.getMonth() &&
            completedDate.getDate() === today.getDate()
          );
        });

        const activeMissions = missions.filter(
          (mission) => mission.status === 'active'
        );

        const completedTodayCount = completedToday.length;
        const activeCount = activeMissions.length;
        const currentStreak = user.streak;

        if (currentStreak === 0) {
          replyMood = 'encouraging';

          if (activeCount > 0) {
            const topMission = getTopPriorityMission(missions);

            reply =
              `STREAK STATUS\n\n` +
              `Current streak: 0 days\n` +
              `Completed today: ${completedTodayCount}\n` +
              `Active missions: ${activeCount}\n\n` +
              `${
  personalContext.completedToday > 0
    ? `You've already completed ${personalContext.completedToday} mission${
        personalContext.completedToday === 1 ? '' : 's'
      } today, so your consistency is already starting to recover.\n\n`
    : personalContext.activeMissions > 0
      ? `You still have ${personalContext.activeMissions} active mission${
          personalContext.activeMissions === 1 ? '' : 's'
        } available today. Completing one is enough to restart your momentum.\n\n`
      : `Your streak is currently inactive, but that can change today.\n\n`
}` +
              `FIRST MOVE\n` +
              `${topMission ? topMission.mission.title : 'Complete one small mission'}\n\n` +
              `Finish one meaningful objective today and begin rebuilding your consistency.`;
          } else {
            reply =
              `STREAK STATUS\n\n` +
              `Current streak: 0 days\n` +
              `Completed today: ${completedTodayCount}\n\n` +
              `Your streak is currently inactive.\n\n` +
              `Create one small mission and complete it today to restart your consistency.`;
          }
        } else if (completedTodayCount > 0) {
          replyMood = 'celebrating';

          reply =
            `STREAK STATUS\n\n` +
            `Current streak: ${currentStreak} days 🔥\n` +
            `Completed today: ${completedTodayCount}\n` +
            `Active missions: ${activeCount}\n\n` +
            `TODAY'S STREAK\n` +
            `Protected ✓\n\n` +
            `You've already completed ${personalContext.completedToday} mission${
  personalContext.completedToday === 1 ? '' : 's'
} today, ${user.name}.\n\n` +
`Your ${personalContext.streak}-day streak is backed by real progress today.\n\n` +
            `AURA'S GUIDANCE\n` +
            `You can continue pushing forward, but your streak no longer needs rescuing today.`;
        } else if (activeCount > 0) {
          replyMood = currentStreak >= 7 ? 'firm' : 'focused';

          const topMission = getTopPriorityMission(missions);

          reply =
            `STREAK STATUS\n\n` +
            `Current streak: ${currentStreak} days 🔥\n` +
            `Completed today: 0\n` +
            `Active missions: ${activeCount}\n\n` +
            `STREAK CONDITION\n` +
            `Your consistency is at risk today.\n\n` +
            `PROTECT THE STREAK\n` +
            `${topMission ? topMission.mission.title : activeMissions[0].title}\n\n` +
            `You do not need to finish everything.\n` +
`Complete one meaningful mission today and keep the streak alive.\n\n` +
`AURA'S GUIDANCE\n` +
`Your ${personalContext.streak}-day streak has momentum behind it.\n` +
`Protect it with one meaningful win today, then reassess what comes next.`;
        } else {
          replyMood = 'encouraging';

          reply =
            `STREAK STATUS\n\n` +
            `Current streak: ${currentStreak} days 🔥\n` +
            `Completed today: 0\n` +
            `Active missions: 0\n\n` +
            `${
  personalContext.completedToday > 0
    ? `You've already completed ${personalContext.completedToday} mission${
        personalContext.completedToday === 1 ? '' : 's'
      } today, so your streak has already been protected.\n\n`
    : `Your ${personalContext.streak}-day streak is strong, but there are no active missions available today.\n\n`
}` +
`Create one small objective if you want to keep building today's consistency.`;
        }
      }

      // ============================================================
      // ACHIEVEMENT AWARENESS
      // ============================================================
      else if (
        lower.includes('achievement') ||
        lower.includes('achievements') ||
        lower.includes('unlock') ||
        lower.includes('badge') ||
        lower.includes('milestone') ||
        lower.includes('trophy')
      ) {
        const achievements = achievementRepository.getAchievements();

        const unlockedAchievements = achievements.filter(
          (achievement) => achievement.isUnlocked
        );

        const lockedAchievements = achievements.filter(
          (achievement) => !achievement.isUnlocked
        );

        const completedMissions = missions.filter(
          (mission) => mission.status === 'completed'
        );

        const completedMissionCount = completedMissions.length;
        const currentLevel = user.level;
        const currentStreak = user.streak;
        const totalXp = user.totalXp;

        const today = new Date();

        const completedTodayCount = completedMissions.filter((mission) => {
          if (!mission.completedAt) return false;

          const completedDate = new Date(mission.completedAt);

          return (
            completedDate.getFullYear() === today.getFullYear() &&
            completedDate.getMonth() === today.getMonth() &&
            completedDate.getDate() === today.getDate()
          );
        }).length;

        const completedSRankCount = completedMissions.filter(
          (mission) => mission.difficulty === 'S-Rank'
        ).length;

        const categoryCounts = {
          general: completedMissions.filter(
            (mission) => mission.category === 'general'
          ).length,
          training: completedMissions.filter(
            (mission) => mission.category === 'training'
          ).length,
          focus: completedMissions.filter(
            (mission) => mission.category === 'focus'
          ).length,
          special: completedMissions.filter(
            (mission) => mission.category === 'special'
          ).length,
        };

        const getProgress = (
          achievementId: string
        ): {
          current: number;
          target: number;
          progressText: string;
          remaining: number;
          ready: boolean;
        } => {
          const missionTargets: Record<string, number> = {
            ach_1: 1,
            ach_4: 5,
            ach_7: 10,
            ach_8: 25,
            ach_9: 50,
            ach_10: 100,
            ach_11: 250,
            ach_12: 500,
            ach_13: 1000,
            ach_44: 25,
          };

          const levelTargets: Record<string, number> = {
            ach_2: 5,
            ach_14: 10,
            ach_15: 15,
            ach_16: 20,
            ach_17: 25,
            ach_18: 50,
            ach_19: 100,
          };

          const streakTargets: Record<string, number> = {
            ach_3: 3,
            ach_20: 7,
            ach_21: 14,
            ach_22: 30,
            ach_23: 60,
            ach_24: 100,
            ach_25: 365,
          };

          const xpTargets: Record<string, number> = {
            ach_5: 250,
            ach_26: 500,
            ach_27: 1000,
            ach_28: 2500,
            ach_29: 5000,
            ach_30: 10000,
            ach_31: 25000,
            ach_32: 50000,
            ach_33: 100000,
          };

          const sRankTargets: Record<string, number> = {
            ach_6: 1,
            ach_34: 3,
            ach_35: 5,
            ach_36: 10,
          };

          const dailyTargets: Record<string, number> = {
            ach_37: 3,
            ach_38: 5,
            ach_39: 10,
          };

          if (missionTargets[achievementId]) {
            const target = missionTargets[achievementId];

            return {
              current: Math.min(completedMissionCount, target),
              target,
              progressText: `${Math.min(completedMissionCount, target)} / ${target} missions`,
              remaining: Math.max(0, target - completedMissionCount),
              ready: completedMissionCount >= target,
            };
          }

          if (levelTargets[achievementId]) {
            const target = levelTargets[achievementId];

            return {
              current: Math.min(currentLevel, target),
              target,
              progressText: `Level ${Math.min(currentLevel, target)} / Level ${target}`,
              remaining: Math.max(0, target - currentLevel),
              ready: currentLevel >= target,
            };
          }

          if (streakTargets[achievementId]) {
            const target = streakTargets[achievementId];

            return {
              current: Math.min(currentStreak, target),
              target,
              progressText: `${Math.min(currentStreak, target)} / ${target} days`,
              remaining: Math.max(0, target - currentStreak),
              ready: currentStreak >= target,
            };
          }

          if (xpTargets[achievementId]) {
            const target = xpTargets[achievementId];

            return {
              current: Math.min(totalXp, target),
              target,
              progressText: `${Math.min(totalXp, target)} / ${target.toLocaleString()} XP`,
              remaining: Math.max(0, target - totalXp),
              ready: totalXp >= target,
            };
          }

          if (sRankTargets[achievementId]) {
            const target = sRankTargets[achievementId];

            return {
              current: Math.min(completedSRankCount, target),
              target,
              progressText: `${Math.min(completedSRankCount, target)} / ${target} S-Rank missions`,
              remaining: Math.max(0, target - completedSRankCount),
              ready: completedSRankCount >= target,
            };
          }

          if (dailyTargets[achievementId]) {
            const target = dailyTargets[achievementId];

            return {
              current: Math.min(completedTodayCount, target),
              target,
              progressText: `${Math.min(completedTodayCount, target)} / ${target} missions today`,
              remaining: Math.max(0, target - completedTodayCount),
              ready: completedTodayCount >= target,
            };
          }

          if (achievementId === 'ach_40') {
            const current = Object.values(categoryCounts).filter(
              (count) => count > 0
            ).length;

            return {
              current,
              target: 4,
              progressText: `${current} / 4 categories`,
              remaining: Math.max(0, 4 - current),
              ready: current >= 4,
            };
          }

          if (achievementId === 'ach_41') {
            return {
              current: Math.min(categoryCounts.training, 10),
              target: 10,
              progressText: `${Math.min(categoryCounts.training, 10)} / 10 training missions`,
              remaining: Math.max(0, 10 - categoryCounts.training),
              ready: categoryCounts.training >= 10,
            };
          }

          if (achievementId === 'ach_42') {
            return {
              current: Math.min(categoryCounts.focus, 10),
              target: 10,
              progressText: `${Math.min(categoryCounts.focus, 10)} / 10 focus missions`,
              remaining: Math.max(0, 10 - categoryCounts.focus),
              ready: categoryCounts.focus >= 10,
            };
          }

          if (achievementId === 'ach_43') {
            return {
              current: Math.min(categoryCounts.special, 10),
              target: 10,
              progressText: `${Math.min(categoryCounts.special, 10)} / 10 special missions`,
              remaining: Math.max(0, 10 - categoryCounts.special),
              ready: categoryCounts.special >= 10,
            };
          }

          if (achievementId === 'ach_45') {
            return {
              current:
                Math.min(completedMissionCount, 50) +
                Math.min(currentStreak, 7),
              target: 57,
              progressText:
                `${Math.min(completedMissionCount, 50)} / 50 missions + ` +
                `${Math.min(currentStreak, 7)} / 7 day streak`,
              remaining:
                Math.max(0, 50 - completedMissionCount) +
                Math.max(0, 7 - currentStreak),
              ready:
                completedMissionCount >= 50 &&
                currentStreak >= 7,
            };
          }

          if (achievementId === 'ach_46') {
            return {
              current:
                Math.min(currentLevel, 25) +
                Math.min(completedMissionCount, 100),
              target: 125,
              progressText:
                `Level ${Math.min(currentLevel, 25)} / 25 + ` +
                `${Math.min(completedMissionCount, 100)} / 100 missions`,
              remaining:
                Math.max(0, 25 - currentLevel) +
                Math.max(0, 100 - completedMissionCount),
              ready:
                currentLevel >= 25 &&
                completedMissionCount >= 100,
            };
          }

          if (achievementId === 'ach_47') {
            return {
              current:
                Math.min(currentLevel, 50) +
                Math.min(completedMissionCount, 250),
              target: 300,
              progressText:
                `Level ${Math.min(currentLevel, 50)} / 50 + ` +
                `${Math.min(completedMissionCount, 250)} / 250 missions`,
              remaining:
                Math.max(0, 50 - currentLevel) +
                Math.max(0, 250 - completedMissionCount),
              ready:
                currentLevel >= 50 &&
                completedMissionCount >= 250,
            };
          }

          if (achievementId === 'ach_48') {
            return {
              current:
                Math.min(currentLevel, 100) +
                Math.min(completedMissionCount, 500),
              target: 600,
              progressText:
                `Level ${Math.min(currentLevel, 100)} / 100 + ` +
                `${Math.min(completedMissionCount, 500)} / 500 missions`,
              remaining:
                Math.max(0, 100 - currentLevel) +
                Math.max(0, 500 - completedMissionCount),
              ready:
                currentLevel >= 100 &&
                completedMissionCount >= 500,
            };
          }

          return {
            current: 0,
            target: 1,
            progressText: 'Progress unavailable',
            remaining: 1,
            ready: false,
          };
        };

        const lockedProgress = lockedAchievements.map((achievement) => ({
          achievement,
          progress: getProgress(achievement.id),
        }));

        const readyAchievements = lockedProgress.filter(
          ({ progress }) => progress.ready
        );

        const nearestAchievement = [...lockedProgress]
          .filter(({ progress }) => !progress.ready)
          .sort((a, b) => {
            const aRatio =
              a.progress.current / a.progress.target;
            const bRatio =
              b.progress.current / b.progress.target;

            if (bRatio !== aRatio) {
              return bRatio - aRatio;
            }

            return (
              b.achievement.xpReward -
              a.achievement.xpReward
            );
          })[0];

        if (readyAchievements.length > 0) {
          replyMood = 'celebrating';

          const readyLines = readyAchievements
            .slice(0, 5)
            .map(
              ({ achievement, progress }) =>
                `• ${achievement.title}\n` +
                `  ${progress.progressText}\n` +
                `  Requirement complete ✓\n` +
                `  Reward: +${achievement.xpReward} XP`
            )
            .join('\n\n');

          reply =
            `ACHIEVEMENT STATUS\n\n` +
            `You have milestones ready to unlock, ${user.name}.\n\n` +
            `READY TO UNLOCK\n` +
            `${readyLines}\n\n` +
            `CURRENTLY UNLOCKED\n` +
            `${unlockedAchievements.length} / ${achievements.length}\n\n` +
            `AURA'S GUIDANCE\n` +
            `AURA'S GUIDANCE\n` +
`${
  personalContext.completedToday > 0
    ? `You've already completed ${personalContext.completedToday} mission${
        personalContext.completedToday === 1 ? '' : 's'
      } today, and you've also reached new achievement milestones. That's strong progress, ${user.name}.`
    : personalContext.streak >= 7
      ? `Your ${personalContext.streak}-day streak is helping you build toward these milestones. Keep protecting that consistency.`
      : `You've already met these requirements. Keep progressing toward your next milestones.`
}`;
        } else if (nearestAchievement) {
          replyMood = 'encouraging';

          const { achievement, progress } =
            nearestAchievement;

          const percentage = Math.min(
            100,
            Math.round(
              (progress.current / progress.target) * 100
            )
          );

          reply =
            `ACHIEVEMENT STATUS\n\n` +
            `Unlocked: ${unlockedAchievements.length} / ${achievements.length}\n\n` +
            `CLOSEST ACHIEVEMENT\n` +
            `🏆 ${achievement.title}\n\n` +
            `Progress: ${progress.progressText}\n` +
            `Completion: ${percentage}%\n` +
            `Remaining: ${progress.remaining} ${
              progress.remaining === 1 ? 'step' : 'steps'
            }\n` +
            `Reward: +${achievement.xpReward} XP\n\n` +
            `REQUIREMENT\n` +
            `${achievement.description}\n\n` +
            `AURA'S GUIDANCE\n` +
            `AURA'S GUIDANCE\n` +
`${
  personalContext.completedToday > 0
    ? `You've already completed ${personalContext.completedToday} mission${
        personalContext.completedToday === 1 ? '' : 's'
      } today. Use that momentum to move closer to this milestone.`
    : personalContext.overdueMissions > 0
      ? `You have ${personalContext.overdueMissions} overdue mission${
          personalContext.overdueMissions === 1 ? '' : 's'
        }. Clear the most urgent work first, then return to this milestone.`
      : personalContext.activeMissions > 0
        ? `You have ${personalContext.activeMissions} active mission${
            personalContext.activeMissions === 1 ? '' : 's'
          }. If one helps this milestone, make it your next focused objective.`
        : personalContext.streak > 0
          ? `Your ${personalContext.streak}-day streak gives you momentum. Keep that consistency and work steadily toward this milestone.`
          : `You're getting closer. Focus on this milestone instead of chasing everything at once.`
}`;
        } else {
          replyMood = 'celebrating';

          reply =
            `ACHIEVEMENT STATUS\n\n` +
            `All currently defined achievements are unlocked, ${user.name}! 🏆\n\n` +
            `Unlocked: ${unlockedAchievements.length} / ${achievements.length}\n\n` +
            `You've completed every achievement currently available in NAVORA.\n\n` +
            `AURA'S GUIDANCE\n` +
            `AURA'S GUIDANCE\n` +
`${
  personalContext.completedToday > 0
    ? `You've already completed ${personalContext.completedToday} mission${
        personalContext.completedToday === 1 ? '' : 's'
      } today. Keep that momentum going even after completing every current achievement.`
    : personalContext.streak >= 7
      ? `Your ${personalContext.streak}-day streak shows strong consistency. Keep building new challenges without losing that rhythm.`
      : personalContext.activeMissions > 0
        ? `You still have ${personalContext.activeMissions} active mission${
            personalContext.activeMissions === 1 ? '' : 's'
          }. Use them to create your next personal milestones.`
        : `Your next challenge is to keep building missions, XP, levels, and streaks.`
}`;
        }
      }

      // ============================================================
      // PRIORITY INTELLIGENCE
      // ============================================================
      else if (
        lower.includes('next') ||
        lower.includes('priorit') ||
        lower.includes('what should i do') ||
        lower.includes('what do i do first') ||
        lower.includes('which mission')
      ) {
        replyMood = 'focused';

        const topPriority = getTopPriorityMission(missions);

        if (topPriority) {
          const { mission, priority, score, reasons } =
            topPriority;

          const reasonText =
            reasons.length > 0
              ? reasons.slice(0, 2).join(' and ')
              : 'its overall priority score';

          reply =
            `Here is your next objective, ${user.name}.\n\n` +
            `PRIORITY MISSION\n` +
            `${mission.title}\n\n` +
            `Rank: ${mission.difficulty}\n` +
            `Reward: +${mission.xpReward} XP\n` +
            `Priority: ${priority.toUpperCase()}\n` +
            `Score: ${score}\n\n` +
            `WHY THIS MISSION?\n` +
            `${reasonText}.\n\n` +
            `${
  personalContext.completedToday > 0
    ? `You've already completed ${personalContext.completedToday} mission${
        personalContext.completedToday === 1 ? '' : 's'
      } today, so this is a strong next move.`
    : personalContext.streak >= 7
      ? `Your ${personalContext.streak}-day streak is valuable. Let's protect that momentum with this objective.`
      : `Let's focus on this objective first and build momentum from there.`
}`;
        } else {
          replyMood = 'encouraging';

          reply =
            `ALL MISSIONS CLEAR\n\n` +
            `All active missions have been cleared, ${user.name}!\n\n` +
            `You can create a new mission, plan tomorrow's objectives, or take some time to recharge.`;
        }
      }

      // ============================================================
      // URGENCY / DEADLINE
      // ============================================================
      else if (
        lower.includes('urgent') ||
        lower.includes('urgency') ||
        lower.includes('deadline') ||
        lower.includes('due soon') ||
        lower.includes('due today') ||
        lower.includes('overdue')
      ) {
        replyMood = 'focused';

        const rankedMissions = rankActiveMissions(missions);

        const urgentMissions = rankedMissions.filter(
          (result) =>
            result.reasons.some(
              (reason) =>
                reason === 'Overdue' ||
                reason === 'Due within 6 hours' ||
                reason === 'Due today'
            )
        );

        if (urgentMissions.length > 0) {
          const urgentMission = urgentMissions[0];
          const { mission, reasons } = urgentMission;

          reply =
            `URGENCY CHECK\n\n` +
            `URGENT MISSION\n` +
            `${mission.title}\n\n` +
            `Status: ${reasons[0]}\n` +
            `Rank: ${mission.difficulty}\n` +
            `Reward: +${mission.xpReward} XP\n\n` +
            `RECOMMENDATION\n` +
            `${
  personalContext.overdueMissions > 0
    ? `This needs your attention now. You currently have ${personalContext.overdueMissions} overdue mission${
        personalContext.overdueMissions === 1 ? '' : 's'
      }.`
    : personalContext.urgentMissions > 0
      ? `This is one of your ${personalContext.urgentMissions} mission${
          personalContext.urgentMissions === 1 ? '' : 's'
        } approaching its deadline. Handle it before lower-priority work.`
      : `Handle this before lower-priority missions.`
}`;
        } else {
          replyMood = 'encouraging';

          reply =
            `URGENCY CHECK\n\n` +
            `No urgent missions detected.\n\n` +
            `I don't see any active mission that is overdue or due within the next 24 hours.\n\n` +
            `You have some breathing room.`;
        }
      }

      // ============================================================
      // PROCRASTINATION
      // ============================================================
      else if (
        lower.includes('procrastinat') ||
        lower.includes('stuck') ||
        lower.includes('lazy') ||
        lower.includes('tired')
      ) {
        replyMood = 'firm';

        const topPriority = getTopPriorityMission(missions);

        if (topPriority) {
          const { mission } = topPriority;

         reply =
  `PROCRASTINATION PROTOCOL\n\n` +
  `${
    personalContext.overdueMissions > 0
      ? `You have ${personalContext.overdueMissions} overdue mission${
          personalContext.overdueMissions === 1 ? '' : 's'
        }, ${user.name}. Let's stop the delay and clear one of them now.\n\n`
      : personalContext.urgentMissions > 0
        ? `You have ${personalContext.urgentMissions} mission${
            personalContext.urgentMissions === 1 ? '' : 's'
          } approaching a deadline. This is the best time to act instead of waiting.\n\n`
        : personalContext.completedToday > 0
          ? `You've already completed ${personalContext.completedToday} mission${
              personalContext.completedToday === 1 ? '' : 's'
            } today. You have momentum, so let's use it instead of stopping here.\n\n`
          : personalContext.streak > 0
            ? `Your ${personalContext.streak}-day streak is already giving you momentum. Let's protect it with one small action now.\n\n`
            : `You're procrastinating, ${user.name}. Let's make the next move simple.\n\n`
  }` +
  `I'm making the decision for you.\n\n` +
  `START WITH\n` +
  `${mission.title}\n\n` +
  `Rank: ${mission.difficulty}\n` +
  `Reward: +${mission.xpReward} XP\n\n` +
  `NEXT MOVE\n` +
  `${
  personalContext.overdueMissions > 0
    ? `Give it 10 focused minutes now. One overdue mission cleared is better than another hour of delay.`
    : personalContext.completedToday > 0
      ? `Give it 10 focused minutes now. You've already proven you can make progress today.`
      : personalContext.streak > 0
        ? `Give it 10 focused minutes now. A small action is enough to keep your ${personalContext.streak}-day streak moving.`
        : `Give it 10 focused minutes now. Starting is more important than feeling ready.`
}`;
        } else {
          replyMood = 'encouraging';

          reply =
            `PROCRASTINATION PROTOCOL\n\n` +
            `You don't have any active missions right now, ${user.name}.\n\n` +
            `There is nothing to procrastinate on.\n\n` +
            `Create one small mission and take the first step.`;
        }
      }

      // ============================================================
      // POSITIVE RESPONSE
      // ============================================================
      else if (
        lower.includes('thank') ||
        lower.includes('great') ||
        lower.includes('awesome') ||
        lower.includes('love')
      ) {
        replyMood = 'encouraging';

        reply =
          `AURA RESPONSE\n\n` +
          `You're very welcome, ${user.name}. 🟣\n\n` +
          `I'm always here to help you move forward, one step at a time.\n\n` +
          `Keep your focus and trust your progress.`;
      }

      setActiveMood(replyMood);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: reply,
          time: 'Just now',
          mood: replyMood,
        },
      ]);
    }, 500);
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  return (
    <div
      data-tutorial="ai-companion-view"
      className="space-y-6 animate-fadeIn pb-16 lg:pb-8 max-w-4xl mx-auto"
    >
      <div className="hud-panel rounded-2xl p-6 border-chakra-500/40 relative overflow-hidden">
        <div className="hud-corner-tl" />
        <div className="hud-corner-br" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <AuraAvatar
              mood={activeMood}
              size="xxl"
              showHalo
            />

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold font-hud tracking-wide text-white">
                  AURA
                </h1>

                <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-chakra-500/20 text-chakra-300 border border-chakra-500/40 uppercase">
                  NEURAL COMPANION
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Gentle mentor for task breakdown, motivation, progress,
                and tactical guidance.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-shinobi-900 border border-shinobi-800 text-xs font-mono text-slate-300">
            <Sparkles size={14} className="text-chakra-400" />
            <span>Telemetry: Synchronized</span>
          </div>
        </div>
      </div>

      <div className="hud-panel rounded-2xl border-shinobi-800 flex flex-col h-[520px] overflow-hidden">
        <div className="px-4 py-2.5 border-b border-shinobi-800 bg-shinobi-950/70 flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-leaf-400 animate-pulse" />
            <span>SENSEI PROTOCOL // ACTIVE GUIDANCE MATRIX</span>
          </div>

          <span className="text-[11px] text-slate-500">
            ENCRYPTION: SHINOBI-256
          </span>
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.sender === 'user'
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              {m.sender === 'ai' && (
                <AuraAvatar
                  mood={m.mood || 'gentle'}
                  size="md"
                  showHalo={false}
                />
              )}

              <div
                className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-chakra-500/20 border border-chakra-500/40 text-white rounded-tr-none shadow-chakra-sm'
                    : 'bg-shinobi-900 border border-shinobi-750 text-slate-200 rounded-tl-none'
                }`}
              >
                {m.text}

                <div className="mt-2 text-[10px] font-mono text-slate-500 text-right">
                  {m.time}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-shinobi-900 border border-chakra-500/40 text-chakra-300 flex items-center justify-center flex-shrink-0 font-hud font-bold text-xs shadow-chakra-sm">
                  {user.name.slice(0, 1)}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="px-3 pt-2 pb-1 border-t border-shinobi-800/80 bg-shinobi-950/60 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() =>
              handleQuickPrompt('How am I doing?')
            }
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-chakra-500/15 border border-shinobi-750 hover:border-chakra-500/40 text-[11px] font-mono text-slate-300 hover:text-chakra-300 flex items-center gap-1.5 transition"
          >
            <TrendingUp size={11} className="text-chakra-400" />
            <span>Progress Check</span>
          </button>

          <button
            onClick={() =>
              handleQuickPrompt('What should I prioritize next?')
            }
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-chakra-500/15 border border-shinobi-750 hover:border-chakra-500/40 text-[11px] font-mono text-slate-300 hover:text-chakra-300 flex items-center gap-1.5 transition"
          >
            <Target size={11} className="text-chakra-400" />
            <span>Prioritize Next Task</span>
          </button>

          <button
            onClick={() =>
              handleQuickPrompt(
                "I'm procrastinating and feeling stuck..."
              )
            }
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-flame-500/15 border border-shinobi-750 hover:border-flame-500/40 text-[11px] font-mono text-slate-300 hover:text-flame-300 flex items-center gap-1.5 transition"
          >
            <Flame size={11} className="text-flame-400" />
            <span>Overcome Procrastination</span>
          </button>

          <button
            onClick={() =>
              handleQuickPrompt(
                'How is my streak and daily discipline holding up?'
              )
            }
            className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-shinobi-900 hover:bg-amberSeal-500/15 border border-shinobi-750 hover:border-amberSeal-500/40 text-[11px] font-mono text-slate-300 hover:text-amberSeal-300 flex items-center gap-1.5 transition"
          >
            <Zap size={11} className="text-amberSeal-400" />
            <span>Streak Check</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 border-t border-shinobi-800 bg-shinobi-950/90 flex gap-2"
        >
          <input
            type="text"
            placeholder="Ask Aura for guidance, progress analysis, or focus encouragement..."
            value={input}
            onChange={(e) => {
              const value = e.target.value;

              setInput(value);

              if (value.trim()) {
                setActiveMood('focused');
              } else {
                setActiveMood('gentle');
              }
            }}
            className="flex-1 bg-shinobi-900 border border-shinobi-750 focus:border-chakra-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-chakra-400 font-mono transition"
          />

          <button
            type="submit"
            className="py-2.5 px-4 rounded-xl font-hud font-bold text-xs tracking-wider text-white bg-gradient-to-r from-[#c2410c] to-[#f97316] hover:from-[#f97316] hover:to-[#fb923c] transition shadow-[0_0_16px_rgba(249,115,22,0.4)] border border-[#9CA3AF]/30 flex items-center gap-1.5"
          >
            <span>CONSULT</span>
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};