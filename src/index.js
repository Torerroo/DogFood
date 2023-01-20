import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Main } from './components/Main/Main'
import { SignUpPage } from './components/Pages/SignUpPage/SignUpPage'
import { SignInPage } from './components/Pages/SignInPage/SignInPage'
import { Products } from './components/Products/Products'

const root = ReactDOM.createRoot(document.getElementById('root'))

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
          path: 'product',
          element: <Products />,
        },
      ],
    },
  ],
  // { basename: '/DogFood' },
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
