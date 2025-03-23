import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Linkedin, Bean as Behance, Twitter } from 'lucide-react';

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
    name: "Sarah Anderson",
    role: "Principal Architect & Founder",
    bio: "With over 15 years of experience in sustainable architecture, Sarah leads our team with innovative design approaches and a passion for environmental consciousness.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
    social: {
      linkedin: "#",
      behance: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "David Chen",
    role: "Creative Director",
    bio: "David brings his expertise in architectural visualization and CGI, creating stunning visual narratives that bring our clients' visions to life.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    social: {
      linkedin: "#",
      behance: "#"
    }
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Senior Interior Designer",
    bio: "Elena's innovative approach to interior spaces combines functionality with artistic vision, creating harmonious environments that inspire and delight.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    social: {
      linkedin: "#",
      behance: "#",
      twitter: "#"
    }
  },
  {
    id: 4,
    name: "Marcus Thompson",
    role: "Technical Director",
    bio: "Marcus oversees the technical aspects of our projects, ensuring that innovative design meets practical implementation with precision.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
    social: {
      linkedin: "#",
      behance: "#"
    }
  }
];

const SocialIcon = ({ type, link }: { type: keyof TeamMember['social']; link: string }) => {
  const icons = {
    linkedin: Linkedin,
    behance: Behance,
    twitter: Twitter
  };
  
  const Icon = icons[type];
  
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="text-gray-400 hover:text-accent transition-colors duration-300"
    >
      <Icon size={20} />
    </motion.a>
  );
};

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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
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
            Passionate professionals dedicated to transforming architectural visions into reality
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
                  className="aspect-[3/4]"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-playfair text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-accent font-inter text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm mb-4 font-inter">
                  {member.bio}
                </p>
                
                <div className="flex justify-center items-center space-x-4">
                  {Object.entries(member.social).map(([platform, link]) => (
                    <SocialIcon 
                      key={platform} 
                      type={platform as keyof TeamMember['social']} 
                      link={link} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};