import React from "react";
import { Outlet } from "react-router-dom";
import "./Home.css";
import blog_img from "../../assets/blog_img.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import  blogging_img from '../../assets/interact.png'
import Blog_Commenting from '../../assets/Blog-Commenting.png'
import { FaUserCircle } from "react-icons/fa";
function Home() {
  let navigate = useNavigate();
  return (
    <div className="home-card   ">
      <div className=" d-flex info pt-3" style={{backgroundColor:"#96a6ff"}}>
        <div className="content mx-auto p-2">
        <h1 className=" text-dark ">Start Your Journey as a Writer!</h1>
          <p className="lead ">
            Are you ready to share your voice with the world? Whether you're a
            seasoned writer or just starting out, BlogApp provides the perfect
            platform to showcase your talent and reach a wider audience
          </p>
          <button
            className="btn   rounded-pill text-white"
            style={{ backgroundColor: "#4a50a4" }}
          >
            Get Started
            <FaArrowRightLong
              style={{ marginLeft: "5%" }}
              onClick={()=>navigate("/signin")}
            />
          </button>
        </div>
        <div className="image mx-auto d-block">
          <img
            src={blog_img}
            
            className="float-end mx-auto d-block "
          />
        </div>
      </div>
      <div className="feature mt-3 m-5 p-2 text-center  shadow-lg  rounded-4  d-flex justify-content-around " style={{minHeight:"50vh"}}>
        <div className="content mt-5  ">
          <h2 className=" fw-bold" style={{fontSize:"3rem"}}>Seamless Blogging Experience</h2>
          <p>Create and publish your blogs effortlessly with our user-friendly platform.It makes simple to write,format and publish without any technical hassle.</p>
    
        </div>
        <div className="image">
          <img src={blogging_img} alt="" style={{height:"350px",width:"110%"}} />
        </div>

      </div>
      <div className=" feature mt-3 m-5 p-2 text-center shadow-lg rounded-4  d-flex justify-content-around " style={{minHeight:"50vh"}}>
        <div className="content mt-5  ">
          <h2 className=" fw-bold" style={{fontSize:"3rem"}}>Engage with Content</h2>
          <p>Comment on posts and share your thoughts.BlogApp makes it easy to participate in discussions and interact with blog authors</p>
    
        </div>
        <div className="image">
          <img src={Blog_Commenting} alt="" style={{height:"350px",width:"110%"}} />
        </div>

      </div>
      <div className="col-md-4 m-4">
        
      </div>

      <Outlet></Outlet>
    </div>
  );
}

export default Home;
