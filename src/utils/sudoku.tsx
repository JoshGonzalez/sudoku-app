export type SudokuGrid = number[][];

export const generateEmptyGrid = () => {
    return Array.from({length: 9}, () => Array(9).fill(0));
}

function isValid(grid: SudokuGrid, row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
    const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
    const boxCol = 3 * Math.floor(col / 3) + i % 3;
    if (grid[boxRow][boxCol] === num) return false;
  }
  return true;
}


export function fillGrid(grid: SudokuGrid): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function removeCells(grid: SudokuGrid, count = 40): SudokuGrid {
  const puzzle = grid.map(row => [...row]);
  let removed = 0;
  while (removed < count) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }
  return puzzle;
}

export function isValidSudoku(board: number[][]): boolean {
  const seen = new Set<string>();

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const value = board[i][j];
      if (value === 0) return false; // incomplete

      const row = `row-${i}-${value}`;
      const col = `col-${j}-${value}`;
      const box = `box-${Math.floor(i / 3)}-${Math.floor(j / 3)}-${value}`;

      if (seen.has(row) || seen.has(col) || seen.has(box)) {
        return false;
      }

      seen.add(row);
      seen.add(col);
      seen.add(box);
    }
  }

  return true;
}