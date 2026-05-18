"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";
import { Shield, Medal, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Caveat } from "next/font/google";

const caveat = Caveat({ subsets: ["latin"] });

const TEAMS = [
  "Decoders",
  "Touchgrass.exe",
  "Coffee2Code",
  "Maverics",
  "Genesis",
  "Lady detectives",
  "Sacred Coders",
  "The Goated Coders",
  "Fab 4",
  "Team NEXUS",
  "BROCODE",
  "Game of code",
  "SyncUp",
  "Nova coders",
  "Ctrl Freaks",
  "Orange",
  "PJ'S team",
  "vectorspace",
  "Team Hopeless",
  "Nexora",
  "Syntax squad",
  "ErRor404",
  "F-society",
  "ETERNAL",
  "AI AVENGERS",
  "Aera",
  "Lalit",
  "Cyber Shoguns",
  "Caffeine overload",
  "TVK"
];

export default function ResultsPage() {
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
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Round 1 Results</span>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-16">
        
        {/* Title & Congrats Section */}
        <motion.div {...fade(0.1)} className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 text-xs font-bold tracking-widest text-cyan-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Official Selection
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase leading-tight tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            Top 30 Teams
          </h1>

          {/* Cursive Congratulations */}
          <div className={`mt-6 mb-12 text-3xl sm:text-5xl text-cyan-300 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] ${caveat.className}`}>
            Congratulations to all the selected teams! Get ready for Round 2.
          </div>
        </motion.div>

        {/* Results List */}
        <motion.div {...fade(0.3)} className="bg-[#050810] border border-cyan-900/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Table Header */}
          <div className="grid grid-cols-2 px-6 py-5 border-b border-cyan-900/50 bg-[#080c14] text-[11px] font-extrabold tracking-[0.25em] text-emerald-500 uppercase">
            <div className="text-center">Rank</div>
            <div className="text-center">Team</div>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            {TEAMS.map((team, index) => {
              const rank = index + 1;
              
              let rankDisplay;
              let rowStyle = "border-b border-white/5 last:border-b-0 hover:bg-[#0a0f1a]";
              let textStyle = "text-white/90 font-medium sm:font-semibold";

              if (rank === 1) {
                rankDisplay = (
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                    <Medal className="w-5 h-5 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                  </div>
                );
                rowStyle = "border-b border-yellow-500/20 bg-yellow-500/[0.03] hover:bg-yellow-500/[0.06] relative overflow-hidden";
                textStyle = "text-emerald-400 font-extrabold text-lg sm:text-xl drop-shadow-[0_0_12px_rgba(52,211,153,0.6)] tracking-wide";
              } else if (rank === 2) {
                rankDisplay = (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300/10 border border-gray-300/20">
                    <Medal className="w-4 h-4 text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.8)]" />
                  </div>
                );
                rowStyle = "border-b border-gray-400/20 bg-gray-400/[0.02] hover:bg-gray-400/[0.04]";
                textStyle = "text-white font-bold text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] tracking-wide";
              } else if (rank === 3) {
                rankDisplay = (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-600/10 border border-amber-600/20">
                    <Medal className="w-4 h-4 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  </div>
                );
                rowStyle = "border-b border-amber-600/20 bg-amber-600/[0.02] hover:bg-amber-600/[0.04]";
                textStyle = "text-white font-bold text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] tracking-wide";
              } else {
                rankDisplay = <span className="text-white/30 font-mono text-lg sm:text-xl font-bold">#{rank}</span>;
              }

              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: Math.min(index * 0.04, 0.5) }}
                  key={team} 
                  className={`grid grid-cols-2 items-center px-6 py-5 sm:py-6 transition-all duration-300 group ${rowStyle}`}
                >
                  {rank === 1 && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-300 to-yellow-600 shadow-[0_0_15px_rgba(250,204,21,1)]" />
                  )}
                  
                  <div className="flex items-center justify-center">
                    {rankDisplay}
                  </div>
                  <div className={`text-center text-base sm:text-lg transition-colors group-hover:text-white ${textStyle}`}>
                    {team}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
