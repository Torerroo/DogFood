import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { Main } from './components/Main/Main'
import { SignUpPage } from './components/SignUpPage/SignUpPage'
import { SignInPage } from './components/SignInPage/SignInPage'
import { ProductsPage } from './components/ProductsPage/ProductsPage'
import { TokenContextProvider } from './Contexts/TokenContextProvider'

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
          element: <ProductsPage />,
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
