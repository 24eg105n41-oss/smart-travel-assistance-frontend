import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Calendar, Users, Compass, 
  Sparkles, ShieldCheck, Clock, ArrowRight, Star,
  PlaneTakeoff, DollarSign, CloudSun
} from 'lucide-react';
import { getTravelPlaces } from '../services/api';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    date: '',
    travelers: '1 Traveler'
  });
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    // Load dynamic destinations from backend
    getTravelPlaces().then(res => {
      if (res.data && res.data.length > 0) {
        setDestinations(res.data.slice(0, 4));
      }
    }).catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchParams.destination) {
      navigate('/explore');
    }
  };

  const features = [
    {
      icon: <Sparkles className="feat-icon text-blue" size={26} />,
      title: 'Smart Itinerary Planner',
      desc: 'Generates optimized daily schedules based on your travel pace, budget, and personal interests.'
    },
    {
      icon: <CloudSun className="feat-icon text-amber" size={26} />,
      title: 'Live Travel & Weather Alerts',
      desc: 'Real-time notifications about local forecasts, airline updates, and transit alerts along your route.'
    },
    {
      icon: <DollarSign className="feat-icon text-green" size={26} />,
      title: 'Budget & Cost Optimization',
      desc: 'Intelligent cost breakdowns across accommodation, local transit, dining, and admission tickets.'
    },
    {
      icon: <ShieldCheck className="feat-icon text-purple" size={26} />,
      title: 'Safe Travel Assistance',
      desc: 'Instant emergency assistance contacts, local medical guides, and verified advisory alerts 24/7.'
    }
  ];

  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-badge-wrap">
            <span className="badge badge-blue">
              <Compass size={14} /> Smart Travel Intelligence Platform
            </span>
          </div>

          <h1 className="hero-title">
            Travel Smarter, Explore Deeper, <span className="highlight-text">Worry Less</span>
          </h1>

          <p className="hero-subtitle">
            Your all-in-one assistant for destination discovery, automated day-by-day itinerary planning, 
            and real-time journey insights powered by Java Spring Boot & React.
          </p>

          {/* Interactive Search Box */}
          <div className="search-card">
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-field">
                <label className="field-label">
                  <PlaneTakeoff size={15} /> Leaving From
                </label>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="New York, London, Tokyo..."
                  value={searchParams.origin}
                  onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                />
              </div>

              <div className="field-divider" />

              <div className="search-field">
                <label className="field-label">
                  <MapPin size={15} /> Going To
                </label>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Where is your dream journey?"
                  value={searchParams.destination}
                  onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                />
              </div>

              <div className="field-divider" />

              <div className="search-field">
                <label className="field-label">
                  <Calendar size={15} /> Departure Date
                </label>
                <input 
                  type="date" 
                  className="search-input" 
                  value={searchParams.date}
                  onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                />
              </div>

              <div className="field-divider" />

              <div className="search-field">
                <label className="field-label">
                  <Users size={15} /> Travelers
                </label>
                <select 
                  className="search-input select-input"
                  value={searchParams.travelers}
                  onChange={(e) => setSearchParams({ ...searchParams, travelers: e.target.value })}
                >
                  <option value="1 Traveler">1 Solo Traveler</option>
                  <option value="2 Travelers">2 Travelers (Couple)</option>
                  <option value="Family (3-5)">Family (3-5)</option>
                  <option value="Group (6+)">Group (6+)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary search-submit-btn">
                <Search size={18} />
                <span>Explore Now</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="section destinations-section" id="destinations">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="badge badge-coral">Top Curated Trips</span>
              <h2 className="section-title">Popular Destinations for Smart Travelers</h2>
              <p className="section-desc">Handcrafted itineraries with automated scheduling and verified travel assistance.</p>
            </div>
            <Link to="/explore" className="btn btn-secondary view-all-btn">
              <span>View All Places</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="destinations-grid">
            {destinations.length > 0 ? destinations.map((dest) => (
              <div key={dest.id} className="dest-card">
                <div className="dest-img-wrap">
                  <img src={dest.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'} alt={dest.name} className="dest-img" loading="lazy" />
                  <span className="dest-tag">{dest.category}</span>
                  <div className="dest-rating">
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span>4.8</span>
                  </div>
                </div>

                <div className="dest-body">
                  <div className="dest-meta-header">
                    <span className="dest-category"><MapPin size={13} /> {dest.location}</span>
                  </div>

                  <h3 className="dest-name">{dest.name}</h3>
                  <p className="dest-highlights">{dest.description?.substring(0, 80)}...</p>

                  <div className="dest-footer">
                    <Link to="/explore" className="btn btn-primary dest-cta-btn w-100" style={{marginTop: '10px'}}>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )) : (
              <p>Loading premium destinations...</p>
            )}
          </div>
        </div>
      </section>

      {/* Why Smart Travel Features */}
      <section className="section features-section" id="features">
        <div className="container">
          <div className="section-header center">
            <span className="badge badge-blue">Intelligent Assistance</span>
            <h2 className="section-title">Engineered to Solve Real Travel Hassles</h2>
            <p className="section-desc">From the moment you begin daydreaming to the flight back home, we have you covered.</p>
          </div>

          <div className="features-grid">
            {features.map((item, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon-box">{item.icon}</div>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <span className="badge badge-coral">Start Your Journey Today</span>
              <h2 className="cta-title">Ready for Your Next Intelligent Adventure?</h2>
              <p className="cta-desc">
                Join thousands of travelers who organize trips effortlessly with smart recommendations and personalized itineraries.
              </p>
              <div className="cta-buttons">
                <Link to="/register" className="btn btn-accent cta-btn-lg">
                  Create Free Account
                </Link>
                <Link to="/explore" className="btn btn-secondary cta-btn-lg">
                  Start Exploring
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
