"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Loader from "./components/Loader";
import { ArrowRight, Sparkles, Film, Video, Star, Play, Clapperboard } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Simulate initial loading for premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Generate unique floating elements on client-side
  useEffect(() => {
    setElements(
      [...Array(15)].map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 40 + 20,
        duration: 25 + Math.random() * 20,
        delay: Math.random() * 10,
        iconIndex: Math.floor(Math.random() * 5),
        opacity: 0.1 + Math.random() * 0.2, // Fixed opacity to 10-30% range
      }))
    );
  }, []);

  if (loading) return <Loader />;

  const IconComponents = [Film, Video, Star, Play, Clapperboard];

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-[#020617] selection:bg-blue-500/30 overflow-hidden">
      {/* 
        LAYER 1: Animated Background Blobs 
        Positioned relative to main container, but at the bottom of the stack (z-0)
      */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large Gradient Blobs - Increased visibility */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: ["-5%", "5%", "-5%"],
            y: ["-5%", "5%", "-5%"],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[1000px] h-[1000px] bg-blue-600/30 rounded-full blur-[140px] mix-blend-screen " 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: ["5%", "-5%", "5%"],
            y: ["5%", "-5%", "5%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-1/4 -right-1/4 w-[1000px] h-[1000px] bg-purple-600/20 rounded-full blur-[140px] mix-blend-screen" 
        />
        
        {/* Floating Icons Loop - Adjusted for visibility */}
        {elements.map((el) => {
          const Icon = IconComponents[el.iconIndex];
          return (
            <motion.div
              key={el.id}
              initial={{ opacity: 0, y: "110vh" }}
              animate={{ 
                opacity: [0, el.opacity, 0],
                y: ["110vh", "-10vh"],
                rotate: [0, 360],
              }}
              transition={{ 
                duration: el.duration, 
                repeat: Infinity, 
                delay: el.delay,
                ease: "linear" 
              }}
              className="absolute text-blue-400 pointer-events-none"
              style={{
                left: `${el.x}%`,
              }}
            >
              <Icon size={el.size} strokeWidth={1.5} />
            </motion.div>
          );
        })}

        {/* Decorative Rings - Changed color and opacity for premium look */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`ring-${i}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border  border-blue-500/5 rounded-full pointer-events-none"
            style={{
              width: `${(i + 1) * 30}%`,
              aspectRatio: "1/1",
              borderWidth: "1px",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25]  mix-blend-overlay"></div>
      </div>

      {/* LAYER 2: Main Content - Clearly above background using z-10 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl text-center space-y-12 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="tracking-wide uppercase text-[10px]">AI-Powered Movie Discovery</span>
        </motion.div>

        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-7xl md:text-9xl font-black tracking-tight text-white leading-[0.9]"
          >
            CINEMA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-purple-600">
              REDEFINED
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed"
          >
            Let our advanced AI analyze your taste and find the perfect cinematic masterpiece for your mood.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col items-center gap-6 pt-4"
        >
          <Link href="/predict" passHref>
             <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(37, 99, 235, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-white text-black text-xl font-bold rounded-2xl shadow-2xl transition-all flex items-center gap-4 overflow-hidden"
            >
              <span className="relative z-10">Get Recommendations</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="pt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { title: "Neural sync", desc: "Algorithms that understand nuances in storytelling." },
            { title: "Zero Latency", desc: "Get personalized results in milliseconds." },
            { title: "Ultra Curated", desc: "Hand-picked selections for the modern cinephile." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-3xl text-left hover:bg-white/5 transition-all group">
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </main>
  );
}
