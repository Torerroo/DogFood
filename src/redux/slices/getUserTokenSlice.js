import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const getUserTokenSlice = createSlice({
  name: 'token',
  initialState: initState.user,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
  },
})

export const { setToken, getToken } = getUserTokenSlice.actions

export const getUserTokenSelector = (state) => state.user

export const tokenReducer = getUserTokenSlice.reducer
