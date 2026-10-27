import React, { useState, useEffect } from 'react';
import { Briefcase, Calendar, MapPin, Plus, Trash2, ArrowRight } from 'lucide-react';
import { getTrips, createTrip, deleteTrip } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Trips.css';

export default function Trips() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [newTrip, setNewTrip] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    notes: ''
  });

  useEffect(() => {
    loadTrips();
  }, [user]);

  const loadTrips = async () => {
    try {
      setLoading(true);
      const res = await getTrips(user.id);
      setTrips(res.data || []);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTrip = async (e) => {
    e.preventDefault();
    try {
      await createTrip(newTrip, user.id);
      setIsModalOpen(false);
      setNewTrip({ name: '', destination: '', startDate: '', endDate: '', notes: '' });
      loadTrips();
    } catch (error) {
      console.error('Failed to create trip:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await deleteTrip(id, user.id);
        loadTrips();
      } catch (error) {
        console.error('Failed to delete trip:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="trips-page container animate-fade-in">
      <div className="page-header">
        <div>
          <h1>My Trips</h1>
          <p>Manage your upcoming and past adventures</p>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} />
          <span>Plan New Trip</span>
        </button>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading your trips...</div>
      ) : trips.length > 0 ? (
        <div className="trips-grid">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <div className="trip-card-header">
                <h3>{trip.name}</h3>
                <button className="btn-icon text-danger" onClick={() => handleDelete(trip.id)} title="Delete Trip">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="trip-card-body">
                <p className="trip-detail"><MapPin size={16} /> {trip.destination}</p>
                <p className="trip-detail"><Calendar size={16} /> {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                {trip.notes && <p className="trip-notes">{trip.notes}</p>}
                
                <div className="trip-items-count">
                  <span>{trip.items?.length || 0} items planned</span>
                </div>
              </div>
              <div className="trip-card-footer">
                <button className="btn btn-secondary w-100">
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <Briefcase size={48} />
          </div>
          <h2>No trips planned yet</h2>
          <p>Start planning your next great adventure today.</p>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            Plan Your First Trip
          </button>
        </div>
      )}

      {/* Create Trip Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <h2>Plan a New Trip</h2>
            <form onSubmit={handleCreateTrip}>
              <div className="form-group">
                <label>Trip Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Summer Vacation 2024"
                  value={newTrip.name}
                  onChange={e => setNewTrip({...newTrip, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Goa, India"
                  value={newTrip.destination}
                  onChange={e => setNewTrip({...newTrip, destination: e.target.value})}
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Start Date</label>
                  <input 
                    type="date" 
                    required 
                    value={newTrip.startDate}
                    onChange={e => setNewTrip({...newTrip, startDate: e.target.value})}
                  />
                </div>
                <div className="form-group half">
                  <label>End Date</label>
                  <input 
                    type="date" 
                    required 
                    value={newTrip.endDate}
                    onChange={e => setNewTrip({...newTrip, endDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea 
                  placeholder="Any ideas or things to remember..."
                  rows="3"
                  value={newTrip.notes}
                  onChange={e => setNewTrip({...newTrip, notes: e.target.value})}
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Trip</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
