import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    counter: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        add1(state) {
            ++state.counter;
        },
        sub1(state) {
            --state.counter;
        },
        addNumber(state, action) {
            state.counter += +action.payload;
        },
    },
});

export const counterActions = counterSlice.actions;

export default counterSlice.reducer;