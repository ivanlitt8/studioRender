import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Asegurarnos de que GSAP solo se registra una vez y de manera limpia
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type MainCategory = "all" | "exterior" | "interior";
type SubCategory = string | null;

interface ProjectImage {
  url: string;
  alt: string;
}

interface Project {
  id: number;
  title: string;
  mainCategory: MainCategory;
  subCategory: string;
  coverImage: string;
  images: ProjectImage[];
  description: string;
}

interface CategoryItem {
  id: string;
  label: string;
}

// Proyectos reestructurados con múltiples imágenes
const projects: Project[] = [
  {
    id: 1,
    title: "Live in High: Rise Residential Building",
    mainCategory: "exterior",
    subCategory: "high-density",
    coverImage:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//peatonal.webp",
    images: [
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//peatonal.webp",
        alt: "Main exterior view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//perspectiva%201.jpg",
        alt: "Side exterior view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//perspectiva%201%20dia.webp",
        alt: "Interior common space",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//fente.webp",
        alt: "Interior common space",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%203.webp",
        alt: "Interior common space",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%202.webp",
        alt: "Interior common space",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%201.webp",
        alt: "Interior common space",
      },
    ],
    description:
      "The high-rise building emerges as a lightweight structure that softens its mass through transparency, rhythm, and repetition. Each unit engages the edge, opening toward the landscape with generous balconies that mediate between private life and the urban environment. The structural grid is carefully modulated to allow for flexible floor plans and spatial continuity. A restrained material palette and connection to greenery reinforce the idea of density that integrates rather than dominates.",
  },
  {
    id: 2,
    title: "Density and Landscape: Collective Housing",
    mainCategory: "exterior",
    subCategory: "high-density",
    coverImage:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust%205.webp",
    images: [
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust%205.webp",
        alt: "Building facade",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust%206.webp",
        alt: "Entry view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust%201.webp",
        alt: "Main lobby",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust%202.webp",
        alt: "Street view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust%203.webp",
        alt: "Street view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust%204.webp",
        alt: "Street view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust%207.webp",
        alt: "Street view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//viv%20aust.webp",
        alt: "Street view",
      },
    ],
    description:
      "An urban living model that embraces density without giving up the landscape. This project weaves collective housing into a green, walkable environment — where architecture, community, and nature coexist in balance. ",
  },
  {
    id: 3,
    title: "Peaceful Living: Designed for the Outdoors",
    mainCategory: "exterior",
    subCategory: "residential",
    coverImage:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//2a.webp",
    images: [
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//2a.webp",
        alt: "Main living room",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//3a.webp",
        alt: "Kitchen view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//1a.webp",
        alt: "Master bedroom",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%2055_upscale01.webp",
        alt: "Interior common space",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%2056_upscale01.webp",
        alt: "Interior common space",
      },
    ],
    description:
      "This project is a design vision rooted in simplicity, calmness, and connection to nature. Set near the tranquil banks of the Snowy River in East Gippsland, Victoria, this project celebrates the essence of outdoor life—open skies, native landscapes, and the quiet rhythm of rural Australia. Through thoughtful architecture and timeless materiality, we create spaces that invite reflection, comfort, and belonging. Peaceful living, designed for the outdoors isn't just a motto it's a way of building, dwelling, and being.",
  },
  {
    id: 4,
    title: "Light Architecture in Harmony with Nature, Newport, NSW",
    mainCategory: "exterior",
    subCategory: "residential",
    coverImage:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//fachada%202a.webp",
    images: [
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//fachada%202a.webp",
        alt: "Building facade",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//fachada%204a.webp",
        alt: "Building facade",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//fachada%201a.webp",
        alt: "Building facade",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//interior%20p3.webp",
        alt: "Building facade",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//interior%20p2.webp",
        alt: "Building facade",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//interior%20p1.webp",
        alt: "Building facade",
      },
    ],
    description:
      "Set on the lush sloping terrain of Newport, this elevated home embraces the landscape with a lightweight structure on stilts, reducing its environmental footprint. The compact volume, clad in dark horizontal siding, blends seamlessly into the natural surroundings. A generous perimeter terrace extends the living space outward, fostering a deep connection with the native vegetation and the tranquility of the Australian bush.",
  },
  {
    id: 5,
    title:
      "Rugby Club Barbecue Shelter — A Warm Hearth for Community Gatherings",
    mainCategory: "exterior",
    subCategory: "residential",
    coverImage:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%204_upscale01.webp",
    images: [
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%204_upscale01.webp",
        alt: "Plaza main view",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Imagen(6)_upscale01.webp",
        alt: "Commercial entrance",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Imagen(1)_upscale01.webp",
        alt: "Night illumination",
      },
    ],
    description:
      "Designed as a welcoming focal point for social interaction, this brick-and-timber pavilion celebrates the spirit of camaraderie rooted in rugby culture. The gable roof and exposed wooden trusses highlight the craftsmanship, while the warm lighting and large openings invite both players and supporters to share a meal after the match. Surrounded by vegetation and anchored by traditional elements like the lamp post, the space blends nostalgia with functionality, enhancing the club’s social fabric.",
  },
  {
    id: 6,
    title: "Minimalist Residence — Serenity Through Simplicity",
    mainCategory: "exterior",
    subCategory: "commercial",
    coverImage:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Frente.webp",
    images: [
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Frente.webp",
        alt: "Complex facade",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Fondo.webp",
        alt: "Residential towers",
      },
      {
        url: "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Interior.webp",
        alt: "Community gardens",
      },
    ],
    description:
      "This two-story home reinterprets minimalist principles through a warm, tropical lens. Located in a residential neighborhood, the design emphasizes clean lines, balanced proportions, and lush vegetation integrated into both levels. A restrained material palette featuring wood, concrete, and glass creates a calm and elegant aesthetic. The elevated volume shelters a carport and invites natural light through expansive glazing, while the rain-soaked setting enhances the atmosphere of quiet sophistication.",
  },
];
const mainCategories = [
  { id: "all", label: "All Projects" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
];

const subCategories = {
  exterior: [
    { id: "residential", label: "Residential Scale" },
    { id: "commercial", label: "Commercial Scale" },
    { id: "high-density", label: "High-Density Scale" },
  ],
  interior: [],
};

const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1,
};

