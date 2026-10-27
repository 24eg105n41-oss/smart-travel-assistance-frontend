import React from 'react';
import './SavedPlaces.css';

const sampleSaved = [
  { id: 1, name: 'Eiffel Tower', category: 'Sightseeing', imageUrl: 'https://example.com/eiffel.jpg' },
  { id: 2, name: 'Shinjuku Gyoen', category: 'Park', imageUrl: 'https://example.com/shinjuku.jpg' },
];

export default function SavedPlaces() {
  return (
    <section className="saved-places">
      <h2 className="section-title">Saved Places</h2>
      <div className="places-grid">
        {sampleSaved.map(place => (
          <div key={place.id} className="place-card">
            <img src={place.imageUrl} alt={place.name} className="place-img" />
            <div className="place-info">
              <h3>{place.name}</h3>
              <p>{place.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
