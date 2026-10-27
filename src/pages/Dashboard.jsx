import React, { useState } from 'react';
import { 
  Plane, MapPin, Calendar, Clock, Sparkles, Bell, 
  Plus, CheckCircle, ChevronRight, Compass, ShieldAlert,
  Sun, DollarSign, Download, Share2, MoreHorizontal
} from 'lucide-react';
import './Dashboard.css';
import AssistanceOptions from '../components/AssistanceOptions';
import UserProfile from '../components/UserProfile';
import SavedPlaces from '../components/SavedPlaces';
import LogoutButton from '../components/LogoutButton';
import TravelMap from '../components/TravelMap';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const stats = [
    { label: 'Upcoming Trips', value: '2', sub: 'Next in 16 days', icon: <Plane className="stat-icon-blue" size={22} /> },
    { label: 'Destinations Visited', value: '14', sub: 'Across 6 countries', icon: <MapPin className="stat-icon-emerald" size={22} /> },
    { label: 'Traveler Miles / Pts', value: '18,420', sub: '+1,200 this month', icon: <Sparkles className="stat-icon-amber" size={22} /> },
    { label: 'Live Travel Alerts', value: '3 Active', sub: 'Weather & gate updates', icon: <Bell className="stat-icon-purple" size={22} /> }
  ];

  const upcomingTrip = {
    title: 'Japan Spring Blossom Expedition',
    destinations: 'Tokyo • Kyoto • Osaka',
    dates: 'Oct 12 - Oct 20, 2026',
    duration: '9 Days',
    status: 'Confirmed',
    itineraryDays: [
      { day: 'Day 1', time: '14:30', title: 'Arrival at Tokyo Haneda & Check-in', desc: 'Transfer to Shinjuku, dinner in Omoide Yokocho' },
      { day: 'Day 2', time: '09:00', title: 'Meiji Shrine & Shibuya Sky Deck', desc: 'Morning cultural walk followed by sunset panorama' },
      { day: 'Day 3', time: '08:15', title: 'Shinkansen Express to Kyoto', desc: 'Check into traditional Machiya, explore Gion lantern alley' },
      { day: 'Day 4', time: '06:30', title: 'Fushimi Inari Sunrise Hike', desc: 'Beat crowds at thousand torii gates, Arashiyama bamboo forest' }
    ]
  };

  const bucketList = [
    { name: 'Reykjavik, Iceland', category: 'Northern Lights & Glaciers', budget: '$1,800', bestMonth: 'Nov - Feb' },
    { name: 'Queenstown, New Zealand', category: 'Fjords & Adventure Sports', budget: '$2,100', bestMonth: 'Dec - Mar' },
    { name: 'Lisbon & Sintra, Portugal', category: 'Castles & Atlantic Coast', budget: '$1,150', bestMonth: 'May - Sep' }
  ];

  return (
    <div className="dashboard-page animate-fade-in">
      <div className="container dashboard-container">
        <AssistanceOptions />
        <UserProfile />
        <SavedPlaces />
        <LogoutButton />
        {/* Welcome Top Header */}
        <div className="dashboard-header">
          <div className="user-welcome">
            <div className="user-avatar">
              <span>ST</span>
            </div>
            <div>
              <div className="welcome-tag-row">
                <h1 className="welcome-title">Welcome back, Sannitha!</h1>
                <span className="badge badge-blue">
                  <Sparkles size={12} /> Smart Explorer Tier
                </span>
              </div>
              <p className="welcome-sub">
                Here is your live travel overview, scheduled itineraries, and real-time assistance updates.
              </p>
            </div>
          </div>

          <div className="dashboard-header-actions">
            <button className="btn btn-secondary" onClick={() => alert('Itinerary PDF download simulated!')}>
              <Download size={16} />
              <span>Export PDF</span>
            </button>
            <button className="btn btn-primary" onClick={() => alert('New trip planner modal will open here!')}>
              <Plus size={16} />
              <span>Plan New Trip</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((s, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-card-top">
                <span className="stat-label">{s.label}</span>
                <div className="stat-icon-wrap">{s.icon}</div>
              </div>
              <div className="stat-value">{s.value}</div>
              <span className="stat-sub">{s.sub}</span>
            </div>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="dashboard-main-grid">
          {/* Left Column: Itineraries & Trips */}
          <div className="dashboard-content-col">
            {/* Primary Upcoming Trip Card */}
            <div className="trip-overview-card">
              <div className="trip-header">
                <div>
                  <div className="trip-badge-row">
                    <span className="badge badge-green">
                      <CheckCircle size={12} /> {upcomingTrip.status}
                    </span>
                    <span className="trip-duration-tag">
                      <Clock size={13} /> {upcomingTrip.duration}
                    </span>
                  </div>
                  <h2 className="trip-title">{upcomingTrip.title}</h2>
                  <p className="trip-subdest">
                    <MapPin size={15} /> {upcomingTrip.destinations}
                  </p>
                </div>
                <div className="trip-dates-box">
                  <Calendar size={18} className="text-blue" />
                  <div>
                    <span className="trip-dates-label">Travel Dates</span>
                    <span className="trip-dates-val">{upcomingTrip.dates}</span>
                  </div>
                </div>
              </div>

              {/* Day Highlights */}
              <div className="trip-itinerary-preview">
                <h3 className="section-mini-heading">Day-by-Day Smart Schedule</h3>
                <div className="timeline-list">
                  {upcomingTrip.itineraryDays.map((item, index) => (
                    <div key={index} className="timeline-item">
                      <div className="timeline-badge">{item.day}</div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <h4 className="timeline-title">{item.title}</h4>
                          <span className="timeline-time">{item.time}</span>
                        </div>
                        <p className="timeline-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="trip-card-actions">
                <button className="btn btn-primary" onClick={() => alert('Full itinerary viewer ready')}>
                  View Complete 9-Day Plan
                </button>
                <button className="btn btn-secondary" onClick={() => alert('Flight and Hotel details')}>
                  Flight & Hotel Vouchers
                </button>
              </div>
            </div>

            {/* Explore Destinations Map Card */}
            <div className="trip-overview-card dashboard-map-card">
              <div className="section-header" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                    Explore Destinations
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                    Interactive OpenStreetMap view of top destinations in Visakhapatnam
                  </p>
                </div>
                <span className="badge badge-blue">
                  <MapPin size={12} /> Visakhapatnam
                </span>
              </div>
              <TravelMap />
            </div>

            {/* Saved Destinations / Bucket List */}
            <div className="bucketlist-card">
              <div className="bucketlist-header">
                <div>
                  <h3 className="bucketlist-title">Saved Bucket List Destinations</h3>
                  <p className="bucketlist-sub">Smart suggestions ready for one-click itinerary generation.</p>
                </div>
                <button className="btn btn-ghost" onClick={() => alert('Add to bucket list')}>
                  + Add Place
                </button>
              </div>

              <div className="bucketlist-items">
                {bucketList.map((place, idx) => (
                  <div key={idx} className="bucketlist-row">
                    <div className="bucketlist-info">
                      <div className="bucketlist-icon-wrap">
                        <Compass size={18} />
                      </div>
                      <div>
                        <h4 className="bucketlist-name">{place.name}</h4>
                        <span className="bucketlist-cat">{place.category} • Best: {place.bestMonth}</span>
                      </div>
                    </div>
                    <div className="bucketlist-action">
                      <span className="bucketlist-budget">{place.budget}</span>
                      <button className="btn btn-secondary btn-sm" onClick={() => alert(`Generating smart itinerary for ${place.name}`)}>
                        Generate Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Smart Travel Assistant Widgets */}
          <aside className="dashboard-sidebar-col">
            {/* Live Assistant Widget */}
            <div className="widget-card assistance-widget">
              <div className="widget-header">
                <div className="widget-icon-wrap">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="widget-title">Live Travel Intelligence</h3>
                  <span className="widget-sub">Tokyo, Japan (Destination)</span>
                </div>
              </div>

              <div className="widget-list">
                <div className="widget-item">
                  <div className="widget-item-icon text-amber">
                    <Sun size={18} />
                  </div>
                  <div>
                    <span className="item-label">Local Weather Forecast</span>
                    <p className="item-val">19°C • Mild & Clear skies</p>
                  </div>
                </div>

                <div className="widget-item">
                  <div className="widget-item-icon text-blue">
                    <Plane size={18} />
                  </div>
                  <div>
                    <span className="item-label">Inbound Flight NH802</span>
                    <p className="item-val">On Time • Gate 42B</p>
                  </div>
                </div>

                <div className="widget-item">
                  <div className="widget-item-icon text-green">
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <span className="item-label">Live Exchange Rate</span>
                    <p className="item-val">1 USD = 152.4 JPY</p>
                  </div>
                </div>

                <div className="widget-item">
                  <div className="widget-item-icon text-purple">
                    <ShieldAlert size={18} />
                  </div>
                  <div>
                    <span className="item-label">Travel Advisory</span>
                    <p className="item-val">Transit pass pickup at Terminal 3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Support Card */}
            <div className="widget-card support-card">
              <h3 className="widget-title">Need Real-Time Help?</h3>
              <p className="support-desc">
                Your 24/7 Smart Travel Desk is ready to assist with flights, itinerary alterations, and local emergencies.
              </p>
              <button className="btn btn-secondary btn-full-width" onClick={() => alert('Connecting to Smart Travel Concierge...')}>
                Open Assistance Chat
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
