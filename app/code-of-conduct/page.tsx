"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, HeartHandshake, AlertOctagon, Scale } from "lucide-react";
import { StarsBackground } from "@/components/ui/stars-background";

export default function CodeOfConductPage() {
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay }
  });

  return (
    <div className="min-h-screen bg-black text-white selection:bg-fuchsia-500/30 overflow-hidden relative">
      <StarsBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,70,239,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 sm:py-32">
        {/* Navigation */}
        <motion.div {...fade()} className="mb-12">
          <Link href="/hackathon" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group">
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-white/[0.05] group-hover:border-white/20 transition-all">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-medium tracking-wide">Back to Hackathon</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div {...fade(0.1)} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 mb-6 text-xs font-bold tracking-widest text-fuchsia-400 uppercase">
            <Shield className="w-4 h-4" /> Community Standards
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Code of <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-500">Conduct</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            DECODE2DEPLOY is dedicated to providing a safe, inclusive, and harassment-free experience for everyone, regardless of background or experience level.
          </p>
        </motion.div>

        {/* Content */}
        <div className="grid gap-8">
          <motion.div {...fade(0.2)} className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-inner">
                <HeartHandshake className="w-6 h-6 text-fuchsia-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Pledge</h2>
            </div>
            <p className="text-white/70 leading-relaxed text-lg">
              We pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.
            </p>
          </motion.div>

          <motion.div {...fade(0.3)} className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-inner">
                <Scale className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Expected Behavior</h2>
            </div>
            <ul className="space-y-4 text-white/70 list-disc list-inside">
              <li className="leading-relaxed">Be respectful and considerate to all participants, mentors, and organizers.</li>
              <li className="leading-relaxed">Use welcoming and inclusive language at all times.</li>
              <li className="leading-relaxed">Gracefully accept constructive criticism and feedback.</li>
              <li className="leading-relaxed">Focus on what is best for the community and event environment.</li>
              <li className="leading-relaxed">Show empathy towards other community members.</li>
            </ul>
          </motion.div>

          <motion.div {...fade(0.4)} className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-inner">
                <AlertOctagon className="w-6 h-6 text-rose-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Unacceptable Behavior</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-4">
              Harassment includes, but is not limited to:
            </p>
            <ul className="space-y-4 text-white/70 list-disc list-inside">
              <li className="leading-relaxed">Offensive comments related to gender, sexual orientation, disability, mental illness, neuro(a)typicality, physical appearance, body size, age, race, or religion.</li>
              <li className="leading-relaxed">Deliberate intimidation, stalking, or following.</li>
              <li className="leading-relaxed">Harassing photography or recording.</li>
              <li className="leading-relaxed">Sustained disruption of talks, presentations, or other events.</li>
              <li className="leading-relaxed">Inappropriate physical contact or unwelcome sexual attention.</li>
            </ul>
          </motion.div>

          <motion.div {...fade(0.5)} className="p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
            <p className="text-white/50 leading-relaxed text-sm text-center">
              If you are being harassed, notice that someone else is being harassed, or have any other concerns, please contact the organizers immediately. Participants asked to stop any harassing behavior are expected to comply immediately. Organizers reserve the right to expel individuals from the event without refund (if applicable) for violating these rules.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
