import { createSlice } from '@reduxjs/toolkit'

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs:[],
    searchedblog:[]
  },
  reducers: {
    allblogs: (state, action) => {
      return state= {...state, blogs:action.payload}
    },
    searchblog: (state, action) => {
      console.log(action.payload)
      if(action.payload.input==''){
        return state = {...state, searchedblog:[]}
      }
      if(action.payload!==''){
        return state = {...state, searchedblog:state.blogs.filter((c)=>c.title.toLowerCase().includes(action.payload.input.toLowerCase()))}
      }
    },
  },
})

export const { allblogs, searchblog } = blogSlice.actions

export default blogSlice.reducer