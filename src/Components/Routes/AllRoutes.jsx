import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import PrivateRoute from './PrivateRoute'
import Forum from '../Pages/Forum'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<SignUp/>} />
        <Route path="/forum" element={<PrivateRoute><Forum/></PrivateRoute>} />

      </Routes>
    </div>
  )
}

export default AllRoutes