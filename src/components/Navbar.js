import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAdmin ? '/admin/dashboard' : '/profile'} className="navbar-brand">
          User Management System
        </Link>
        
        <div className="navbar-menu">
          <div className="navbar-user">
            <span className="user-name">{user?.fullName}</span>
            <span className="user-role">{user?.role?.toUpperCase()}</span>
          </div>
          
          <div className="navbar-links">
            {isAdmin ? (
              <Link to="/admin/dashboard" className="nav-link">
                Dashboard
              </Link>
            ) : (
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            )}
            
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
