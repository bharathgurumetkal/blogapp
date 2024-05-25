import React from 'react'
import NavBar from './components/Navbar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'


function RootLayout() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="" style={{minHeight:"80vh"}}>
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default RootLayout