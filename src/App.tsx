import React from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { AboutSection } from './components/About/AboutSection';
import { ServicesSection } from './components/Services/ServicesSection';
import { GallerySection } from './components/Gallery/GallerySection';
import { TeamSection } from './components/Team/TeamSection';
import '@fontsource/playfair-display';
import '@fontsource/inter';

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TeamSection />
    </div>
  );
}

export default App;