import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import "./AuthorProfile.css";

function AuthorProfile() {
  let { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  return (
    <div className="mt-5">
      <div className="w-50 bg-white mx-auto rounded-pill">
        <ul className="nav justify-content-around">
          <li className="nav-item">
            <NavLink className="nav-link" to="new-article">
              Add New Articles
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link"
              to={`articles-by-author/${currentUser.username}`}
            >
              Articles
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
