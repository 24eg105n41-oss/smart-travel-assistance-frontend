import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import './TravelMap.css';

delete L.Icon.Default.prototype._getIconUrl;

const customMarkerIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const VISAKHAPATNAM_CENTER = [17.6868, 83.2185];

const destinations = [
  {
    id: 1,
    name: 'Visakhapatnam',
    position: [17.6868, 83.2185],
    description: 'The City of Destiny — a vibrant coastal metropolis on the Bay of Bengal.',
  },
  {
    id: 2,
    name: 'RK Beach',
    position: [17.7145, 83.3248],
    description: 'Ramakrishna Beach, a popular promenade famous for its golden sands and sunsets.',
  },
  {
    id: 3,
    name: 'Kailasagiri',
    position: [17.7463, 83.3431],
    description: 'A scenic hilltop park offering panoramic views of the city and coastline.',
  },
];

export default function TravelMap() {
  return (
    <div className="travel-map-wrapper">
      <MapContainer
        center={VISAKHAPATNAM_CENTER}
        zoom={12}
        scrollWheelZoom={true}
        className="travel-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {destinations.map((destination) => (
          <Marker key={destination.id} position={destination.position} icon={customMarkerIcon}>
            <Popup>
              <div className="travel-map-popup">
                <h4>{destination.name}</h4>
                <p>{destination.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
