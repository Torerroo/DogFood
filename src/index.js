import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import React from 'react'
import App from './App'
import { Main } from './components/Main/Main'
import { SignUpPage } from './components/SignUpPage/SignUpPage'
import { SignInPage } from './components/SignInPage/SignInPage'
import { store } from './redux/store'
import { CartPage } from './components/CartPage/CartPage'
import { Catalog } from './components/Catalog/Catalog'
import { AccountPage } from './components/AccountPage/AccountPage'
import { FavoritesPage } from './components/FavoritesPage/FavoritesPage'

const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})
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
          path: 'catalog',
          element: <Catalog />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: 'account',
          element: <AccountPage />,
        },
        {
          path: 'favorites',
          element: <FavoritesPage />,
        },
      ],
    },
  ],
  // { basename: '/DogFood' },
)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
