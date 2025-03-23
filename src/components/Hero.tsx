import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const scrollToGallery = () => {
    const gallerySection = document.querySelector('#gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-primary/50" />
      </div>
      
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <motion.h1 
          className="font-playfair text-5xl md:text-7xl text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Crafting Spaces, Shaping Dreams
        </motion.h1>
        
        <motion.p 
          className="font-inter text-xl md:text-2xl text-center mb-12 text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Award-winning architectural visualization studio
        </motion.p>
        
        <motion.button
          onClick={scrollToGallery}
          className="bg-accent hover:bg-accent/90 text-white font-inter px-8 py-3 rounded-full 
                     transition-transform duration-300 hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          Explore Our Work
        </motion.button>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        <ChevronDown className="text-white w-8 h-8" />
      </motion.div>
    </section>
  );
};