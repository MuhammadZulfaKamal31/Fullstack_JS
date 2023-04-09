import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList'
import './App.css'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser1'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserList />} />
          <Route path='/add' element={<AddUser />} />
          <Route path='/edit/:id' element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
