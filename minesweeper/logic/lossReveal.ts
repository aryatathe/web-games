export const lossReveal = (
  mineGrid: number[][],
  viewGrid: number[][],
  x: number,
  y: number,
  row: number,
  col: number
): number[][] => {
  for (let i: number = 0; i < row; i++) {
    for (let j: number = 0; j < col; j++) {
      if (mineGrid[i][j] === -1) viewGrid[i][j] = 1;
    }
  }
  return viewGrid;
};
