import { configureStore } from '@reduxjs/toolkit'
import blogSlice from '../services/blogSlice'

import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { blogApi } from '../services/post'

export const store = configureStore({
  reducer: {
    blogs : blogSlice,
    [blogApi.reducerPath] : blogApi.reducer
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(blogApi.middleware)
})

setupListeners(store.dispatch)