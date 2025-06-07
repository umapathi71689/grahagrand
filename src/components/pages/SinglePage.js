import React from 'react';
import Home from './Home';
import About from './About';
import Properties from './properties';
import WhyChooseUs from './Whychoose';

const SinglePage = () => {
  return (
    <div className="single-page">
      <section id="home">
        <Home />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="properties">
        <Properties />
      </section>
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>
    </div>
  );
};

export default SinglePage;