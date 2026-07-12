export function calculateQuizScore(answers, questions) {
  let correct = 0;
  questions.forEach((question, index) => {
    if (answers[index] === question.correctIndex) {
      correct += 1;
    }
  });

  const total = questions.length;
  const percentage = total === 0 ? 0 : Math.round((correct / total) * 100);

  return { correct, total, percentage };
}

export function isPerfectQuizScore(score) {
  return score.percentage === 100;
}

export function formatQuizTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function getLevelProgress(xp) {
  const xpPerLevel = 500;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const currentLevelXp = xp % xpPerLevel;
  const progress = (currentLevelXp / xpPerLevel) * 100;
  const xpToNext = xpPerLevel - currentLevelXp;

  return { level, currentLevelXp, progress, xpToNext, xpPerLevel };
}
