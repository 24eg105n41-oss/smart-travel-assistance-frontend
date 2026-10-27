import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Mail, Lock, User, Phone, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic client‑side validation
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setStatusMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setStatusMessage({ type: 'error', text: 'Passwords do not match.' });
      return;
    }
    try {
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setStatusMessage({ type: 'success', text: response.data.message || 'Registration successful!' });
      // Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const errMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setStatusMessage({ type: 'error', text: errMsg });
    }
  };

  return (
    <div className="auth-page animate-fade-in">
      <div className="auth-container">
        <div className="auth-card register-card">
          <div className="auth-header">
            <div className="auth-logo-badge">
              <User size={28} />
            </div>
            <h1 className="auth-title">Create Free Account</h1>
            <p className="auth-subtitle">Join Smart Travel to plan trips with intelligent recommendations</p>
          </div>

          {statusMessage && (
            <div className={`auth-alert ${statusMessage.type === 'error' ? 'alert-error' : 'alert-success'} animate-fade-in`}>
              {statusMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
              <span>{statusMessage.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="name-input">Full Name</label>
              <div className="form-input-wrapper">
                <User className="form-input-icon" size={18} />
                <input
                  id="name-input"
                  type="text"
                  className="form-input"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

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
              <label className="form-label" htmlFor="phone-input">Phone Number</label>
              <div className="form-input-wrapper">
                <Phone className="form-input-icon" size={18} />
                <input
                  id="phone-input"
                  type="tel"
                  className="form-input"
                  placeholder="+1 555 123 4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row-2col">
              <div className="form-group">
                <label className="form-label" htmlFor="password-input">Password</label>
                <div className="form-input-wrapper">
                  <Lock className="form-input-icon" size={18} />
                  <input
                    id="password-input"
                    type="password"
                    className="form-input"
                    placeholder="Min 8 chars"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm-password-input">Confirm Password</label>
                <div className="form-input-wrapper">
                  <Lock className="form-input-icon" size={18} />
                  <input
                    id="confirm-password-input"
                    type="password"
                    className="form-input"
                    placeholder="Repeat password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full-width">
              <span>Create Account</span>
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-switch-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
