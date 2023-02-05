import { configureStore } from '@reduxjs/toolkit'
import { getInitState } from './initState'
import { filterReducer } from './slices/filterSlice'
import { tokenReducer } from './slices/getUserTokenSlice'

const REDUX_LS_KEY = 'REDUX_LS_KEY'

export const store = configureStore({
  reducer: {
    user: tokenReducer,
    filter: filterReducer,
  },
  preloadedState: getInitState(),
})

store.subscribe(() => {
  window.localStorage.setItem(REDUX_LS_KEY, JSON.stringify(store.getState()))
})
