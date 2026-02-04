import React from 'react';
import HeroSection from '../sections/HeroSection';
import StatsSection from '../sections/StatsSection';
import AboutSection from '../sections/AboutSection';
import TimelineSection from '../sections/TimelineSection';
import FeaturedEventsSection from '../sections/FeaturedEventsSection';
import CoordinatorsSection from '../sections/CoordinatorsSection';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <TimelineSection />
      <FeaturedEventsSection />
      <CoordinatorsSection />
    </>
  );
};

export default Home;
