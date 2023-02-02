import { configureStore } from '@reduxjs/toolkit'
import { tokenReducer } from './slices/getTokenSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
  },
  preloadedState: '',
})
