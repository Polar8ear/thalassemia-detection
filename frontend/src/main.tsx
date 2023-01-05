import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

import App from './routes/App'
import Intro from './routes/Intro'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro/>,
  },
  {
    path: "/system",
    element: <App/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
