import React, { useState, useEffect } from 'react';
import './Tetris.css';
import { TETROMINOS, randomTetromino } from './tetrominos';

const Tetris = () => {
  const [tetromino, setTetromino] = useState(randomTetromino());
  const [position, setPosition] = useState({ x: 4, y: 0 });


  const moveDown = () => {
    setPosition((prevPosition) => ({ ...prevPosition, y: prevPosition.y + 1 }));
  };

  const moveLeft = () => {
    setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x - 1 }));
  };

  const moveRight = () => {
    setPosition((prevPosition) => ({ ...prevPosition, x: prevPosition.x + 1 }));
  };

  useEffect(() => {
    const timer = setInterval(moveDown, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleKeyDown = (event) => {
    if (event.keyCode === 37) { // Left Arrow
      moveLeft();
    } else if (event.keyCode === 39) { // Right Arrow
      moveRight();
    }
  };

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
                  className={`cell ${isTetrominoCell ? 'tetromino' : ''}`}
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
