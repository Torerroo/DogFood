import { configureStore } from '@reduxjs/toolkit'
import { DOGFOOD_LS_KEY } from './constants'
import { getInitState } from './initState'
import { cartReducer } from './slices/cartSlice'
import { filterReducer } from './slices/filterSlice'
import { tokenReducer } from './slices/getUserTokenSlice'

export const store = configureStore({
  reducer: {
    user: tokenReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
  preloadedState: getInitState(),
})

store.subscribe(() => {
  window.localStorage.setItem(DOGFOOD_LS_KEY, JSON.stringify(store.getState()))
})
