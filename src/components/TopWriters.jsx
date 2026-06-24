


"use client";
import { motion } from "framer-motion";
import { FaBookOpen, FaUser } from "react-icons/fa";

export default function TopWriters() {
  const writers = [
    { id: 1, name: "John Doe", books: 12 },
    { id: 2, name: "Sarah Khan", books: 20 },
    { id: 3, name: "Alex Roy", books: 8 },
  ];

 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
          className="text-4xl font-bold text-center mb-12 text-slate-800"
        >
          Top Writers
        </motion.h2>

        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {writers.map((writer) => (
            <motion.div
              key={writer.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl text-center shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100"
            >
              
              <div className="w-20 h-20 mx-auto bg-emerald-100 text-emerald-600 flex items-center justify-center rounded-full text-3xl font-bold mb-4">
                <FaUser />
              </div>

             
              <h3 className="text-xl font-bold text-slate-800">
                {writer.name}
              </h3>

             
              <div className="flex items-center justify-center gap-2 text-slate-500 mt-2 mb-6">
                <FaBookOpen className="text-emerald-500" />
                <span className="font-medium">{writer.books} Published Books</span>
              </div>

              <button className="w-full px-6 py-3 bg-emerald-100 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-150 transition-colors duration-300">
                View Profile
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}