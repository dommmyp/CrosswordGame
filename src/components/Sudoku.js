import { useState, useEffect } from "react";

const Sudoku = () => {
  const [sudokuSolution, setSudokuSolution] = useState(null);
  const [userSolution, setUserSolution] = useState(null);

  useEffect(() => {
    getSudokuAPI();
  }, []);

  const getSudokuAPI = async () => {
    const response = await fetch(
      "https://sugoku.onrender.com/board?difficulty=easy"
    );
    const jsonData = await response.json();
    setSudokuSolution(jsonData.board);
  };

  return (
    <div>
      <div className="sudoku">
        <h2>Sike u thought</h2>
        {sudokuSolution && (
          <div className="grid">
            {sudokuSolution.map((row, i) => {
              return (
                <div key={i} className={"sudokuGridRow"}>
                  {row.map((item, j) => {
                    return (
                      <div
                        style={{
                          background:
                            item == 0 ? "rgb(171,194,184)" : "rgb(48,48,48)",
                          color:
                            item == 0 ? "rgb(48,48,48)" : "rgb(171,193,184)",
                        }}
                        key={j}
                        className="sudokuGridItem"
                      >
                        {item != 0 ? item : ""}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sudoku;
