import { useState } from 'react'
import { ProductListt } from './components/ProductListt'
import { AddProduct } from './components/AddProduct'
import { EditProduct } from './components/EditProduct'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListt />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
