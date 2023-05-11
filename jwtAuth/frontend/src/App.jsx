import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={[<Navbar key={1} />, <Dashboard key={2} />]} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
