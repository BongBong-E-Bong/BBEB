import React, { useState } from 'react';
import './Tetris.css';
import { TETROMINOS, randomTetromino } from './tetrominos';

const Tetris = () => {
  const [tetromino, setTetromino] = useState(randomTetromino());

  return (
    <div className="tetris">
      <div className="playground">
        {Array.from({ length: 20 }).map((_, y) => (
          <div key={y} className="row">
            {Array.from({ length: 10 }).map((_, x) => {
              const cellValue = tetromino[y] && tetromino[y][x];
              return (
                <div
                  key={x}
                  className={`cell ${cellValue ? 'tetromino' : ''}`}
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
