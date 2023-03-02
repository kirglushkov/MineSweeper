import { createSlice } from '@reduxjs/toolkit';


export const winSlice = createSlice({
    name: 'win',
    initialState: {
        value: "default",
    },
    reducers: {
        lose: (state) => {
            state.value = "lose";
        },
        restart: (state) => {
            state.value = "restart";
        },
        start: (state) => {
            state.value = "default";
        }
    },
});

export const { lose, restart,start } = winSlice.actions;

export default winSlice.reducer;