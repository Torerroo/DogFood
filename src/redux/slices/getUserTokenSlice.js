import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const getUserTokenSlice = createSlice({
  name: 'token',
  initialState: initState.token,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token', state.token)
    },
  },
})

export const { setToken } = getUserTokenSlice.actions

export const getUserTokenSelector = (state) => state.token

export const tokenReducer = getUserTokenSlice.reducer
