

const ResultAlert = ({ isWin, isLose }) => {


  return (
    <div className="result-alert" style={{ display: isWin || isLose ? 'block' : 'none' }}>
      <div className="win-result-alert" style={{ display: isWin ? 'block' : 'none' }}>
        <h2>Congratulations!</h2>
        <p>You have successfully completed the game!</p>
      </div>
      <div className="lose-result-alert" style={{ display: isLose ? 'block' : 'none' }}>
        <h2>Game Over</h2>
        <p>You have lost the game. Better luck next time!</p>
      </div>
    </div>
  );
}

export default ResultAlert;