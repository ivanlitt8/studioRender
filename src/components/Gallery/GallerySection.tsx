import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { X } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MainCategory = "all" | "exterior" | "interior";
type SubCategory = string | null;

interface Project {
  id: number;
  title: string;
  mainCategory: MainCategory;
  subCategory: string;
  imageUrl: string;
  description: string;
}

interface CategoryItem {
  id: string;
  label: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Villa Exterior",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//1a.webp",
    description: "Contemporary villa design with sustainable materials",
  },
  {
    id: 2,
    title: "Minimalist Living Room",
    mainCategory: "interior",
    subCategory: "minimalist",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//2a.webp",
    description: "Open concept living space with natural light",
  },
  {
    id: 3,
    title: "Classic Urban Villa",
    mainCategory: "exterior",
    subCategory: "classic",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//360%20Interior.webp",
    description: "Traditional exterior design with modern amenities",
  },
  {
    id: 4,
    title: "Contemporary Mountain Retreat",
    mainCategory: "exterior",
    subCategory: "contemporary",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//3a.webp",
    description: "Sustainable retreat integrated with mountain surroundings",
  },
  {
    id: 5,
    title: "Industrial Loft Interior",
    mainCategory: "interior",
    subCategory: "industrial",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//7.webp",
    description: "Raw materials and open space design",
  },
  {
    id: 6,
    title: "Rustic Cabin Interior",
    mainCategory: "interior",
    subCategory: "rustic",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%201%20(1).webp",
    description: "Warm and cozy interior with natural wood elements",
  },
  {
    id: 7,
    title: "Contemporary Interior Lounge",
    mainCategory: "interior",
    subCategory: "contemporary",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%201.webp",
    description: "Modern lounge space with artistic elements",
  },
  {
    id: 8,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%202.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 8,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%203.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 9,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%204_upscale01.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 10,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%2055_upscale01.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 11,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%2056_upscale01.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 12,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//fente.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 13,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Fondo.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 14,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Frente.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 15,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Imagen(1)_upscale01.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 16,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Imagen_upscale01.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 17,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//INT1.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 18,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//INT2.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 19,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Interior.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 20,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//peatonal.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 21,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//perspectiva%201%20dia.webp",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 22,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//perspectiva%201.jpg",
    description: "Sleek design with panoramic ocean views",
  },
];

const mainCategories = [
  { id: "all", label: "All Projects" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
];

const subCategories = {
  exterior: [
    { id: "modern", label: "Modern" },
    { id: "classic", label: "Classic" },
    { id: "contemporary", label: "Contemporary" },
  ],
  interior: [
    { id: "minimalist", label: "Minimalist" },
    { id: "industrial", label: "Industrial" },
    { id: "rustic", label: "Rustic" },
    { id: "contemporary", label: "Contemporary" },
  ],
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
  const [ref] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Reset subcategory when main category changes
  useEffect(() => {
    setSelectedSubCategory(null);
  }, [selectedMainCategory]);

  const filteredProjects = projects.filter((project) => {
    if (selectedMainCategory === "all") return true;
    if (project.mainCategory !== selectedMainCategory) return false;
    if (selectedSubCategory && project.subCategory !== selectedSubCategory)
      return false;
    return true;
  });

  useEffect(() => {
    // Animación para el título y subtítulo cuando entran en el viewport
    gsap.fromTo(
      ".gallery-title",
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-title",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    gsap.fromTo(
      ".gallery-subtitle",
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-subtitle",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animación para la galería
    gsap.fromTo(
      ".gallery-grid",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.2,
        delay: 0.5,
        scrollTrigger: {
          trigger: ".gallery-grid",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animación para las categorías
    gsap.fromTo(
      ".gallery-categories button",
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".gallery-categories",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="gallery" className="py-20 px-4 bg-secondary min-h-screen">
      <div ref={ref} className="max-w-7xl mx-auto">
        <h2 className="gallery-title text-4xl md:text-5xl font-playfair text-white text-center mb-4">
          Our Portfolio
        </h2>
        <p className="gallery-subtitle text-gray-300 text-center mb-12 font-inter">
          Explore our diverse collection of architectural projects
        </p>

        {/* Main Categories */}
        <div className="gallery-categories flex flex-wrap justify-center gap-4 mb-6">
          {mainCategories.map((category) => (
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Sub Categories */}
        <AnimatePresence mode="wait">
          {selectedMainCategory !== "all" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-3 mb-10">
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

        {/* Gallery Grid */}
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
                    src={project.imageUrl}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-playfair text-lg mb-1">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm font-inter">
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </motion.div>

        {/* Modal */}
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
                  className="absolute top-4 right-4 bg-black/50 rounded-full p-2 text-white z-10 hover:bg-black transition-colors duration-300"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="relative">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-auto"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-white font-playfair text-2xl mb-2">
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
                      selectedProject.mainCategory !== "all" && (
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
