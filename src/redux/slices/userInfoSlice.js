import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userInfoSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setUserToken(state, action) {
      state.token = action.payload
    },
    setUserName(state, action) {
      state.name = action.payload
    },
    setUserEmail(state, action) {
      state.email = action.payload
    },
    setUserGroup(state, action) {
      state.group = action.payload
    },
    setUserAvatar(state, action) {
      state.avatar = action.payload
    },
    setUserAbout(state, action) {
      state.about = action.payload
    },
    setUserId(state, action) {
      state.id = action.payload
    },
    resetUserInfo() {
      return initState.user
    },
  },
})

export const {
  setUserToken, setUserName, setUserEmail, setUserGroup, setUserAvatar, resetUserInfo, setUserAbout,
  setUserId,
} = userInfoSlice.actions

export const getUserInfoSelector = (state) => state.user

export const userInfoReducer = userInfoSlice.reducer
