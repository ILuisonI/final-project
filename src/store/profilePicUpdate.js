import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profilePic: "",
};

const profilePicSlice = createSlice({
    name: "profilePicUpdate",
    initialState,
    reducers: {
        profilePic(state, action) {
            if (!action) {
                return;
            }
            state.profilePic = action.payload;
        },
    },
});

export const profilePicActions = profilePicSlice.actions;

export default profilePicSlice.reducer;