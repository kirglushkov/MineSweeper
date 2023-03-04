import { createSlice } from '@reduxjs/toolkit'

const Rows = 16
const Columns = 16

const board = []

export let Bombs = 0

for (let x = 0; x < Rows; x++) {
  const row = []
  for (let y = 0; y < Columns; y++) {
    const tile = {
      x,
      y,
      isBomb: Math.random() < 0.2 ? true : false,
      isRevealed: false,
      isFlagged: false,
      value: 0,
      detonated: false,
    }
    if (Bombs > 39) {
      tile['isBomb'] = false
    }
    if (tile.isBomb) {
      Bombs++
    }

    row.push(tile)
  }
  board.push(row)
}

export const initialState = {
  FieldValues: board,
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
                isRevealed: action.payload.isRevealed,
                isFlagged: action.payload.isFlagged,
              }
            }
            return field
          })
        }),
      }
    },
    updateBomb: (state, action) => {
      return {
        ...state,
        FieldValues: state.FieldValues.map((row) => {
          return row.map((field) => {
            if (field.x === action.payload.x && field.y === action.payload.y) {
              return {
                ...field,
                isBomb: action.payload.isBomb,
              }
            }
            return field
          })
        }),
      }
    },
    updateValue: (state, action) => {
      return {
        ...state,
        FieldValues: state.FieldValues.map((row) => {
          return row.map((field) => {
            if (field.x === action.payload.x && field.y === action.payload.y) {
              return {
                ...field,
                value: action.payload.value,
              }
            }
            return field
          })
        }),
      }
    },
    revealMines: (state) => {
      return {
        ...state,
        FieldValues: state.FieldValues.map((row) => {
          return row.map((field) => {
            if (field.isBomb) {
              return {
                ...field,
                isRevealed: true,
              }
            }
            return field
          })
        }),
      }
    },

    updateDetonation: (state, action) => {
      return {
        ...state,
        FieldValues: state.FieldValues.map((row) => {
          return row.map((field) => {
            if (field.x === action.payload.x && field.y === action.payload.y) {
              return {
                ...field,
                detonated: true,
              }
            }
            return field
          })
        }),
      }
    },
  },
})

export const { updateField, updateValue, revealMines, updateDetonation, updateBomb } =
  ArraySlice.actions

const ArrayReducer = ArraySlice.reducer
export default ArrayReducer
