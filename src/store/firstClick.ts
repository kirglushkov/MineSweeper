import { createSlice } from '@reduxjs/toolkit'

export const ClickSlice = createSlice({
  name: 'firstClick',
  initialState: { clicked: false },
  reducers: {
    FirstClicked: (state, action) => {
      state.clicked = action.payload
    },
  },
})
export const { FirstClicked } = ClickSlice.actions
export default ClickSlice.reducer
