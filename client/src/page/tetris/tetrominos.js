export const TETROMINOS = {
  // Define tetromino shapes
  I: [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [2, 2, 2],
    [0, 0, 2],
    [0, 0, 0],
  ],
  T: [
    [0, 2, 0],
    [2, 2, 2],
    [0, 0, 0],
  ],
  O: [
    [4, 4],
    [4, 4],
  ],
  S: [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0],
  ],
  Z: [
    [6, 6, 0],
    [0, 6, 6],
    [0, 0, 0],
  ],
};

export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randomTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  const generatedTetromino = TETROMINOS[randomTetromino];
  console.log("Generated Tetromino:", generatedTetromino);
  return generatedTetromino;
};

export default TETROMINOS;