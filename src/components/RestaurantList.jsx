import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './RestaurantList.css';

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/restaurants')
      .then(res => {
        setRestaurants(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load restaurants');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="restaurant-list">
      <h2 className="section-title">Restaurants</h2>
      <div className="cards-grid">
        {restaurants.map(r => (
          <div key={r.id} className="restaurant-card">
            <img src={r.imageUrl} alt={r.name} className="card-img" />
            <div className="card-info">
              <h3>{r.name}</h3>
              <p>{r.cuisine}</p>
              <p>Rating: {r.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
