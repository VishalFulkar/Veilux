import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        orderHistory: [],
    },
    reducers: {
        setOrders: (state, action) => {
            state.orderHistory = action.payload || [];
        },
        placeOrder: (state, action) => {
            const newOrder = {
                id: Date.now().toString(),
                date: new Date().toISOString(),
                items: action.payload.items,
                total: action.payload.total,
                userEmail: action.payload.userEmail
            };
            state.orderHistory.unshift(newOrder); // Add to beginning
        }
    }
});

export const { placeOrder, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
