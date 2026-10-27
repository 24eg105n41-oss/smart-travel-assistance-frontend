import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, User, Home, Map, Briefcase, Bookmark, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const closeMenu = () => setMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    closeMenu();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <div className="logo-icon-wrap">
            <Compass className="logo-icon" size={24} />
          </div>
          <span className="logo-text">Smart<span className="logo-accent">Travel</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <Home size={17} />
            <span>Home</span>
          </NavLink>
          
          <NavLink to="/explore" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Map size={17} />
            <span>Explore</span>
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={17} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/trips" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Briefcase size={17} />
                <span>My Trips</span>
              </NavLink>
              <NavLink to="/saved" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Bookmark size={17} />
                <span>Saved</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* Auth CTA Actions */}
        <div className="navbar-actions">
          {isAuthenticated ? (
            <div className="user-profile-area">
              <button
                className="user-avatar-btn"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                aria-label="User menu"
              >
                <div className="user-avatar">
                  {getInitials(user?.name)}
                </div>
                <span className="user-name-text">{user?.name || 'User'}</span>
              </button>

              {profileDropdownOpen && (
                <div className="profile-dropdown animate-fade-in">
                  <div className="dropdown-user-info">
                    <div className="dropdown-avatar">
                      {getInitials(user?.name)}
                    </div>
                    <div>
                      <p className="dropdown-user-name">{user?.name || 'User'}</p>
                      <p className="dropdown-user-email">{user?.email || ''}</p>
                    </div>
                  </div>
                  <div className="dropdown-divider" />
                  <Link
                    to="/dashboard"
                    className="dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <LayoutDashboard size={16} />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </Link>
                  <button className="dropdown-item dropdown-logout" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost nav-login-btn">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary nav-register-btn">
                <User size={16} />
                <span>Get Started</span>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer animate-fade-in">
          <NavLink to="/" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu} end>
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
            <Map size={18} />
            <span>Explore</span>
          </NavLink>

          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/trips" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                <Briefcase size={18} />
                <span>My Trips</span>
              </NavLink>
              <NavLink to="/saved" className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`} onClick={closeMenu}>
                <Bookmark size={18} />
                <span>Saved</span>
              </NavLink>
              <div className="mobile-drawer-divider" />
              <div className="mobile-user-info">
                <div className="user-avatar mobile-avatar">
                  {getInitials(user?.name)}
                </div>
                <div>
                  <p className="mobile-user-name">{user?.name || 'User'}</p>
                  <p className="mobile-user-email">{user?.email || ''}</p>
                </div>
              </div>
              <Link to="/profile" className="btn btn-secondary mobile-btn" onClick={closeMenu} style={{marginBottom: '10px'}}>
                <User size={16} />
                <span>Profile</span>
              </Link>
              <button className="btn btn-secondary mobile-btn" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <div className="mobile-drawer-divider" />
              <Link to="/login" className="btn btn-secondary mobile-btn" onClick={closeMenu}>
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary mobile-btn" onClick={closeMenu}>
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
