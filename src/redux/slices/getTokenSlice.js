import { createSlice } from '@reduxjs/toolkit'

const getTokenSlice = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    addNewToken(_, action) {
      localStorage.setItem('token', action.payload)
    },
  },
})

export const { addNewToken } = getTokenSlice.actions

export const tokenReducer = getTokenSlice.reducer
