const REDUX_LS_KEY = 'DOGFOOD_LS_KEY'

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

  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
