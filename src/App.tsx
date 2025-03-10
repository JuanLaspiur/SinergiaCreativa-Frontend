 import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
 import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
function App() {

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <Dashboard />,
},
    {
      path: "/",
      element: <Login />,
}])

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
