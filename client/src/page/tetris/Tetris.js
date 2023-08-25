import React, { useState, useEffect } from "react";
import "./Tetris.css";
import { TETROMINOS, randomTetromino } from "./tetrominos";
import register from "../../image/register.png";
import Stack from "@mui/material/Stack";

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
    const newY = position.y + 1;

    if (checkCollision(currentTetromino, position.x, newY, grid)) {
      if (position.y === 0) {
        console.log("게임 오버!");
        setGameOver(true);
      } else {
        updateGrid(currentTetromino, position.x, position.y, grid);
        setCurrentTetromino(randomTetromino());
        setPosition((prevPosition) => ({ ...prevPosition, y: 0 }));
        setIsFastDrop(false);
      }
    } else if (
      newY > 18 ||
      checkCollision(currentTetromino, position.x, newY + 1, grid)
    ) {
      updateGrid(currentTetromino, position.x, newY, grid);
      setCurrentTetromino(randomTetromino());
      setPosition((prevPosition) => ({ ...prevPosition, y: 0 }));
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

  const topScores = [
    {
      rank: 1,
      player: "Player1",
      score: 1500,
      photo: require("../../image/register.png").default,
    },
    {
      rank: 2,
      player: "Player2",
      score: 1200, 
      photo: require("../../image/register.png").default,
    },
    {
      rank: 3,
      player: "Player3",
      score: 900,
      photo: require("../../image/register.png").default,
    },
  ];
  
  return (
    <Stack>
      <Stack
        width="21%"
        height="10%"
        marginLeft="15%"
        marginTop="6%"
        justifyContent="center"
        alignItems="center"
        style={{ cursor: "pointer" }}
        direction="row"
      >
        <img src={register} alt="register" width="30%" height="400%" />
        <Stack
          width="100%"
          height="100%"
          style={{ fontSize: "40px" }}
          alignItems="center"
          justifyContent="center"
          underline="none"
          marginLeft="-20%"
          marginTop="11%"
        >
          MINI GAME
        </Stack>
      </Stack>
      <Stack className="tetris" direction="row">
        <div className="top-scores">
          <ul style={{ listStyle: "none" }}>
            {topScores.map((score) => (
              <li key={score.rank} style={{ listStyleType: "none" }}>
                <span style={{ color: "black" }}>
                  {score.rank}
                  <img
                    src={score.photo}
                    alt={`${score.player}'s photo`}
                    width="30%"
                    height="400%"
                  />
                  {score.player} {score.score}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className={`playground ${gameOver ? "game-over" : ""}`}>
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
        <Stack className="score-container">
          <div className="score">
            <p>Score: {score}</p>
          </div>
        </Stack>
        {gameOver && (
          <Stack className="game-over">
            <h1>Game over</h1>
            <button className="restart-button" onClick={restartGame}>
              Replay
            </button>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Tetris;
