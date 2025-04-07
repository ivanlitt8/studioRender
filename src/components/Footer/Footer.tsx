import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Building2,
} from "lucide-react";

const socialLinks = [
  { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
  { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
];

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Team", href: "#team" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-secondary pt-16 pb-8">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center space-x-2 text-white mb-4">
              <Building2 className="w-8 h-8 text-accent" />
              <span className="text-2xl font-playfair">R3ALIM</span>
            </div>
            <p className="text-gray-400 font-inter">
              Crafting exceptional architectural experiences through innovative
              design and unwavering attention to detail.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-white font-playfair text-xl mb-6">
              Quick Links
            </h3>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-accent transition-colors duration-300 font-inter"
                  whileHover={{ x: 5 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-white font-playfair text-xl mb-6">Contact</h3>
            <div className="space-y-4">
              <a
                href="tel:+15551234567"
                className="flex items-center space-x-3 text-gray-400 hover:text-accent transition-colors duration-300"
              >
                <Phone className="w-5 h-5" />
                <span className="font-inter">+1 (555) 123-4567</span>
              </a>
              <a
                href="mailto:contact@studio.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-accent transition-colors duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="font-inter">contact@studio.com</span>
              </a>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-white font-playfair text-xl mb-6">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-full bg-primary/50 text-gray-400 hover:text-accent hover:bg-primary transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="pt-8 mt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-500 font-inter text-sm">
            © {new Date().getFullYear()} Studio. All rights reserved. Develop by{" "}
            <a
              href="https://portfolio-ivan-litt.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Studio88
            </a>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};
