import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, GraduationCap, Users, Brush } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "react-intersection-observer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    id: 1,
    label: "Contextual Understanding",
    icon: <Brush className="w-6 h-6" />,
  },
  {
    id: 2,
    label: "Built by a qualified architects team",
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: 3,
    label: "Collaborative Experience",
    icon: <Users className="w-6 h-6" />,
  },
];

// Componente de texto mezclado
interface ScrambledTextProps {
  text: string;
  delay?: number;
}

const ScrambledText = ({ text, delay = 0 }: ScrambledTextProps) => {
  const [scrambledText, setScrambledText] = useState("");
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const finalText = text;
  const duration = 1.5; // duración en segundos

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView) {
      setScrambledText(
        text.replace(/./g, () =>
          characters.charAt(Math.floor(Math.random() * characters.length))
        )
      );
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number | null = null;

    const scramble = (timestamp: number) => {
      if (!startTime) startTime = timestamp - delay * 1000;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      let result = "";
      for (let i = 0; i < finalText.length; i++) {
        if (i < Math.floor(progress * finalText.length)) {
          result += finalText[i];
        } else {
          result += characters.charAt(
            Math.floor(Math.random() * characters.length)
          );
        }
      }

      setScrambledText(result);
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(scramble);
      }
    };
    animationFrameId = requestAnimationFrame(scramble);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [finalText, delay, duration, inView, text, characters]);

  return (
    <div ref={ref} className="text-gray-400 font-inter">
      {scrambledText}
    </div>
  );
};

export const AboutSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToGallery = () => {
    const gallerySection = document.querySelector("#gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: "smooth" });
    }
  };

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

  useLayoutEffect(() => {
    const allTriggers = ScrollTrigger.getAll();
    allTriggers.forEach((trigger) => trigger.kill());

    gsap.registerPlugin(ScrollTrigger);

    const initAnimations = setTimeout(() => {
      gsap.fromTo(
        "#about .about-title",
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#about .about-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
            id: "about-title-" + Date.now(), // ID único
          },
        }
      );

      gsap.utils
        .toArray<HTMLElement>("#about .about-paragraph")
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
                id: `about-paragraph-${i}`,
              },
            }
          );
        });

      // Video con efecto de zoom
      gsap.fromTo(
        "#about .video-container",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: "#about .video-container",
            start: "top 75%",
            toggleActions: "play none none reverse",
            id: "about-video",
          },
        }
      );

      // Estadísticas con contador
      gsap.utils
        .toArray<HTMLElement>("#about .stat-value")
        .forEach((stat, i) => {
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
              id: `about-stat-value-${i}`,
            },
            onUpdate: function () {
              stat.innerText = this.targets()[0].innerText.includes("+")
                ? this.targets()[0].innerText
                : `${this.targets()[0].innerText}+`;
            },
          });

          // Animación del contenedor de estadísticas
          gsap.fromTo(
            `#about .stat-container-${i}`,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.4 + i * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: `#about .stat-container-${i}`,
                start: "top 85%",
                toggleActions: "play none none reverse",
                id: `about-stat-container-${i}`,
              },
            }
          );
        });

      console.log("AboutSection: Animaciones GSAP inicializadas correctamente");
    }, 100); // Pequeño retraso para asegurar que todo está listo

    // Limpiar al desmontar
    return () => {
      clearTimeout(initAnimations);
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id && String(trigger.vars.id).includes("about-")) {
          trigger.kill();
        }
      });
    };
  }, []); // La dependencia vacía asegura que solo se ejecute una vez al montar

  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden bg-secondary"
      style={{
        position: "relative",
        zIndex: 15,
        backgroundColor: "#2a2a2a",
        borderTop: "4px solid #7c6f48",
        borderBottom: "4px solid #7c6f48",
      }}
      ref={sectionRef}
    >
      {/* Overlay de depuración condicional */}

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
          <div
            className="z-10"
            style={{
              opacity: 1,
              backgroundColor: "rgba(42, 42, 42, 0.9)",
              padding: "20px",
              borderRadius: "8px",
              // border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2
              className="about-title text-4xl md:text-5xl font-futura text-white mb-6"
              style={{
                opacity: 1,
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              WHO ARE WE
            </h2>
            <p
              className="about-paragraph text-gray-300 mb-6 leading-relaxed font-inter"
              style={{
                opacity: 1,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              We are R3ALIM, a studio specialised in architectural visualisation
              and design storytelling.
              <br />
              We help you bring your architectural ideas to life with clarity,
              atmosphere, and depth—always tailored to your specific project.
              Our name comes from the fusion of "Real" and "Imagination",
              because we believe architecture lives right at that intersection:
              where imagination becomes real, through design. We're not just
              rendering images—we're shaping the way your work is perceived,
              understood, and remembered.
            </p>
            <p
              className="about-paragraph text-gray-300 mb-8 leading-relaxed font-inter"
              style={{
                opacity: 1,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              Our approach is rooted in architecture itself: our team is formed
              by architects and designers who understand the language of space,
              scale, and intention. This means that every project is treated not
              only with visual precision, but also with technical and conceptual
              awareness.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToGallery}
              className="bg-accent text-white px-8 py-3 rounded-full font-inter 
                       hover:bg-accent/90 transition-colors duration-300"
            >
              View Our Projects
            </motion.button>
          </div>

          {/* Video Section */}
          <div
            className="video-container relative aspect-video"
            style={{ opacity: 1 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
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
        <div
          className="hidden md:grid md:grid-cols-3 gap-8 mt-20"
          style={{ opacity: 1, position: "relative", zIndex: 5 }}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`stat-container-${index} bg-primary/50 rounded-lg p-6 text-center backdrop-blur-sm transform transition-transform hover:scale-105 duration-300`}
              style={{ opacity: 1 }}
            >
              <div className="flex justify-center mb-4 text-accent">
                {stat.icon}
              </div>
              <ScrambledText text={stat.label} delay={0.3 + index * 0.2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
