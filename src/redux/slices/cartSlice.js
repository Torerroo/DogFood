import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    addNewProductInCart(state, action) {
      const newProduct = {
        [action.payload.id]: {
          count: 1,
          isChecked: false,
        },
      }
      Object.assign(state, newProduct)
    },
    deleteProductInCart(state, action) {
      delete state[action.payload]
    },
    clearCart() {
      return {}
    },
    countIncrement(state, action) {
      state[action.payload].count += 1
    },
    countDecrement(state, action) {
      state[action.payload].count -= 1
    },
  },
})

export const {
  addNewProductInCart, deleteProductInCart, clearCart, countIncrement, countDecrement,
} = cartSlice.actions

export const getCartProductsSelector = (state) => state.cart

export const cartReducer = cartSlice.reducer