import React, { useEffect, useRef, useState } from 'react';
import '../styles/About.css';
import poster from '../assets/images/IMG_0107[1].jpg';
// Import your slide images (replace with your actual images)
import slide1 from '../assets/images/slide1.jpg';
import slide2 from '../assets/images/slide2.jpg';
import slide3 from '../assets/images/slide3.jpg';
import slide4 from '../assets/images/slide4.jpg';
import map from '../assets/images/map.jpg'

const About = () => {
  const sectionRefs = useRef([]);
  const parallaxRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  // Sample images for the slider
  const slides = [
    { id: 1, image: slide1, alt: "Luxury Property 1" },
    { id: 2, image: slide2, alt: "Luxury Property 2" },
    { id: 3, image: slide3, alt: "Luxury Property 3" },
    { id: 4, image: slide4, alt: "Luxury Property 4" }
  ];

  useEffect(() => {
    // Auto slide functionality
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Parallax effect
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.pageYOffset;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [slides.length]);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className='about-container'>
      {/* About Content */}
      <section className='about-container-2' ref={addToRefs}>
        <div className='poster'>
          <img src={poster} alt="Luxury property" className='poster-image' />
        </div>
        <div className='about-content'>
          <h1>About Us</h1>
          <p>We are more than a real estate company—we are a team that builds dreams and nurtures long-term relationships. Whether you're a first-time homebuyer, a real estate investor, or someone looking to settle in a peaceful community, Graha Grand Properties offers personalized solutions with total transparency and professional support at every step.</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className='stats-section' ref={addToRefs}>
        <div className='stat-item'>
          <span className='stat-number'>100%</span>
          <p className='stat-label'>Satisfaction Clients</p>
        </div>
        <div className='stat-item'>
          <span className='stat-number'>500+</span>
          <p className='stat-label'>Property Sells</p>
        </div>
        <div className='stat-item'>
          <span className='stat-number'>150+</span>
          <p className='stat-label'>Countries and Clients</p>
        </div>
        <div className='stat-item'>
          <span className='stat-number'>200+</span>
          <p className='stat-label'>Positive Reviews</p>
        </div>
      </section>

      {/* New Auto-Sliding Photos Section */}
      <section className='photo-slider-section' ref={addToRefs}>
        <h2>Our Featured Properties</h2>
        <div className='slider-container' ref={sliderRef}>
          <div 
            className='slider-track'
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className='slide'>
                <img 
                  src={slide.image} 
                  alt={slide.alt} 
                  className='slide-image'
                />
                <div className='slide-overlay'>
                  <h3>Luxury Property {index + 1}</h3>
                  <p>Discover this exquisite property with premium amenities</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='slider-dots'>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className='map-section' ref={addToRefs}>
        <div className='map'>
          <img src={map} alt="" />
        </div>
        <div className='map-content'>
          <h2>Discover Properties with the Best Value</h2>
          <p>To provide affordable, transparent, and legally secure property solutions that help individuals and families build their future with confidence.</p>
        </div>
      </section>
    </div>
  );
};

export default About;