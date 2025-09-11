import useRandomKelime from "../hooks/useGetKelime.js";
import { useState } from "react";
import Klavye from "./klavye.js";
import ResultAlert from "./resultAlert.js";
import useCheckValidWord from "../hooks/useCheckValidWord.js";
import useUpdateScores from "../hooks/useUpdateScores.js";



const KelimeTablosu = () => {  
  let score = JSON.parse(localStorage.getItem('score')) || {
          currentStreak,
          currentStreakScore,
          highestStreak,
          highestStreakScore
  };
  const ROWS = 7;
  const COLS = 5;
  const getKelime = useRandomKelime();
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(score.currentStreak || 0);
  const [currentStreakScore, setCurrentStreakScore] = useState(score.currentStreakScore || 0);
  const [highestStreak, setHighestStreak] = useState(score.highestStreak || 0);
  const [highestStreakScore, setHighestStreakScore] = useState(score.highestStreakScore || 0);
  const [isValidWord, setIsValidWord] = useState(false);
  const [isCheckingWord, setIsCheckingWord] = useState(false);
  const { mainKelime, kelimeler, kelimelerArray } = getKelime;
  const [tahminKelime, setTahminKelime] = useState([]);
  const [table, setTable] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );
  const [cellColors, setCellColors] = useState(
  Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );
  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });  
  console.log("Main Kelime:", mainKelime && Object.values(mainKelime).map(val =>
          typeof val === "string" ? val.toUpperCase() : val
        ));  


  
  const handleKeyboardInput = (key) => {
    let { row, col } = currentCell;
    if(table[currentCell?.row]?.every(cell => cell !== "")) {
      useCheckValidWord(setIsValidWord, tahminKelime, kelimelerArray);
    }
    if (key === "BACKSPACE") {
      if (col > 0 || (col === 0 && table[row][col] !== "")) {
        const newCol = col > 0 && table[row][col] === "" ? col - 1 : col;
        const updatedTable = table.map((rArr, rIdx) =>
          rArr.map((cell, cIdx) =>
            rIdx === row && cIdx === newCol ? "" : cell
          )
        );
        setTable(updatedTable);
        setCurrentCell({ row, col: newCol });
        setTahminKelime(prev =>
        prev.length > 0 ? prev.slice(0, -1) : prev
        );
        setCellColors(prev => {
        const newColors = prev.map(arr => [...arr]);
        newColors[row][col] = "";
        return newColors;
        });
      }
    } else if (key === "ENTER") {
      const guess = tahminKelime.join("");
      

      if (isValidWord) {
        if (tahminKelime.length === COLS && mainKelime) {          
          const mainKelimeArr = Object.values(mainKelime).map(val =>
            typeof val === "string" ? val.toUpperCase() : val
          );
          const newColors = cellColors.map(arr => [...arr]);
          for (let i = 0; i < COLS; i++) {
            if (tahminKelime[i] === mainKelimeArr[i]) {
              newColors[row][i] = "#8BC34A";
            } else if (mainKelimeArr.includes(tahminKelime[i])) {
              newColors[row][i] = "#FFC107";
            } else {
              newColors[row][i] = "#ff6767ff"; 
            }
          }
        setCellColors(newColors);

        let win = false, lose = false;
        if (newColors[row].every(color => color === "#8BC34A")) {
          setIsWin(true);
          win = true;
          } else if (row === ROWS - 1) {
          setIsLose(true);
          lose = true;
          }
          useUpdateScores({ 
            isWin: win,
            isLose: lose,
            score,
            setCurrentStreak,
            setCurrentStreakScore,
            setHighestStreak,
            setHighestStreakScore
          });
        }

        if (row < ROWS - 1) {
          setCurrentCell({ row: row + 1, col: 0 });
          console.log(tahminKelime);        
          setTahminKelime([]);
        }
      } else if (!Object.values(kelimeler).includes(guess)) {
        const updatedTable = table.map((rArr, rIdx) =>
          rIdx === row ? Array(COLS).fill("") : rArr
        );
        setTable(updatedTable);
        setCurrentCell({ row, col: 0 });
        setTahminKelime([]);
        }
    } else if (/^[A-ZĞÜŞİÖÇ]$/i.test(key)) {
      if (col < COLS) {
        const updatedTable = table.map((rArr, rIdx) =>
          rArr.map((cell, cIdx) =>
            rIdx === row && cIdx === col ? key.toUpperCase() : cell
          )
        );
        setTable(updatedTable);
        setTahminKelime(prev => [...prev, key.toUpperCase()]);
        if (col < COLS - 1) {
          setCurrentCell({ row, col: col + 1 });
        }
      }
    }
  };

  return (
    <div className="kelime-tablosu">
      <h2>Kelime Tablosu Component</h2>
      <button onClick={() => {
        getKelime.getKelimeler(),
        setTable(Array.from({ length: ROWS }, () => Array(COLS).fill("")));
        setCellColors(Array.from({ length: ROWS }, () => Array(COLS).fill("")));
        setTahminKelime([]);
        setCurrentCell({ row: 0, col: 0 });
        setIsWin(false);
        setIsLose(false);
      }}>
        Kelimeyi Yenile
      </button>
      <p>Tahmin: {tahminKelime.join(" ")}</p>
      <ResultAlert isWin={isWin} isLose={isLose} />
      <table className="kelime-table letter-wrapper" id="kelimeTable">
        <tbody>
          {table.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <td key={colIdx}>
                  <input
                    type="text"
                    maxLength={1}
                    value={cell}
                    readOnly
                    onFocus={() => setCurrentCell({ row: rowIdx, col: colIdx })}
                    style={{
                      width: "2em",
                      height: "2em",
                      fontSize: "1.5em",
                      textAlign: "center",
                      textTransform: "uppercase",
                      background:
                        cellColors[rowIdx][colIdx] ||
                        (currentCell.row === rowIdx && currentCell.col === colIdx
                          ? "#e0e0e0"
                          : undefined),
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Klavye 
      onKeyPress={handleKeyboardInput}
      cellColors={cellColors}
      table={table}
      currentCell={currentCell}
      />
    </div>
  );
};

export default KelimeTablosu;