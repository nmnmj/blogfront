import React, { useEffect, useState } from 'react';
import { useGetallblogQuery, useSortedblogMutation } from '../services/post';
import { useSelector, useDispatch } from 'react-redux';
import {allblogs } from '../services/blogSlice'

const BlogList = () => {
  let blogs = useSelector((state)=>state.blogs.blogs)   //state.reducername.statename
  let searchedblog = useSelector((state)=>state.blogs.searchedblog)   //state.reducername.statename
  const dispatch = useDispatch()
  
  const [blogListData, setBlogListData] = useState([]);
  const [key, setKey] = useState(Date.now()); // add a key state

  const { data: blogsData, isLoading, isError } = useGetallblogQuery({ key }); // pass the key to the hook
  // console.log("blogsData",blogsData)


  const [sortedBlogs, sortedBlogResponse] = useSortedblogMutation();
  useEffect(() => {
    if (sortedBlogResponse.data) {
      setBlogListData(sortedBlogResponse.data);
      dispatch(allblogs(sortedBlogResponse.data))

    }
  }, [sortedBlogResponse]);

  useEffect(() => {
    // console.log("blogsData")
    setBlogListData(blogsData);
    dispatch(allblogs(blogsData))
    
  }, [blogsData]);


  // console.log("bloger",blogs)
  // console.log("searched blog",searchedblog)
  
  return (
    <>
      {
       Array.isArray(searchedblog) && 
       searchedblog.map((blog, i)=>{
        return <>
           <div key={i}>
            <div className="card">
              <h5 className="card-header text-center">
                <span style={{ float: 'left', fontSize: '1.4vw' }}>
                  Category: {blog.category}
                </span>
                <u style={{fontSize:"1.6vw"}}>{blog.title}</u>
                <span style={{ float: 'right', fontSize: '1.6vw' }}>
                  By: {blog.name}
                </span>
              </h5>
              <div className="card-body bg-secondary">
                <p className="card-text ">{blog.description}</p>
                <span style={{ float: 'right', fontSize: '1.2vw' }}>
                  Posted:- {blog.time}
                </span>
              </div>
            </div>
          </div>
        </>
       }) 
      }
      {
        searchedblog.length <= 0 &&
        <div>
          <button
            onClick={async () => {
              await sortedBlogs();
            }}
          >
            Sort By Date
          </button>
          <button onClick={()=>{
            dispatch(allblogs([...blogs].reverse()))
          }} >Sort Asce/Desc</button>
        </div>
        
      }
      

      { searchedblog.length <= 0 &&
      blogs ? blogs.map((blog, i) => (
        <div key={i}>
          <div className="card">
            <h5 className="card-header text-center">
              <span style={{ float: 'left', fontSize: '1.4vw' }}>
                Category: {blog.category}
              </span>
              <u style={{fontSize:"1.6vw"}}>{blog.title}</u>
              <span style={{ float: 'right', fontSize: '1.6vw' }}>
                By: {blog.name}
              </span>
            </h5>
            <div className="card-body">
              <p className="card-text">{blog.description}</p>
              <span style={{ float: 'right', fontSize: '1.2vw' }}>
                Posted:- {blog.time}
              </span>
            </div>
          </div>
        </div>
      ))
      :
      <div>
        {
          searchedblog.length <= 0 &&
          <div>
            Loading...
          </div>
        }
      </div>
      }
    </>
  );
};

export default BlogList;

