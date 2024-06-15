import { useEffect, useState } from 'react'
import { axiosWithToken } from '../../axiosWithToken'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import './ArticlesByAuthor.css'



function ArticlesByAuthor() {
  const [articlesList,setArticlesList]=useState([])
  let {currentUser}=useSelector((state)=>state.userAuthorLoginReducer)
  let navigate=useNavigate()

  //get the articles of the current author
  const getArticlesOfCurrentAuthor=async()=>{
    let res=await axiosWithToken.get(`http://localhost:4000/author-api/articles/${currentUser.username}`)
    setArticlesList(res.data.payload)
  }
  //function to read ArticleById
  const readArticleByArticleId=(articleObj)=>{
    navigate(`../article/${articleObj.articleId}`,{state:articleObj})
  }

  function ISOtoUTC(iso) {
    let date = new Date(iso).getUTCDate();
    let day = new Date(iso).getUTCDay();
    let year = new Date(iso).getUTCFullYear();
    let hours = new Date(iso).getUTCHours();
    let minutes = new Date(iso).getUTCMinutes()
    let period=hours>=12?"PM":"AM"
    return `${date}/${day}/${year}  ${hours}:${minutes} ${period}`;
  }
  //to make API Call
  useEffect(()=>{
    getArticlesOfCurrentAuthor()
  },[])
  

  return (
    <div className='container  mb-5'>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-4 g-5">
        {articlesList.map((article)=>(
          <div className="col" key={article.articleId}>
            <div className="articles_card card h-100 shadow-sm">
              <div className="card-body">
                <div className='mb-3'>
                  <img src={article.articleImg} className='w-100 rounded' alt="" />
                <h3 className="card-title fs-4 text-capitalize">{article.title}</h3>
                <span className= 'category fw-bold rounded-top rounded-bottom py-sm-0 py-1 mb-3  px-2 ' style={{fontSize:'0.8rem',color:"#485789",backgroundColor:"#e5ebf4"}}>{article.category}</span>
                </div>
                <p className='text-secondary'>{article.content.substring(0,100)+"....."}</p>
                <button className='custom-btn p-2 rounded-3 fw-medium  w-50 mx-auto d-block' onClick={()=>readArticleByArticleId(article)}>Read More</button>
              </div>
              <div className="card-footer">
                <small>Last updated on {ISOtoUTC(article.dateOfModification)}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Outlet/>
    </div>
  )
}

export default ArticlesByAuthor