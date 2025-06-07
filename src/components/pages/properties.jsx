import React, { useRef, useEffect, useState } from 'react';
import PropertyCard from '../layouts/PropertyCard';
import '../styles/Properties.css';

const Properties = () => {
  const sectionRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesToShow = 1; // Number of slides to show at once

  // Sample property data
  const availableProperties = [
    {
      id: 1,
      title: "Luxury Penthouse",
      location: "New York, NY",
      price: "$2,500,000",
      beds: 4,
      baths: 3,
      sqft: 3200,
      type: "luxury",
      status: "Available",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    // ... rest of your availableProperties data
  ];

  const upcomingProperties = [
    {
      id: 4,
      title: "Mountain Retreat",
      location: "Aspen, CO",
      price: "$2,100,000",
      beds: 4,
      baths: 3,
      sqft: 2800,
      type: "mountain",
      status: "Coming Soon",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      availableDate: "June 2023"
    },
    // ... rest of your upcomingProperties data
  ];

  // Carousel navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.ceil(upcomingProperties.length / slidesToShow) - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => 
      prev === Math.ceil(upcomingProperties.length / slidesToShow) - 1 ? 0 : prev + 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [upcomingProperties.length]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="properties-container">
      {/* Hero Section */}
      <section className="properties-hero">
        <div className="hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">Discover Your Dream Property</h1>
          <p className="about-hero-subtitle">Explore our exclusive collection of luxury homes and investment properties</p>
        </div>
      </section>

      {/* Available Properties Section */}
      <section className="property-section" ref={addToRefs}>
        <h2 className="section-title">Available Properties</h2>
        <div className="properties-grid">
          {availableProperties.map(property => (
            <PropertyCard 
              key={property.id} 
              property={property} 
              ref={addToRefs}
            />
          ))}
        </div>
      </section>

      {/* Upcoming Properties Section with Carousel
      <section className="property-section upcoming-properties" ref={addToRefs}>
        <div className="upcoming-carousel-container">
          <h2 className="section-title">Coming Soon</h2>
          <p className="section-subtitle">Exciting new properties joining our portfolio</p>
          
          <div className="upcoming-carousel">
            <button className="carousel-btn prev" onClick={goToPrev} aria-label="Previous property">
              &lt;
            </button>
            
            <div 
              className="carousel-track" 
              style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}
            >
              {upcomingProperties.map((property) => (
                <div 
                  key={property.id}
                  className="carousel-slide"
                >
                  <div className="carousel-card">
                    <div className="carousel-image-container">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="carousel-image"
                        loading="lazy"
                      />
                      <span className="upcoming-badge">
                        Coming Soon
                      </span>
                    </div>
                    <div className="carousel-content">
                      <h3>{property.title}</h3>
                      <p>{property.location}</p>
                      <div className="property-details">
                        <span>{property.beds} beds</span> • 
                        <span>{property.baths} baths</span> • 
                        <span>{property.sqft} sqft</span>
                      </div>
                      <div className="available-date">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        Available {property.availableDate}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="carousel-btn next" onClick={goToNext} aria-label="Next property">
              &gt;
            </button>
          </div>
          
          <div className="carousel-dots">
            {Array.from({ length: Math.ceil(upcomingProperties.length / slidesToShow) }).map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="cta-section" ref={addToRefs}>
        <div className="cta-content">
          <h2>Can't Find What You're Looking For?</h2>
          <p>Our agents can help you find the perfect property that meets all your requirements</p>
          <button className="cta-btn">Contact Our Agents</button>
        </div>
      </section>
    </div>
  );
};

export default Properties;