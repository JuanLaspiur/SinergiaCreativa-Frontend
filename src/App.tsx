import 'animate.css';
import { AuthProvider } from './contexts/AuthContext';
import { SalesProvider } from './contexts/SaleContext'; 
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
    },
  ]);

  return (
    <AuthProvider>
      <SalesProvider>
        <RouterProvider router={router} />
      </SalesProvider>
    </AuthProvider>
  );
}

export default App;
