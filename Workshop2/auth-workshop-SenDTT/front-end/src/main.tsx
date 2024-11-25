import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { User } from './User.tsx';
import { Global } from './Global.tsx';
import { Login } from './Login.tsx';
import Signup from './Signup.tsx';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/user', element: <User /> },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global>
      <RouterProvider router={routes} />
    </Global>
  </StrictMode>,
)
