import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { Main } from './components/Main/Main'
import { SignUpPage } from './components/Pages/SignUpPage/SignUpPage'
import { SignInPage } from './components/Pages/SignInPage/SignInPage'
import { Products } from './components/Products/Products'
import { TokenContextProvider } from './components/Contexts/TokenContextProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: 'signup',
          element: <SignUpPage />,
        },
        {
          path: 'signin',
          element: <SignInPage />,
        },
        {
          path: 'products',
          element: <Products />,
        },
      ],
    },
  ],
  // { basename: '/DogFood' },
)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <RouterProvider router={router} />
      </TokenContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
