import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LogoutButton.css'; // Optional styling file – create if needed

/**
 * LogoutButton component
 * Clears authentication data via AuthContext and redirects to the login page.
 */
export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button className="btn btn-primary logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}
