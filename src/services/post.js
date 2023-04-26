import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath : 'blogApi',
    baseQuery : fetchBaseQuery({
        baseUrl: "https://blogback-ten.vercel.app/"
    }),

    endpoints : (builder)=>({
        getallblog : builder.query({
            query:()=>({
                url:"allblog",
                method : "GET"
            })
        }),
        getblogbycategory : builder.mutation({
            query:(category)=>{
                console.log("category from",category)
                return {
                    url:`category`,
                    method:"POST",
                    body:category
                }
            }
        }),
        getblogbyname : builder.mutation({
            query:(namedata)=>{
                console.log("namedata from",namedata)
                return {
                    url:`myblog`,
                    method:"POST",
                    body:namedata
                }
            }
        }),
        deleteBlog : builder.mutation({
            query: (deletedata)=>{
                console.log("deletedata",deletedata)
                return {
                    url:"deleteblog",
                    method:"DELETE",
                    body:deletedata
                }
            }
        }),
        createblog : builder.mutation({
            query: (createblogdata)=>{
                console.log("createblogdata",createblogdata)
                return {
                    url:"createblog",
                    method:"POST",
                    body:createblogdata
                }
            }
        }),
        updateblog : builder.mutation({
            query: (updateblogdata)=>{
                console.log("updateblogdata",updateblogdata)
                return {
                    url:"updateblog",
                    method:"PUT",
                    body:updateblogdata
                }
            }
        }),
        sortedblog : builder.mutation({
            query: ()=>{
                return {
                    url:"sortedblog",
                    method:"POST",
                }
            }
        }),
        userregister : builder.mutation({
            query : (registerdata)=>{
                return {
                    url: "register",
                    method:"POST",
                    body:registerdata
                }
            }
        }),
        userlogin : builder.mutation({
            query: (user)=>{
                console.log("user",user)
                return {
                    url:"login",
                    method:"POST",
                    body:{
                        "name":user.name,
                        "password":user.password
                    }
                }
            }
        })
    })
})

export const { useGetblogbycategoryMutation , useSortedblogMutation, useGetblogbynameMutation , useUpdateblogMutation, useUserregisterMutation , useGetallblogQuery, useDeleteBlogMutation, useUserloginMutation, useCreateblogMutation } = blogApi