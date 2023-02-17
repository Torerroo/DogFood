import { configureStore } from '@reduxjs/toolkit'
import { DOGFOOD_LS_KEY } from './constants'
import { getInitState } from './initState'
import { cartReducer } from './slices/cartSlice'
import { filterReducer } from './slices/filterSlice'
import { userInfoReducer } from './slices/userInfoSlice'

export const store = configureStore({
  reducer: {
    user: userInfoReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
  preloadedState: getInitState(),
})

store.subscribe(() => {
  window.localStorage.setItem(DOGFOOD_LS_KEY, JSON.stringify(store.getState()))
})
