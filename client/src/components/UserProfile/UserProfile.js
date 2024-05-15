import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <div>
      <NavLink
        to="articles"
        className="mt-4 nav-link fs-3 fw-semibold  text-center "
        style={{ color: "#16537E" }}
      >
        Articles
      </NavLink>
      <Outlet />
    </div>
  );
}

export default UserProfile;
