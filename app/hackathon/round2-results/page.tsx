"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";
import { Shield, Medal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

const TEAMS: string[] = [
  "Decoders",
  "Touchgrass.exe",
  "Lady Detectives",
  "Nexora",
  "Vector Space",
  "Aera",
  "Eternal",
  "Syntax Squad",
  "Team Hopeless",
  "BroCode"
];

export default function Round2ResultsPage() {
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <div className="relative min-h-screen bg-[#06080e] text-white font-sans selection:bg-white/20 pb-24">
      <StarsBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-[#06080e]/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/hackathon" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Event</span>
          </Link>
          <div className="flex items-center gap-2 text-white/80 text-sm font-semibold tracking-widest uppercase">
            <Shield className="w-4 h-4 text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Round 2 Results</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-16">
        
        {/* Title & Congrats Section */}
        <motion.div {...fade(0.1)} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 mb-6 text-xs font-bold tracking-widest text-yellow-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
            Finalists Selection
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase leading-tight tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            Top 10 Teams
          </h1>

          {/* Cursive Congratulations */}
          <div className={`mt-6 mb-12 text-3xl sm:text-5xl text-yellow-300 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] ${caveat.className}`}>
            Congratulations to the finalists! Get ready for the final showdown.
          </div>
        </motion.div>

        {/* Results List */}
        <motion.div {...fade(0.3)} className="bg-[#050810] border border-yellow-900/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Table Header */}
          <div className="px-6 py-5 border-b border-yellow-900/50 bg-[#080c14] text-[11px] font-extrabold tracking-[0.25em] text-emerald-500 uppercase text-center">
            Team Name
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {TEAMS.length === 0 ? (
              <div className="px-6 py-12 text-center text-white/50 text-sm">
                Results will be published soon.
              </div>
            ) : (
              TEAMS.map((team, index) => {
                let rowStyle = "border-b border-white/5 last:border-b-0 hover:bg-[#0a0f1a]";
                let textStyle = "text-white/90 font-medium sm:font-semibold tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]";

                return (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: Math.min(index * 0.04, 0.5) }}
                    key={team} 
                    className={`flex items-center justify-center px-6 py-5 sm:py-6 transition-all duration-300 group ${rowStyle}`}
                  >
                    <div className={`text-center text-lg sm:text-xl transition-colors group-hover:text-emerald-400 ${textStyle}`}>
                      {team}
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Networking Message */}
        <motion.div {...fade(0.5)} className="mt-12 text-center p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.02)]">
          <p className="text-white/80 leading-relaxed text-sm sm:text-base font-medium">
            If you guys are interested to see the pitch, you can come and do your networking and talk about your projects with founders and co-founders!
          </p>
        </motion.div>

      </div>
    </div>
  );
}
