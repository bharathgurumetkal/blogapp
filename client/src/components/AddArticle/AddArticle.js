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
    let [img,setImg]=useState(null)
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
        //create Form Data Object
        let formData=new FormData()
        formData.append("article",JSON.stringify(article))
        formData.append("photo",img)
        //Make HTTP Post request
        let res=await axiosWithToken.post('http://localhost:4000/author-api/article',formData)
        if(res.data.message==='New article created'){
            navigate(`/author-profile/articles-by-author/${currentUser.username}`)
        }
        else{
            setErr(res.data.message)
        }
    }
    //slect Image Function
    const onImgSelect=(event)=>{
        setImg(event.target.files[0])

    }

  return (
    <div className='m-2'>
        <div>
            <div className="row justify-content-center mt-5">
                <div className="col-lg-8 col-md-8 col-sm-10">
                    <div className="card mb-3">
                        <h2 className='text-center p-3 fs-2'>Write an Article</h2>
                        <div className="card-body">
                            {err.length!==0&&<p className='text-danger fs-4'>{err}</p>}
                            <form onSubmit={handleSubmit(postNewArticle)}>
                                <div className='mb-3'>                                   
                                    <input type="text"  id="title" className="title1 " {...register("title")} placeholder ="Title" />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="category" className="form-label fw-medium fs-5">Select a category</label>
                                    <select  id="category" className='form-select' {...register("category")}>
                                        <option value="programming">Programming</option>
                                        <option value="machinelearning">MachineLearning</option>
                                        <option value="database">Database</option>
                                        <option value="webdevelopment">Web development</option>
                                        
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="" className='fw-medium'>Add Photo</label>
                                    <input type="file" className='form-control' {...register("photo",{required:true})} onChange={(event)=>onImgSelect(event)} />
                                </div>
                                <div className='mb-3'>
                                    <label htmlFor="textarea" className='fw-medium fs-4 '>Content</label>
                                    <textarea name="content" id="content"  rows="10" className=''{...register("content")}></textarea>
                                </div>
                                <button type='submit' className='btn btn-success mx-auto d-block w-25 '>Publish</button>
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