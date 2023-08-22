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

  const [score, setScore] = useState(0); // 스코어 상태 추가

   // 빠른 내려가기 모드인 경우 100ms, 일반 모드인 경우 1000ms

  const [isFastDrop, setIsFastDrop] = useState(false);

  const moveDownInterval = isFastDrop ? 10 : 1000;
  
  const handleKeyPress = (event) => {
    if (event.key === "ArrowLeft") {
      moveLeft();
    } else if (event.key === "ArrowRight") {
      moveRight();
    } else if (event.key === "ArrowUp") {
      rotateTetromino();
    } else if (event.key === " ") { // 스페이스바 누를 경우
      setIsFastDrop((prevIsFastDrop) => !prevIsFastDrop); // 상태 토글
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
        setIsFastDrop(false); // 다음 블록이 나타났을 때 빠른 내려가기 모드 해제
      }
    } else if (newY > 18 || checkCollision(currentTetromino, position.x, newY + 1, grid)) {
      // 블럭이 더 이상 아래로 움직일 수 없으면 고정합니다.
      updateGrid(currentTetromino, position.x, newY, grid);
      setCurrentTetromino(randomTetromino());
      setPosition((prevPosition) => ({ ...prevPosition, y: 0 }));
      setIsFastDrop(false); // 다음 블록이 나타났을 때 빠른 내려가기 모드 해제
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
        }
      }
    }
  
    // 채워진 줄 삭제 및 스코어 증가
    let linesCleared = 0;
    for (let row = newGrid.length - 1; row >= 0; row--) {
      if (newGrid[row].every((cell) => cell !== 0)) {
        newGrid.splice(row, 1);
        newGrid.unshift(Array(10).fill(0));
        linesCleared++;
      }
    }

    if (linesCleared > 0) {
      setScore((prevScore) => prevScore + linesCleared); // 스코어 증가
    }

    setGrid(newGrid);
  };

  useEffect(() => {
    const timer = setInterval(moveDown, isFastDrop ? moveDownInterval / 2 : moveDownInterval);
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