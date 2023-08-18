import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItemsNumber: 0,
};

const cartSlice = createSlice({
    name: "cartUpdate",
    initialState,
    reducers: {
        cartItems(state, action) {
            if (!action) {
                return;
            }
            state.cartItemsNumber = action.payload;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;