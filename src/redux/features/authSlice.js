import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        isAuthReady: false,
        error: null,
    },
    reducers: {
        setAuthUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isAuthReady = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setAuthUser, setError } = authSlice.actions;
export default authSlice.reducer;
