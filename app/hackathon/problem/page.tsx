"use client";

import { motion } from "framer-motion";
import { StarsBackground } from "@/components/ui/stars-background";
import { Shield, Target, AlertTriangle, Layers, Zap, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ProblemStatementPage() {
  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay },
  });

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white/20 pb-24">
      <StarsBackground />
      
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/60">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white/80 text-sm font-semibold tracking-widest uppercase">
            <div className="p-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/50">
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Decrypted Access</span>
          </div>
          <Link href="/hackathon" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
            Return to Event
          </Link>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-16">
        
        {/* Title Section */}
        <motion.div {...fade(0.1)} className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6 text-xs font-bold tracking-widest text-cyan-400 uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Official Problem Statement
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase leading-tight tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">
            Repo Health Intelligence
          </h1>
          <p className="text-xl sm:text-2xl text-cyan-50/70 font-medium leading-relaxed border-l-4 border-cyan-500/50 pl-6">
            Track how a codebase evolves over time — and tell teams whether they&apos;re winning or losing.
          </p>
        </motion.div>

        {/* The Problem */}
        <motion.div {...fade(0.2)} className="mb-16 p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-yellow-500/[0.05] transition-colors" />
          <h2 className="relative z-10 flex items-center gap-3 text-2xl font-bold text-white mb-6">
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
            The Problem
          </h2>
          <p className="relative z-10 text-lg text-white/70 leading-relaxed mb-6">
            Linters and coverage reports describe a codebase today. No one connects &quot;this PR merged&quot; to &quot;and here&apos;s how it shifted the complexity, architecture, and risk of the codebase.&quot; Engineering teams ship blind.
          </p>
          <div className="relative z-10 p-6 rounded-2xl bg-black/50 border border-white/5 shadow-inner">
            <p className="text-white/80 font-medium leading-relaxed text-lg">
              Build a system that ingests a Git repository, builds a code knowledge graph per commit, and visualizes how repo health changes over time.
            </p>
          </div>
        </motion.div>

        {/* What to Build */}
        <motion.div {...fade(0.3)} className="mb-16">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-white mb-8 px-2">
            <Target className="w-6 h-6 text-emerald-400" />
            What to Build
          </h2>
          <div className="grid gap-4">
            {[
              {
                title: "Repo Ingestion",
                desc: "Walk a public repo's history, parse with tree-sitter, build per-commit code graphs (nodes: files/classes/functions; edges: imports/calls/references)."
              },
              {
                title: "Health Score",
                desc: "Composite with ≥4 explainable subscores: complexity drift, test coverage, hotspot risk (churn × complexity), dependency rot."
              },
              {
                title: "Time-Series Dashboard",
                desc: "Health trend annotated per PR; clicking a dip explains why it dropped."
              },
              {
                title: "Knowledge Graph Diff",
                desc: "Compare any two commits, show what changed structurally."
              },
              {
                title: "Hotspot Map",
                desc: "The \"where bugs live\" heatmap."
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 sm:p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:bg-white/[0.03] hover:border-white/10 transition-all group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl shadow-[0_0_15px_rgba(16,185,129,0)] group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-shadow">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">{item.title}</h3>
                  <p className="text-white/60 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Constraints */}
        <motion.div {...fade(0.4)} className="mb-16 p-8 sm:p-10 rounded-3xl bg-red-950/20 border border-red-500/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/[0.05] transition-colors" />
          <h2 className="relative z-10 flex items-center gap-3 text-2xl font-bold text-white mb-8">
            <Layers className="w-6 h-6 text-red-400" />
            Constraints
          </h2>
          <ul className="relative z-10 space-y-6">
            <li className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-red-500/10">
              <CheckCircle2 className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              <p className="text-white/80 text-lg">LLM usage must be cost-justified — <span className="font-semibold text-white">every call defended</span>.</p>
            </li>
            <li className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-red-500/10">
              <CheckCircle2 className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              <p className="text-white/80 text-lg">Demo on a real public repo with <span className="font-bold text-red-200">500+ commits</span>.</p>
            </li>
          </ul>
        </motion.div>

        {/* Bonus */}
        <motion.div {...fade(0.5)} className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-violet-900/20 to-transparent border border-violet-500/20 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/[0.05] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/[0.08] transition-colors" />
          <h2 className="relative z-10 flex items-center gap-3 text-2xl font-bold text-white mb-8">
            <Zap className="w-6 h-6 text-violet-400" />
            Bonus Objectives
          </h2>
          <div className="relative z-10 flex flex-wrap gap-3 sm:gap-4">
            {[
              "Bus factor per module",
              "Architectural drift detection",
              "LLM \"why did health drop\" narrative",
              "Pre-merge health prediction",
              "Multi-language support"
            ].map((bonus, i) => (
              <span key={i} className="px-5 py-3 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 text-sm sm:text-base font-medium shadow-[0_0_15px_rgba(139,92,246,0)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-violet-500/20 hover:-translate-y-0.5 transition-all cursor-default">
                {bonus}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
