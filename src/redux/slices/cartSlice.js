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
    clearCart() {
      return {}
    },
  },
})

export const { addNewProductInCart, clearCart } = cartSlice.actions

export const getCartProductsSelector = (state) => state.cart

export const cartReducer = cartSlice.reducer
