
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate(); 
  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Admin Panel</h1>
      <p className="home-description">Please log in to continue.</p>
      <button className="login-button" onClick={handleLoginClick}>
        Login
      </button>
    </div>
  );
};

export default Home;
