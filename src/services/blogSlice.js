import { createSlice } from '@reduxjs/toolkit'

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs:[]
  },
  reducers: {
    allblogs: (state, action) => {
      return state= {...state, blogs:action.payload}
    },
    searchblog: (state, action) => {
      if(action.payload!==''){
        return state = {...state, blogs:state.blogs.filter((c)=>c.title.toLowerCase().includes(action.payload.toLowerCase()))}
      }
      else{
        return {...state}
      }
    },
  },
})

export const { allblogs, searchblog } = blogSlice.actions

export default blogSlice.reducer