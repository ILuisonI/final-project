import { configureStore } from "@reduxjs/toolkit";

import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";
import cartReducer from "./cartUpdate";

const store = configureStore({
    reducer: {
        darkThemeSlice: darkThemeReducer,
        authSlice: authReducer,
        cartSlice: cartReducer,
    }
});

export default store;