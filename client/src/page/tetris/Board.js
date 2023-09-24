import React from "react";

const Board = ({ board }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`cell ${cell ? "occupied" : ""}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
