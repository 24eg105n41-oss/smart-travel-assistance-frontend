import React from 'react';
import { Compass, Heart, Globe, Shield, Sparkles } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-root">
      <div className="container footer-container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon-wrap-sm">
                <Compass size={20} />
              </div>
              <span className="logo-text">Smart<span className="logo-accent">Travel</span></span>
            </div>
            <p className="footer-desc">
              Your next-generation smart travel companion. Plan personalized itineraries, discover hidden gems, and travel with real-time assistance.
            </p>
            <div className="footer-badges">
              <span className="badge badge-blue"><Sparkles size={12} /> AI Assisted</span>
              <span className="badge badge-green"><Shield size={12} /> Verified Data</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/dashboard">Traveler Dashboard</a></li>
              <li><a href="/login">Account Login</a></li>
              <li><a href="/register">Sign Up Free</a></li>
            </ul>
          </div>

          {/* Travel Assistance */}
          <div className="footer-col">
            <h4 className="footer-col-title">Assistance Features</h4>
            <ul className="footer-links">
              <li><a href="#destinations">Curated Destinations</a></li>
              <li><a href="#planner">Smart Itinerary Planner</a></li>
              <li><a href="#alerts">Live Flight & Travel Alerts</a></li>
              <li><a href="#support">24/7 Smart Travel Desk</a></li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="footer-col">
            <h4 className="footer-col-title">Technology Stack</h4>
            <p className="footer-tech-note">
              Built with React.js, Java Spring Boot REST API, Spring Data JPA, Hibernate & MySQL.
            </p>
            <div className="footer-status-pill">
              <span className="status-dot"></span>
              <span>API Gateway Ready (:8080)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Smart Travel Assistance Application. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Service</a>
            <span>•</span>
            <a href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
