import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { X } from "lucide-react";
import { useInView } from "react-intersection-observer";

type MainCategory = "all" | "exterior" | "interior";
type SubCategory =
  | "modern"
  | "classic"
  | "minimalist"
  | "contemporary"
  | "industrial"
  | "rustic";

interface Project {
  id: number;
  title: string;
  mainCategory: MainCategory;
  subCategory?: SubCategory;
  imageUrl: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Villa Exterior",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//1a.png",
    description: "Contemporary villa design with sustainable materials",
  },
  {
    id: 2,
    title: "Minimalist Living Room",
    mainCategory: "interior",
    subCategory: "minimalist",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//2a.png",
    description: "Open concept living space with natural light",
  },
  {
    id: 3,
    title: "Classic Urban Villa",
    mainCategory: "exterior",
    subCategory: "classic",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//360%20Interior.png",
    description: "Traditional exterior design with modern amenities",
  },
  {
    id: 4,
    title: "Contemporary Mountain Retreat",
    mainCategory: "exterior",
    subCategory: "contemporary",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//3a.png",
    description: "Sustainable retreat integrated with mountain surroundings",
  },
  {
    id: 5,
    title: "Industrial Loft Interior",
    mainCategory: "interior",
    subCategory: "industrial",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//7.jpg",
    description: "Raw materials and open space design",
  },
  {
    id: 6,
    title: "Rustic Cabin Interior",
    mainCategory: "interior",
    subCategory: "rustic",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%201.png",
    description: "Warm and cozy interior with natural wood elements",
  },
  {
    id: 7,
    title: "Contemporary Interior Lounge",
    mainCategory: "interior",
    subCategory: "contemporary",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%202.png",
    description: "Modern lounge space with artistic elements",
  },
  {
    id: 8,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%202_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 8,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%203.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 9,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%203_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 10,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%204_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 11,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%2055_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 12,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Escena%2056_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 13,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//fente.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 14,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Fondo.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 15,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Fondo_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 16,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Frente.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 17,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Frente_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 18,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Imagen(1)_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 14,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Imagen_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 19,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//INT1.jpg",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 20,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//INT2.jpg",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 21,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Interior.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 22,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//Interior_upscale01.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 23,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//peatonal.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 24,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//perspectiva%201%20dia.png",
    description: "Sleek design with panoramic ocean views",
  },
  {
    id: 25,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/projects//perspectiva%201.png",
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
    useState<SubCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
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

  return (
    <section id="gallery" className="py-20 px-4 bg-secondary min-h-screen">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-playfair text-white text-center mb-4">
          Our Portfolio
        </h2>
        <p className="text-gray-300 text-center mb-12 font-inter">
          Explore our diverse collection of architectural projects
        </p>

        {/* Main Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
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
        <AnimatePresence>
          {selectedMainCategory !== "all" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mb-12 overflow-hidden"
            >
              <motion.button
                key="all-sub"
                onClick={() => setSelectedSubCategory(null)}
                className={`px-6 py-2 rounded-full font-inter text-xs transition-all duration-300
                  ${
                    selectedSubCategory === null
                      ? "bg-accent/70 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                All{" "}
                {selectedMainCategory === "exterior"
                  ? "Exteriors"
                  : "Interiors"}
              </motion.button>

              {subCategories[selectedMainCategory].map((subCategory) => (
                <motion.button
                  key={subCategory.id}
                  onClick={() =>
                    setSelectedSubCategory(subCategory.id as SubCategory)
                  }
                  className={`px-6 py-2 rounded-full font-inter text-xs transition-all duration-300
                    ${
                      selectedSubCategory === subCategory.id
                        ? "bg-accent/70 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {subCategory.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Grid */}
        <Masonry
          breakpointCols={breakpointColumns}
          className="flex -ml-4 w-auto"
          columnClassName="pl-4 bg-clip-padding"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 hover:opacity-100 text-white text-center p-4 transform translate-y-4 hover:translate-y-0 transition-all duration-300">
                    <h3 className="text-xl font-playfair mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm font-inter">{project.description}</p>
                    {project.subCategory && (
                      <span className="inline-block mt-2 px-3 py-1 bg-accent/80 rounded-full text-xs">
                        {project.subCategory}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </Masonry>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={24} />
                </button>
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-auto rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 rounded-b-lg">
                  <h3 className="text-xl font-playfair text-white mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-gray-300 font-inter">
                    {selectedProject.description}
                  </p>
                  {selectedProject.subCategory && (
                    <span className="inline-block mt-3 px-3 py-1 bg-accent/80 rounded-full text-xs">
                      {selectedProject.subCategory}
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
