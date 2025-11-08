import useRandomKelime from "../hooks/useGetKelime.js";
import { use, useEffect, useState } from "react";
import Klavye from "./klavye.js";
import ResultAlert from "./resultAlert.js";
import useCheckValidWord from "../hooks/useCheckValidWord.js";
import useUpdateScores from "../hooks/useUpdateScores.js";
import TahminKelime from "./tahminKelime.js";



const KelimeTablosu = ({  setCurrentStreak, setCurrentStreakScore, showSendToUs }) => {  
  let score = JSON.parse(localStorage.getItem('score')) || {
          currentStreak:0,
          currentStreakScore:0,
          highestStreak:0,
          highestStreakScore:0
  };
  const ROWS = 7;
  const COLS = 5;
  const getKelime = useRandomKelime();
  const [isWin, setIsWin] = useState(false);
  const [isLose, setIsLose] = useState(false);
  const [remainingRows, setRemainingRows] = useState(7);
  const [correctWords, setCorrectWords] = useState(["-", "-", "-", "-", "-"]);
  const [highestStreak, setHighestStreak] = useState(score.highestStreak || 0);
  const [highestStreakScore, setHighestStreakScore] = useState(score.highestStreakScore || 0);
  const [isValidWord, setIsValidWord] = useState(false);
  const [tahminKelime, setTahminKelime] = useState([]);
  const { mainKelime, kelimeler, kelimelerArray } = getKelime;
  const [remainingWords, setRemainingWords] = useState([]);

  useEffect(() => {
    setRemainingWords(mainKelime ? Object.values(mainKelime).filter(val => typeof val === "string") : []);
  }, [mainKelime]);

  const [table, setTable] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );
  const [cellColors, setCellColors] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );
  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });

  let { row, col } = currentCell;

  useEffect(() => {
    if (
      currentCell.col === COLS - 1 &&
      table[currentCell.row][currentCell.col] !== ""
    ) {
      useCheckValidWord(setIsValidWord, tahminKelime, kelimelerArray);
    }
  }, [tahminKelime]);
  
  
  const handleCorrectWords = (e, tahminKelime) => {    
    setCorrectWords((prev) => {
      const newCorrectWords = [...prev];
      newCorrectWords[e] = tahminKelime;
      return newCorrectWords;
    });
  };
  
  
  const handleKeyboardInput = (key) => {
    
    if (isWin || isLose || showSendToUs) return;
    if (key === "⌫" || key === "Backspace") {
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
    } else if (key === "⏎" || key === "Enter") {
      const guess = tahminKelime.join("");

      if (isValidWord) {
        if (tahminKelime.length === COLS && tahminKelime.length === mainKelime.length) {
          const mainKelimeArr = Object.values(mainKelime).map(val =>
            typeof val === "string" ? val.toUpperCase() : val
          );
          const newColors = cellColors.map(arr => [...arr]);
          for (let i = 0; i < COLS; i++) {
            if (tahminKelime[i] === mainKelimeArr[i]) {
              setRemainingWords(prev => {
                return prev.filter((_, idx) => idx !== i);
              });
              newColors[row][i] = "#8BC34A";
              handleCorrectWords(i, tahminKelime[i]);
              setRemainingRows(7 - currentCell.row)
            } else if (mainKelimeArr.includes(tahminKelime[i]) && remainingWords.includes(tahminKelime[i])) {
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
            remainingRows,
            score,
            setCurrentStreak,
            setCurrentStreakScore,
            setHighestStreak,
            setHighestStreakScore
          });
        }

        if (row < ROWS - 1) {
          setCurrentCell({ row: row + 1, col: 0 });
          setTahminKelime([]);
          setIsValidWord(false);
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
    <div className="oyun-wrapper">
      <button className="yenile-button"
      onClick={() => {
        getKelime.getKelimeler(),
        setTable(Array.from({ length: ROWS }, () => Array(COLS).fill("")));
        setCellColors(Array.from({ length: ROWS }, () => Array(COLS).fill("")));
        setTahminKelime([]);
        setCurrentCell({ row: 0, col: 0 });
        setIsWin(false);
        setIsLose(false);
        setCorrectWords(["-", "-", "-","-", "-"]);
        setCurrentStreak(0);
        setCurrentStreakScore(0)
        localStorage.setItem('score', JSON.stringify({
          ...score,
          currentStreak: 0,
          currentStreakScore: 0
        }));
      }}>
        Kelimeyi Yenile
      </button>
      <TahminKelime
      correctWords={correctWords}
      cellColors={cellColors}
      currentCell={currentCell}
      currentRow={currentCell.row}
      />
      <ResultAlert isWin={isWin} isLose={isLose} remainingRows={remainingRows} mainKelime={mainKelime}/>
      <table className="kelime-tablosu letter-wrapper" id="kelimeTable">
        <tbody>
          {table.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <td key={colIdx}>
                  <input
                  className="letter-cell"
                    type="text"
                    maxLength={1}
                    value={cell}
                    readOnly
                    onFocus={() => setCurrentCell({ row: rowIdx, col: colIdx })}
                    style={{
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