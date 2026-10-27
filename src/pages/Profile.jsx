import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Shield, Edit2, Save } from 'lucide-react';
import { getUserProfile, updateUserProfile } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

export default function Profile() {
  const { user, login } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const res = await getUserProfile(user.id);
      setProfile(res.data);
      setFormData({ name: res.data.name, phone: res.data.phone || '' });
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserProfile(user.id, formData);
      setProfile(res.data);
      setIsEditing(false);
      // Update local storage user data
      const updatedUser = { ...user, name: res.data.name };
      login(updatedUser); // Update context
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (loading) {
    return <div className="container loading-spinner" style={{padding: '100px 0'}}>Loading profile...</div>;
  }

  return (
    <div className="profile-page container animate-fade-in">
      <div className="profile-header">
        <div className="profile-avatar-large">
          {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h1>{profile?.name}</h1>
          <p className="profile-role">
            <Shield size={16} /> {profile?.role === 'ROLE_ADMIN' ? 'Administrator' : 'Traveler'}
          </p>
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-card-header">
            <h2>Personal Information</h2>
            {!isEditing ? (
              <button className="btn btn-ghost btn-sm" onClick={() => setIsEditing(true)}>
                <Edit2 size={16} /> Edit
              </button>
            ) : (
              <button className="btn btn-ghost btn-sm text-danger" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            )}
          </div>
          
          <div className="profile-card-body">
            {isEditing ? (
              <form onSubmit={handleUpdate} className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={profile?.email} disabled title="Email cannot be changed" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone} 
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                  <Save size={16} /> Save Changes
                </button>
              </form>
            ) : (
              <div className="profile-info-list">
                <div className="info-item">
                  <User className="info-icon" size={20} />
                  <div>
                    <span className="info-label">Full Name</span>
                    <span className="info-value">{profile?.name}</span>
                  </div>
                </div>
                <div className="info-item">
                  <Mail className="info-icon" size={20} />
                  <div>
                    <span className="info-label">Email Address</span>
                    <span className="info-value">{profile?.email}</span>
                  </div>
                </div>
                <div className="info-item">
                  <Phone className="info-icon" size={20} />
                  <div>
                    <span className="info-label">Phone Number</span>
                    <span className="info-value">{profile?.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
