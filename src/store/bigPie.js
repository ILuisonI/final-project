import { configureStore } from "@reduxjs/toolkit";

import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";
import cartReducer from "./cartUpdate";
import profilePicReducer from "./profilePicUpdate";

const store = configureStore({
    reducer: {
        darkThemeSlice: darkThemeReducer,
        authSlice: authReducer,
        cartSlice: cartReducer,
        profilePicSlice: profilePicReducer,
    }
});

export default store;