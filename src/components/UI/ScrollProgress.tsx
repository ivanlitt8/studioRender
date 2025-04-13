import { useState, useEffect } from "react";

interface Section {
  id: string;
  label: string;
}

export const ScrollProgress = () => {
  const [activeSection, setActiveSection] = useState("");
  // const [scrollProgress, setScrollProgress] = useState(0);

  // Definir las secciones directamente en el componente
  const sections: Section[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const calculateScrollProgress = () => {
      // Cálculo del progreso global de scroll
      const windowHeight = window.innerHeight;
      // const documentHeight = document.documentElement.scrollHeight;
      // const scrollTop = window.scrollY;

      // const totalScrollable = documentHeight - windowHeight;
      // const progress = Math.min(
      //   Math.max((scrollTop / totalScrollable) * 100, 0),
      //   100
      // );
      // setScrollProgress(progress);

      // Determinar la sección activa
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            if (activeSection !== section.id) {
              setActiveSection(section.id);
            }
            break;
          }
        }
      }
    };

    // Agregar event listeners
    window.addEventListener("scroll", calculateScrollProgress);
    window.addEventListener("resize", calculateScrollProgress);

    // Inicializar
    calculateScrollProgress();

    // Limpiar
    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
      window.removeEventListener("resize", calculateScrollProgress);
    };
  }, [activeSection, sections]);

  // Función para navegar suavemente
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
      {/* Barra de progreso vertical */}
      {/* <div className="h-[50vh] w-0.5 bg-gray-700 relative">
        <div
          className="absolute top-0 left-0 w-full bg-accent origin-top transition-all duration-300"
          style={{ height: `${scrollProgress}%` }}
        />
      </div> */}

      {/* Indicadores de sección */}
      <div className="flex flex-col items-center gap-4 mt-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`w-3 h-3 rounded-full transition-all duration-300 group relative ${
              activeSection === section.id
                ? "bg-accent scale-125"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
            aria-label={`Scroll to ${section.label}`}
          >
            <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs whitespace-nowrap">
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
};
