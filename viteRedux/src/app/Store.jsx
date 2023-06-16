import { configureStore } from '@reduxjs/toolkit'
//dipakai disini untuk menggunakan slice nya
import productReducer from "../features/ProductSlice"

export const store = configureStore({
    reducer: {
        //penggunaan nya disini product, itu key nya
        product: productReducer
    },
})