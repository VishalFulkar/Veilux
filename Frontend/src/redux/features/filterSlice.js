import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filters",
    initialState: {
        searchQuery: "",
        category: "All",
        sortOrder: "default", // 'price-asc', 'price-desc', 'rating-desc'
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        clearFilters: (state) => {
            state.searchQuery = "";
            state.category = "All";
            state.sortOrder = "default";
        }
    }
});

export const { setSearchQuery, setCategory, setSortOrder, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
