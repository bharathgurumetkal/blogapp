import React from "react";
import { useEffect, useState } from "react";
import { axiosWithToken } from "../../axiosWithToken";
import { Outlet, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer,toast,Zoom } from "react-toastify";
import './ArticlesForAdmin.css'

function ArticlesForAdmin() {
  let [articlesList, setArticlesList] = useState([]);
  let [userStatus, setUserStatus] = useState({});
  let navigate = useNavigate();
  //get articles of all authors
  const getArticlesOfAllAuthors = async () => {
    let res = await axiosWithToken.get(
      "http://localhost:4000/admin-api/articles-for-admin"
    );
    setArticlesList(res.data.payload);
  };

  //change User Status
  const changeUserStatus = async (article) => {
    const newStatus = !userStatus[article.username];
    let userActiveStatus = await axiosWithToken.put(
      `http://localhost:4000/admin-api/user/${article.username}`
    );
    setUserStatus((prevStatuses) => ({
      ...prevStatuses,
      [article.username]: userActiveStatus.data.payload,
    }));
    if(userActiveStatus.data.payload===true){
      toast.success(`${article.username} Activated`,{
        autoClose:1500,
        hideProgressBar:true,
        pauseOnHover:false,
        progress:undefined,
        theme:"dark",
        transition:Zoom

      })
    }   
  };

  //function to read article by ID
  const readArticleByArticleId = (articleObj) => {
    navigate(`../article/${articleObj.articleId}`, { state: articleObj });
  };

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    let hours = new Date(iso).getUTCHours();
    let minutes = new Date(iso).getUTCMinutes();
    let period = hours >= 12 ? "PM" : "AM";
    return `${date}/${day}/${year}  ${hours}:${minutes} ${period}`;
  }

  async function getUserStatus(article) {
    try {
      let username = article.username;
      let userStatus = await axiosWithToken.get(
        `http://localhost:4000/admin-api/user-status/${username}`
      );
      return userStatus.data.payload;
    } catch (err) {
      console.log("error in userStatus", err);
    }
  }

  useEffect(() => {
    const fetchUserStatus = async () => {
      const statuses = {};
      for (const article of articlesList) {
        const status = await getUserStatus(article);
        statuses[article.username] = status;
      }
      setUserStatus(statuses);
      }
      if (articlesList.length > 0) {
        fetchUserStatus();
    };
  }, [articlesList]);
  //make API call
  useEffect(() => {
    getArticlesOfAllAuthors();
  }, []);
  return (
    <div className="container mb-2">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-3 g-5">
        {articlesList.map((article) => (
          <div className="col" key={article.articleId}>
            <div className="card articles_card h-100 shadow-sm">
              <div className="card-body">
                <div className="d-flex">
                  <p className="fs-5 text-secondary ">
                    <FaUserCircle className="fs-3 me-1" />
                    {article.username}
                  </p>
                  <div className="activeStatus">
                  {userStatus[article.username] ? (
                    <button
                      onClick={() => changeUserStatus(article)}
                      className="btn btn-danger"
                    >
                      Block
                    </button>   
                  ) : (<>
                    <button
                      onClick={() => changeUserStatus(article)}
                      className="btn btn-success
            "
                    >
                      Activate
                    </button><ToastContainer/></>
                  )}</div>
                </div>
                <img src={article.articleImg} className="w-100 rounded " alt="" />
                <h4 className="card-title mb-2 fs-3 text-capitalize">
                  {article.title}
                </h4>
                <span className= 'category fw-bold rounded-top rounded-bottom py-sm-0 py-1 mb-3  px-2 ' style={{fontSize:'0.8rem',color:"#485789",backgroundColor:"#e5ebf4"}}>{article.category}</span>
                <p className="text-secondary">
                  {article.content.substring(0, 100) + "....."}
                </p>
                <button
                  className="custom-btn p-2 rounded-3 fw-medium  w-50 mx-auto d-block"
                  onClick={() => readArticleByArticleId(article)}
                >
                  Read More
                </button>
              </div>
              <div className="card-footer">
                <small>
                  Last updated on {ISOtoUTC(article.dateOfModification)}
                </small>
              </div>
            </div>
          </div>
        ))}
        <Outlet />
      </div>
    </div>
  );
}

export default ArticlesForAdmin;
