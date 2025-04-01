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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    description: "Contemporary villa design with sustainable materials",
  },
  {
    id: 2,
    title: "Minimalist Living Room",
    mainCategory: "interior",
    subCategory: "minimalist",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Open concept living space with natural light",
  },
  {
    id: 3,
    title: "Classic Urban Villa",
    mainCategory: "exterior",
    subCategory: "classic",
    imageUrl:
      "https://images.unsplash.com/photo-1573108724029-4c46571d6490?auto=format&fit=crop&q=80",
    description: "Traditional exterior design with modern amenities",
  },
  {
    id: 4,
    title: "Contemporary Mountain Retreat",
    mainCategory: "exterior",
    subCategory: "contemporary",
    imageUrl:
      "https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&q=80",
    description: "Sustainable retreat integrated with mountain surroundings",
  },
  {
    id: 5,
    title: "Industrial Loft Interior",
    mainCategory: "interior",
    subCategory: "industrial",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    description: "Raw materials and open space design",
  },
  {
    id: 6,
    title: "Rustic Cabin Interior",
    mainCategory: "interior",
    subCategory: "rustic",
    imageUrl:
      "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?auto=format&fit=crop&q=80",
    description: "Warm and cozy interior with natural wood elements",
  },
  {
    id: 7,
    title: "Contemporary Interior Lounge",
    mainCategory: "interior",
    subCategory: "contemporary",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Modern lounge space with artistic elements",
  },
  {
    id: 8,
    title: "Modern Beach House",
    mainCategory: "exterior",
    subCategory: "modern",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
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
