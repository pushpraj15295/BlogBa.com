import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Home'
import Login from '../userCreds/Login'
import Signup from '../userCreds/Signup'

const AllRoutes = () => {
  return (
    <>
       <Routes>
             <Route path="/" element={<Home/>} />
             <Route path="/login" element={<Login/>} />
             <Route path="/signup" element={<Signup/>} />
            
       </Routes>
    </>
  )
}

export default AllRoutes