import { dogFoodApi } from '../Api/DogFoodApi'

const REDUX_LS_KEY = 'REDUX_LS_KEY'

export const initState = {
  user: {
    token: '',
  },
  filter: {
    search: '',
  },
}
export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(REDUX_LS_KEY)
  const tokenFormLS = JSON.parse(dataFromLS)
  dogFoodApi.setToken(tokenFormLS.user.token)
  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
