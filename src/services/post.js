import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from './token'

export const blogApi = createApi({
    reducerPath : 'blogApi',
    baseQuery : fetchBaseQuery({
        baseUrl: "https://blogback-73ba.vercel.app/"
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
                return {
                    url:`category`,
                    method:"POST",
                    body:category
                }
            }
        }),
        getblogbyname : builder.mutation({
            query:(namedata)=>{
                return {
                    url:`myblog`,
                    method:"POST",
                    body:namedata,
                    headers:{
                        'authorization': `Bearer ${getToken()}`
                    }
                }
            }
        }),
        deleteBlog : builder.mutation({
            query: (deletedata)=>{
                return {
                    url:"deleteblog",
                    method:"DELETE",
                    body:deletedata,
                    headers:{
                        'authorization': `Bearer ${getToken()}`
                    }
                }
            }
        }),
        createblog : builder.mutation({
            query: (createblogdata)=>{
                return {
                    url:"createblog",
                    method:"POST",
                    body:createblogdata,
                    headers:{
                        'authorization': `Bearer ${getToken()}`
                    }
                }
            }
        }),
        updateblog : builder.mutation({
            query: (updateblogdata)=>{
                return {
                    url:"updateblog",
                    method:"PUT",
                    body:updateblogdata,
                    headers:{
                        'authorization': `Bearer ${getToken()}`
                    }
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