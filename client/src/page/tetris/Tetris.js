import React, { useState, useEffect, useRef } from "react";
import "./Tetris.css";
import BLOCKS from "./Blocks";

const Tetris = () => {
  const GAME_ROWS = 20;
  const GAME_COLS = 10;

  const playgroundRef = useRef(null);
  const gameTextRef = useRef(null);
  const scoreDisplayRef = useRef(null);

  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(500);
  const [downInterval, setDownInterval] = useState(null);
  const [movingItem, setMovingItem] = useState({
    type: "",
    direction: 3,
    top: 0,
    left: 0,
  });

  useEffect(() => {
    init();
    const handleKeyDown = (e) => {
      switch (e.keyCode) {
        case 39:
          moveBlock("left", 1);
          break;
        case 37:
          moveBlock("left", -1);
          break;
        case 40:
          moveBlock("top", 1);
          break;
        case 38:
          changeDirection();
          break;
        case 32:
          //스페이스바
          dropBlock();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(downInterval);
    };
  }, []);

  const init = () => {
    for (let i = 0; i < GAME_ROWS; i++) {
      prependNewLine();
    }
    setDuration(500);;
    generateNewBlock();
  };

  const prependNewLine = () => {
    const li = document.createElement("li");
    const ul = document.createElement("ul");
    for (let j = 0; j < GAME_COLS; j++) {
      const matrix = document.createElement("li");
      ul.prepend(matrix);
    }
    li.prepend(ul);
    playgroundRef.current.prepend(li);
  };

  const getCellClassName = (rowIndex, colIndex) => {
    const cell = playgroundRef.current.childNodes[rowIndex]?.childNodes[0]?.childNodes[colIndex];
    
    if (cell) {
      if (cell.classList.contains("seized")) {
        return "cell seized";
      } else if (cell.classList.contains("moving")) {
        return "cell moving";
      } else {
        return "cell";
      }
    }
    
    return "cell";
  };
  

  const renderBlocks = (moveType = "") => {
    const { type, direction, top, left } = movingItem;
    const movingBlocks = playgroundRef.current.querySelectorAll(".moving");
    movingBlocks.forEach((moving) => {
      moving.classList.remove(type, "moving");
    });
    if (BLOCKS[type] && BLOCKS[type][direction]) {
      BLOCKS[type][direction].some((block) => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target =
          playgroundRef.current.childNodes[y]?.childNodes[0]?.childNodes[x] ||
          null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
          target.classList.add(type, "moving");
        } else {
          if (moveType === "retry") {
            clearInterval(downInterval);
            showGameoverText();
          }
          setTimeout(() => {
            renderBlocks("retry");
            if (moveType === "top") {
              seizeBlock();
            }
          }, 0);
          return true;
        }
      });
      setMovingItem((prevMovingItem) => ({
        ...prevMovingItem,
        left,
        top,
        direction,
      }));
    }
  };

function seizeBlock() {
  const movingBlocks = playgroundRef.current.querySelectorAll(".moving");
  movingBlocks.forEach((moving) => {
    moving.classList.remove("moving");
    moving.classList.add("seized");
  });
  checkMatch();
}

function checkMatch() {
  const childNodes = playgroundRef.current.childNodes;
  childNodes.forEach((child) => {
    let matched = true;
    child?.children[0]?.childNodes.forEach((li) => {
      if (!li.classList.contains("seized")) {
        matched = false;
      }
    });
    if (matched) {
      child.remove();
      prependNewLine();
      setScore((prevScore) => prevScore + 1);
    }
  });
  generateNewBlock();
}

function generateNewBlock() {
  clearInterval(downInterval);
  setDownInterval(
    setInterval(() => {
      moveBlock("top", 1);
    }, duration)
  );
  const blockArray = Object.keys(BLOCKS);
  const randomIndex = Math.floor(Math.random() * blockArray.length);
  const randomType = blockArray[randomIndex];
  const newMovingItem = {
    type: randomType,
    direction: 0,
    top: 0,
    left:
      Math.floor(GAME_COLS / 2) -
      Math.floor(BLOCKS[randomType][0][0].length / 2),
  };

  setMovingItem(newMovingItem);
  renderBlocks();
}

function checkEmpty(target) {
  if (!target || target.classList.contains("seized")) {
    return false;
  }
  return true;
}

function moveBlock(moveType, amount) {
  setMovingItem((prevMovingItem) => ({
    ...prevMovingItem,
    [moveType]: prevMovingItem[moveType] + amount,
  }));
}

function changeDirection() {
  setMovingItem((prevMovingItem) => ({
    ...prevMovingItem,
    direction: prevMovingItem.direction === 3 ? 0 : prevMovingItem.direction + 1,
  }));
}

function dropBlock() {
  clearInterval(downInterval);
  setDownInterval(
    setInterval(() => {
      moveBlock("top", 1);
    }, 10)
  );
}

function showGameoverText() {
  const gameText = document.querySelector(".game-text");
  gameText.style.display = "flex";
}

const handleRestart = () => {
  playgroundRef.current.innerHTML = "";
  gameTextRef.current.style.display = "none";
  setScore(0);
  scoreDisplayRef.current.innerText = score;
  setDuration(500); // Reset duration when restarting
  init();
};


  return (
    <div className="wrapper">
      <div className="game-text" ref={gameTextRef}>
        <span>게임종료</span>
        <button onClick={handleRestart}>다시시작</button>
      </div>
      <div className="score" ref={scoreDisplayRef}>
        {score}
      </div>
      <div className="playground" ref={playgroundRef}>
        {Array.from({ length: GAME_ROWS }).map((_, rowIndex) => (
          <ul key={rowIndex}>
            {Array.from({ length: GAME_COLS }).map((_, colIndex) => (
              <li
                key={colIndex}
                className={getCellClassName(rowIndex, colIndex)}
              ></li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};
export default Tetris;
