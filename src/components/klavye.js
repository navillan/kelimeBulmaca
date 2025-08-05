
const keys = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "Ğ", "I", "İ"],
  ["J", "K", "L", "M", "N", "O", "Ö", "P", "R", "S", "Ş"],
  ["ENTER", "T", "U", "Ü", "V", "Y", "Z", "BACKSPACE"],
];

const Klavye = ({ onKeyPress }) => {
  return (
    <div className="klavye-cluster">
      <h2>Klavye Component</h2>
      <div className="button-cluster button-cluster-upper">
        {keys[0].map((k) => (
          <button key={k} onClick={() => onKeyPress && onKeyPress(k)}>
            {k}
          </button>
        ))}
      </div>
      <div className="button-cluster button-cluster-middle">
        {keys[1].map((k) => (
          <button key={k} onClick={() => onKeyPress && onKeyPress(k)}>
            {k}
          </button>
        ))}
      </div>
      <div className="button-cluster button-cluster-bottom">
        {keys[2].map((k) => (
          <button key={k} onClick={() => onKeyPress && onKeyPress(k)}>
            {k}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Klavye;