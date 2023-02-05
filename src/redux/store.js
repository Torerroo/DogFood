import { configureStore } from '@reduxjs/toolkit'
import { dogFoodApi } from '../Api/DogFoodApi'
import { getInitState } from './initState'
import { filterReducer } from './slices/filterSlice'
import { tokenReducer } from './slices/getUserTokenSlice'

const REDUX_LS_KEY = 'DOGFOOD_LS_KEY'

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
store.subscribe(() => dogFoodApi.setToken(store.getState().user.token))
