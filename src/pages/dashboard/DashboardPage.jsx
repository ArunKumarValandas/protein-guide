import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Flame,
  Star,
  Clock,
  Trophy,
  Target,
  TrendingUp,
  Play,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { ROUTES } from '@/config/routes';
import { SORTING_ALGO_LIST, ALL_ALGORITHMS } from '@/constants/algorithms';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { formatNumber, formatDuration } from '@/utils/format';

export function DashboardPage() {
  const statistics = useAppStore((s) => s.statistics);
  const recentActivity = useAppStore((s) => s.recentActivity);
  const favorites = useAppStore((s) => s.favorites);
  const dailyChallenge = useAppStore((s) => s.dailyChallenge);
  const achievements = useAppStore((s) => s.achievements);
  const streak = useAppStore((s) => s.streak);
  const xp = useAppStore((s) => s.xp);
  const level = useAppStore((s) => s.level);

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const continueLearning = SORTING_ALGO_LIST.slice(0, 3);

  const statsCards = [
    { label: 'Visualizations', value: formatNumber(statistics.totalVisualizations), icon: Play },
    { label: 'Comparisons', value: formatNumber(statistics.totalComparisons), icon: TrendingUp },
    { label: 'Total Time', value: formatDuration(statistics.totalTimeMs), icon: Clock },
    { label: 'Algorithms', value: formatNumber(statistics.algorithmsExplored), icon: Target },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-content">Dashboard</h1>
          <p className="mt-1 text-content-muted">Welcome back! Continue your DSA journey.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-4 py-2">
            <Flame className="h-5 w-5 text-orange-500" aria-hidden="true" />
            <span className="font-semibold text-content">{streak} day streak</span>
          </div>
          <div className="rounded-lg border border-border bg-surface-elevated px-4 py-2">
            <span className="text-sm text-content-muted">Level {level}</span>
            <span className="ml-2 font-semibold text-accent">{xp} XP</span>
          </div>
        </div>
      </div>

      {dailyChallenge && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-accent/30 bg-accent-muted/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <Badge variant="primary" className="mb-2">Daily Challenge</Badge>
                  <CardTitle>{dailyChallenge.title}</CardTitle>
                  <CardDescription>Complete today&apos;s challenge to earn {dailyChallenge.xp} XP</CardDescription>
                </div>
                <Target className="h-12 w-12 text-accent" aria-hidden="true" />
              </div>
            </CardHeader>
            <CardContent>
              <Link to={`/algorithms/${dailyChallenge.category}/${dailyChallenge.algorithm}`}>
                <Button>
                  Start Challenge
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="flex items-center gap-4 p-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-muted">
                  <stat.icon className="h-6 w-6 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-content">{stat.value}</div>
                  <div className="text-sm text-content-muted">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {continueLearning.map((algo) => (
              <Link
                key={algo.id}
                to={`${ROUTES.SORTING}/${algo.id}`}
                className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-accent/50"
              >
                <div>
                  <div className="font-medium text-content">{algo.name}</div>
                  <div className="text-xs text-content-muted">{algo.timeComplexity.average}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-content-muted" aria-hidden="true" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest visualizations</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <p className="text-sm text-content-muted">No activity yet. Start visualizing algorithms!</p>
            ) : (
              <div className="space-y-3">
                {recentActivity.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between text-sm">
                    <span className="text-content">{activity.name || activity.algorithm}</span>
                    <span className="text-content-muted">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            {favorites.length === 0 ? (
              <p className="text-sm text-content-muted">No favorites yet. Star algorithms to save them here.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {favorites.map((id) => (
                  <Badge key={id} variant="primary">
                    {ALL_ALGORITHMS[id]?.name || id}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              Achievements
            </CardTitle>
            <CardDescription>
              {unlockedAchievements.length} of {achievements.length} unlocked
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.slice(0, 4).map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-lg border p-3 ${achievement.unlocked ? 'border-accent/50 bg-accent-muted/20' : 'border-border opacity-50'}`}
                >
                  <div className="text-sm font-medium text-content">{achievement.title}</div>
                  <div className="text-xs text-content-muted">{achievement.xp} XP</div>
                </div>
              ))}
            </div>
            <Link to={ROUTES.ACHIEVEMENTS} className="mt-4 inline-block text-sm text-accent hover:underline">
              View all achievements
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
