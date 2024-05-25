import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetState } from '../../redux/slices/userAutherSlice'
import { IoMenu } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUserCircle } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


function NavBar() {
    let {loginUserStatus,errorOccured,errMsg,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
    let dispatch=useDispatch()
    let navigate=useNavigate()
    function SignOut(){
        //remove token from the local storage
        localStorage.removeItem('token')
        dispatch(resetState())
        toast.success("LogOut Successfull!")

    }
  return (
    <div>
        <nav className='navbar navbar-expand-sm fs-5 '>
        <h5 className='text-white text-center' style={{marginLeft:'10px'}} onClick={()=>navigate('/home')} >BLOGAPP</h5>
            <ul className='navbar-nav ms-auto mb-lg-0 '>
                { loginUserStatus==false ? (
                <>
                
                <li className='nav-item'>
                    <NavLink className="nav-link" to='home' style={{color:'white'}}>Home</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className="nav-link" to="signin" style={{color:'white'}}>SignIn</NavLink>
                </li>
                <li className='nav-item'>
                    <NavLink className="nav-link" to='signup' style={{color:'white'}}>SignUp</NavLink>
                </li>
                
                </>):(
                <li className='nav-item dropdown pe-3'>
                              <button class="btn dropdown-toggle text-white fs-5" data-bs-toggle="dropdown" aria-expanded="false"><FaUserCircle className='fs-3 text-white me-2' />
            <span>{currentUser.username}<sup className='text-secondary' style={{fontSize:"1rem"}}>{currentUser.userType}</sup></span>
          </button>
          <ul class="dropdown-menu dropdown-menu w-25">
            <li ><NavLink className="nav-link text-center text-dark" to='signin' onClick={SignOut}>Sign Out</NavLink></li>
            <ToastContainer/>
          </ul>
                </li>
                )}
            </ul>
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox" className='check_btn '><IoMenu /></label>
        </nav>
    </div>
  )
}

export default NavBar