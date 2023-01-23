import {
  useMemo, useEffect, useState, createContext,
} from 'react'

export const TokenContext = createContext()
export function TokenContextProvider({ children }) {
  const [token, setToken] = useState(() => {
    const tokenFromLS = localStorage.getItem('token')
    return tokenFromLS || ''
  })

  useEffect(() => {
    localStorage.setItem('token', token)
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
