import React, { useRef, useEffect } from 'react';
import '../styles/WhyChooseus.css';

const WhyChooseUs = () => {
  const sectionRefs = useRef([]);

  const features = [
    {
      icon: '🏆',
      title: 'Award-Winning Service',
      description: 'Recognized for excellence in customer satisfaction and quality service.'
    },
    {
      icon: '💰',
      title: 'Competitive Pricing',
      description: 'Get the best value with our price-match guarantee.'
    },
    {
      icon: '🏡',
      title: 'Extensive Portfolio',
      description: 'Thousands of properties to choose from across prime locations.'
    },
    {
      icon: '🤝',
      title: 'Trusted Partnerships',
      description: 'Strong relationships with top developers and financial institutions.'
    },
    {
      icon: '🔍',
      title: 'Personalized Matching',
      description: 'Our AI system finds properties tailored to your preferences.'
    },
    {
      icon: '🛡️',
      title: 'Transaction Protection',
      description: 'Secure payments and legal safeguards for all transactions.'
    }
  ];

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
            observer.unobserve(entry.target);
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
    <section className="why-choose-us">
      <div className="container">
        <div className="section-header" ref={addToRefs}>
          <h2>Why Choose Us</h2>
          <p className="subtitle">Discover what makes us different</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card" 
              ref={addToRefs}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;