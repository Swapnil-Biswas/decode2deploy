"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";
import { Trophy, ArrowLeft, Crown, Medal, Award, Sparkles, Palette, Lightbulb } from "lucide-react";
import Link from "next/link";
import { Caveat } from "next/font/google";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const caveat = Caveat({ subsets: ["latin"] });

const WINNING_TEAMS = [
  { place: "1st Place", name: "Decoders", icon: Crown, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", glow: "shadow-[0_0_30px_-5px_rgba(250,204,21,0.3)] hover:shadow-[0_0_50px_-5px_rgba(250,204,21,0.6)]", gradient: "from-yellow-400 to-amber-600" },
  { place: "2nd Place", name: "Nexora", icon: Medal, color: "text-slate-300", bg: "bg-slate-300/10", border: "border-slate-300/30", glow: "shadow-[0_0_30px_-5px_rgba(203,213,225,0.2)] hover:shadow-[0_0_50px_-5px_rgba(203,213,225,0.4)]", gradient: "from-slate-300 to-slate-500" },
  { place: "3rd Place", name: "Lady Detective", icon: Award, color: "text-amber-700", bg: "bg-amber-700/10", border: "border-amber-700/30", glow: "shadow-[0_0_30px_-5px_rgba(180,83,9,0.3)] hover:shadow-[0_0_50px_-5px_rgba(180,83,9,0.6)]", gradient: "from-amber-600 to-amber-800" },
];

const SPECIAL_AWARDS = [
  { award: "Best UI/UX", name: "Bro Code", icon: Palette, color: "text-fuchsia-400", bg: "bg-fuchsia-400/10", border: "border-fuchsia-400/30", glow: "shadow-[0_0_30px_-5px_rgba(232,121,249,0.3)] hover:shadow-[0_0_50px_-5px_rgba(232,121,249,0.6)]", gradient: "from-fuchsia-400 to-pink-600" },
  { award: "Best Innovation", name: "Aera", icon: Lightbulb, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30", glow: "shadow-[0_0_30px_-5px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_-5px_rgba(34,211,238,0.6)]", gradient: "from-cyan-400 to-blue-600" },
];

export default function FinalResultsPage() {
  useEffect(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  return (
    <div className="relative h-screen w-full bg-black text-white font-sans selection:bg-white/20 overflow-hidden flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <StarsBackground />
      </div>
      
      {/* Header */}
      <header className="relative z-50 border-b border-white/10 backdrop-blur-md bg-black/60 shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/hackathon" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-xs font-medium">
            <ArrowLeft className="w-3 h-3" />
            <span>Return to Event</span>
          </Link>
          <div className="flex items-center gap-2 text-white/80 text-xs font-bold tracking-widest uppercase">
            <Trophy className="w-3 h-3 text-emerald-400" />
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">Final Results</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto">
        
        {/* Title & Congrats Section */}
        <motion.div {...fade(0.1)} className="mb-6 sm:mb-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-4 text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Grand Finale
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold uppercase leading-none tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            Decode2Deploy Champions
          </h1>

          <div className={`mt-2 text-2xl sm:text-3xl text-emerald-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] ${caveat.className}`}>
            Congratulations to the ultimate winners!
          </div>
        </motion.div>

        {/* Results Layout Grid */}
        <div className="w-full flex flex-col gap-6 sm:gap-8">
          
          {/* Winning Teams */}
          <div>
            <motion.div {...fade(0.2)} className="flex items-center justify-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-widest">Winning Teams</h2>
              <Trophy className="w-4 h-4 text-yellow-400" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {WINNING_TEAMS.map((team, index) => {
                const Icon = team.icon;
                return (
                  <motion.div 
                    key={team.name}
                    {...fade(0.3 + index * 0.1)}
                    className={`group relative rounded-2xl border ${team.border} p-4 sm:p-5 ${team.bg} ${team.glow} backdrop-blur-sm overflow-hidden transition-all hover:-translate-y-1 hover:brightness-110`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${team.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="flex flex-col items-center text-center relative z-10">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-black/40 border ${team.border} shadow-xl`}>
                        <Icon className={`w-6 h-6 ${team.color}`} />
                      </div>
                      <div className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 ${team.color}`}>
                        {team.place}
                      </div>
                      <div className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                        {team.name}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Special Awards */}
          <div>
            <motion.div {...fade(0.5)} className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-widest">Special Awards</h2>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {SPECIAL_AWARDS.map((award, index) => {
                const Icon = award.icon;
                return (
                  <motion.div 
                    key={award.name}
                    {...fade(0.6 + index * 0.1)}
                    className={`group relative rounded-2xl border ${award.border} py-3 px-4 ${award.bg} ${award.glow} backdrop-blur-sm overflow-hidden transition-all hover:-translate-y-1 hover:brightness-110`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${award.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    <div className="flex items-center gap-4 relative z-10">
                      <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-black/40 border ${award.border} shadow-lg`}>
                        <Icon className={`w-5 h-5 ${award.color}`} />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <div className={`text-[10px] font-bold tracking-widest uppercase mb-0.5 ${award.color}`}>
                          {award.award}
                        </div>
                        <div className="text-lg font-bold text-white tracking-wide">
                          {award.name}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Outro Message */}
        <motion.div {...fade(0.8)} className="mt-8 text-center px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.01)] max-w-3xl">
          <p className="text-white/70 leading-relaxed text-xs sm:text-sm font-medium">
            Thank you to all participants for making <span className="text-emerald-400 font-bold">Decode2Deploy</span> a massive success! Keep building and keep innovating.
          </p>
        </motion.div>

      </main>
    </div>
  );
}
