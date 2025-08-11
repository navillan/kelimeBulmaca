import useRandomKelime from "../hooks/useGetKelime.js";
import { useState } from "react";
import Klavye from "./klavye.js";



const KelimeTablosu = () => {
  const ROWS = 7;
  const COLS = 5;
  const { mainKelime } = useRandomKelime();
  const [tahminKelime, setTahminKelime] = useState([]);
  const [table, setTable] = useState(
    Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  );
  const [currentCell, setCurrentCell] = useState({ row: 0, col: 0 });  
  console.log("Kelime:", mainKelime[Math.floor(Math.random() * (mainKelime.length))]);
  

  
  const handleKeyboardInput = (key) => {
    let { row, col } = currentCell;
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
      }
    } else if (key === "ENTER") {
      if (row < ROWS - 1) {
        setCurrentCell({ row: row + 1, col: 0 });
        console.log(tahminKelime);
        
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
                    onFocus={() => setCurrentCell({ row: rowIdx, col: colIdx })}
                    //Burası bir garip onchange
                    onChange={e =>
                      handleInputChange(
                        rowIdx,
                        colIdx,
                        e.target.value.replace(/[^a-zA-ZğüşöçıİĞÜŞÖÇ]/, "")                                             
                      )
                    }
                    style={{
                      width: "2em",
                      height: "2em",
                      fontSize: "1.5em",
                      textAlign: "center",
                      textTransform: "uppercase",
                      background:
                        currentCell.row === rowIdx && currentCell.col === colIdx
                          ? "#e0e0e0"
                          : undefined,
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Klavye onKeyPress={handleKeyboardInput} />
    </div>
  );
};

export default KelimeTablosu;