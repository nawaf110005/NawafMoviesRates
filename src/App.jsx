import React from 'react'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { MovieProvider }         from './context/MovieContext.jsx'
import { ToastContainer }        from 'react-toastify'
import Navbar from './components/Navbar.jsx'
import Router                    from './router/Router.jsx'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <AuthContextProvider>
      <MovieProvider>
        <ToastContainer />
        <Navbar/>
        <Router />
      </MovieProvider>
    </AuthContextProvider>
  )
}
