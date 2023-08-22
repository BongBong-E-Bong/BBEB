import React, { useState, useEffect } from "react";
import "./Tetris.css";
import { TETROMINOS, randomTetromino } from "./tetrominos";

const rotate = (matrix) => {
  const rotatedMatrix = matrix.map((_, index) =>
    matrix.map((column) => column[index])
  );
  return rotatedMatrix.reverse();
};

const Tetris = () => {
  const [currentTetromino, setCurrentTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: 4, y: 0 });
  const [grid, setGrid] = useState(
    Array.from({ length: 20 }, () => Array(10).fill(0))
  );
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isFastDrop, setIsFastDrop] = useState(false);
  const moveDownInterval = isFastDrop ? 10 : 1000;
  const handleKeyPress = (event) => {
    if (event.key === "ArrowLeft") {
      moveLeft();
    } else if (event.key === "ArrowRight") {
      moveRight();
    } else if (event.key === "ArrowUp") {
      rotateTetromino();
    } else if (event.key === " ") {
      // 스페이스바 누를 경우
      setIsFastDrop((prevIsFastDrop) => !prevIsFastDrop);
    }
  };

  const rotateTetromino = () => {
    const rotatedTetromino = rotate(currentTetromino);
    if (!checkCollision(rotatedTetromino, position.x, position.y, grid)) {
      setCurrentTetromino(rotatedTetromino);
    }
  };

  const moveLeft = () => {
    const newX = position.x - 1;
    if (!checkCollision(currentTetromino, newX, position.y, grid)) {
      setPosition((prevPosition) => ({ ...prevPosition, x: newX }));
    }
  };

  const moveRight = () => {
    const newX = position.x + 1;
    if (!checkCollision(currentTetromino, newX, position.y, grid)) {
      setPosition((prevPosition) => ({ ...prevPosition, x: newX }));
    }
  };

  const moveDown = () => {
    if (gameOver) {
      return; // 게임 오버 상태일 때는 블럭을 더 이상 내려가지 않음
    }

    const newY = position.y + 1;
  
 if (checkCollision(currentTetromino, position.x, newY, grid)) {
      updateGrid(currentTetromino, position.x, position.y, grid);
      setCurrentTetromino(randomTetromino());

      if (position.y === 0) {
        console.log("게임 오버!");
        setGameOver(true);
        return;
      }

      setPosition({ x: 4, y: 0 });
      setIsFastDrop(false);
    } else {
      setPosition((prevPosition) => ({ ...prevPosition, y: newY }));
    }
  };       
  
  const checkCollision = (tetromino, x, y, grid) => {
    for (let row = 0; row < tetromino.length; row++) {
      for (let col = 0; col < tetromino[row].length; col++) {
        const newY = y + row;
        const newX = x + col;

        if (
          newY >= grid.length ||
          newX < 0 ||
          newX >= grid[0].length ||
          (tetromino[row][col] !== 0 && grid[newY][newX] !== 0)
        ) {
          return true;
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

    let linesCleared = 0;
    
    for (let row = newGrid.length - 1; row >= 0; row--) {
      if (newGrid[row].every((cell) => cell !== 0)) {
        newGrid.splice(row, 1);
        newGrid.unshift(Array(10).fill(0));
        linesCleared++;
      }
    }

    if (linesCleared > 0) {
      setScore((prevScore) => prevScore + linesCleared);
    }

    setGrid(newGrid);
  };

  useEffect(() => {
    const timer = setInterval(
      moveDown,
      isFastDrop ? moveDownInterval / 2 : moveDownInterval
    );
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentTetromino, position.x, position.y, isFastDrop]);

  const restartGame = () => {
    setGrid(Array.from({ length: 20 }, () => Array(10).fill(0)));
    setCurrentTetromino(randomTetromino());
    setPosition({ x: 4, y: 0 });
    setGameOver(false);
  };

  const TETROMINOS_COLORS = {
    1: "#00FFFF", // I - 청록색
    2: "#0000FF", // J - 파란색
    3: "#FFA500", // L - 주황색
    4: "#FFFF00", // O - 노란색
    5: "#00FF00", // S - 초록색
    6: "#800080", // T - 보라색
    7: "#FF0000", // Z - 빨간색
  };

  return (
    <div className="tetris">
      <div className={`playground ${gameOver ? "game-over" : ""}`}>
        {grid.map((row, y) => (
          <div key={y} className="row">
            {row.map((cellValue, x) => {
              const tetrominoRow = y - position.y;
              const tetrominoCol = x - position.x;

              // Check if the cell is within the bounds of the tetromino matrix
              const isTetrominoCell =
                tetrominoRow >= 0 &&
                tetrominoRow < currentTetromino.length &&
                tetrominoCol >= 0 &&
                tetrominoCol < currentTetromino[tetrominoRow].length;

              const cellTetromino =
                isTetrominoCell &&
                currentTetromino[tetrominoRow][tetrominoCol] !== 0; // Check if the tetromino cell is not empty

              // Determine the color of the cell
              let cellColor = cellTetromino
                ? TETROMINOS_COLORS[currentTetromino[tetrominoRow][tetrominoCol]]
                : cellValue !== 0
                ? TETROMINOS_COLORS[cellValue] // Use the color of the corresponding tetromino
                : "#ffffff";

              // Set cells above the visible grid as empty cells
              if (tetrominoRow < 0 || cellValue === 0) {
                return (
                  <div
                    key={x}
                    className={`cell`}
                    style={{
                      backgroundColor: cellColor, // Set the background color based on cellColor
                      border: cellTetromino ? "0.5px solid #000" : "none" // Add a border for tetromino cells
                    }}
                  />
                );
              }

              // Add the cell itself
              return (
                <div
                  key={x}
                  className={`cell`}
                  style={{
                    backgroundColor: cellColor,
                    border: cellTetromino ? "0.5px solid #000" : "none"
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="score-container">
        <div className="score">
          <p>Score: {score}</p>
        </div>
      </div>
      {gameOver && (
        <div className="game-over">
          <h1>Game over</h1>
          <button className="restart-button" onClick={restartGame}>
            Replay
          </button>
        </div>
      )}
    </div>
  );
};

export default Tetris;
