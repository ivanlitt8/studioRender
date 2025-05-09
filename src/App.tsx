import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { AboutSection } from "./components/About/AboutSection";
import { ServicesSection } from "./components/Services/ServicesSection";
import { GallerySection } from "./components/Gallery/GallerySection";
import { TeamSection } from "./components/Team/TeamSection";
import { ContactSection } from "./components/Contact/ContactSection";
import { Footer } from "./components/Footer/Footer";
import { ScrollProgress } from "./components/UI/ScrollProgress";
import "@fontsource/playfair-display";
import "@fontsource/inter";

function App() {
  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <ScrollProgress />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
