import React from 'react';
import './UserProfile.css';

const sampleUser = {
  name: 'Sannitha',
  avatar: 'ST', // placeholder initials
  email: 'sannitha@example.com',
  role: 'Traveler'
};

export default function UserProfile() {
  return (
    <section className="user-profile">
      <div className="avatar-circle">{sampleUser.avatar}</div>
      <div className="user-info">
        <h3>{sampleUser.name}</h3>
        <p>{sampleUser.email}</p>
        <span className="badge role-badge">{sampleUser.role}</span>
      </div>
    </section>
  );
}
