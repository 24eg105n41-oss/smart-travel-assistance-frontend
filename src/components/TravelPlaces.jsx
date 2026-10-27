import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TravelPlaces.css';

export default function TravelPlaces() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/travelplaces')
      .then(res => {
        setPlaces(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load travel places');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading travel places...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="travel-places">
      <h2 className="section-title">Travel Places</h2>
      <div className="places-grid">
        {places.map(place => (
          <div key={place.id} className="place-card">
            <img src={place.imageUrl} alt={place.name} className="place-img" />
            <div className="place-info">
              <h3>{place.name}</h3>
              <p>{place.category}</p>
              <p>{place.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
