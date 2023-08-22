export const TETROMINOS = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "#00FFFF" // Cyan
  },
  J: {
    shape: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
    color: "#0000FF" // Blue
  },
  L: {
    shape: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
    color: "#FFA500" // Orange
  },
  O: {
    shape: [
      [4, 4],
      [4, 4],
    ],
    color: "#FFFF00" // Yellow
  },
  S: {
    shape: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
    color: "#00FF00" // Green
  },
  T: {
    shape: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
    color: "#800080" // Purple
  },
  Z: {
    shape: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
    color: "#FF0000" // Red
  },
};


export const randomTetromino = () => {
  const tetrominos = "IJLOSTZ";
  const randomTetromino =
    tetrominos[Math.floor(Math.random() * tetrominos.length)];
  return TETROMINOS[randomTetromino] || TETROMINOS["I"]; // Default to a known tetromino if undefined
};