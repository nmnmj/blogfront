import React, { useEffect, useState } from 'react';
import { useGetallblogQuery, useSortedblogMutation } from '../services/post';
import { useSelector, useDispatch } from 'react-redux';
import {allblogs } from '../services/blogSlice'

const BlogList = () => {
  let blogs = useSelector((state)=>state.blogs.blogs)   //state.reducername.statename
  const dispatch = useDispatch()
  
  const [blogListData, setBlogListData] = useState([]);
  const [key, setKey] = useState(Date.now()); // add a key state

  const { data: blogsData, isLoading, isError } = useGetallblogQuery({ key }); // pass the key to the hook
  const [sortedBlogs, sortedBlogResponse] = useSortedblogMutation();

  useEffect(() => {
    if (sortedBlogResponse.data) {
      setBlogListData(sortedBlogResponse.data);
      dispatch(allblogs(sortedBlogResponse.data))

    }
  }, [sortedBlogResponse]);

  useEffect(() => {
    setBlogListData(blogsData);
    dispatch(allblogs(blogsData))
  }, [blogsData]);

  console.log("bloger",blogs)
  // console.log(blogListData);
  
  return (
    <>
      <button
        onClick={async () => {
          await sortedBlogs();
        }}
      >
        Sort By Date
      </button>
      {blogs && blogs.map((blog, i) => (
        <div key={i}>
          <div className="card">
            <h5 className="card-header text-center">
              <span style={{ float: 'left', fontSize: '14px' }}>
                Category: {blog.category}
              </span>
              <u>{blog.title}</u>
              <span style={{ float: 'right', fontSize: '16px' }}>
                By: {blog.name}
              </span>
            </h5>
            <div className="card-body">
              <p className="card-text">{blog.description}</p>
              <span style={{ float: 'right', fontSize: '12px' }}>
                Posted:- {blog.time}
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogList;



// import React, { useEffect, useState } from 'react';
// import { useGetallblogQuery, useSortedblogMutation } from '../services/post';

// const BlogList = () => {
//   const [blogListData, setBlogListData] = useState([]);
//   const { data: blogsData, isLoading, isError } = useGetallblogQuery();
//   const [sortedBlogs, sortedBlogResponse] = useSortedblogMutation();

//   useEffect(() => {
//     if (sortedBlogResponse.data) {
//       console.log("sorted", sortedBlogResponse.data);
//       setBlogListData(sortedBlogResponse.data);
//     }
//   }, [sortedBlogResponse]);

//   useEffect(() => {
//     setBlogListData(blogsData);
//   }, [blogsData]);

//   console.log(blogListData);

//   return (
//     <>
//       <button
//         onClick={async () => {
//           await sortedBlogs();
//         }}
//       >
//         Sort By Date
//       </button>
//       {blogListData && blogListData.map((blog, i) => (
//         <div key={i}>
//           <div className="card">
//             <h5 className="card-header text-center">
//               <span style={{ float: 'left', fontSize: '14px' }}>
//                 Category: {blog.category}
//               </span>
//               <u>{blog.title}</u>
//               <span style={{ float: 'right', fontSize: '16px' }}>
//                 By: {blog.name}
//               </span>
//             </h5>
//             <div className="card-body">
//               <p className="card-text">{blog.description}</p>
//               <span style={{ float: 'right', fontSize: '12px' }}>
//                 Posted: {blog.time}
//               </span>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// };

// export default BlogList;
