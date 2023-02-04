import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const getTokenSlice = createSlice({
  name: 'token',
  initialState: initState.token,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
    },
  },
})

export const { setToken } = getTokenSlice.actions

export const getTokenSelector = (state) => state.token

export const tokenReducer = getTokenSlice.reducer
