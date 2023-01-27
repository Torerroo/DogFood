import {
  useContext,
  useMemo, useEffect, useState, createContext,
} from 'react'
import { dogFoodApi } from '../components/Api/DogFoodApi'

export const TokenContext = createContext()

export function TokenContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const tokenFromLS = localStorage.getItem('token')
    return tokenFromLS ?? ''
  })

  useEffect(() => {
    localStorage.setItem('token', token)
    dogFoodApi.setToken(token)
  }, [token])

  const TokenValues = useMemo(() => ({
    token, setToken,
  }), [token])

  return (
    <TokenContext.Provider value={TokenValues}>
      {children}
    </TokenContext.Provider>
  )
}

export const useTokenContext = () => useContext(TokenContext)
