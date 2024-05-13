import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { useSelector,useDispatch } from 'react-redux'
import { resetState } from '../../redux/slices/userAutherSlice'


function NavBar() {
    let {loginUserStatus,errorOccured,errMsg,currentUser}=useSelector(state=>state.userAuthorLoginReducer)
    let dispatch=useDispatch()
    function SignOut(){
        //remove token from the local storage
        localStorage.removeItem('token')
        dispatch(resetState())

    }
  return (
    <div>
        <nav className='navbar navbar-expand-sm fs-5 '>
        <h5 className='text-white text-center' style={{marginLeft:'10px'}}>BLOGAPP</h5>
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
                <li className='nav-item'>
                    <NavLink className="nav-link" to='signin' style={{color:'white'}} onClick={SignOut}>Sign Out</NavLink>
                </li>
                )}
            </ul>
        </nav>
    </div>
  )
}

export default NavBar