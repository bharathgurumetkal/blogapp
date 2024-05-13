import React from 'react'
import {NavLink,Outlet} from 'react-router-dom'

function UserProfile() {
  return (
    <div>
        <NavLink to="articles" className='mt-4 nav-link text-primary fs-5 '>Articles</NavLink>
        <Outlet/>
    </div>
  )
}

export default UserProfile