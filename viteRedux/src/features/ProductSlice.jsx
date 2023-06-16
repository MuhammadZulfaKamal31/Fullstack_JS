//mempermudah jika bermain api, entity adapter jika bermain denagn nested data
//createSlice igunakan untuk membuat reducer dan actions secara otomatis
//create asynkThunk fungsi yang memudahkan penanganan tugas-tugas asinkron dalam Redux.
//create EntityAdapter  fungsi yang membantu dalam mengatur data yang berstruktur seperti entitas (entities) dalam Redux.
import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import axios from "axios";

// Definisikan tugas asinkron menggunakan createAsyncThunk
export const getProduct = createAsyncThunk("products/getProducts", async () => {
    // Kode untuk mengambil data dari server menggunakan axios
    const response = await axios.get('http://localhost:5000/products');
    return response.data
});
//parameter pertama nama async thunk jadi jangn sama
export const saveProduct = createAsyncThunk("products/saveProduct", async ({ title, price }) => {
    const response = await axios.post('http://localhost:5000/products', {
        title,
        price
    })
    return response.data;
})
export const deleteProduct = createAsyncThunk("products/saveProduct", async (id) => {
    // Kode untuk mengambil data dari server menggunakan axios
    await axios.delete(`http://localhost:5000/products/${id}`);
    return id;
});
export const updateProduct = createAsyncThunk("products/deleteProduct", async ({ id, title, price }) => {
    // Kode untuk mengambil data dari server menggunakan axios
    const response = await axios.patch(`http://localhost:5000/products/${id}`, {
        title,
        price
    });
    return response.data;
});

// Buat entity adapter menggun akan createEntityAdapter
const productEntity = createEntityAdapter({
    selectId: (product) => product.id
})

// Buat slice menggunakan createSlice
const productSlice = createSlice({
    //nama store nya apa
    name: "product",
    //persis kayak ustate tp ini bagian intinya
    initialState: productEntity.getInitialState(),
    // Tambahkan tindakan tambahan untuk tugas asinkron
    extraReducers: {
        //menggunakan fullfilled
        [getProduct.fulfilled]: (state, action) => {
            //entity adapter
            productEntity.setAll(state, action.payload);
        },
        //jadi methodnya di pakai di sini kyk controller di backend
        [saveProduct.fulfilled]: (state, action) => {
            productEntity.addOne(state, action.payload);
        },
        [deleteProduct.fulfilled]: (state, action) => {
            productEntity.removeOne(state, action.payload);
        },
        [updateProduct.fulfilled]: (state, action) => {
            productEntity.updateOne(state, { id: action.payload.id, updates: action.payload });
        }
    }
}


    //typo kurang s bisa error yang gak di ketahui
    // reducers: {
    //     update: (state, action) => {
    //         //payload data yng di kirim ke action nya
    //         state.title = action.payload.title;
    //         state.price = action.payload.price;
    //     }
    // }
)

//untuk isinya tergantung berapa reducer yang ada
// export const { update } = productSlice.actions;
// engeluarkan functin dan reducer
export const productSelector = productEntity.getSelectors(state => state.product)
export default productSlice.reducer;