

const Skor = ({ currentStreak, currentStreakScore, highestStreak, highestStreakScore }) => {

  return (
    <div className="skor">
      <p className="skor-detay current-streak">Güncel Seri: {currentStreak}</p>
      <p className="skor-detay current-streak-score">Güncel Seri Skoru: {currentStreakScore}</p>
      <p className="skor-detay highest-streak">En Yüksek Seri: {highestStreak}</p>
      <p className="skor-detay highest-streak-score">En Yüksek Seri Skoru: {highestStreakScore}</p>
    </div>
  );
}

export default Skor;