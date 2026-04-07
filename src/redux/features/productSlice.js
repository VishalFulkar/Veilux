import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        loading:false,
        error:null
    },
    reducers:{
        fetchProductStart:(state)=>{
            state.loading = true;

        },
        getProductsSuccess:(state,action)=>{
            state.loading=false;
            state.products = action.payload;


        },
        getProductsFalied:(state,action)=>{
            state.loading=false;
            state.error = action.payload;
        },

    }
})

export const {fetchProductStart,getProductsSuccess,getProductsFalied} = productSlice.actions;
export default productSlice.reducer;