import {useEffect, useState} from 'react'
import { axiosWithToken } from '../../axiosWithToken'
import { Outlet, useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import './Articles.css'

function Articles() {
  let [articlesList,setArticlesList]=useState([])
  let [userStatus, setUserStatus] = useState({});
  let navigate=useNavigate()
  //get articles of all authors
  const getArticlesOfAllAuthors=async()=>{
    let res=await axiosWithToken.get('http://localhost:4000/user-api/articles')
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
  
  async function getUserStatus(article) {
    try {
      let username = article.username;
      console.log(username);
      let userStatus = await axiosWithToken.get(
        `http://localhost:4000/admin-api/user-status/${username}`
      );
      console.log(userStatus.data.payload);
      return userStatus.data.payload;
    } catch (err) {
      console.log("error in userStatus", err);
    }
  }

// Fetch User activeStatuses
  useEffect(() => {
    const fetchUserStatus = async () => {
      const statuses = {};
      for (const article of articlesList) {
        const status = await getUserStatus(article);
        statuses[article.username] = status;
        console.log(statuses);
      }
      setUserStatus(statuses);
      }
      if (articlesList.length > 0) {
        fetchUserStatus();
    };
  }, [articlesList]);

  //make API call
  useEffect(()=>{
    getArticlesOfAllAuthors()
  },[])

  return (
    <div className='container mb-4'>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 mt-3 g-5">
        {articlesList.map((article)=>( 
          userStatus[article.username]&&
          <div className="col" key={article.articleId}>
            <div className="card articles_card h-100  shadow-sm">
              <div className="card-body">
              <div className="d-flex"><p className="fs-5 text-secondary "><FaUserCircle className='fs-3 me-1' />{article.username}</p></div>
              <img src={article.articleImg} className='w-100 rounded' alt="" />
                <h4 className='card-title mb-1 fs-3 text-capitalize'>{article.title}</h4>
                <span className= 'category fw-bold rounded-bottom rounded-top text-center py-sm-0 py-1  mb-3  px-2 ' style={{fontSize:'0.8rem',color:"#485789",backgroundColor:"#e5ebf4"}}>{article.category}</span>
                <p className='text-secondary'>{article.content.substring(0,100)+"....."}</p>
                <button className="custom-btn p-2 rounded-3 fw-medium  w-50 mx-auto d-block" onClick={()=>readArticleByArticleId(article)}>Read More</button>
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