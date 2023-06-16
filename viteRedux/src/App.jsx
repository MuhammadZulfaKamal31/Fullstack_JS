import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddProduct } from './components/AddProduct'
import { EditProduct } from './components/EditProduct'
import { ShowProduct } from './components/ShowProduct.jsx'

function App() {

  return (
    <BrowserRouter>
      <div className=' container'>
        <Routes>
          <Route path='/' element={<ShowProduct />} />
          <Route path='add' element={<AddProduct />} />
          <Route path='edit/:id' element={<EditProduct />} />
        </Routes>
      </div>
    </BrowserRouter>

  )
}

export default App
