import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { Linkedin, Bean as Behance, Twitter } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    behance?: string;
    twitter?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Juan Insua",
    role: "CEO & Co-Founder",
    bio: "Senior professional in accounting and management, currently specialising in digital marketing. As a passionate entrepreneur, he is committed to delivering exceptional client service with a focus on precision and excellence.",
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//Portrait_Juan%20(1).jpeg",
    social: {
      linkedin: "#",
      behance: "#",
      twitter: "#",
    },
  },
  {
    id: 2,
    name: "Iñigo Alcarraz",
    role: "Chief Architectural Visualiser & Co-Founder",
    bio: "Skilled architect with a technical background in electromechanics. His understanding of materials and construction systems supports a practical approach to projects. With strong spatial awareness, he ensures visualisations align with client visions and desired atmospheres.",
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//Portrait_Inigo2.jpg",
    social: {
      linkedin: "#",
      behance: "#",
    },
  },
  {
    id: 3,
    name: "Bruno Faggionato",
    role: "Senior Architect & Rendering Specialist",
    bio: "Specialising in graphic representation and 3D modelling, he demonstrates an unwavering commitment to perfection and strives for the highest quality in every visualisation, consistently meeting the highest standards.",
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//Portrait_Bruno.jpg",
    social: {
      linkedin: "#",
      behance: "#",
      twitter: "#",
    },
  },
  {
    id: 4,
    name: "Nicolas Pedroza",
    role: "Director of Technical Innovation",
    bio: "With years of experience in graphic representation, Nicolas demonstrates a keen architectural eye that allows him to capture the essence of each project. He understands client visions and translates them into precise CAD drawings and visualisations.",
    image:
      "https://aniukvbdbhvqyscfxoug.supabase.co/storage/v1/object/public/images//Portrait_Nico%20(1).jpg",
    social: {
      linkedin: "#",
      behance: "#",
    },
  },
];

// const SocialIcon = ({
//   type,
//   link,
// }: {
//   type: keyof TeamMember["social"];
//   link: string;
// }) => {
//   const icons = {
//     linkedin: Linkedin,
//     behance: Behance,
//     twitter: Twitter,
//   };

//   const Icon = icons[type];

//   return (
//     <motion.a
//       href={link}
//       target="_blank"
//       rel="noopener noreferrer"
//       whileHover={{ scale: 1.2 }}
//       whileTap={{ scale: 0.9 }}
//       className="text-gray-400 hover:text-accent transition-colors duration-300"
//     >
//       <Icon size={20} />
//     </motion.a>
//   );
// };

export const TeamSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="team" className="py-20 px-4 bg-secondary">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-playfair text-white mb-4"
            variants={itemVariants}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            className="text-gray-300 max-w-2xl mx-auto font-inter"
            variants={itemVariants}
          >
            Passionate professionals dedicated to transforming architectural
            visions into reality
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="aspect-[3/4] relative"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-6">
                    <p className="text-white text-sm font-inter opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 text-center">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-playfair text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-inter text-sm">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
