import React, { useState, useEffect } from 'react';
import './css/style.css';

// 블럭 설정해주기
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

function Tetris() {
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(500);
  const [movingItem, setMovingItem] = useState({
    type: '',
    direction: 3,
    top: 0,
    left: 0,
  });
  const [tempMovingItem, setTempMovingItem] = useState({ ...movingItem });

  useEffect(() => {
    init();
  }, []);

  function init() {
    setTempMovingItem({ ...movingItem });
    tempMovingItem = { ...movingItem };
    for (let i = 0; i < GAME_ROWS; i++) {
      prependNewLine();
    }
    generateNewBlock();
  }

  function prependNewLine() {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < GAME_COLS; j++) {
      const matrix = document.createElement("li");
      ul.prepend(matrix);
    }
    li.prepend(ul);
    playground.prepend(li);
  }

  function renderBlocks(moveType = '') {
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving")
    movingBlocks.forEach(moving => {
      moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block => {
      const x = block[0] + left;
      const y = block[1] + top;
      const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
      const isAvailable = checkEmpty(target);
      if (isAvailable) {
        target.classList.add(type, "moving")
      } else {
        tempMovingItem = { ...movingItem }
        if (moveType === 'retry') {
          clearInterval(downInterval)
          showGameoverText()
        }
        setTimeout(() => {
          renderBlocks('retry');
          if (moveType === "top") {
            seizeBlock();
          }
        }, 0)
        return true;
      }
    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
  }

  //맨 밑에서 더 이상 갈 곳이 없을때 처리할 코드
  function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving")
    movingBlocks.forEach(moving => {
      moving.classList.remove("moving");
      moving.classList.add("seized");
    })
    checkMatch()
  }
  function checkMatch() {
    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
      let matched = true;
      child.children[0].childNodes.forEach(li => {
        if (!li.classList.contains("seized")) {
          matched = false;
        }
      })
      if (matched) {
        child.remove();
        prependNewLine();
        score++;
        scoreDisplay.innerText = score;
      }
    })
    generateNewBlock()
  }
  //새로운 아이템 생기게 해줌
  function generateNewBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
      moveBlock('top', 1)
    }, duration)
    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length)
    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = { ...movingItem };
    renderBlocks()
  }

  function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
      return false;
    }
    return true;
  }
  function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType)
  }
  function chageDirection() {
    const direction = tempMovingItem.direction;
    const newDirection = direction === 3 ? 0 : direction + 1;
    setTempMovingItem({
      ...tempMovingItem,
      direction: newDirection,
    });
    renderBlocks();
  }

  //스페이스바 눌렀을 때 처리
  function dropBlock() {
    clearInterval(downInterval)
    downInterval = setInterval(() => {
      moveBlock("top", 1)
    }, 10)
  }

  function showGameoverText() {
    gameText.style.display = "flex"
  }

  // 방향키로 top와 left 조정
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 39:
          moveBlock('left', 1);
          break;
        case 37:
          moveBlock('left', -1);
          break;
        case 40:
          moveBlock('top', 1);
          break;
        case 38:
          chageDirection();
          break;
        case 32:
          dropBlock();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="game-text">
        <span>게임종료</span>
        <button onClick={init}>다시시작</button>
      </div>
      <div className="score">{score}</div>
      <div className="playground">
        <ul>{/* ... 플레이그라운드 내용 ... */}</ul>
      </div>
    </div>
  );
}

export default Tetris;
