import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PrivateRouter  from './PrivateRouter.jsx'
import Home           from '../pages/Home.jsx'
import MovieDetail    from '../pages/MovieDetail.jsx'
import Login          from '../pages/Login.jsx'
import Register       from '../pages/Register.jsx'

export default function Router() {
  return (
    <div className=' dark:bg-gray-dark-main min-h-screen'>
    <Routes>
      <Route element={<PrivateRouter />}>
        <Route path="/"           element={<Home />} />
        <Route path="/details/:id" element={<MovieDetail />} />
      </Route>
      <Route path="/login"    element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    </div>

  )
}
