import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: initState.favorite,
  reducers: {
    addFavoriteProduct(state, action) {
      const currentProduct = state.find((product) => product === action.payload)
      if (!currentProduct) state.unshift(action.payload)
    },
    deleteFavoriteProduct(state, action) {
      return state.filter((product) => product !== action.payload)
    },
  },
})

export const { addFavoriteProduct, deleteFavoriteProduct } = favoriteSlice.actions

export const getFavoriteSelector = (state) => state.favorite

export const favoriteReducer = favoriteSlice.reducer
