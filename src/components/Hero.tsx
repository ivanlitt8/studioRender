import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

export const Hero = () => {
  const phrases = [
    "Shaping Dreams",
    "Building Visions",
    "Creating Impact",
    "Rendering Visions",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const scrollToGallery = () => {
    const gallerySection = document.querySelector("#gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-primary/50" />
      </div>

      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <motion.h1
          className="font-playfair text-5xl md:text-7xl text-center mb-6 flex items-center justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span>Crafting Spaces, </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {phrases[currentPhraseIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.p
          className="font-inter text-xl md:text-2xl text-center mb-12 text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Where Realism and Imagination get along.
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
        transition={{
          delay: 0.9,
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <ChevronDown className="text-white w-8 h-8" />
      </motion.div>
    </section>
  );
};
