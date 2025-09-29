import { useState } from "react";
import KelimeTablosu from "./kelimeTablosu.js";
import Skor from "./skor.js";


function App () {

  let score = JSON.parse(localStorage.getItem('score')) || {
          currentStreak,
          currentStreakScore,
          highestStreak,
          highestStreakScore
  };

  const [currentStreak, setCurrentStreak] = useState(score.currentStreak || 0);
  const [currentStreakScore, setCurrentStreakScore] = useState(score.currentStreakScore || 0);
  
  return (
    <div className="App">
      <h1 className="main-header">Kelime Bulmaca</h1>
      <Skor 
        currentStreak={currentStreak}
        currentStreakScore={currentStreakScore}
      />
      <KelimeTablosu
        currentStreak={currentStreak}
        setCurrentStreak={setCurrentStreak}
        currentStreakScore={currentStreakScore}
        setCurrentStreakScore={setCurrentStreakScore}
      />
    </div>
  );
}

export default App;