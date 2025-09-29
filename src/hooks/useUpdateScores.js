

const useUpdateScores = ({ isWin, isLose, score, setCurrentStreak, setCurrentStreakScore, setHighestStreak, setHighestStreakScore, remainingRows }) => {
  if (isWin) {
    const newCurrentStreak = score.currentStreak + 1;
    const newCurrentStreakScore = score.currentStreakScore + remainingRows;

    setCurrentStreak(newCurrentStreak);
    setCurrentStreakScore(newCurrentStreakScore);

    score.currentStreak = newCurrentStreak;
    score.currentStreakScore = newCurrentStreakScore;

    if (newCurrentStreak > score.highestStreak) {
      setHighestStreak(newCurrentStreak);
      setHighestStreakScore(newCurrentStreakScore);
      score.highestStreak = newCurrentStreak;
      score.highestStreakScore = newCurrentStreakScore;
    }

    localStorage.setItem('score', JSON.stringify(score));
  } else if (isLose) {
    setCurrentStreak(0);
    setCurrentStreakScore(0);
    score.currentStreak = 0;
    score.currentStreakScore = 0;
    localStorage.setItem('score', JSON.stringify(score));
  }
};

export default useUpdateScores;