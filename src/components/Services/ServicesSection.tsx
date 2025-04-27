import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Building2,
  Video,
  Compass,
  Rotate3d,
  PenTool,
  Layout,
  ChevronLeft,
  ChevronRight,
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
      "We guide your vision from the start, helping you define goals, set direction, and make decisions true to your project's purpose.",
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
      "We craft custom visual solutions shaped around your project's unique story — no templates, just original design powered by a team with a strong architectural background.",
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Ref para el contenedor de tarjetas
  const servicesContainerRef = useRef<HTMLDivElement>(null);
  // Ref para los botones de navegación
  const scrollLeftRef = useRef<HTMLButtonElement>(null);
  const scrollRightRef = useRef<HTMLButtonElement>(null);

  // Función para desplazarse a la izquierda
  const scrollLeft = () => {
    if (servicesContainerRef.current) {
      servicesContainerRef.current.scrollBy({
        left: -280,
        behavior: "smooth",
      });
    }
  };

  // Función para desplazarse a la derecha
  const scrollRight = () => {
    if (servicesContainerRef.current) {
      servicesContainerRef.current.scrollBy({
        left: 280,
        behavior: "smooth",
      });
    }
  };

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

    // Verificamos si estamos en una pantalla móvil
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      // Animación para las cards en desktop
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
    }

    // Gestionar la visibilidad de los botones de navegación en función del scroll
    const handleScroll = () => {
      if (
        servicesContainerRef.current &&
        scrollLeftRef.current &&
        scrollRightRef.current
      ) {
        const { scrollLeft, scrollWidth, clientWidth } =
          servicesContainerRef.current;

        // Mostrar/ocultar botón izquierdo
        scrollLeftRef.current.style.opacity = scrollLeft > 10 ? "1" : "0";

        // Mostrar/ocultar botón derecho
        const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10;
        scrollRightRef.current.style.opacity = isAtEnd ? "0" : "1";
      }
    };

    // Agregar listener para el evento scroll en el contenedor
    const currentContainer = servicesContainerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);
      // Inicializar el estado de los botones
      handleScroll();
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (currentContainer) {
        currentContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [inView]);

  return (
    <section id="services" className="py-20 px-4 bg-primary">
      <div ref={ref} className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="services-title text-4xl md:text-5xl font-playfair text-white mb-4">
            Our Services
          </h2>
          <p className="services-subtitle text-gray-300 max-w-2xl mx-auto font-inter">
            Comprehensive architectural solutions tailored to your vision
          </p>
        </div>

        {/* Contenedor con scroll horizontal nativo */}
        <div className="relative">
          {/* Botón scroll izquierdo */}
          <button
            ref={scrollLeftRef}
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-accent/80 text-white p-2 rounded-full opacity-0 transition-opacity duration-300 md:hidden"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Contenedor de servicios con scroll horizontal nativo */}
          <div
            ref={servicesContainerRef}
            className="md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 flex md:flex-wrap flex-nowrap space-x-4 md:space-x-0 w-full md:w-auto overflow-x-auto pb-6 md:pb-0 hide-scrollbar"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="service-card relative h-[400px] md:h-[400px] md:w-auto w-[260px] flex-shrink-0 group overflow-hidden rounded-lg scroll-snap-align-start"
                style={{ scrollSnapAlign: "start" }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
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
                  <div className="p-2 md:p-3 rounded-lg bg-accent/10 text-accent w-fit mb-2 md:mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-playfair text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Contenido detallado (visible en hover) */}
                <motion.div
                  className="absolute inset-0 p-4 md:p-6 flex flex-col bg-secondary/95 translate-y-full transition-transform duration-500 group-hover:translate-y-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center mb-2 md:mb-4">
                    <div className="p-2 md:p-3 rounded-lg bg-accent/10 text-accent">
                      {service.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-playfair text-white ml-3 md:ml-4">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-300 text-sm md:text-base mb-3 md:mb-6 font-inter">
                    {service.description.length > 100 && window.innerWidth < 768
                      ? `${service.description.substring(0, 100)}...`
                      : service.description}
                  </p>

                  <div className="space-y-1 md:space-y-2 flex-grow overflow-y-auto">
                    {service.benefits
                      .slice(
                        0,
                        window.innerWidth < 768 ? 3 : service.benefits.length
                      )
                      .map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center text-xs md:text-sm text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                          {benefit}
                        </div>
                      ))}
                    {window.innerWidth < 768 && service.benefits.length > 3 && (
                      <div className="text-xs text-accent mt-1">
                        + more benefits
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-2 md:mt-4 px-4 md:px-6 py-1.5 md:py-2 bg-accent text-white rounded-full font-inter text-xs md:text-sm hover:bg-accent/90 transition-colors duration-300"
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

          {/* Botón scroll derecho */}
          <button
            ref={scrollRightRef}
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-accent/80 text-white p-2 rounded-full transition-opacity duration-300 md:hidden"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Indicadores de página (solo móvil) */}
        <div className="flex justify-center space-x-2 mt-6 md:hidden">
          <div className="w-2 h-2 rounded-full bg-accent"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
        </div>
      </div>
    </section>
  );
};
