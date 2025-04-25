import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Award, Users, Building } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    id: 1,
    value: "15+",
    label: "Years Experience",
    icon: <Building className="w-6 h-6" />,
  },
  {
    id: 2,
    value: "200+",
    label: "Projects Completed",
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: 3,
    value: "50+",
    label: "Team Members",
    icon: <Users className="w-6 h-6" />,
  },
];

export const AboutSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);

  // Gestionar la reproducción automática cuando el video entra en el viewport
  useEffect(() => {
    if (videoRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch((error) => {
              console.error("Error al reproducir el video:", error);
            });
            setIsVideoPlaying(true);
          } else {
            videoRef.current?.pause();
            setIsVideoPlaying(false);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(videoRef.current);
      return () => {
        if (videoRef.current) observer.unobserve(videoRef.current);
      };
    }
  }, []);

  // Animaciones con GSAP
  useEffect(() => {
    // Título
    gsap.fromTo(
      ".about-title",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Párrafos con efecto secuencial
    gsap.utils
      .toArray<HTMLElement>(".about-paragraph")
      .forEach((paragraph, i) => {
        gsap.fromTo(
          paragraph,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 + i * 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: paragraph,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

    // Video con efecto de zoom
    gsap.fromTo(
      ".video-container",
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".video-container",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Estadísticas con contador
    gsap.utils.toArray<HTMLElement>(".stat-value").forEach((stat, i) => {
      const originalValue = stat.innerText;

      // Reiniciar a cero
      stat.innerText = "0";

      // Animación de conteo
      gsap.to(stat, {
        innerText: originalValue,
        duration: 2,
        delay: 0.3 + i * 0.2,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
          toggleActions: "play none none reset",
        },
        onUpdate: function () {
          stat.innerText = this.targets()[0].innerText.includes("+")
            ? this.targets()[0].innerText
            : `${this.targets()[0].innerText}+`;
        },
      });

      // Animación del contenedor de estadísticas
      gsap.fromTo(
        `.stat-container-${i}`,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.4 + i * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: `.stat-container-${i}`,
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
    <section id="about" className="relative py-20 overflow-hidden bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
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
          <div className="z-10">
            <h2 className="about-title text-4xl md:text-5xl font-playfair text-white mb-6">
              WHO ARE WE
            </h2>
            <p className="about-paragraph text-gray-300 mb-6 leading-relaxed font-inter">
              R3ALIM, a studio specialised in architectural visualisation and
              design storytelling.
              <br />
              We help you bring your architectural ideas to life with clarity,
              atmosphere, and depth—always tailored to your specific project.
              Our name comes from the fusion of “Real” and “Imagination”,
              because we believe architecture lives right at that intersection:
              where imagination becomes real, through design.
            </p>
            <p className="about-paragraph text-gray-300 mb-8 leading-relaxed font-inter">
              We’re not just rendering images—we’re shaping the way your work is
              perceived, understood, and remembered. Our approach is rooted in
              architecture itself: our team is formed by architects and
              designers who understand the language of space, scale, and
              intention. This means that every project is treated not only with
              visual precision, but also with technical and conceptual
              awareness.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-white px-8 py-3 rounded-full font-inter 
                       hover:bg-accent/90 transition-colors duration-300"
            >
              View Our Projects
            </motion.button>
          </div>

          {/* Video Section */}
          <div className="video-container relative aspect-video">
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                //poster="https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80"
                loop
                muted
                playsInline
                onClick={() => {
                  if (videoRef.current) {
                    if (isVideoPlaying) {
                      videoRef.current.pause();
                    } else {
                      videoRef.current.play();
                    }
                    setIsVideoPlaying(!isVideoPlaying);
                  }
                }}
              >
                <source src="/render_video.mp4" type="video/mp4" />
              </video>
              {!isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.play();
                        setIsVideoPlaying(true);
                      }
                    }}
                    className="p-4 rounded-full bg-accent text-white"
                  >
                    <Play className="w-8 h-8" />
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`stat-container-${index} bg-primary/50 rounded-lg p-6 text-center backdrop-blur-sm transform transition-transform hover:scale-105 duration-300`}
            >
              <div className="flex justify-center mb-4 text-accent">
                {stat.icon}
              </div>
              <div className="stat-value text-3xl font-playfair text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-inter">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
