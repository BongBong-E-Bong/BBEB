export const TETROMINOS = {
  // Define tetromino shapes
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  J: [
    [0, 0, 0],
    [2, 2, 2],
    [0, 0, 2],
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
  return TETROMINOS[randomTetromino] || TETROMINOS["I"]; // Default to a known tetromino if undefined
};