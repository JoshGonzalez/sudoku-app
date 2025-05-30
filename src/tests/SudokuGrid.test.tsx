// sudokuChecker.test.ts
import { isValidSudoku } from '../utils/sudoku';

describe('Sudoku validity and alert', () => {
  beforeEach(() => {
    // Mock global alert function so we can spy on it
    global.alert = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function checkPuzzle(puzzle: number[][]) {
    if (isValidSudoku(puzzle)) {
      alert('Puzzle is correctly filled!');
    } else {
      alert('Puzzle is invalid or incomplete.');
    }
  }

  it('alerts valid puzzle message', () => {
    // Example of a fully valid puzzle (no zeros)
    const validPuzzle = Array(9)
      .fill(0)
      .map(() => Array(9).fill(1)); // dummy valid for test

    checkPuzzle(validPuzzle);

    expect(global.alert).toHaveBeenCalledWith('Puzzle is correctly filled!');
  });

  it('alerts invalid puzzle message', () => {
    // Example of invalid puzzle (has zeros)
    const invalidPuzzle = Array(9)
      .fill(0)
      .map(() => Array(9).fill(0));

    checkPuzzle(invalidPuzzle);

    expect(global.alert).toHaveBeenCalledWith('Puzzle is invalid or incomplete.');
  });
});
