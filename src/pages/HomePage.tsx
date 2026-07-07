import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import About from '../components/sections/About';
import QuoteBanner from '../components/sections/QuoteBanner';
import WhyChooseTestimonials from '../components/sections/WhyChooseTestimonials';
import Programs from '../components/sections/Programs';
import HowItWorks from '../components/sections/HowItWorks';
import FinalCTA from '../components/sections/FinalCTA';

interface HomePageProps {
  onBookConsultation: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onBookConsultation }) => {
  return (
    <main>
      <Hero onBookConsultation={onBookConsultation} />
      <Services />
      <About />
      <QuoteBanner />
      <WhyChooseTestimonials />
      <Programs onBookConsultation={onBookConsultation} />
      <HowItWorks />
      <FinalCTA onBookConsultation={onBookConsultation} />
    </main>
  );
};

export default HomePage;
