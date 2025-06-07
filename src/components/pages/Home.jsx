import React, { useState, useRef, useEffect } from 'react';
import '../styles/Home.css';
import v1 from '../assets/images/IMG_7635.MP4';
import logo from '../assets/images/logo.png'

const Home = () => {
  const homeRef = useRef(null);
  const [searchCriteria, setSearchCriteria] = useState({
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    location: ''
  });

  const videoRef = useRef(null);
  const propertyTypes = ['Apartment', 'Villa', 'Mansion', 'Penthouse', 'Townhouse'];
  const locations = ['Beverly Hills', 'Malibu', 'Manhattan', 'Miami', 'Chicago'];

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceChange = (min, max) => {
    setSearchCriteria(prev => ({
      ...prev,
      minPrice: min,
      maxPrice: max
    }));
  };

  const handleEnquire = () => {
    alert('Search functionality would filter properties based on your criteria');
  };

  return (
    <div className="home-container" id="home" ref={homeRef}>
      <img className='logo' src={logo} alt="" />
      {/* Video Background with enhanced reliability */}
      <div className="video-background">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="video-player"
          preload="auto"
          disablePictureInPicture
        >
          <source src={v1} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">Build Your Future, One Property at a Time.</h1>
          <p className="hero-subtitle">
            Graha Grand laid its foundation in Tirupur as a Builer of beautiful, cost efficient abodes with an enbiable team of experienced and engineering its pillars and the pride and satisfaction pf our customer as its driving force 
          </p>
        </div>
      </div>

      {/* Search Panel */}
      <div className="search-panel">
        <h2 className="panel-title">Refine Your Search</h2>
        
        <div className="search-filters">
          <div className="filter-group">
            <label className="filter-label">Property Type</label>
            <div className="filter-options">
              {propertyTypes.map(type => (
                <button
                  key={type}
                  className={`filter-option ${searchCriteria.propertyType === type ? 'active' : ''}`}
                  onClick={() => setSearchCriteria(prev => ({...prev, propertyType: type}))}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Price Range</label>
            <div className="range-selector">
              <input 
                type="range" 
                min="0" 
                max="10000000" 
                step="500000"
                value={searchCriteria.maxPrice || 5000000}
                onChange={(e) => setSearchCriteria(prev => ({...prev, maxPrice: e.target.value}))}
              />
              <div className="range-labels">
                <span>$0</span>
                <span>${(searchCriteria.maxPrice || 5000000).toLocaleString()}</span>
                <span>$10M+</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Location</label>
            <div className="location-selector">
              {locations.map(location => (
                <button
                  key={location}
                  className={`location-option ${searchCriteria.location === location ? 'active' : ''}`}
                  onClick={() => setSearchCriteria(prev => ({...prev, location}))}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="search-button" onClick={handleEnquire}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          ENQUIRE NOW
        </button>
      </div>
    </div>
  );
};

export default Home;  