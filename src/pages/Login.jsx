import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Compass, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setStatusMessage({ type: 'error', text: 'Please fill in both email and password.' });
      return;
    }
    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });
      // Store token and basic user info via AuthContext
      const { token, userId, email, name, role } = response.data;
      login(token, { userId, email, name, role });
      setStatusMessage({ type: 'success', text: 'Login successful! Redirecting...' });
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Invalid credentials. Please try again.';
      setStatusMessage({ type: 'error', text: errMsg });
    }
  };

  const fillDemo = () => {
    setFormData({ email: 'traveler@smarttravel.com', password: 'password123' });
    setStatusMessage(null);
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo-badge">
              <Compass size={28} />
            </div>
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Sign in to manage your smart travel trips &amp; itineraries</p>
          </div>

          {statusMessage && (
            <div className={`auth-alert ${statusMessage.type === 'error' ? 'alert-error' : 'alert-success'} animate-fade-in`}>
              {statusMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email-input">Email Address</label>
              <div className="form-input-wrapper">
                <Mail className="form-input-icon" size={18} />
                <input
                  id="email-input"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password-input">Password</label>
              <div className="form-input-wrapper">
                <Lock className="form-input-icon" size={18} />
                <input
                  id="password-input"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full-width">
              <span>Sign In to Smart Travel</span>
              <ArrowRight size={18} />
            </button>

            <button type="button" onClick={fillDemo} className="btn btn-secondary btn-full-width demo-btn">
              ⚡ Quick Fill Demo Credentials
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account yet?{' '}
              <Link to="/register" className="auth-switch-link">
                Sign up free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
