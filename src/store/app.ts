import { configureStore } from '@reduxjs/toolkit'
import ArraySlice from './mineSweeperLogic'


const store = configureStore({
  reducer: {
    setUpField: ArraySlice,
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store
