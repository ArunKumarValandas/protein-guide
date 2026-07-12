import * as Icons from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getLevelProgress } from '@/utils/quiz';
import { formatDuration, formatNumber } from '@/utils/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';

function AchievementIcon({ name, unlocked }) {
  const Icon = Icons[name] || Icons.Trophy;
  return (
    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${unlocked ? 'bg-accent text-white' : 'bg-surface-muted text-content-muted'}`}>
      <Icon className="h-6 w-6" aria-hidden="true" />
    </div>
  );
}

export function AchievementsPage() {
  const achievements = useAppStore((s) => s.achievements);
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);
  const statistics = useAppStore((s) => s.statistics);
  const levelProgress = getLevelProgress(xp);
  const unlocked = achievements.filter((achievement) => achievement.unlocked);
  const leaderboard = [
    { rank: 1, name: 'You', xp, detail: `Level ${levelProgress.level}` },
    { rank: 2, name: 'Daily Streak', xp: streak * 75, detail: `${streak} days` },
    { rank: 3, name: 'Visualizer Score', xp: statistics.totalVisualizations * 50, detail: `${statistics.totalVisualizations} runs` },
    { rank: 4, name: 'Practice Score', xp: statistics.totalSteps, detail: `${formatNumber(statistics.totalSteps)} steps` },
  ].sort((a, b) => b.xp - a.xp).map((entry, index) => ({ ...entry, rank: index + 1 }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-content">Achievements</h1>
        <p className="mt-2 text-content-muted">Track XP, badges, streaks, and local leaderboard progress.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardContent className="p-0"><div className="text-2xl font-bold text-content">{xp}</div><div className="text-sm text-content-muted">XP</div></CardContent></Card>
        <Card><CardContent className="p-0"><div className="text-2xl font-bold text-content">{levelProgress.level}</div><div className="text-sm text-content-muted">Level</div></CardContent></Card>
        <Card><CardContent className="p-0"><div className="text-2xl font-bold text-content">{unlocked.length}/{achievements.length}</div><div className="text-sm text-content-muted">Badges</div></CardContent></Card>
        <Card><CardContent className="p-0"><div className="text-2xl font-bold text-content">{formatDuration(statistics.totalTimeMs)}</div><div className="text-sm text-content-muted">Learning Time</div></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Level Progress</CardTitle>
          <CardDescription>{levelProgress.xpToNext} XP to next level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-3 overflow-hidden rounded-full bg-surface-muted">
            <div className="h-full rounded-full bg-accent" style={{ width: `${levelProgress.progress}%` }} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="grid gap-4 lg:col-span-2">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className={achievement.unlocked ? 'border-accent/40 bg-accent-muted/10' : 'opacity-70'}>
              <CardContent className="flex items-center gap-4 p-0">
                <AchievementIcon name={achievement.icon} unlocked={achievement.unlocked} />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-content">{achievement.title}</h2>
                    <Badge variant={achievement.unlocked ? 'success' : 'default'}>
                      {achievement.unlocked ? 'Unlocked' : 'Locked'}
                    </Badge>
                  </div>
                  <p className="text-sm text-content-muted">{achievement.description}</p>
                </div>
                <div className="text-sm font-semibold text-accent">{achievement.xp} XP</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Local Leaderboard</CardTitle>
            <CardDescription>Ranked from your saved browser progress.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaderboard.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                  <div className="font-medium text-content">#{entry.rank} {entry.name}</div>
                  <div className="text-xs text-content-muted">{entry.detail}</div>
                </div>
                <Badge variant={entry.rank === 1 ? 'primary' : 'default'}>{entry.xp} XP</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
