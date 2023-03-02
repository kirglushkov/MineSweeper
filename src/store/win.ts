import { createSlice } from '@reduxjs/toolkit';


export const winSlice = createSlice({
    name: 'win',
    initialState: {
        value: "default",
    },
    reducers: {
        win: (state) => {
            state.value = "win";
        },
        lose: (state) => {
            state.value = "lose";
        },
        restart: (state) => {
            state.value = "restart";
        },
        afraid: (state) => {
            state.value = "afraid";
        },
        start: (state) => {
            state.value = "default";
        }
    },
});

export const { win, lose, restart, afraid, start } = winSlice.actions;

export default winSlice.reducer;