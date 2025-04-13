import React, { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

export const ProgressIndicator = () => {
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections: Section[] = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "services", label: "Services" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    // Función para calcular el progreso de scroll
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      const totalScrollable = documentHeight - windowHeight;
      const currentProgress = (scrollTop / totalScrollable) * 100;

      setScrollProgress(currentProgress);

      // Verificar qué sección está visible
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible =
            rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2;
          if (isVisible) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", calculateScrollProgress);
    calculateScrollProgress(); // Inicialización

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  }, [sections]);

  return (
    <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center">
      <div className="h-[50vh] w-0.5 bg-gray-700 relative">
        <div
          className="absolute top-0 left-0 w-full bg-accent origin-top"
          style={{ height: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="flex flex-col items-center gap-4 mt-4">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 group relative ${
              activeSection === section.id
                ? "bg-accent scale-125"
                : "bg-gray-600 hover:bg-gray-400"
            }`}
          >
            <span className="absolute right-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs whitespace-nowrap">
              {section.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};
