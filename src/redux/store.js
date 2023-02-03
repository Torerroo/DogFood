import { configureStore } from '@reduxjs/toolkit'
import { tokenReducer } from './slices/getUserTokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
})
