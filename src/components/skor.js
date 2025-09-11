

const Skor = () => {
let score = JSON.parse(localStorage.getItem('score')) || {
    currentStreak: 0,
    currentStreakScore: 0,
    highestStreak: 0,
    highestStreakScore: 0
};

  return (
    <div className="skor">
      <p className="skor-detay current-streak">Güncel Seri: {score.currentStreak}</p>
      <p className="skor-detay current-streak-score">Güncel Seri Skoru: {score.currentStreakScore}</p>
      <p className="skor-detay highest-streak">En Yüksek Seri: {score.highestStreak}</p>
      <p className="skor-detay highest-streak-score">En Yüksek Seri Skoru: {score.highestStreakScore}</p>
    </div>
  );
}

export default Skor;