import {configureStore} from '@reduxjs/toolkit'
import productReducer from './features/productSlice'
import cartReducer from './features/cartSlice'
import authReducer from './features/authSlice'
import orderReducer from './features/orderSlice'
import filterReducer from './features/filterSlice'
import themeReducer from './features/themeSlice'

export const store = configureStore({
    reducer:{
        getAllProducts:productReducer,
        cart: cartReducer,
        auth: authReducer,
        orders: orderReducer,
        filters: filterReducer,
        theme: themeReducer
    }
})
