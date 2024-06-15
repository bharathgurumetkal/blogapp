import React from 'react'
import Articles from '../AddArticle/AddArticle'
import { NavLink, Outlet } from 'react-router-dom'
import ArticlesForAdmin from '../ArticlesForAdmin/ArticlesForAdmin'

function AdminProfile() {
  return (
    <div>
          <NavLink
        to="articles-for-admin"
        className="mt-4 nav-link fs-3 fw-semibold  text-center "
        style={{ color: "#16537E" }}
      >
        Articles
      </NavLink>
      <Outlet/>
    </div>
  )
}

export default AdminProfile