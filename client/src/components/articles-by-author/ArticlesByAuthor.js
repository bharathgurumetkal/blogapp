import { useEffect, useState } from 'react'
import { axiosWithToken } from '../../axiosWithToken'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'



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
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-4 g-5">
        {articlesList.map((article)=>(
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">{article.title}</h3>
                <span className= 'text-secondary' style={{fontSize:'0.9rem'}}>{article.category}</span>
                <hr />
                <p className='text-secondary'>{article.content.substring(0,80)+"....."}</p>
                <button className='custom-btn btn btn-success' onClick={()=>readArticleByArticleId(article)}>Read More</button>
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