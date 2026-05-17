"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";
import { Search, ArrowLeft, Clock, Eye, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CluesPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white font-sans selection:bg-white/20 overflow-hidden">
      <StarsBackground />

      {/* Subtle glowing gradients */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.05),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-2xl px-6 flex flex-col items-center text-center">
        {/* Animated icon container */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, duration: 1.5 }}
          className="relative mb-10 group"
        >
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-400/40 transition-all duration-500" />
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white/5 border-2 border-white/10 rounded-full backdrop-blur-xl flex items-center justify-center relative shadow-[0_0_40px_rgba(34,211,238,0.2)]">
            <Search className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-400 animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute inset-0 border-[2px] border-dashed border-cyan-500/30 rounded-full"
            />
          </div>
        </motion.div>

        {/* Funny Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight bg-gradient-to-br from-white via-white to-white/40 bg-clip-text text-transparent">
            Hold your horses! 🐎
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="group bg-white/5 backdrop-blur-md border border-white/10 p-6 sm:p-8 rounded-2xl mb-10 relative overflow-hidden transition-all duration-300 shadow-[0_0_30px_rgba(34,211,238,0.2)] md:shadow-2xl md:hover:shadow-[0_0_50px_rgba(34,211,238,0.25)] md:hover:-translate-y-2"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-100 shadow-[0_0_20px_rgba(34,211,238,1)] md:opacity-50 md:shadow-none md:group-hover:opacity-100 md:group-hover:shadow-[0_0_20px_rgba(34,211,238,1)] transition-all duration-300" />
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed font-medium">
            You shouldn&apos;t be here now... <br className="hidden sm:block" />
            work ongoing 🔨
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <Link href="/hackathon">
            <Button className="h-14 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-cyan-500/50 transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold tracking-wide">Back to Hackathon</span>
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating funny elements */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="absolute top-20 left-10 sm:left-20"
      >
        <Eye className="w-12 h-12 text-white/20" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-32 right-10 sm:right-32"
      >
        <Clock className="w-16 h-16 text-cyan-500/20" />
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 10, -10, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }}
        className="absolute top-40 right-20"
      >
        <AlertTriangle className="w-10 h-10 text-yellow-500/20" />
      </motion.div>
    </div>
  );
}
