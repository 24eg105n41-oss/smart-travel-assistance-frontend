import React from 'react';
import { Plane, Utensils, Hotel, ShieldAlert } from 'lucide-react';
import './AssistanceOptions.css';

const options = [
  { icon: <Plane size={48} />, label: 'Navigation', emoji: '🗺️' },
  { icon: <Utensils size={48} />, label: 'Food', emoji: '🍴' },
  { icon: <Hotel size={48} />, label: 'Stay', emoji: '🏨' },
  { icon: <ShieldAlert size={48} />, label: 'Emergency Help', emoji: '🚨' },
];

export default function AssistanceOptions() {
  return (
    <section className="assistance-options">
      <h2 className="section-title">Assistance Options</h2>
      <div className="options-grid">
        {options.map((opt, idx) => (
          <div key={idx} className="option-card">
            <div className="icon-wrapper">{opt.icon}</div>
            <span className="option-label">{opt.emoji} {opt.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
