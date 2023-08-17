import React from "react";
import Cell from "./Cell";
import Display from "./Display";
import Stage from "./Stage";
import StartButton from "./StartButton";

// Component

const Tetris = () => {
  return (
    <div>
      Tetris 페이지 입니다.
      <Cell />
      <Display />
      <Stage />
      <StartButton />
    </div>
  );
};

export default Tetris;
