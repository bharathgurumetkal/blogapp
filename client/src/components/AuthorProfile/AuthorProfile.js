import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { axiosWithToken } from "../../axiosWithToken";
import { ImBlocked } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";
import "./AuthorProfile.css";

function AuthorProfile() {
  let { currentUser } = useSelector((state) => state.userAuthorLoginReducer);
  let [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    async function getUserStatus() {
      try {
        let username = currentUser.username;
        console.log(username);
        let userStatus = await axiosWithToken.get(
          `http://localhost:4000/admin-api/user-status/${username}`
        );
        console.log(userStatus);
        setUserStatus(userStatus.data.payload);
      } catch (err) {
        console.log("error in userStatus", err);
      }
    }
    getUserStatus();
  }, [currentUser]);

  return (
    <div className="mt-4">
      {userStatus === false ? (
        <div className="mt-5" style={{minHeight:"73vh"}}>
          <div className="w-50 mx-auto border p-4 text-center rounded-3 border-danger border-2 shadow-lg">
            <ImBlocked
              className="text-danger mb-4"
              style={{ fontSize: "10rem" }}
            />
            <h2 className=" fw-bold text-danger">BLOCKED!</h2>
            <h5>You have been Blocked</h5>
            <p>You cannot add articles</p>
            <p className="fs-5">
              if you think this is a mistake please contact support
            </p>
            <button className="btn btn-warning text-white fw-bolder">
              Contact Support
              <IoIosArrowForward className="fs-4 fw-bolder" />
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto">
          <ul className="nav justify-content-around profile">
            <li className="nav-item ">
              <NavLink
                className="nav-link fs-5 fw-semibold"
                to="new-article"
                style={{ color: "#16537E" }}
              >
                Add New Articles
              </NavLink>
            </li>
            <li>
              <NavLink
                className="nav-link fs-5 fw-semibold"
                to={`articles-by-author/${currentUser.username}`}
                style={{ color: "#16537E" }}
              >
                Articles
              </NavLink>
            </li>
          </ul>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
