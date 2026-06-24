

"use client";
import { motion } from "framer-motion";
import { 
  FaBookOpen, FaMask, FaHeart, FaRocket, 
  FaDragon, FaGhost, FaUserTie, FaLightbulb 
} from "react-icons/fa";

export default function Genres() {
  const genres = [
    { name: "Fiction", icon: <FaBookOpen /> },
    { name: "Mystery", icon: <FaMask /> }, 
    { name: "Romance", icon: <FaHeart /> },
    { name: "Sci-Fi", icon: <FaRocket /> },
    { name: "Fantasy", icon: <FaDragon /> },
    { name: "Horror", icon: <FaGhost /> },
    { name: "Biography", icon: <FaUserTie /> },
    { name: "Self-Help", icon: <FaLightbulb /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10 text-slate-800"
        >
          Browse by Genres
        </motion.h2>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {genres.map((genre, index) => (
            <motion.button
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-emerald-600 hover:text-white transition-colors duration-300 group"
            >
              <span className="text-emerald-600 group-hover:text-white transition-colors">
                {genre.icon}
              </span>
              <span className="font-medium">{genre.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

