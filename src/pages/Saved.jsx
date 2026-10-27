import React, { useState, useEffect } from 'react';
import { Bookmark, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { getSavedPlaces, removeSavedPlace } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Saved.css';

export default function Saved() {
  const { user } = useAuth();
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    loadSavedPlaces();
  }, [user]);

  const loadSavedPlaces = async () => {
    try {
      setLoading(true);
      const res = await getSavedPlaces(user.id);
      setSavedItems(res.data || []);
    } catch (error) {
      console.error('Failed to load saved places:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeSavedPlace(id, user.id);
      setSavedItems(savedItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Failed to remove saved place:', error);
    }
  };

  const filteredItems = savedItems.filter(item => 
    activeFilter === 'ALL' || item.placeType === activeFilter
  );

  const getItemDetails = (item) => {
    if (item.placeType === 'TRAVEL_PLACE' && item.travelPlace) return { title: item.travelPlace.name, loc: item.travelPlace.location, img: item.travelPlace.imageUrl, tag: 'Place' };
    if (item.placeType === 'RESTAURANT' && item.restaurant) return { title: item.restaurant.name, loc: item.restaurant.location, img: item.restaurant.imageUrl, tag: 'Dining' };
    if (item.placeType === 'HOTEL' && item.hotel) return { title: item.hotel.name, loc: item.hotel.location, img: item.hotel.imageUrl, tag: 'Hotel' };
    return { title: 'Unknown', loc: '', img: '', tag: '' };
  };

  return (
    <div className="saved-page container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>Saved Places</h1>
          <p>Your curated list of destinations, dining, and stays</p>
        </div>
      </div>

      <div className="saved-filters">
        <button className={`filter-btn ${activeFilter === 'ALL' ? 'active' : ''}`} onClick={() => setActiveFilter('ALL')}>All Saved</button>
        <button className={`filter-btn ${activeFilter === 'TRAVEL_PLACE' ? 'active' : ''}`} onClick={() => setActiveFilter('TRAVEL_PLACE')}>Places</button>
        <button className={`filter-btn ${activeFilter === 'RESTAURANT' ? 'active' : ''}`} onClick={() => setActiveFilter('RESTAURANT')}>Restaurants</button>
        <button className={`filter-btn ${activeFilter === 'HOTEL' ? 'active' : ''}`} onClick={() => setActiveFilter('HOTEL')}>Hotels</button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading saved items...</div>
      ) : filteredItems.length > 0 ? (
        <div className="saved-grid">
          {filteredItems.map(item => {
            const details = getItemDetails(item);
            return (
              <div key={item.id} className="saved-card">
                <div className="saved-card-img" style={{ backgroundImage: `url(${details.img || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80'})` }}>
                  <div className="saved-badge">{details.tag}</div>
                  <button className="remove-saved-btn" onClick={() => handleRemove(item.id)} title="Remove from saved">
                    <Bookmark size={18} fill="white" />
                  </button>
                </div>
                <div className="saved-card-content">
                  <h3>{details.title}</h3>
                  <p className="saved-location"><MapPin size={14} /> {details.loc}</p>
                  {item.notes && <p className="saved-notes">"{item.notes}"</p>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <Bookmark size={48} />
          </div>
          <h2>No saved items found</h2>
          <p>You haven't saved any {activeFilter !== 'ALL' ? activeFilter.toLowerCase().replace('_', ' ') + 's' : 'places'} yet. Head over to Explore to find great spots.</p>
          <a href="/explore" className="btn btn-primary">Go to Explore</a>
        </div>
      )}
    </div>
  );
}
