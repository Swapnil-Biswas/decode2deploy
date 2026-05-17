"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, AlertTriangle, Lightbulb, Users, Clock } from "lucide-react";
import { StarsBackground } from "@/components/ui/stars-background";

export default function GuidelinesPage() {
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5, delay }
  });

  const guidelines = [
    {
      title: "Team Formation & Eligibility",
      icon: <Users className="w-6 h-6 text-cyan-400" />,
      rules: [
        "Teams can consist of 3 - 4 members.",
        "Each participant can only be part of one single team."
      ]
    },
    {
      title: "Project Development",
      icon: <BookOpen className="w-6 h-6 text-fuchsia-400" />,
      rules: [
        "All code must be written during the official hackathon period.",
        "You may use open-source libraries, frameworks, and public APIs.",
        "Pre-existing templates are allowed but must be significantly modified. Your final evaluation is based on what you build during the event."
      ]
    },
    {
      title: "Submission Protocol",
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      rules: [
        "Projects must be submitted before the countdown ends. Late submissions will not be accepted.",
        "A public GitHub repository link containing the source code is mandatory.",
        "A deployed live link is highly recommended for evaluation."
      ]
    },
    {
      title: "Evaluation Criteria",
      icon: <Lightbulb className="w-6 h-6 text-emerald-400" />,
      rules: [
        "Insight Quality (40%)",
        "Technical Correctness (25%)",
        "Cost Efficiency (20%)",
        "UI - UX (15%)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-hidden relative">
      <StarsBackground />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.05),transparent_50%)] pointer-events-none" />

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 text-xs font-bold tracking-widest text-cyan-400 uppercase">
            <BookOpen className="w-4 h-4" /> Official Rulebook
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Guidelines</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            Please read these rules carefully. They are designed to ensure a fair, fun, and highly competitive environment for all participants.
          </p>
        </motion.div>

        {/* Guidelines List */}
        <div className="space-y-8">
          {guidelines.map((section, idx) => (
            <motion.div key={section.title} {...fade(0.1 * (idx + 2))}
              className="p-8 sm:p-10 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-xl transition-colors hover:bg-white/[0.04]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-inner">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-4">
                {section.rules.map((rule, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-3 text-white/70">
                    <CheckCircle2 className="w-5 h-5 text-white/30 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{rule}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Warning / Disqualification */}
        <motion.div {...fade(0.8)} className="mt-12 p-8 rounded-3xl border border-red-500/20 bg-red-500/5 backdrop-blur-md">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Zero Tolerance Policy</h3>
              <p className="text-white/60 leading-relaxed">
                Plagiarism, copying another team&apos;s code, or submitting pre-built full projects will result in immediate disqualification. We strictly monitor commits and project integrity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
