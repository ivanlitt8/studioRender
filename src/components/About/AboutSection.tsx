import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Award, Users, Building } from 'lucide-react';

const stats = [
  { id: 1, value: '15+', label: 'Years Experience', icon: <Building className="w-6 h-6" /> },
  { id: 2, value: '200+', label: 'Projects Completed', icon: <Award className="w-6 h-6" /> },
  { id: 3, value: '50+', label: 'Team Members', icon: <Users className="w-6 h-6" /> }
];

export const AboutSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="relative py-20 overflow-hidden bg-secondary">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4"
      >
        {/* Parallax Background Elements */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full -ml-48 -mb-48"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* Content Section */}
          <motion.div variants={itemVariants} className="z-10">
            <h2 className="text-4xl md:text-5xl font-playfair text-white mb-6">
              Where Vision Meets Innovation
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed font-inter">
              Since 2008, our studio has been at the forefront of architectural innovation, 
              combining cutting-edge technology with timeless design principles. We believe 
              in creating spaces that not only meet functional requirements but also inspire 
              and elevate the human experience.
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed font-inter">
              Our approach integrates sustainable practices with innovative design solutions, 
              ensuring each project contributes positively to its environment and community. 
              We pride ourselves on our ability to transform complex challenges into elegant, 
              sustainable architectural solutions.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-white px-8 py-3 rounded-full font-inter 
                       hover:bg-accent/90 transition-colors duration-300"
            >
              View Our Projects
            </motion.button>
          </motion.div>

          {/* Video Section */}
          <motion.div variants={itemVariants} className="relative aspect-video">
            <div className="relative rounded-lg overflow-hidden">
              <video
                className="w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80"
                loop
                muted
                playsInline
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              >
                <source
                  src="https://player.vimeo.com/external/459389137.sd.mp4?s=956dda7d1313132ef2daa2e3c3e739ab7fb226f1&profile_id=165&oauth2_token_id=57447761"
                  type="video/mp4"
                />
              </video>
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsVideoPlaying(true)}
                    className="p-4 rounded-full bg-accent text-white"
                  >
                    <Play className="w-8 h-8" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
        >
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className="bg-primary/50 rounded-lg p-6 text-center backdrop-blur-sm"
            >
              <div className="flex justify-center mb-4 text-accent">
                {stat.icon}
              </div>
              <div className="text-3xl font-playfair text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-inter">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};