import ClickSlice from './firstClick';
import winSlice from './win';
import { configureStore } from '@reduxjs/toolkit'
import ArraySlice from './mineSweeperLogic'
import MineSlice from './bomb'


const store = configureStore({
  reducer: {
    updateField: ArraySlice,    
    DecreaseBombCount: MineSlice,
    clickedFirst: ClickSlice,
    win: winSlice,
    lose: winSlice,
    restart: winSlice,
    start: winSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
