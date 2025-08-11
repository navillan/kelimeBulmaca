

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
      }
    } else if (key === "ENTER") {
      if (row < ROWS - 1) {
        setCurrentCell({ row: row + 1, col: 0 });
      }
    } else if (/^[A-ZĞÜŞİÖÇ]$/i.test(key)) {
      if (col < COLS) {
        const updatedTable = table.map((rArr, rIdx) =>
          rArr.map((cell, cIdx) =>
            rIdx === row && cIdx === col ? key.toUpperCase() : cell
          )
        );
        setTable(updatedTable);
        if (col < COLS - 1) {
          setCurrentCell({ row, col: col + 1 });
        }
      }
    }
  };