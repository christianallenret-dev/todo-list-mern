import { useContext } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { AuthContext } from './context/AuthContext'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  const {isAuthenticated} = useContext(AuthContext)

  return (
    <BrowserRouter>
      <Routes>
        <Route
            path='/'
            element={
              isAuthenticated ? <Dashboard /> : <Navigate to='/login'/>
            }
        />

        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
