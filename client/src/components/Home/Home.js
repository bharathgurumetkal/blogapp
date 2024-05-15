import React from "react";
import { Outlet } from "react-router-dom";
import "./Home.css";
import blog_img from "../../assets/blog_img.png";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate();
  return (
    <div className=" ps-5 rounded-3 home-card">
      <div className="mt-5 d-flex">
        <div className="content">
          <h1 className=" text-dark mt-5">Start Your Journey as a Writer!</h1>
          <p className="lead ">
            Are you ready to share your voice with the world? Whether you're a
            seasoned writer or just starting out, BlogApp provides the perfect
            platform to showcase your talent and reach a wider audience{" "}
          </p>
          <button
            className="btn w-50  rounded-pill text-white"
            style={{ backgroundColor: "#4a50a4" }}
          >
            Get Started
            <FaArrowRightLong
              style={{ marginLeft: "5%" }}
              onClick={() => navigate("/signin")}
            />
          </button>
        </div>
        <div>
          <img
            src={blog_img}
            style={{ marginTop: "-50px" }}
            className="float-end mx-auto d-block "
          />
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default Home;
