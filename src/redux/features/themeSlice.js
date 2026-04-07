import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
    try {
        const theme = window.localStorage.getItem('theme');
        return theme ? theme : 'light';
    } catch (error) {
        return 'light';
    }
};

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        mode: getInitialTheme(),
    },
    reducers: {
        toggleTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            window.localStorage.setItem('theme', state.mode);
        },
        setTheme: (state, action) => {
            state.mode = action.payload;
            window.localStorage.setItem('theme', state.mode);
        }
    }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
