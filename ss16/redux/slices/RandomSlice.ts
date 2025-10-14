import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    random: Math.floor(Math.random() * 100),
    randomArray: [] as number[],
}

export const randomSlice = createSlice({
    name: 'random',
    initialState,
    reducers: {
        randomize: (state) => {
            state.random = Math.floor(Math.random() * 100)
        },
        addRandomToArray: (state) => {
            const newRandom = Math.floor(Math.random() * 100);
            state.random = newRandom;
            state.randomArray.push(newRandom);
        },
        clearRandomArray: (state) => {
            state.randomArray = [];
        }
    },
})

export const { randomize, addRandomToArray, clearRandomArray } = randomSlice.actions
export default randomSlice.reducer
