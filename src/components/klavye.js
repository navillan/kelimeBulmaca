
const keys = [
  ["A", "B", "C", "Ç", "D", "E", "F", "G", "H", "Ğ", "I", "İ"],
  ["J", "K", "L", "M", "N", "O", "Ö", "P", "R", "S", "Ş"],
  ["ENTER", "T", "U", "Ü", "V", "Y", "Z", "BACKSPACE"],
];

const Klavye = ({ onKeyPress, cellColors, table }) => {
  
  const getLetterColor = (key) => {
    let color = "";
    for (let row = 0; row < table.length; row++) {
      for (let col = 0; col < table[row].length; col++) {
        if (table[row][col] === key) {
          if (cellColors[row][col] === "#8BC34A") {
            return "#8BC34A";
          } else if (cellColors[row][col] === "#FFC107") {
            color = "#FFC107";
          } else if (cellColors[row][col] === "#ff6767ff") {
            color = "#ff6767ff";
          }
        }
      }
    }
    return color;
  };

  const getButtonProps = (k) => {
    const color = getLetterColor(k);
    return {
      style: {
        background: color || "#e0e0e0",
      }
    };
  };
  

  return (
    <div className="klavye-cluster">
      <h2>Klavye Component</h2>
      <div className="button-cluster button-cluster-upper">
        {keys[0].map((k) => (
          <button key={k} onClick={() => onKeyPress(k)} {...getButtonProps(k)}>
            {k}
          </button>
        ))}
      </div>
      <div className="button-cluster button-cluster-middle">
        {keys[1].map((k) => (
          <button key={k} onClick={() => onKeyPress(k)} {...getButtonProps(k)}>
            {k}
          </button>
        ))}
      </div>
      <div className="button-cluster button-cluster-bottom">
        {keys[2].map((k) => (
          <button key={k} onClick={() => onKeyPress(k)} {...getButtonProps(k)}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Klavye;