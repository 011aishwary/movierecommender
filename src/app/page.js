"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import Searchm from "./components/Searchm";
import Loader from "./components/Loader";

// Dummy data for demonstration
const POPULAR_MOVIES = [
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "Parasite",
  "Avatar",
  "The Godfather",
  "Pulp Fiction",
  "Dune",
  "Oppenheimer",
  "Barbie",
  "Avengers: Endgame",
  "Spider-Man: Across the Spider-Verse"
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate initial loading for premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (term) => {
    router.push(`/predict?search=${encodeURIComponent(term)}`);
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-blob blob-3" />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150 mix-blend-overlay"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl text-center space-y-8"
      >
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2"
        >
          Discover Your Next
          <span className="block text-gradient mt-2">Favorite Movie</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light"
        >
          AI-powered recommendations tailored to your unique taste.
          Experience the future of cinema discovery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="relative px-4"
        >
          <Searchm data={POPULAR_MOVIES} onSearch={handleSearch} />
        </motion.div>

        {/* Feature Highlights or Decor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left"
        >
          {[
            { title: "Smart AI", desc: "Advanced algorithms to match your vibe." },
            { title: "Instant Results", desc: "Get recommendations in milliseconds." },
            { title: "Curated Lists", desc: "Handpicked selections just for you." }
          ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6 hover:bg-white/5 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
