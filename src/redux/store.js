import { configureStore } from '@reduxjs/toolkit'
import { filterReducer } from './slices/filterSlice'
import { tokenReducer } from './slices/getUserTokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    filter: filterReducer,
  },
})
