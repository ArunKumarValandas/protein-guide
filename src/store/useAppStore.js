import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_THEME } from '@/styles/themes';
import { getStorageItem, setStorageItem } from '@/utils/storage';

const initialAchievements = [
  { id: 'first_sort', title: 'First Sort', description: 'Complete your first sorting visualization', icon: 'ArrowUpDown', unlocked: false, xp: 50 },
  { id: 'speed_demon', title: 'Speed Demon', description: 'Run 10 algorithms at max speed', icon: 'Zap', unlocked: false, xp: 100 },
  { id: 'graph_explorer', title: 'Graph Explorer', description: 'Visualize 5 graph algorithms', icon: 'Share2', unlocked: false, xp: 150 },
  { id: 'dp_master', title: 'DP Master', description: 'Complete all DP visualizations', icon: 'Grid3x3', unlocked: false, xp: 200 },
  { id: 'quiz_champion', title: 'Quiz Champion', description: 'Score 100% on a quiz', icon: 'Trophy', unlocked: false, xp: 250 },
  { id: 'daily_streak_7', title: 'Week Warrior', description: 'Maintain a 7-day learning streak', icon: 'Flame', unlocked: false, xp: 300 },
  { id: 'benchmark_king', title: 'Benchmark King', description: 'Run 5 benchmark comparisons', icon: 'BarChart3', unlocked: false, xp: 175 },
  { id: 'pathfinder', title: 'Pathfinder', description: 'Find shortest path 10 times', icon: 'Map', unlocked: false, xp: 125 },
];

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function createUser({ name, email, password }) {
  return {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name: name.trim(),
    email: normalizeEmail(email),
    password,
    createdAt: Date.now(),
  };
}