export const GallerySection = () => {
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<MainCategory>("all");
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset subcategory when main category changes
  useEffect(() => {
    setSelectedSubCategory(null);
  }, [selectedMainCategory]);

  // Reset image index when selecting a new project
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProject]);

  const filteredProjects = projects.filter((project) => {
    if (selectedMainCategory === "all") return true;
    if (project.mainCategory !== selectedMainCategory) return false;
    if (selectedSubCategory && project.subCategory !== selectedSubCategory)
      return false;
    return true;
  });

  // Funciones para navegar entre imágenes en el modal
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section
      id="gallery"
      className="py-20 px-4 bg-secondary min-h-screen"
      data-section="gallery"
      style={{
        position: "relative",
        zIndex: 10,
        marginTop: "2rem",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-primary to-transparent opacity-50"
        style={{ pointerEvents: "none" }}
      ></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Título de la sección con Framer Motion en lugar de GSAP */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative", zIndex: 20 }}
        >
          <motion.h2
            className="gallery-title text-4xl md:text-5xl font-futura text-white mb-4 relative inline-block"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Our Portfolio
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent"></span>
          </motion.h2>
          <motion.p
            className="gallery-subtitle text-gray-300 max-w-2xl mx-auto mt-6 font-inter"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Explore our diverse collection of architectural projects
          </motion.p>
        </motion.div>

        {/* Main Categories con Framer Motion en lugar de GSAP */}
        <motion.div
          className="gallery-categories flex flex-wrap justify-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {mainCategories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() =>
                setSelectedMainCategory(category.id as MainCategory)
              }
              className={`px-8 py-3 rounded-full font-inter text-sm transition-all duration-300
                ${
                  selectedMainCategory === category.id
                    ? "bg-accent text-white shadow-md shadow-accent/30"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Sub Categories con mejor visibilidad */}
        <AnimatePresence mode="wait">
          {selectedMainCategory !== "all" &&
            subCategories[selectedMainCategory].length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mb-12"
              >
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {subCategories[selectedMainCategory].map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() =>
                        setSelectedSubCategory(category.id as SubCategory)
                      }
                      className={`px-6 py-2 rounded-full font-inter text-xs transition-all duration-300
                      ${
                        selectedSubCategory === category.id
                          ? "bg-accent/20 text-accent border border-accent"
                          : "bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
        </AnimatePresence>

        {/* Gallery Grid - Mostrando solo las imágenes de portada */}
        <motion.div
          className="gallery-grid"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="mb-4 cursor-pointer group relative overflow-hidden rounded-lg"
                onClick={() => setSelectedProject(project)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative pb-[100%] overflow-hidden rounded-lg">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-futura text-lg mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm font-inter line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-2 text-xs text-accent">
                      +{project.images.length} imágenes
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>

        {/* Modal con galería de imágenes */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="relative max-w-5xl w-full bg-secondary rounded-lg overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  title="Close"
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white z-10 hover:bg-black transition-colors duration-300"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Imagen actual */}
                <div className="relative">
                  <img
                    src={selectedProject.images[currentImageIndex].url}
                    alt={selectedProject.images[currentImageIndex].alt}
                    className="w-full h-auto"
                  />

                  {/* Navegación de imágenes */}
                  {selectedProject.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 text-white hover:bg-black/80 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3 text-white hover:bg-black/80 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}

                  {/* Indicador de imágenes */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {selectedProject.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full ${
                          currentImageIndex === index
                            ? "bg-accent"
                            : "bg-white/50"
                        }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Información del proyecto */}
                <div className="p-6">
                  <h3 className="text-white font-futura text-2xl mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-300 mb-4 font-inter">
                    {selectedProject.description}
                  </p>
                  <div className="flex gap-2">
                    <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs">
                      {
                        mainCategories.find(
                          (c: CategoryItem) =>
                            c.id === selectedProject.mainCategory
                        )?.label
                      }
                    </span>
                    {selectedProject.subCategory &&
                      selectedProject.mainCategory !== "all" &&
                      subCategories[selectedProject.mainCategory].length >
                        0 && (
                        <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                          {
                            subCategories[selectedProject.mainCategory]?.find(
                              (c: CategoryItem) =>
                                c.id === selectedProject.subCategory
                            )?.label
                          }
                        </span>
                      )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
