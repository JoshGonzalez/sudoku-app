import React, { useState } from 'react';
import { SafeAreaView, Button } from 'react-native';
import { View, TextInput, StyleSheet } from 'react-native';
import SudokuGrid from './components/SudokuGrid';
import { generateEmptyGrid } from './utils/sudoku';

export default function App() {
  const [board, setBoard] = useState(generateEmptyGrid());

  const updateCell = (row: number, col: number, value: number | null) => {
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = value;
    setBoard(newBoard);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.centeredBox}>
          <SudokuGrid/>
          <Button title="Reset" onPress={() => setBoard(generateEmptyGrid())} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    left: 550,
  },
  centeredBox: {
    alignContent: "center",
    width: 800,
    height: 600,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  }
});
