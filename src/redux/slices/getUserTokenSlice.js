import { createSlice } from '@reduxjs/toolkit'

const getTokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: '',
  },
  reducers: {
    setToken(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.token = action.payload
      localStorage.setItem('token', state.token)
    },
  },
})

export const { setToken } = getTokenSlice.actions

export const getTokenSelector = (state) => state.token

export const tokenReducer = getTokenSlice.reducer
