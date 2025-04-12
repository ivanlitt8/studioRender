import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Building2,
  Compass,
  TreePine,
  PenTool,
  Layout,
  Users,
} from "lucide-react";

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
    title: "Consultation Services",
    description:
      "We guide your vision from the  beginning. Our consultation services help you define goals, set design direction, and make informed decisions that align with your project's purpose and potential.",
    icon: <Building2 className="w-8 h-8" />,
    benefits: [
      "Initial site and concept analysis",
      "Design strategy planning",
      "Material and lighting advice",
      "Support in design feasibility studies",
    ],
  },
  {
    id: 2,
    title: "Interior Design",
    description:
      "We craft immersive and functional interior spaces that reflect the essence of your brand or lifestyle. Our approach balances aesthetics, comfort, and spatial intelligence..",
    icon: <Layout className="w-8 h-8" />,
    benefits: [
      "Custom furniture and finishes visualization",
      "Mood board and material palette assistance",
      "Natural and artificial lighting integration",
      "Optimized layout planning",
    ],
  },
  {
    id: 3,
    title: "Exterior Design",
    description:
      "We create bold, elegant, and context-aware exterior visuals that highlight architectural character and spatial interaction with the environment.",
    icon: <TreePine className="w-8 h-8" />,
    benefits: [
      "Daylight and sunset facade renders",
      "Landscape and context integration",
      "Exterior material and texture studies",
      "Urban or natural background blending",
    ],
  },
  {
    id: 4,
    title: "3D Video Visualization",
    description:
      "Bring your projects to life with cinematic walkthroughs and animations that tell a story. Perfect for marketing, competitions, or client presentations.",
    icon: <Compass className="w-8 h-8" />,
    benefits: [
      "Smooth camera path through interior/exterior",
      "Custom lighting transitions (day-to-night)",
      "Animated people, elements, or objects",
      "Logo and music integration for branding",
    ],
  },
  {
    id: 5,
    title: "360 Rendering",
    description:
      "Deliver a fully immersive experience with 360-degree renderings, allowing clients to explore spaces from every angle as if they were there.",
    icon: <PenTool className="w-8 h-8" />,
    benefits: [
      "Ideal for virtual reality (VR) platforms",
      "Interior room-by-room navigation",
      "High-res panoramic stitching",
      "Web or app-ready interactive format",
    ],
  },
  {
    id: 6,
    title: "Custom Design Solutions",
    description:
      "We offer tailored visual solutions based on your unique project needs - no templates, just personalized design storytelling that stands out, thanks to our team of professionals with a strong background in architecture.",
    icon: <Users className="w-8 h-8" />,
    benefits: [
      "Design packs based on competition briefs",
      "Bespoke styles or graphic language",
      "Multi-format delivery (print + digital)",
      "Scalable packages for studios or developers",
    ],
  },
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
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
                onClick={() => {
                  const message = encodeURIComponent(
                    `Hello, I am interested in the ${service.title} service`
                  );
                  window.open(
                    `https://wa.me/61425432846?text=${message}`,
                    "_blank"
                  );
                }}
              >
                Get Info
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
