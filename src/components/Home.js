import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Blogreducer } from '../reducers/Blogreducer'
import { useCreateblogMutation, useDeleteBlogMutation, useGetblogbynameMutation, useUpdateblogMutation } from '../services/post'

const Home = () => {
    const navigate = useNavigate()
    const [description, setDescription] = useState('')
    const [state, dispatch] = useReducer(Blogreducer, {
        blogs: [],
        updateblog: []
    })

    const [updateblog, updateresponse] = useUpdateblogMutation()
    const [deleteblog, deleteresponse] = useDeleteBlogMutation()
    const [addblog, addresponse] = useCreateblogMutation()
    const [getmyblog, myblogresponse] = useGetblogbynameMutation()

    useEffect(() => {
        if (updateresponse.data) {
            dispatch({
                type: 'myblogs',
                payload: updateresponse.data
            })
            console.log('update=', updateresponse.data)
        }
    }, [updateresponse])

    useEffect(() => {
        if (addresponse.data) {
            dispatch({
                type: 'myblogs',
                payload: addresponse.data
            })
            console.log('added=', addresponse.data)
        }
    }, [addresponse])

    useEffect(() => {
        if (deleteresponse.data) {
            dispatch({
                type: 'myblogs',
                payload: deleteresponse.data
            })
            console.log('delete=', deleteresponse.data)
        }
    }, [deleteresponse])

    useEffect(() => {
        if (myblogresponse.data) {
            console.log('myblogs', myblogresponse.data)
            dispatch({
                type: 'myblogs',
                payload: myblogresponse.data
            })
        }
    }, [myblogresponse])

    useEffect(() => {
        getmyblog({ name: localStorage.getItem('name') })
    }, [addresponse, getmyblog])

    useEffect(() => {
        getmyblog({ name: localStorage.getItem('name') })
    }, [getmyblog])

    // console.log(state)
  return (
    <>
        {
            Array.isArray(state.blogs) && state.blogs.map((blog,i)=>{
                return <>
                        <div className="card" key={i}>
                            <h5 className="card-header text-center">
                                <span style={{ float: 'left', fontSize: '14px' }}>
                                Category: {blog.category}
                                </span>
                                <u>{blog.title}</u>
                                <span style={{ float: 'right', fontSize: '16px' }}>
                                    By: {blog.name}
                                    <button className='ms-5' onClick={()=>{
                                        dispatch({
                                            type:"addtoupdate",
                                            payload:{
                                                _id:blog._id,
                                                name:blog.name,
                                                description:(blog.description || description)
                                            }
                                        })
                                       
                                    }} >
                                    <i className="fa fa-edit text-success"></i>
                                    </button>
                                    <button className='ms-2' onClick={async()=>{
                                        
                                        let adata = {
                                            _id:blog._id
                                        }
                                        await deleteblog(adata)
                                        if(deleteresponse.isLoading) return <div>
                                            Deleting...
                                        </div>
                                    }} >
                                    <i className="fa fa-trash text-danger"></i>
                                    </button>
                                </span>
                            </h5>
                            <div className="card-body">
                                {
                                    state.updateblog.some(b=>b._id===blog._id) 
                                    ?
                                    <>
                                        <textarea
                                            id="description"
                                            rows="4"
                                            style={{width:"100%"}}
                                            value={description || blog.description}
                                            onChange={(event) => {
                                                setDescription(event.target.value)
                                            }}
                                        />
                                        <button className='btn btn-success' onClick={async ()=>{
                                            console.log(description)
                                            let adata = {
                                                _id:blog._id,
                                                name:blog.name,
                                                description
                                            }
                                            dispatch({
                                                type:"removeupdated",
                                                payload:blog
                                            })
                                            // console.log(adata)
                                            await updateblog(adata)
                                            if(updateresponse.isLoading) return <div>
                                                Updating...
                                            </div>
                                            
                                            // await updateblog(adata) 
                                            // document.getElementById("upd").reset()
                                        }} >Update</button>
                                    </>
                                    :
                                    <p className="card-text">{blog.description}</p>
                                }
                                <span style={{ float: 'right', fontSize: '12px' }}>
                                Posted: {blog.time}
                                </span>
                            </div>
                        </div>
                </>
            })
        }
        
        {
            localStorage.getItem("name")!=null ?
            <div>
                <form id="addblog" onSubmit={async(e)=>{
                    e.preventDefault()
                    let dataa = new FormData(e.currentTarget)
                    let adata = {
                        name:dataa.get("name"),
                        title:dataa.get("title"),
                        description: dataa.get("description"),
                        category:dataa.get("category")
                    }
                    console.log(adata)
                    await addblog(adata)
                    if(addresponse.isLoading) return <div>
                        Adding...
                    </div>
                    document.getElementById("addblog").reset()
                }}>
                    <h3 style={{textAlign:"center"}}>
                        <u>
                        Add New Blog
                        </u>
                        </h3>
                    <input type="text" name="title" placeholder='Title*' required />
                    <textarea rows="5" className='form-control' name="description" placeholder='description*'></textarea>
                    Category :- <select name="category" className='mt-2'>
                        <option>food</option>
                        <option>education</option>
                        <option>business</option>
                        <option>position</option>
                    </select>
                    <input type="text" name="name" value={localStorage.getItem("name")} hidden /> <br />
                    <button className='btn btn-primary mt-3' type="submit">Add Blog</button>
                </form>
    
                <button className='btn btn-danger mt-5' onClick={()=>{
                    localStorage.removeItem("name")
                    navigate("/")
                }}>Logout</button>
                
            </div>
            :
            <div>
                
            </div>

        }
    </>
  )
}

export default Home