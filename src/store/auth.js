import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isBiz: false,
    isAdmin: false,
    loggedIn: false,
    payload: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            if (!action || !action.payload) {
                return;
            }
            state.loggedIn = true;
            state.payload = action.payload;
            state.isBiz = action.payload.isBusiness;
            state.isAdmin = action.payload.isAdmin;
        },
        logout(state) {
            state.isBiz = false;
            state.isAdmin = false;
            state.loggedIn = false;
            state.payload = null;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;