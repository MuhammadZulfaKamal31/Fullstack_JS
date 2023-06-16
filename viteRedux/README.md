Berikut adalah beberapa konsep kunci dalam Redux:

Actions: Actions adalah objek JavaScript yang menggambarkan perubahan yang ingin dilakukan pada state aplikasi. Actions harus memiliki properti type yang menjelaskan jenis perubahan yang diinginkan. Mereka juga dapat membawa data tambahan yang diperlukan untuk perubahan tersebut.

Reducers: Reducers adalah fungsi-fungsi murni yang mengubah state aplikasi berdasarkan actions yang diterima. Setiap reducer bertanggung jawab atas bagian-bagian tertentu dari state aplikasi. Reducer menerima state saat ini dan action yang dijalankan, kemudian mengembalikan state yang baru.

Store: Store adalah objek yang menyimpan state aplikasi. Hanya ada satu store dalam sebuah aplikasi Redux. Store juga bertanggung jawab untuk menerapkan prinsip-prinsip Redux seperti menyediakan fungsi untuk mengakses state, memperbarui state melalui reducer, dan mengizinkan komponen untuk berlangganan perubahan state.

Dispatching: Dispatching adalah proses mengirimkan actions ke store. Actions dikirim melalui fungsi dispatch yang disediakan oleh store. Setiap action akan diteruskan ke reducers yang sesuai, dan reducers akan memperbarui state aplikasi secara terprediksi.

Selectors: Selectors adalah fungsi-fungsi yang digunakan untuk mengambil data dari state aplikasi. Mereka memungkinkan komponen-komponen untuk memilih data tertentu dari state dengan lebih mudah dan terpusat.

==================================================================

Import statement yang Anda sebutkan adalah bagian dari Redux Toolkit, sebuah paket yang menyediakan utilitas dan konvensi yang lebih mudah digunakan untuk mengembangkan aplikasi dengan Redux. Mari kita jelaskan fungsi masing-masing:

createSlice: createSlice adalah fungsi yang digunakan untuk membuat reducer dan actions secara otomatis berdasarkan definisi yang diberikan. Ini mengurangi boilerplate code yang biasanya diperlukan dalam pembuatan reducer dan actions secara manual. Fungsi ini menghasilkan objek slice yang berisi reducer yang dihasilkan, actions yang dihasilkan, serta nama slice dan nama actions yang terkait.

createAsyncThunk: createAsyncThunk adalah fungsi yang memudahkan penanganan tugas-tugas asinkron dalam Redux. Fungsi ini menghasilkan sebuah thunk yang secara otomatis mengelola tiga tahap umum dalam tugas asinkron: permulaan (pending), berhasil (fulfilled), dan gagal (rejected). Anda hanya perlu memberikan tiga fungsi callback yang sesuai untuk masing-masing tahap tersebut, dan createAsyncThunk akan menghasilkan thunk yang dapat Anda gunakan untuk menjalankan tugas asinkron dengan mudah.

createEntityAdapter: createEntityAdapter adalah fungsi yang membantu dalam mengatur data yang berstruktur seperti entitas (entities) dalam Redux. Fungsi ini menghasilkan objek adapter yang menyediakan sejumlah utilitas bawaan untuk mengakses dan memanipulasi koleksi data. Ini termasuk fungsi untuk menyortir, memfilter, menambahkan, menghapus, dan memperbarui entitas dengan cara yang dioptimalkan.