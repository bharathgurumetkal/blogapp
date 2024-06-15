import React from "react";
import { Outlet } from "react-router-dom";
import "./Home.css";
import blog_img from "../../assets/blog_img.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import  blogging_img from '../../assets/interact.png'
import Blog_Commenting from '../../assets/Blog-Commenting.png'
import { FaUserCircle } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { IoIosArrowForward } from "react-icons/io";

function Home() {
  let navigate = useNavigate();

  return (
    <div className="home-card   ">
      <div className=" d-flex info pt-3" style={{backgroundColor:"#96a6ff",minHeight:"90vh"}}>
        <div className="content mx-auto p-2">
        <h1 className=" text-dark ">Start Your Journey as a <span className="writer">Writer!</span></h1>
          <p className="lead ">
            Are you ready to share your voice with the world? Whether you're a
            seasoned writer or just starting out, BlogApp provides the perfect
            platform to showcase your talent and reach a wider audience
          </p>
          <button
            className="btn   rounded-pill text-white"
            style={{ backgroundColor: "#4a50a4" }}
            onClick={()=>navigate('/signin')}
          >
            Get Started
            <FaArrowRightLong
              style={{ marginLeft: "5%" }}
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
      <div className="feature mt-3  p-2 m-5  d-flex justify-content-evenly " style={{minHeight:"50vh"}}>
        <div className="content ">
          <h2 className=" fw-bold" style={{fontSize:"3rem"}}>Seamless <span className="blogging">Blogging</span> Experience</h2>
          <p>Create and publish your blogs effortlessly with our user-friendly platform.It makes simple to write,format and publish without any technical hassle.</p>
          <button className="btn feature_btn text-dark fw-medium " style={{ backgroundColor: "#dcdcdc" }} onClick={()=>navigate('/signin')}>Start Blogging</button>
        </div>
        <div className="image">
          <img src={blogging_img} alt="" style={{height:"450px",width:"110%"}} />
        </div>

      </div>
      <div className=" feature mt-3 m-5  d-flex justify-content-evenly " style={{minHeight:"50vh"}}>
        <div className="content  ">
          <h2 className=" fw-bold" style={{fontSize:"3rem"}}>Engage with <span className="content_text">Content</span></h2>
          <p>Comment on posts and share your thoughts.BlogApp makes it easy to participate in discussions and interact with blog authors</p>
          <button className="btn feature_btn text-dark fw-medium" style={{ backgroundColor: "#dcdcdc" }} onClick={()=>navigate('/signin')}>Start Engaging</button>
    
        </div>
        <div className="image">
          <img src={Blog_Commenting} alt="" className="" style={{height:"450px",width:"120%"}} />
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Home;
