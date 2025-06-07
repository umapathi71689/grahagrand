// src/components/layouts/PropertyCard.jsx
import React from 'react';
import '../styles/PropertyCard.css';

const PropertyCard = React.forwardRef(({ property }, ref) => {
  return (
    <div className="property-card" ref={ref}>
      <div className="property-image">
        <img src={property.image} alt={property.title} />
        <div className="property-badge">{property.type}</div>
      </div>
      <div className="property-details">
        <h3>{property.title}</h3>
        <p className="property-location">{property.location}</p>
        <p className="property-price">{property.price}</p>
        <div className="property-features">
          <span>{property.beds} Beds</span>
          <span>{property.baths} Baths</span>
          <span>{property.sqft} sqft</span>
        </div>
        <button className="property-btn">View Details</button>
      </div>
    </div>
  );
});

export default PropertyCard;