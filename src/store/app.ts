import winSlice from './win';
import { configureStore } from '@reduxjs/toolkit'
import ArraySlice from './mineSweeperLogic'
import MineSlice from './bomb'


const store = configureStore({
  reducer: {
    updateField: ArraySlice,    
    DecreaseBombCount: MineSlice,
    win: winSlice,
    lose: winSlice,
    restart: winSlice,
    afraid: winSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
