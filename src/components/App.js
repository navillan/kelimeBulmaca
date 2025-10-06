import { useState } from "react";
import KelimeTablosu from "./kelimeTablosu.js";
import Skor from "./skor.js";
import SendToUs from "./sendToUs.js";
import MainHeader from "./mainHeader.js";

function App () {

  let score = JSON.parse(localStorage.getItem('score')) || {
          currentStreak:0,
          currentStreakScore:0,
          highestStreak:0,
          highestStreakScore:0
  };

  const [currentStreak, setCurrentStreak] = useState(score.currentStreak || 0);
  const [currentStreakScore, setCurrentStreakScore] = useState(score.currentStreakScore || 0);
  
  return (
    <div className="App">
      <MainHeader />
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
      <SendToUs />
    </div>
  );
}
export default App;