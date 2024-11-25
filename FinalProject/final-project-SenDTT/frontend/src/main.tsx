import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Global } from './Global.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import PolicyPage from './pages/PolicyPage.tsx'
import AddPolicyPage from './pages/AddPolicy.tsx'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
    ]
  },
  { path: '/p/:id', element: <PolicyPage /> },
  { path: '/add-policy', element: <AddPolicyPage /> }
]);

createRoot(document.getElementById('root')!).render(
  <Global>
    <RouterProvider router={routes} />
  </Global>,
)
