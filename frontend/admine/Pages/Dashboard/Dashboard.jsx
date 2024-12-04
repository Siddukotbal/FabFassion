
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/admin/products">Manage Products</Link>
        <Link to="/admin/categories">Manage Categories</Link>
        <Link to="/admin/orders">Manage Orders</Link>
      </div>
    </div>
  );
};

export default Dashboard;
