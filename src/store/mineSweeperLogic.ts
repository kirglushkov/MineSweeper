import { createSlice } from '@reduxjs/toolkit'

const Rows = 16
const Columns = 16

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
    updateField: (state, action) => {
      return {
        ...state,
        FieldValues: state.FieldValues.map((row) => {
          return row.map((field) => {
            if (field.x === action.payload.x && field.y === action.payload.y) {
              return {
                ...field,
                isRevealed: true,
                isFlagged: action.payload.isFlagged,
              }
            }
            return field
          })
        }),
      }
    },
  },
})

export const { updateField } = ArraySlice.actions

export default ArraySlice.reducer
