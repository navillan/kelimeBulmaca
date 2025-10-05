

const ResultAlert = ({ isWin, isLose, remainingRows, mainKelime }) => {


  return (
    <div className="result-alert" style={{ display: isWin || isLose ? 'block' : 'none' }}>
      <div className="win-result-alert" style={{ display: isWin ? 'block' : 'none' }}>
        <h2 style={{ color: 'rgb(29, 139, 19)' }}>Tebrikler!</h2>
        <p>Kelimeyi doğru tahmin ettiniz. {remainingRows + 1} Puan kazandınız. Sonraki turda başarılar!</p>
        <button className="go-again" onClick={() => window.location.reload()}>Tekrar Oyna</button>
      </div>
      <div className="lose-result-alert" style={{ display: isLose ? 'block' : 'none' }}>
        <h2 style={{ color: 'red' }}>Oyun Bitti</h2>
        <p>Bilemediğiniz kelime: {mainKelime}. Güncel seri sıfırlandı. Sonraki turda başarılar!</p>
        <button className="go-again" onClick={() => window.location.reload()}>Tekrar Dene</button>
      </div>
    </div>
  );
}

export default ResultAlert;