import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Building2,
  Video,
  Compass,
  Rotate3d,
  PenTool,
  Layout,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: string[];
  image: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Consultation Services",
    description:
      "We guide your vision from the beginning. Our consultation services help you define goals, set design direction, and make informed decisions that align with your project's purpose and potential.",
    icon: <Compass className="w-8 h-8" />,
    benefits: [
      "Initial site and concept analysis",
      "Design strategy planning",
      "Material and lighting advice",
      "Support in design feasibility studies",
    ],
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//consultingLow.webp",
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
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//interiorLow.webp",
  },
  {
    id: 3,
    title: "Exterior Design",
    description:
      "We create bold, elegant, and context-aware exterior visuals that highlight architectural character and spatial interaction with the environment.",
    icon: <Building2 className="w-8 h-8" />,
    benefits: [
      "Daylight and sunset facade renders",
      "Landscape and context integration",
      "Exterior material and texture studies",
      "Urban or natural background blending",
    ],
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//exteriorLow.webp",
  },
  {
    id: 4,
    title: "3D Video Visualization",
    description:
      "Bring your projects to life with cinematic walkthroughs and animations that tell a story. Perfect for marketing, competitions, or client presentations.",
    icon: <Video className="w-8 h-8" />,
    benefits: [
      "Smooth camera path through interior/exterior",
      "Custom lighting transitions (day-to-night)",
      "Animated people, elements, or objects",
      "Logo and music integration for branding",
    ],
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//3dVideo.webp",
  },
  {
    id: 5,
    title: "360 Rendering",
    description:
      "Deliver a fully immersive experience with 360-degree renderings, allowing clients to explore spaces from every angle as if they were there.",
    icon: <Rotate3d className="w-8 h-8" />,
    benefits: [
      "Ideal for virtual reality (VR) platforms",
      "Interior room-by-room navigation",
      "High-res panoramic stitching",
      "Web or app-ready interactive format",
    ],
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//360%20Interior.webp",
  },
  {
    id: 6,
    title: "Custom Design Solutions",
    description:
      "We offer tailored visual solutions based on your unique project needs - no templates, just personalized design storytelling that stands out, thanks to our team of professionals with a strong background in architecture.",
    icon: <PenTool className="w-8 h-8" />,
    benefits: [
      "Design packs based on competition briefs",
      "Bespoke styles or graphic language",
      "Multi-format delivery (print + digital)",
      "Scalable packages for studios or developers",
    ],
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//custom.png",
  },
];

export const ServicesSection = () => {
  const [ref] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    // Animación para el título y subtítulo cuando entran en el viewport
    gsap.fromTo(
      ".services-title",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-title",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".services-subtitle",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-subtitle",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animación para las cards cuando entran en el viewport
    const serviceCards = gsap.utils.toArray<HTMLElement>(".service-card");
    serviceCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15, // Efecto escalonado
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="services" className="py-20 px-4 bg-primary">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="services-title text-4xl md:text-5xl font-playfair text-white mb-4">
            Our Services
          </h2>
          <p className="services-subtitle text-gray-300 max-w-2xl mx-auto font-inter">
            Comprehensive architectural solutions tailored to your vision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="service-card relative h-[400px] group overflow-hidden rounded-lg"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              {/* Imagen de fondo y overlay inicial */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-colors duration-500" />
              </div>

              {/* Contenido inicial (solo título) */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-0 transition-transform duration-500 group-hover:-translate-y-full">
                <div className="p-3 rounded-lg bg-accent/10 text-accent w-fit mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-playfair text-white">
                  {service.title}
                </h3>
              </div>

              {/* Contenido detallado (visible en hover) */}
              <motion.div
                className="absolute inset-0 p-6 flex flex-col bg-secondary/95 translate-y-full transition-transform duration-500 group-hover:translate-y-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-accent/10 text-accent">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-playfair text-white ml-4">
                    {service.title}
                  </h3>
                </div>

                <p className="text-gray-300 mb-6 font-inter">
                  {service.description}
                </p>

                <div className="space-y-2 flex-grow">
                  {service.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                      {benefit}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-accent text-white rounded-full font-inter text-sm hover:bg-accent/90 transition-colors duration-300"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
