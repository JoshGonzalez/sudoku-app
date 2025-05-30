import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { generateEmptyGrid, removeCells, fillGrid, isValidSudoku } from '../utils/sudoku';

export default function SudokuGrid() {
    const [puzzle, setPuzzle] = useState<number[][]>([]);

  useEffect(() => {
    const grid = generateEmptyGrid();
    fillGrid(grid);
    console.log(grid)
    const puzzleWithBlanks = removeCells(grid, 40);
    console.log(puzzleWithBlanks);
    setPuzzle(puzzleWithBlanks);
  }, []);

    const updateCell = (row: number, col: number, value: string) => {
    const num = parseInt(value) || 0;
    const newGrid = [...puzzle];
    newGrid[row][col] = num;
    setPuzzle(newGrid);
  };

    const handleCheckPuzzle = () => {
    console.log("Button Pressed")
    if (isValidSudoku(puzzle)) {
      window.alert("Puzzle is correctly filled!");
    } else {
      window.alert("Puzzle is invalid or incomplete.");
    }
    console.log(isValidSudoku(puzzle))
  };



    
  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {puzzle.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <View style={styles.cell} key={`${rowIndex}-${colIndex}`}>
              {value === 0 ? (
                <TextInput 
                keyboardType="number-pad"
                maxLength={1}
                style={styles.input}
                onChangeText={(text) => {
                // Remove any non-digit characters
                const filtered = text.replace(/[^0-9]/g, '');
                updateCell(rowIndex, colIndex, filtered);
  }}
  value={puzzle[rowIndex][colIndex] === 0 ? '' : String(puzzle[rowIndex][colIndex])}
                />
              ) : (
                <Text style={styles.text}>{value}</Text>
              )}
            </View>
          ))
        )}
      </View>
      <Button title="Check Puzzle" onPress={handleCheckPuzzle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    margin:16,
    shadowColor: 'blue',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
  board: {
    width: 360,
    height: 360,
    flexDirection: 'row',
    flexWrap: 'wrap',
    left: 15,
    top: 10
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 35,
    height: 35,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    margin: 1,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
  },
  text: {
    fontSize: 18,
    color: 'black'
  },
});
