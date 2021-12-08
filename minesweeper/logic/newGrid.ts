export const newMineGrid = (
  row: number,
  col: number,
  mines: number
): number[][] => {
  let grid: number[][] = [];
  for (let i: number = 0; i < row; i++) {
    grid[i] = [];
    for (let j: number = 0; j < col; j++) {
      grid[i][j] = 0;
    }
  }
  while (mines) {
    let i: number = Math.floor(Math.random() * row);
    let j: number = Math.floor(Math.random() * col);

    if (grid[i][j] !== -1) {
      grid[i][j] = -1;
      mines--;
      for (
        let x: number = i > 0 ? i - 1 : i;
        x <= (i == row - 1 ? i : i + 1);
        x++
      ) {
        for (
          let y: number = j > 0 ? j - 1 : j;
          y <= (j == col - 1 ? j : j + 1);
          y++
        ) {
          if (grid[x][y] !== -1) grid[x][y]++;
        }
      }
    }
  }
  return grid;
};

export const newViewGrid = (row: number, col: number): number[][] => {
  let grid: number[][] = [];
  for (let i: number = 0; i < row; i++) {
    grid[i] = [];
    for (let j: number = 0; j < col; j++) {
      grid[i][j] = 0;
    }
  }
  return grid;
};
