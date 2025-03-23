import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Masonry from "react-masonry-css";
import { X } from "lucide-react";
import { useInView } from "react-intersection-observer";

type Category = "all" | "exterior" | "interior" | "urban" | "nature";

interface Project {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Villa Exterior",
    category: "exterior",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    description: "Contemporary villa design with sustainable materials",
  },
  {
    id: 2,
    title: "Minimalist Living Room",
    category: "interior",
    imageUrl:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Open concept living space with natural light",
  },
  {
    id: 3,
    title: "Urban Park Complex",
    category: "urban",
    imageUrl:
      "https://images.unsplash.com/photo-1573108724029-4c46571d6490?auto=format&fit=crop&q=80",
    description: "Mixed-use development with green spaces",
  },
  {
    id: 4,
    title: "Eco-Resort",
    category: "nature",
    imageUrl:
      "https://images.unsplash.com/photo-1470723710355-95304d8aece4?auto=format&fit=crop&q=80",
    description: "Sustainable resort integrated with natural surroundings",
  },
  {
    id: 5,
    title: "Modern Office Interior",
    category: "interior",
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80",
    description: "Contemporary workspace design",
  },
  {
    id: 6,
    title: "Urban Residential Tower",
    category: "urban",
    imageUrl:
      "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?auto=format&fit=crop&q=80",
    description: "High-rise residential complex",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "exterior", label: "Exterior" },
  { id: "interior", label: "Interior" },
  { id: "urban", label: "Urban" },
  { id: "nature", label: "Nature" },
];

const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1,
};

export const GallerySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = projects.filter(
    (project) =>
      selectedCategory === "all" || project.category === selectedCategory
  );

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

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as Category)}
              className={`px-6 py-2 rounded-full font-inter text-sm transition-all
                ${
                  selectedCategory === category.id
                    ? "bg-accent text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

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
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
