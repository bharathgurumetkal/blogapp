import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './AddArticle.css'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Articles() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let [err,setErr]=useState('')
    let {currentUser}=useSelector(state=>state.userAuthorLoginReducer)
    let navigate=useNavigate()
    //get the token from local storage
    let token=localStorage.getItem('token')

    const axiosWithToken=axios.create({
        headers:{Authorization:`Bearer ${token}`}
    })

    const postNewArticle=async(article)=>{
        article.dateOfCreation=new Date()
        article.dateOfModification=new Date()
        article.articleId=Date.now()
        article.username=currentUser.username
        article.comments=[]
        article.status=true
        //Make HTTP Post request
        let res=await axiosWithToken.post('http://localhost:4000/author-api/article',article)
        if(res.data.message==='New article created'){
            navigate(`/author-profile/articles-by-author/${currentUser.username}`)
        }
        else{
            setErr(res.data.message)
        }
    }

  return (
    <div>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-lg-8 col-md-8 col-sm-10">
                    <div className="card mb-3">
                        <h2 className='text-center p-3'>Write an Article</h2>
                        <div className="card-body">
                            {err.length!==0&&<p className='text-danger fs-4'>{err}</p>}
                            <form onSubmit={handleSubmit(postNewArticle)}>
                                <div className='mb-3'>
                                    <label htmlFor="title">Title</label>
                                    <input type="text"  id="title" className="title1 " {...register("title")} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="category" className="form-label">Select a category</label>
                                    <select  id="category" className='form-select' {...register("category")}>
                                        <option value="programming">Programming</option>
                                        <option value="machinelearning">MachineLearning</option>
                                        <option value="database">Database</option>
                                        <option value=""></option>
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="textarea">Content</label>
                                    <textarea name="content" id="content"  rows="10" className='form-control'{...register("content")}></textarea>
                                </div>
                                <button type='submit' className='btn btn-primary mx-auto d-block'>Publish</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Articles