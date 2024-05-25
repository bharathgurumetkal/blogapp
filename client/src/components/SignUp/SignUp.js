import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import {NavLink, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";
import { PiLockKeyFill } from "react-icons/pi";
import { HiOutlineMail } from "react-icons/hi";
import './SignUp.css'
function SignUp() {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let navigate=useNavigate()
  let [err,setErr]=useState('')

  async function onSignUpFormSubmit(userObj){
    if(userObj.userType==='user'){  
      let res=await axios.post('http://localhost:4000/user-api/user',userObj)
      if(res.data.message==="User created"){
        navigate('/signin')
      }
      else{
        setErr(res.data.message)
      }
    }
    if(userObj.userType==='author'){
      let res=await axios.post('http://localhost:4000/author-api/user',userObj)
      if(res.data.message==="Author created"){
        navigate('/signin')
      }
      else{
        setErr(res.data.message)
      }
    }
  }
  return (
    <div className='container'>
      <div className="row justify-content-center mt-5">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="card shadow-sm border-1 rounded-3 " style={{height:'65vh'}}>
            <h2 className='text-center p-3'>Signup</h2>
            <div className="card-body">
              {/* display the error message for signup */}
              {err.length!=0&&<p className='text-danger fs-4'>{err}</p>}
              <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                <div className="text-center mb-3">
                  <div className="form-check form-check-inline">
                    <input type="radio"  id="author" value="author" className="form-check-input" {...register('userType',{required:true})} />
                    <label htmlFor="author">Author</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input type="radio"  id="user" value="user" className="form-check-input" {...register('userType',{required:true})} />
                    <label htmlFor="user">User</label>
                  </div>
                  {errors.userType?.type==="required"&&<p className='text-danger'>select userType</p>}
                </div>
                <div className='input-container d-flex'>
                <span className='icon'><FaRegCircleUser className='fs-4' /></span>
                <input type="text" name="username" id="username" className="form-control " placeholder='Username' {...register('username',{required:true})}/>
                </div>
                {errors.username?.type==="required"&&<p className='text-danger'>username is required</p>}
                <div className='input-container d-flex mt-3'>
                  <span className='icon'><HiOutlineMail className='fs-4' /></span>
                  <input type="email" name="email" id="email" className="form-control" placeholder='Email' {...register('email',{required:true})}/>
                </div>
                {errors.email?.type==="required"&&<p className='text-danger'>email is required</p>}
                <div className='input-container d-flex mt-3'>
                  <span className='icon'><PiLockKeyFill className='fs-4' /></span>
                  <input type="password" name="password" id="password" className="form-control" placeholder='Password' {...register('password',{required:true})}/>
                </div>
                {errors.password?.type==="required"&&<p className='text-danger'>please enter the required</p>}
                <button type="submit"  className='btn   mx-auto d-block mt-3 mb-2 w-100 text-white' style={{backgroundColor:"#4a50a4"}}>SignUp</button>
                <p className='text-center'>Already have an account? <NavLink className="fw-bold text-decoration-none" to="/signin">SignIn</NavLink></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp