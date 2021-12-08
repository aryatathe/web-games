const recurse = (
  mineGrid: number[][],
  viewGrid: number[][],
  i: number,
  j: number,
  row: number,
  col: number,
  count: number
): number => {
  viewGrid[i][j] = 1;
  count++;
  if (mineGrid[i][j] != 0) return count;
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
      if (viewGrid[x][y] === 0)
        count += recurse(mineGrid, viewGrid, x, y, row, col, 0);
    }
  }
  return count;
};

export const clicked = (
  mineGrid: number[][],
  viewGrid: number[][],
  x: number,
  y: number,
  row: number,
  col: number
): [number[][], number] => {
  let count: number = recurse(mineGrid, viewGrid, x, y, row, col, 0);
  console.log(count);
  return [viewGrid, count];
};
