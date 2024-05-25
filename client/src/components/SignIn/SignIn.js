import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userAuthorLoginThunk } from "../../redux/slices/userAutherSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { PiLockKeyFill } from "react-icons/pi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SignIn.css";
function SignIn() {
  let { register, handleSubmit,formState:{errors}} = useForm();
  let { loginUserStatus, errorOccured, errMsg, currentUser } = useSelector(
    (state) => state.userAuthorLoginReducer
  );
  let navigate = useNavigate();
  let dispatch = useDispatch();

  function onSignInFormSubmit(userCredObj) {
    dispatch(userAuthorLoginThunk(userCredObj));
    toast.success("Login Successfull!")
  }
  useEffect(() => {
    if (loginUserStatus === true) {
      if (currentUser.userType === "user") {
        navigate("/user-profile");
      }
      if (currentUser.userType === "author") {
        navigate("/author-profile");
      }
    }
  }, [loginUserStatus]);
  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow-sm border-1 rounded-3  " style={{ height: "65vh" }}>
            <h2 className="text-center m-2 p-2">Signin</h2>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSignInFormSubmit)}>
                <div className="text-center mb-2">
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="userType"
                      id="author"
                      value="author"
                      className="form-check-input"
                      {...register("userType",{required:true})}
                    />
                    <label htmlFor="author">Author</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="userType"
                      id="user"
                      value="user"
                      className="form-check-input"
                      {...register("userType",{required:true})}
                    />
                    <label htmlFor="user">User</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="userType"
                      id="admin"
                      value="admin"
                      className="form-check-input"
                      {...register("userType",{required:true})}
                    />
                    <label htmlFor="admin">Admin</label>
                  </div>
                  {errors.userType?.type==="required"&&<p className="text-danger">Select the userType</p>}
                </div>
                <div className="signin-input-container d-flex">
                  <span className="icon" ><FaRegCircleUser className="fs-4 me-1" /></span>
                  <input
                    type="text"
                    id="username"
                    className="form-control  mt-2"
                    placeholder="Username"
                    {...register("username",{required:true})}
                  />
                </div>
                {errors.username?.type==="required"&&<p className="text-danger">username is required</p>}
                <div className="input-container mt-4">
                  <span className="icon"><PiLockKeyFill className='fs-4' /></span>
                  <input
                    type="password"
                    id="password"
                    className="form-control "
                    placeholder="Password"
                    {...register("password",{required:true})}
                  />
                   {errors.password?.type==="required"&&<p className="text-danger">enter the password</p>}
                  <div className="forgot_password float-end text-primary fw-normal ">
                    <a href="" className="text-decoration-none mb-5">
                      forgot password?
                    </a>
                  </div>
                </div>
                <div>

                <button
                  type="submit"
                  className="btn mx-auto d-block mt-5 w-100 text-white" style={{backgroundColor:"#4a50a4"}}
                >
                  Signin
                </button>
                <ToastContainer/>
                </div>
                <p className="text-center mt-3 lead">
                  Dont have an account?
                  <NavLink
                    className="fw-bold text-decoration-none"
                    to="/signup"
                  >
                    SignUp
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
