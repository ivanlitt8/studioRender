import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Building2, Compass, TreePine, PenTool, Layout, Users } from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
}

const services: Service[] = [
  {
    id: 1,
    title: "Architectural Visualization",
    description: "Transform your concepts into stunning 3D visualizations that bring your architectural vision to life.",
    icon: <Building2 className="w-8 h-8" />,
    benefits: [
      "Photorealistic 3D renderings",
      "Virtual walkthroughs",
      "Real-time visualization",
      "Concept development"
    ]
  },
  {
    id: 2,
    title: "Interior Design",
    description: "Create captivating interior spaces that perfectly balance aesthetics with functionality.",
    icon: <Layout className="w-8 h-8" />,
    benefits: [
      "Space planning",
      "Material selection",
      "Lighting design",
      "Furniture curation"
    ]
  },
  {
    id: 3,
    title: "Landscape Architecture",
    description: "Design sustainable and beautiful outdoor spaces that enhance the natural environment.",
    icon: <TreePine className="w-8 h-8" />,
    benefits: [
      "Sustainable design",
      "Native landscaping",
      "Water features",
      "Outdoor living spaces"
    ]
  },
  {
    id: 4,
    title: "Urban Planning",
    description: "Develop comprehensive urban solutions that create vibrant, sustainable communities.",
    icon: <Compass className="w-8 h-8" />,
    benefits: [
      "Master planning",
      "Urban revitalization",
      "Transit-oriented development",
      "Public space design"
    ]
  },
  {
    id: 5,
    title: "Custom Design Solutions",
    description: "Tailored architectural solutions that meet your unique project requirements and vision.",
    icon: <PenTool className="w-8 h-8" />,
    benefits: [
      "Custom residential",
      "Commercial spaces",
      "Renovation projects",
      "Adaptive reuse"
    ]
  },
  {
    id: 6,
    title: "Consultation Services",
    description: "Expert guidance and consultation throughout your architectural project journey.",
    icon: <Users className="w-8 h-8" />,
    benefits: [
      "Project feasibility",
      "Design review",
      "Technical consultation",
      "Sustainability advice"
    ]
  }
];

export const ServicesSection = () => {
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
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="py-20 px-4 bg-primary">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-playfair text-white mb-4"
            variants={itemVariants}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto font-inter"
            variants={itemVariants}
          >
            Comprehensive architectural solutions tailored to your vision
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="bg-secondary rounded-lg p-6 group cursor-pointer"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-playfair text-white ml-4">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-gray-300 mb-6 font-inter">
                {service.description}
              </p>

              <div className="space-y-2">
                {service.benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                    {benefit}
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-6 py-2 bg-accent text-white rounded-full font-inter text-sm hover:bg-accent/90 transition-colors duration-300"
              >
                Learn More
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};