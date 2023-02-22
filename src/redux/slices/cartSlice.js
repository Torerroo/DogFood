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
          isChecked: true,
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
    changeStatusIsChecked(state, action) {
      state[action.payload].isChecked = !state[action.payload].isChecked
    },
    changeAllStatusOnTrue(state) {
      const ids = Object.keys(state)
      ids.map((id) => {
        state[id].isChecked = true
        return id
      })
    },
    changeAllStatusOnFalse(state) {
      const ids = Object.keys(state)
      ids.map((id) => {
        state[id].isChecked = false
        return id
      })
    },
  },
})

export const {
  addNewProductInCart,
  deleteProductInCart,
  clearCart,
  countIncrement,
  countDecrement,
  changeStatusIsChecked,
  changeAllStatusOnTrue,
  changeAllStatusOnFalse,
} = cartSlice.actions

export const getCartProductsSelector = (state) => state.cart

export const cartReducer = cartSlice.reducer
