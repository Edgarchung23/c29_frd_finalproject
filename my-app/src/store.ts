import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../src/slice/authSlice"

// --------------------------------------------------------------------------------

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

// --------------------------------------------------------------------------------

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch