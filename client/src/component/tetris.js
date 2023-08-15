import React, { useState, useEffect } from 'react';
import '../css/tetris.css';

const BLOCKS = {
  square: [
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]],
      [[0, 0], [0, 1], [1, 0], [1, 1]],
  ],
  bar: [
      [[1, 0], [2, 0], [3, 0], [4, 0]],
      [[2, -1], [2, 0], [2, 1], [2, 2]],
      [[1, 0], [2, 0], [3, 0], [4, 0]],
      [[2, -1], [2, 0], [2, 1], [2, 2]],
  ],
  tree: [
      [[1, 0], [0, 1], [1, 1], [2, 1]],
      [[1, 0], [0, 1], [1, 1], [1, 2]],
      [[2, 1], [0, 1], [1, 1], [1, 2]],
      [[2, 1], [1, 2], [1, 1], [1, 0]],
  ],
  zee: [
      [[0, 0], [1, 0], [1, 1], [2, 1]],
      [[0, 1], [1, 0], [1, 1], [0, 2]],
      [[0, 1], [1, 1], [1, 2], [2, 2]],
      [[2, 0], [2, 1], [1, 1], [1, 2]],
  ],
  elLeft: [
      [[0, 0], [0, 1], [1, 1], [2, 1]],
      [[1, 0], [1, 1], [1, 2], [0, 2]],
      [[0, 1], [1, 1], [2, 1], [2, 2]],
      [[1, 0], [2, 0], [1, 1], [1, 2]],
  ],
  elRight: [
      [[1, 0], [2, 0], [1, 1], [1, 2]],
      [[0, 0], [0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 0], [1, 1], [1, 2]],
      [[0, 1], [1, 1], [2, 1], [2, 2]],
  ],
}

const GAME_ROWS = 20;
const GAME_COLS = 10;
const BLOCK_SIZE = 30;

function Tetris() {

  const INITIAL_MOVING_ITEM = {
    type: '',
    direction: 3,
    top: 0,
    left: 0,
  };

  const [score, setScore] = useState(0);
  const [playground, setPlayground] = useState(Array.from({ length: GAME_ROWS }, () => Array(GAME_COLS).fill(0)));
  const [movingItem, setMovingItem] = useState(INITIAL_MOVING_ITEM);
  const [downInterval, setDownInterval] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);


  useEffect(() => {
    init();
  }, []);

useEffect(() => {
    if (movingItem.type !== '') {
      renderBlocks(); // Call the rendering logic directly here
    }
  });
  

  function init() {
    setPlayground(Array.from({ length: GAME_ROWS }, () => Array(GAME_COLS).fill(0)));
    generateNewBlock();
  }

  function renderBlocks() {
    const { type, direction, top, left } = movingItem;
  
    setPlayground(prevPlayground => {
      const newPlayground = prevPlayground.map(row => [...row]);
  
      BLOCKS[type][direction].forEach((block) => {
        const x = block[0] + left;
        const y = block[1] + top;
  
        if (y >= 0 && y < GAME_ROWS && x >= 0 && x < GAME_COLS) {
          newPlayground[y][x] = 1;
        } else {
          seizeBlock();
        }
      });
  
      return newPlayground;
    });
  
    setMovingItem(prev => ({
      ...prev,
      left,
      top,
      direction,
    }));
  }
  

  function generateNewBlock() {
    clearTimeout(timeoutId);
  
    const newDuration = 500;
  
    const newTimeout = setTimeout(() => {
      moveBlock('top', 1);
    }, newDuration);
  
    setTimeoutId(newTimeout);
  
    const blockArray = Object.keys(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    const randomBlockType = blockArray[randomIndex];
  
    setMovingItem({
      type: randomBlockType,
      top: 0,
      left: 3,
      direction: 0,
    });
  }
  
  
  function moveBlock(moveType, amount) {
    setMovingItem((prev) => ({
      ...prev,
      [moveType]: prev[moveType] + amount,
    }));
  }
  
  function seizeBlock() {
    clearTimeout(timeoutId); // clearTimeout 사용
    // Handle block collision and update the playground state
    // ...
    generateNewBlock();
  }

  return (
    <div className="wrapper">
      <div className="game-text">
        <span>게임종료</span>
        <button onClick={init}>다시시작</button>
      </div>
      <div className="score">{score}</div>
      <div className="playground">
        {playground.map((row, rowIndex) => (
          <div key={rowIndex} className="playground-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`playground-cell ${cell !== 0 ? 'seized' : ''}`}
                style={{
                  width: BLOCK_SIZE,
                  height: BLOCK_SIZE,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tetris;
