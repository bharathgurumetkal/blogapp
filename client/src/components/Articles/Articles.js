import {useEffect, useState} from 'react'
import { axiosWithToken } from '../../axiosWithToken'
import { Outlet, useNavigate } from 'react-router-dom'

function Articles() {
  let [articlesList,setArticlesList]=useState([])
  let navigate=useNavigate()
  //get articles of all authors
  const getArticlesOfAllAuthors=async()=>{
    let res=await axiosWithToken.get('http://localhost:4000/user-api/articles')
    console.log(res)
    setArticlesList(res.data.payload)
  }

  //function to read article by ID
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

  //make API call
  useEffect(()=>{
    getArticlesOfAllAuthors()
  },[])

  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-4 g-5">
        {articlesList.map((article)=>( 
          <div className="col" key={article.articleId}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className='card-title'>{article.title}</h5>
                <p>{article.content.substring(0,80)+"....."}</p>
                <button className="btn btn-success" onClick={()=>readArticleByArticleId(article)}>Read More</button>
              </div>
              <div className="card-footer">
                <small>Last updated on {ISOtoUTC(article.dateOfModification)}</small>
              </div>
            </div>
          </div>
        ))}
        <Outlet/>
      </div>
    </div>
  )
}

export default Articles