import { createSlice } from '@reduxjs/toolkit'

const Rows = 16
const Columns = 16

const Bombs = Math.random() * 0.2 * Rows * Columns

for (let i = 0; i < Bombs; i++) {
  const row = Math.floor(Math.random() * Rows)
  const column = Math.floor(Math.random() * Columns)
  const index = row * Columns + column
}

const board = []

for (let x=0; x<Rows; x++) {
  const row = []
  for (let y=0; y<Columns; y++) {
    const tile = {
      x,
      y,
      isBomb: Math.random() < 0.2 ? true : false,
      isRevealed: false,
      isFlagged: false,
      adjacentBombs: 0,
    }
    row.push(tile)
  }
  board.push(row)
}

export const initialState = {
  FieldValues: {
    board: board,
    isGameOver: false,
    isGameWon: false,
  }
}

export type FieldValues = typeof initialState.FieldValues

export const ArraySlice = createSlice({
  name: 'MineSweeper',
  initialState: initialState,
  reducers: {
    setUpField: (state, action) => {
    },
  },
})

export const { setUpField } = ArraySlice.actions

export default ArraySlice.reducer