export const useAppStore = create(
  persist(
    (set, get) => ({
      theme: DEFAULT_THEME,
      sidebarOpen: true,
      sidebarCollapsed: false,
      highContrast: false,
      reducedMotion: false,
      users: [
        {
          id: 'demo-user',
          name: 'Demo Learner',
          email: 'demo@algovision.dev',
          password: 'demo123',
          createdAt: Date.now(),
        },
      ],
      currentUser: null,

      favorites: [],
      recentActivity: [],
      progress: {},
      statistics: {
        totalVisualizations: 0,
        totalComparisons: 0,
        totalSwaps: 0,
        totalSteps: 0,
        totalTimeMs: 0,
        algorithmsExplored: 0,
      },
      achievements: initialAchievements,
      dailyChallenge: null,
      streak: 0,
      lastActiveDate: null,
      xp: 0,
      level: 1,

      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      setHighContrast: (enabled) => set({ highContrast: enabled }),
      setReducedMotion: (enabled) => set({ reducedMotion: enabled }),

      register: ({ name, email, password }) => {
        const normalizedEmail = normalizeEmail(email);
        const { users } = get();
        if (!name.trim() || !normalizedEmail || password.length < 6) {
          return { ok: false, error: 'Enter a name, valid email, and at least 6 password characters.' };
        }
        if (users.some((user) => user.email === normalizedEmail)) {
          return { ok: false, error: 'An account with this email already exists.' };
        }
        const user = createUser({ name, email, password });
        const sessionUser = { id: user.id, name: user.name, email: user.email };
        set((s) => ({ users: [...s.users, user], currentUser: sessionUser }));
        return { ok: true, user: sessionUser };
      },

      login: ({ email, password }) => {
        const normalizedEmail = normalizeEmail(email);
        const user = get().users.find(
          (item) => item.email === normalizedEmail && item.password === password,
        );
        if (!user) return { ok: false, error: 'Invalid email or password.' };
        const sessionUser = { id: user.id, name: user.name, email: user.email };
        set({ currentUser: sessionUser });
        return { ok: true, user: sessionUser };
      },

      logout: () => set({ currentUser: null }),

      addFavorite: (algorithmId) => {
        const { favorites } = get();
        if (!favorites.includes(algorithmId)) {
          set({ favorites: [...favorites, algorithmId] });
        }
      },

      removeFavorite: (algorithmId) => {
        set((s) => ({ favorites: s.favorites.filter((id) => id !== algorithmId) }));
      },

      addRecentActivity: (activity) => {
        const entry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          timestamp: Date.now(),
          ...activity,
        };
        set((s) => ({
          recentActivity: [entry, ...s.recentActivity].slice(0, 50),
        }));
        get().updateStreak();
      },

      updateProgress: (algorithmId, data) => {
        set((s) => ({
          progress: {
            ...s.progress,
            [algorithmId]: {
              ...s.progress[algorithmId],
              ...data,
              lastVisited: Date.now(),
            },
          },
        }));
      },

      updateStatistics: (stats) => {
        set((s) => ({
          statistics: {
            ...s.statistics,
            totalVisualizations: s.statistics.totalVisualizations + (stats.visualizations || 0),
            totalComparisons: s.statistics.totalComparisons + (stats.comparisons || 0),
            totalSwaps: s.statistics.totalSwaps + (stats.swaps || 0),
            totalSteps: s.statistics.totalSteps + (stats.steps || 0),
            totalTimeMs: s.statistics.totalTimeMs + (stats.timeMs || 0),
            algorithmsExplored: stats.newAlgorithm
              ? s.statistics.algorithmsExplored + 1
              : s.statistics.algorithmsExplored,
          },
        }));
      },

      unlockAchievement: (achievementId) => {
        const { achievements, xp } = get();
        const achievement = achievements.find((a) => a.id === achievementId);
        if (!achievement || achievement.unlocked) return;

        const newXp = xp + achievement.xp;
        const newLevel = Math.floor(newXp / 500) + 1;

        set({
          achievements: achievements.map((a) =>
            a.id === achievementId ? { ...a, unlocked: true, unlockedAt: Date.now() } : a,
          ),
          xp: newXp,
          level: newLevel,
        });
      },

      updateStreak: () => {
        const today = new Date().toDateString();
        const { lastActiveDate, streak } = get();

        if (lastActiveDate === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const wasYesterday = lastActiveDate === yesterday.toDateString();

        const newStreak = wasYesterday || !lastActiveDate ? streak + 1 : 1;

        set({ streak: newStreak, lastActiveDate: today });

        if (newStreak >= 7) {
          get().unlockAchievement('daily_streak_7');
        }
      },

      setDailyChallenge: (challenge) => set({ dailyChallenge: challenge }),
    }),
    {
      name: 'algovision-app-store',
      partialize: (state) => ({
        theme: state.theme,
        users: state.users,
        currentUser: state.currentUser,
        favorites: state.favorites,
        recentActivity: state.recentActivity,
        progress: state.progress,
        statistics: state.statistics,
        achievements: state.achievements,
        dailyChallenge: state.dailyChallenge,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate,
        xp: state.xp,
        level: state.level,
        highContrast: state.highContrast,
        reducedMotion: state.reducedMotion,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);

export function initDailyChallenge() {
  const challenges = [
    { id: 'sort_merge', title: 'Merge Sort Mastery', algorithm: 'merge-sort', category: 'sorting', xp: 75 },
    { id: 'graph_dijkstra', title: 'Dijkstra Explorer', algorithm: 'dijkstra', category: 'graph', xp: 100 },
    { id: 'dp_knapsack', title: 'Knapsack Solver', algorithm: 'knapsack', category: 'dp', xp: 125 },
    { id: 'search_binary', title: 'Binary Search Pro', algorithm: 'binary-search', category: 'searching', xp: 50 },
    { id: 'backtrack_nqueens', title: 'N-Queens Challenge', algorithm: 'n-queens', category: 'backtracking', xp: 150 },
  ];

  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % challenges.length;
  const challenge = { ...challenges[dayIndex], date: new Date().toDateString(), completed: false };

  const stored = getStorageItem('daily_challenge');
  if (stored?.date === challenge.date) {
    useAppStore.getState().setDailyChallenge(stored);
  } else {
    useAppStore.getState().setDailyChallenge(challenge);
    setStorageItem('daily_challenge', challenge);
  }
}
