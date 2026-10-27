import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Coffee, Bed, ArrowRight, Heart, Navigation2, CheckCircle2 } from 'lucide-react';
import { searchAll, getTravelPlaces, getRestaurants, getHotels } from '../services/api';
import TravelMap from '../components/TravelMap';
import './Explore.css';

export default function Explore() {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [data, setData] = useState({ places: [], restaurants: [], hotels: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [placesRes, restaurantsRes, hotelsRes] = await Promise.all([
        getTravelPlaces(),
        getRestaurants(),
        getHotels()
      ]);
      
      setData({
        places: placesRes.data || [],
        restaurants: restaurantsRes.data || [],
        hotels: hotelsRes.data || []
      });
    } catch (error) {
      console.error('Failed to load explore data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return loadInitialData();
    }
    
    try {
      setLoading(true);
      const res = await searchAll(query);
      setData({
        places: res.data?.places || [],
        restaurants: res.data?.restaurants || [],
        hotels: res.data?.hotels || []
      });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const Card = ({ item, type }) => (
    <div className="explore-card">
      <div className="explore-card-img" style={{ backgroundImage: `url(${item.imageUrl || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'})` }}>
        <button className="save-btn-overlay" onClick={(e) => { e.preventDefault(); alert('Saved to your bucket list!'); }}>
          <Heart size={18} />
        </button>
        <div className="explore-badge">
          {type === 'place' && <MapPin size={14} />}
          {type === 'restaurant' && <Coffee size={14} />}
          {type === 'hotel' && <Bed size={14} />}
          <span>{type === 'place' ? item.category : type === 'restaurant' ? item.cuisine : `₹${item.price}/night`}</span>
        </div>
      </div>
      <div className="explore-card-content">
        <div className="explore-card-header">
          <h3>{item.name}</h3>
          {item.rating && (
            <div className="explore-rating">
              <Star size={14} className="star-icon" />
              <span>{item.rating}</span>
            </div>
          )}
        </div>
        <p className="explore-card-location"><MapPin size={14} /> {item.location}</p>
        <p className="explore-card-desc">{item.description}</p>
        
        <div className="explore-card-features">
          <span className="feature-tag"><CheckCircle2 size={12} /> Popular</span>
          {type === 'hotel' && <span className="feature-tag"><CheckCircle2 size={12} /> Free WiFi</span>}
          {type === 'restaurant' && <span className="feature-tag"><CheckCircle2 size={12} /> Dine-in</span>}
          {type === 'place' && <span className="feature-tag"><CheckCircle2 size={12} /> Must Visit</span>}
        </div>

        <div className="explore-card-actions">
          <button className="btn btn-primary btn-sm btn-full" onClick={() => alert(`Opening details for ${item.name}`)}>
            <Navigation2 size={14} /> {type === 'hotel' ? 'Book Room' : type === 'restaurant' ? 'Reserve Table' : 'View Guide'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="explore-page animate-fade-in">
      <div className="explore-hero">
        <div className="container">
          <h1>Discover Your Next Adventure</h1>
          <p>Find the best places to visit, eat, and stay</p>
          
          <form className="explore-search-form" onSubmit={handleSearch}>
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search destinations, food, hotels..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>

      <div className="container explore-content">
        <div className="explore-section explore-map-section">
          <div className="section-header">
            <h2>Explore Destinations</h2>
          </div>
          <TravelMap />
        </div>

        <div className="explore-tabs">
          <button className={`explore-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All</button>
          <button className={`explore-tab ${activeTab === 'places' ? 'active' : ''}`} onClick={() => setActiveTab('places')}>Places</button>
          <button className={`explore-tab ${activeTab === 'restaurants' ? 'active' : ''}`} onClick={() => setActiveTab('restaurants')}>Dining</button>
          <button className={`explore-tab ${activeTab === 'hotels' ? 'active' : ''}`} onClick={() => setActiveTab('hotels')}>Hotels</button>
        </div>

        {loading ? (
          <div className="loading-spinner">Loading destinations...</div>
        ) : (
          <div className="explore-results">
            {(activeTab === 'all' || activeTab === 'places') && data.places.length > 0 && (
              <div className="explore-section">
                <div className="section-header">
                  <h2>Places to Visit</h2>
                  {activeTab === 'all' && <button className="btn btn-link" onClick={() => setActiveTab('places')}>View All <ArrowRight size={16} /></button>}
                </div>
                <div className="explore-grid">
                  {data.places.slice(0, activeTab === 'all' ? 4 : undefined).map(place => (
                    <Card key={`p-${place.id}`} item={place} type="place" />
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'restaurants') && data.restaurants.length > 0 && (
              <div className="explore-section">
                <div className="section-header">
                  <h2>Popular Dining</h2>
                  {activeTab === 'all' && <button className="btn btn-link" onClick={() => setActiveTab('restaurants')}>View All <ArrowRight size={16} /></button>}
                </div>
                <div className="explore-grid">
                  {data.restaurants.slice(0, activeTab === 'all' ? 4 : undefined).map(rest => (
                    <Card key={`r-${rest.id}`} item={rest} type="restaurant" />
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'hotels') && data.hotels.length > 0 && (
              <div className="explore-section">
                <div className="section-header">
                  <h2>Where to Stay</h2>
                  {activeTab === 'all' && <button className="btn btn-link" onClick={() => setActiveTab('hotels')}>View All <ArrowRight size={16} /></button>}
                </div>
                <div className="explore-grid">
                  {data.hotels.slice(0, activeTab === 'all' ? 4 : undefined).map(hotel => (
                    <Card key={`h-${hotel.id}`} item={hotel} type="hotel" />
                  ))}
                </div>
              </div>
            )}

            {!loading && data.places.length === 0 && data.restaurants.length === 0 && data.hotels.length === 0 && (
              <div className="no-results">
                <h3>No results found</h3>
                <p>Try adjusting your search terms</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
