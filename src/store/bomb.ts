import { createSlice } from '@reduxjs/toolkit'
import { Bombs } from './mineSweeperLogic'
export const MineSlice = createSlice({
  name: 'Mines',
  initialState: { value: Bombs },
  reducers: {
    DecreaseBombCount: (state) => {
      state.value -= 1
    },
  },
})
export const { DecreaseBombCount } = MineSlice.actions
export default MineSlice.reducer
