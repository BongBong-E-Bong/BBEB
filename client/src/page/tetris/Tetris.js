import React, { useState, useEffect } from "react";
import "./Tetris.css";
import { TETROMINOS, randomTetromino } from "./tetrominos";

const Tetris = () => {
  const [currentTetromino, setCurrentTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: 4, y: 0 });
  const [grid, setGrid] = useState(
    Array.from({ length: 20 }, () => Array(10).fill(0))
  );
  const [gameOver, setGameOver] = useState(false);


  const handleKeyPress = (event) => {
    if (event.key === "ArrowLeft") {
      moveLeft();
    } else if (event.key === "ArrowRight") {
      moveRight();
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
    const newY = position.y + 1;
  
    if (checkCollision(currentTetromino, position.x, newY, grid)) {
      if (position.y === 0) {
        console.log("게임 오버!");
        setGameOver(true);
      } else {
        // 현재 블럭을 고정하고 새로운 블럭을 생성합니다.
        updateGrid(currentTetromino, position.x, position.y, grid);
        setCurrentTetromino(randomTetromino());
        setPosition((prevPosition) => ({ ...prevPosition, y: 0 }));
      }
    } else if (newY > 18 || checkCollision(currentTetromino, position.x, newY + 1, grid)) {
      // 블럭이 더 이상 아래로 움직일 수 없으면 고정합니다.
      updateGrid(currentTetromino, position.x, newY, grid);
      setCurrentTetromino(randomTetromino());
      setPosition((prevPosition) => ({ ...prevPosition, y: 0 }));
    } else {
      // 블럭을 아래로 이동시킵니다.
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
  
          // Check if the tetromino has reached the top of the grid
          if (newY <= 0) {
            // Set the entire row to 0 when tetromino reaches the top
            newGrid[newY].fill(0);
            setGameOver(true);
            return;
          }
        }
      }
    }
  
    setGrid(newGrid);
  };
  

  const moveDownInterval = 10; // 1초 (밀리초 단위)
  useEffect(() => {
    const timer = setInterval(moveDown, moveDownInterval);
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentTetromino, position.x, position.y]);

  const restartGame = () => {
    setGrid(Array.from({ length: 20 }, () => Array(10).fill(0)));
    setCurrentTetromino(randomTetromino());
    setPosition({ x: 4, y: 0 });
    setGameOver(false);
  };
  
// ... (이전 코드 생략)

return (
  <div className="tetris">
    <div className={`playground ${gameOver ? 'game-over' : ''}`}>
      {grid.map((row, y) => (
        <div key={y} className="row">
          {row.map((cellValue, x) => {
            const tetrominoRow = y - position.y;
            const tetrominoCol = x - position.x;

            const isTetrominoCell =
              tetrominoRow >= 0 &&
              tetrominoRow < currentTetromino.length &&
              tetrominoCol >= 0 &&
              tetrominoCol < currentTetromino[tetrominoRow].length;

            const cellTetromino =
              isTetrominoCell &&
              currentTetromino[tetrominoRow][tetrominoCol];

            // Set cells above the visible grid as empty cells
            if (tetrominoRow < 0) {
              return (
                <div
                  key={x}
                  className={`cell ${cellValue !== 0 ? "tetromino" : ""}`}
                />
              );
            }

            return (
              <div
                key={x}
                className={`cell ${
                  cellValue !== 0 || cellTetromino ? "tetromino" : ""
                }`}
              />
            );
          })}
         </div>
      ))}
    </div>
    {gameOver && (
      <div className="game-over">
        <h1>게임 오버!</h1>
        <button className="restart-button" onClick={restartGame}>
          다시 시작
        </button>
      </div>
    )}
  </div>
);
};

export default Tetris;
