import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import ProductList from './Pages/Product/ProductList'; // Assuming you have a ProductList component
import CategoryList from './Pages/CategoryList/CategoryList';
import OrderList from './Pages/OrderList/OrderList';
import PrivateRoute from './components/PrivateRoute'; // Component to handle route protection
import Home from './Pages/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>} // Explicit dashboard route
        />
        <Route
          path="/admin/products"
          element={<PrivateRoute><ProductList /></PrivateRoute>} // Protected route
        />
        <Route
          path="/admin/categories"
          element={<PrivateRoute><CategoryList /></PrivateRoute>} // Protected route
        />
        <Route
          path="/admin/orders"
          element={<PrivateRoute><OrderList /></PrivateRoute>} // Protected route
        />
        <Route
          path="/admin"
          element={<Navigate to="/admin/dashboard" />} // Redirect /admin to /admin/dashboard
        />
      </Routes>
    </Router>
  );
};

export default App;
