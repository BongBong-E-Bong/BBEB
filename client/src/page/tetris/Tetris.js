import React, { useState, useEffect } from "react";
import "./Tetris.css";
import { TETROMINOS, randomTetromino } from "./tetrominos";

const Tetris = () => {
  const [currentTetromino, setCurrentTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: 4, y: 0 });
  const [grid, setGrid] = useState(
    Array.from({ length: 20 }, () => Array(10).fill(0))
  );

  const moveDown = () => {
    const newY = position.y + 1;

    if (!checkCollision(currentTetromino.shape, position.x, newY, grid)) {
      setPosition((prevPosition) => ({ ...prevPosition, y: newY }));
    } else {
      // 블록이 바닥에 닿았을 때
      updateGrid(currentTetromino.shape, position.x, position.y, grid);
      setCurrentTetromino(randomTetromino());
      setPosition({ x: 4, y: 0 });
    }
  };

  const checkCollision = (tetromino, x, y, grid) => {
    for (let row = 0; row < tetromino.length; row++) {
      for (let col = 0; col < tetromino[row].length; col++) {
        if (tetromino[row][col] !== 0) {
          const newY = y + row;
          const newX = x + col;
          if (
            newY >= grid.length ||
            newX < 0 ||
            newX >= grid[0].length ||
            (grid[newY] && grid[newY][newX] !== 0)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const updateGrid = (tetromino, x, y, grid) => {
    const newGrid = grid.map((row) => [...row]);

    for (let row = 0; row < tetromino.length; row++) {
      for (let col = 0; col < tetromino[row].length; col++) {
        if (tetromino[row][col] !== 0) {
          const newY = y + row;
          const newX = x + col;
          newGrid[newY][newX] = tetromino[row][col];
        }
      }
    }

    setGrid(newGrid); // 그리드를 업데이트합니다.
  };

  useEffect(() => {
    const timer = setInterval(moveDown, 1000);
    return () => clearInterval(timer);
  }, [position.y]); // position.y가 변할 때마다 타이머 리셋

  return (
    <div className="tetris">
      <div className="playground">
        {grid.map((row, y) => (
          <div key={y} className="row">
            {row.map((cellValue, x) => {
              const tetrominoRow = y - position.y;
              const tetrominoCol = x - position.x;
              const cellTetromino =
                currentTetromino &&
                currentTetromino.shape[tetrominoRow] &&
                currentTetromino.shape[tetrominoRow][tetrominoCol];

              return (
                <div
                  key={x}
                  className={`cell ${cellValue !== 0 || cellTetromino ? "tetromino" : ""}`}
                  style={{
                    backgroundColor: cellTetromino
                      ? currentTetromino.color
                      : "transparent",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tetris;
