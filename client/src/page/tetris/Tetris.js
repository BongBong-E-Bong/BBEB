import React, { useState, useEffect } from 'react';
import './Tetris.css';
import { TETROMINOS, randomTetromino } from './tetrominos';

const Tetris = () => {
  const [tetromino, setTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveDown = () => {
    setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 1 }));
  };

  useEffect(() => {
    const timer = setInterval(moveDown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="tetris">
      <div className="playground">
        {Array.from({ length: 20 }).map((_, y) => (
          <div key={y} className="row">
            {Array.from({ length: 10 }).map((_, x) => {
              const tetrominoShape = tetromino && tetromino.shape;
              const offsetY = y - position.y;
              const offsetX = x - position.x;
              const isTetrominoCell =
                tetrominoShape &&
                tetrominoShape[offsetY] &&
                tetrominoShape[offsetY][offsetX];
              return (
                <div
                  key={x}
                  className={`cell ${isTetrominoCell ? "tetromino" : ""}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
