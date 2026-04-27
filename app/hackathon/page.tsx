"use client";

import { motion, useInView, animate, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StarsBackground } from "@/components/ui/stars-background";
import { Button } from "@/components/ui/button";
import {
  Calendar, MapPin, Users, Trophy, Code2, Cpu,
  Globe, Lock, Rocket, ArrowLeft, Clock,
  Zap, Star, Smartphone, ChevronDown, CheckCircle2, Shield, Search, Lightbulb, UserPlus, Workflow, ArrowUp, Plus
} from "lucide-react";

function Counter({ from = 0, to, duration = 2, prefix = "", suffix = "" }: { from?: number, to: number, duration?: number, prefix?: string, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const node = nodeRef.current;
      if (node) {
        const controls = animate(from, to, {
          duration,
          ease: "easeOut",
          onUpdate(value) {
            node.textContent = `${prefix}${Math.round(value)}${suffix}`;
          },
        });
        return () => controls.stop();
      }
    }
  }, [from, to, duration, prefix, suffix, inView]);

  return <span ref={nodeRef}>{prefix}{from}{suffix}</span>;
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();
    
    const updateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-3 sm:gap-6 mt-2 mb-12 opacity-0">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10" />
            <div className="h-3 w-10 mt-3 bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-6 mt-2 mb-12">
      {[
        { label: "DAYS", value: timeLeft.days },
        { label: "HOURS", value: timeLeft.hours },
        { label: "MINUTES", value: timeLeft.minutes },
        { label: "SECONDS", value: timeLeft.seconds }
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm text-2xl sm:text-3xl font-mono font-bold text-white shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)] transition-colors hover:bg-white/[0.08] hover:border-white/20">
            {item.value.toString().padStart(2, '0')}
          </div>
          <div className="text-[10px] sm:text-xs font-semibold text-white/50 tracking-widest mt-3 uppercase">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50"
        >
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            size="icon"
            className="rounded-full bg-white text-black hover:bg-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] w-12 h-12 flex items-center justify-center transition-transform hover:scale-105"
          >
            <ArrowUp className="w-6 h-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div {...fade(index * 0.05)}
      className="rounded-2xl border border-white/5 bg-black transition-colors duration-300 overflow-hidden cursor-pointer hover:bg-white/[0.02]"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="p-6 flex items-center justify-between gap-4">
        <h4 className="text-base sm:text-lg font-bold text-white leading-snug">{q}</h4>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5"
        >
          <Plus className="w-4 h-4 text-white/70" />
        </motion.div>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-0">
              <p className="text-white/50 leading-relaxed text-sm md:text-base">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const WHY_PARTICIPATE = [
  { icon: Globe, label: "Real-World Exposure", desc: "Step beyond classroom learning and tackle actual tech scenarios and industry problems.", border: "border-blue-500/30", text: "text-blue-400" },
  { icon: Users, label: "Industry Connections", desc: "Interact directly with professionals and mentors from DevsBazaar to build your network.", border: "border-violet-500/30", text: "text-violet-400" },
  { icon: Zap, label: "Skill Growth", desc: "Sharpen your teamwork, logic, and rapid problem-solving skills under intense pressure.", border: "border-cyan-500/30", text: "text-cyan-400" },
  { icon: Code2, label: "Build Fast", desc: "Create something highly meaningful and deployable in a very short, adrenaline-filled timeframe.", border: "border-emerald-500/30", text: "text-emerald-400" },
];

const TIMELINE = [
  {
    label: "Sponsor Showcase & Tech Brief",
    date: "Day 1 — Engage & Explore",
    icon: Zap,
    desc: "Meet DevsBazaar to learn about their work, culture, and opportunities.",
    extraTitle: "🔥 EXCLUSIVE BETA ACCESS",
    extraDesc: "Be among the first to test-drive LooksGoodToMeow.in! We are launching our AI-powered code reviewer in closed beta for this hackathon. Use it to crush bugs, review your team's code instantly, and shape the future of the tool!"
  },
  {
    label: "Career Guidance & Startup AMA",
    date: "Day 1 — Engage & Explore",
    icon: Lightbulb,
    desc: "An exclusive open floor with DevsBazaar seniors. Ask anything about career paths, startup culture, and how to stand out in the tech industry."
  },
  {
    label: "Team Merge & Icebreakers",
    date: "Day 1 — Engage & Explore",
    icon: UserPlus,
    desc: "Duo teams combine into squads of 4! Quick icebreakers to sync up."
  },
  {
    label: "Debug Challenge (1 Hour)",
    date: "Day 1 — Engage & Explore",
    icon: Code2,
    desc: "A fast-paced sprint to solve bugs, fix logic issues, and repair broken systems."
  },
  {
    label: "Challenge Kickoff & Build Phase",
    date: "Day 2 — Build & Showcase",
    icon: Rocket,
    desc: "The final challenge is revealed. Design, develop, and execute your solution collaboratively."
  },
  {
    label: "Final Presentation & Rewards",
    date: "Day 2 — Build & Showcase",
    icon: Trophy,
    desc: "Demo your idea, showcase your approach. Winners announced, certificates and prizes distributed!"
  },
];

const PRIZES = [
  { rank: "2nd", amount: "₹5,000", perks: ["Certificate of Excellence", "Sponsor Goodies", "Internship Referrals"], border: "border-white/10 hover:border-gray-400/30", bg: "from-white/[0.02] to-transparent", hoverGlow: "hover:shadow-[0_0_40px_-15px_rgba(192,192,192,0.4)]", glow: "", sweep: "from-transparent via-gray-400/20 to-transparent" },
  { rank: "1st", amount: "₹8,000", perks: ["Certificate of Excellence", "Premium Goodies Kit", "Internship Fast-track", "DevsBazaar Mentorship"], border: "border-white/10 hover:border-yellow-500/30", bg: "from-white/[0.05] to-transparent", hoverGlow: "hover:shadow-[0_0_40px_-15px_rgba(255,215,0,0.5)]", glow: "shadow-[0_0_40px_-15px_rgba(255,255,255,0.08)]", sweep: "from-transparent via-yellow-500/20 to-transparent" },
  { rank: "3rd", amount: "₹2,000", perks: ["Certificate of Excellence", "Sponsor Goodies", "Community Recognition"], border: "border-white/10 hover:border-orange-600/30", bg: "from-white/[0.02] to-transparent", hoverGlow: "hover:shadow-[0_0_40px_-15px_rgba(205,127,50,0.4)]", glow: "", sweep: "from-transparent via-orange-600/20 to-transparent" },
];

const STATS = [
  { to: 2, prefix: "", suffix: "", unit: "Days", label: "Immersive challenge", icon: Clock },
  { to: 15, prefix: "₹", suffix: "K+", unit: "", label: "Total prize pool", icon: Trophy },
  { to: 200, prefix: "", suffix: "+", unit: "", label: "Expected participants", icon: Users },
  { to: 50, prefix: "", suffix: "", unit: "", label: "Final merged teams", icon: Code2 },
];

const OBJECTIVES = [
  { icon: Search, title: "Decode Signals", desc: "Analyze ambiguous real-world signals and messy clues to uncover hidden requirements." },
  { icon: Lightbulb, title: "Identify Problems", desc: "Pinpoint core product problems before writing a single line of code." },
  { icon: Workflow, title: "Think Like PMs", desc: "Adopt the mindset of product managers and engineers to design viable features." },
  { icon: Code2, title: "Build Scalable Solutions", desc: "Execute practical, scalable solutions and deploy them for live evaluation." },
];

const FAQ = [
  { q: "Do I need to be an expert coder?", a: "No, beginners are completely welcome. The event is focused on problem-solving, collaboration, and learning." },
  { q: "Can I participate alone?", a: "You must register in a team of 2. During the event, we will merge your duo with another to form a complete team of 4." },
  { q: "What should I bring?", a: "Bring your laptop, charger, student ID, and enthusiasm!" },
  { q: "Is this online or offline?", a: "This is a 100% offline, immersive experience held on the BMSIT campus." },
];

export default function HackathonPage() {
  const timelineRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const cometTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const cometOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-white/20">
      <StarsBackground />

      {/* Very subtle refined gradients for a professional look */}
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/50">
            {["Overview", "Format", "Why Participate", "Timeline", "Prizes"].map((s) => (
              <a key={s} href={`#${s.toLowerCase().replace(' ', '-')}`}
                className="hover:text-white transition-colors">{s}</a>
            ))}
          </nav>
          <a href="#register">
            <Button className="bg-white text-black hover:bg-white/90 text-sm font-semibold rounded-full px-6 h-9 transition-transform hover:scale-105">
              Register Now
            </Button>
          </a>
        </div>
      </header>

      <div className="relative z-10">
        {/* ── HERO ── */}
        <section id="overview" className="flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 sm:pt-32 sm:pb-24 min-h-[85vh] scroll-mt-24">
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-8 text-xs font-semibold tracking-widest text-white/80 uppercase">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            2-Day Hackathon · BMSIT&amp;M, Bengaluru
          </motion.div>

          <motion.h1 {...fade(0.1)} className="text-[clamp(2.5rem,8vw,6.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight pb-6 max-w-5xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
            DECODE2DEPLOY
          </motion.h1>

          <motion.p {...fade(0.2)} className="text-lg sm:text-2xl font-medium text-white/80 mb-4 max-w-3xl">
            A two-day immersive tech challenge. Decode hidden problems. Build impactful solutions.
          </motion.p>
          <motion.p {...fade(0.3)} className="text-base text-white/50 max-w-2xl mb-12 leading-relaxed">
            ORGANIZED BY CODING CLUB BMSIT&amp;M<br />
            POWERED BY DEVSBAZAAR
          </motion.p>

          <motion.div {...fade(0.35)}>
            <CountdownTimer targetDate="2026-05-11T00:00:00+05:30" />
          </motion.div>

          <motion.div {...fade(0.4)} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-black hover:bg-neutral-200 font-semibold rounded-full px-10 h-14 text-base transition-transform hover:scale-105">
                Register Now <ArrowLeft className="w-4 h-4 ml-2 rotate-135" style={{ transform: "rotate(135deg)" }} />
              </Button>
            </a>
            <a href="#format" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full rounded-full px-8 h-14 text-base border-white/20 text-white hover:bg-white/10 transition-colors">
                Explore Event
              </Button>
            </a>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="py-16 px-4 border-y border-white/10 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <motion.div key={s.label} {...fade(i * 0.1)} className="text-center flex flex-col items-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  <span className="text-xl sm:text-2xl ml-1 text-white/60 font-medium">{s.unit}</span>
                </div>
                <div className="text-sm text-white/50 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── OVERVIEW & FORMAT ── */}
        <section id="format" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div {...fade()}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Challenge</h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                DECODE2DEPLOY is not just another hackathon. Teams are required to decode ambiguous real-world signals from messy clues to identify the core product problem before building a scalable solution.
              </p>
              <div className="space-y-6">
                {OBJECTIVES.map((obj, i) => {
                  const Icon = obj.icon;
                  return (
                    <motion.div key={obj.title} {...fade(i * 0.1)} className="flex gap-4 items-start">
                      <div className="mt-1 p-2 rounded-lg bg-white/10 border border-white/10">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">{obj.title}</h3>
                        <p className="text-white/50 text-sm leading-relaxed mt-1">{obj.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div {...fade(0.3)} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60 uppercase mb-6">
                  <Users className="w-4 h-4" /> Participation Model
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Duo to Squad Merge</h3>
                <p className="text-white/60 mb-8 text-sm leading-relaxed">
                  Collaboration is at the core of this challenge. Register with a partner, and prepare to adapt.
                </p>
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80 font-medium">1. Register as a Duo</span>
                      <span className="text-white/50">50 Teams</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "33.333333%" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-white/40 rounded-full" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/80 font-medium">2. The Merge (Icebreaker Test)</span>
                      <span className="text-white/50">2 Duos Combine</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "66.666667%" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                        className="h-full bg-white/60 rounded-full" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white font-semibold">3. Final Squad Formed</span>
                      <span className="text-white font-semibold">50 Teams of 4</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                        viewport={{ once: true }}
                        className="h-full bg-white rounded-full" 
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white/80 shrink-0" />
                  <p className="text-sm text-white/70">
                    The merge happens before Round 1. Your adaptability and collaboration skills will be tested immediately.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── WHY PARTICIPATE ── */}
        <section id="why-participate" className="py-24 px-6 bg-white/[0.02] border-y border-white/10 scroll-mt-24">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fade()} className="mb-16 md:w-2/3">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Participate?</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {WHY_PARTICIPATE.map((t, i) => {
                return (
                  <motion.div key={t.label} {...fade(i * 0.1)}
                    whileHover={{ scale: 1.02, y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group rounded-2xl border border-white/5 bg-black p-10 hover:border-white/10 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.05)] transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-4">{t.label}</h3>
                    <p className="text-white/50 text-base leading-relaxed">{t.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section id="timeline" ref={timelineRef} className="py-24 px-6 max-w-4xl mx-auto scroll-mt-24">
          <motion.div {...fade()} className="mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Event Timeline</h2>
            <p className="text-lg text-white/50">The 2-day schedule of decoding, building, and deploying.</p>
          </motion.div>
          <div className="relative pl-6 sm:pl-0">
            {/* Center line for larger screens, left line for mobile */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-white/10 sm:-translate-x-1/2" />
            <motion.div
              style={{ top: cometTop, opacity: cometOpacity }}
              className="absolute left-6 sm:left-1/2 w-[2px] h-32 -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.6)] z-0 rounded-full"
            />

            {TIMELINE.map((ev, i) => {
              const Icon = ev.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div key={ev.label} {...fade(i * 0.1)} className="group relative mb-12 sm:mb-8 last:mb-0 w-full flex flex-col sm:flex-row items-start sm:items-center justify-between cursor-default">
                  {/* Timeline dot */}
                  <div className="absolute left-[-5px] sm:left-1/2 w-3 h-3 rounded-full bg-white border-4 border-black sm:-translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-150 group-hover:bg-cyan-400" />

                  {/* Content (alternating sides on desktop) */}
                  <div className={`w-full sm:w-[45%] pl-8 sm:pl-0 ${isEven ? "sm:text-right sm:pr-12" : "sm:pl-12 sm:ml-auto"}`}>
                    <div className={`flex items-center gap-2 mb-2 ${isEven ? "sm:justify-end sm:flex-row-reverse" : "sm:justify-start"}`}>
                      <Icon className="w-4 h-4 text-white/40 hidden sm:block transition-colors group-hover:text-cyan-400" />
                      <span className="text-sm font-mono text-cyan-400/80">{ev.date}</span>
                      <Icon className="w-4 h-4 text-cyan-400/80 sm:hidden" />
                    </div>
                    <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 group-hover:bg-white/[0.04] group-hover:border-white/20 group-hover:shadow-lg">
                      <h4 className="text-lg font-bold text-white transition-colors duration-300 group-hover:text-cyan-300">{ev.label}</h4>

                      {/* Hover reveal for PC, default visible for Mobile */}
                      <div className="grid transition-all duration-300 ease-in-out grid-rows-[1fr] opacity-100 sm:grid-rows-[0fr] sm:opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                        <div className="overflow-hidden">
                          <p className={`text-sm text-white/60 mt-3 leading-relaxed ${isEven ? "sm:text-right" : "sm:text-left"} text-left`}>
                            {ev.desc}
                          </p>
                          {ev.extraTitle && (
                            <div className={`mt-4 p-4 rounded-lg bg-violet-500/5 border border-violet-500/20 ${isEven ? "sm:text-right" : "text-left"} text-left`}>
                              <p className="text-xs font-bold text-violet-400 mb-2 tracking-wide uppercase">{ev.extraTitle}</p>
                              <p className="text-xs text-white/50 leading-relaxed mb-4">{ev.extraDesc}</p>
                              <a href="https://looksgoodtomeow.in/" target="_blank" rel="noopener noreferrer">
                                <Button size="sm" className="bg-violet-500 hover:bg-violet-600 text-white border-none text-xs font-bold px-4 h-8 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:scale-105">
                                  Try Beta Now
                                </Button>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── PRIZES ── */}
        <section id="prizes" className="py-24 px-6 bg-white/[0.02] border-y border-white/10 scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <motion.div {...fade()} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Rewards & Recognition</h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto">₹15,000+ total prize pool alongside exclusive mentorship, internship referrals, and community recognition.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-12">
              {PRIZES.map((p, i) => (
                <motion.div key={p.rank} {...fade(i * 0.1)}
                  className={`group relative rounded-3xl border ${p.border} p-8 bg-gradient-to-b ${p.bg} ${p.glow} ${p.hoverGlow} transition-all duration-300 ${i === 1 ? "md:-mt-8 md:pb-12" : ""} flex flex-col items-center text-center`}>
                  
                  {/* Sweep Effect Container */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
                    <div className={`absolute inset-0 -translate-x-[150%] skew-x-[-30deg] bg-gradient-to-r ${p.sweep} transition-transform duration-700 ease-out group-hover:translate-x-[150%]`} />
                  </div>

                  {i === 1 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold bg-white text-black uppercase tracking-widest shadow-lg z-10">
                      Grand Prize
                    </div>
                  )}
                  <div className="relative z-10 text-sm text-white/40 font-semibold uppercase tracking-widest mb-2 mt-4">{p.rank} Place</div>
                  <div className="relative z-10 text-4xl font-extrabold text-white mb-6">{p.amount}</div>
                  <ul className="relative z-10 space-y-3 text-left w-full border-t border-white/10 pt-6 mt-auto">
                    {p.perks.map((pk) => (
                      <li key={pk} className="flex items-start gap-3 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-white/80 shrink-0 mt-0.5" /> {pk}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div {...fade(0.3)} className="text-center">
              <p className="text-white/40 text-sm">Plus Special Mentions for standout projects and track winners.</p>
            </motion.div>
          </div>
        </section>
        {/* ── INTERNSHIP OPPORTUNITY ── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div {...fade()}
              className="relative overflow-hidden rounded-[2rem] border border-amber-500/30 bg-[#0A0A0B] p-10 sm:p-14 text-center transition-all duration-500 hover:bg-amber-500/[0.04] hover:border-amber-400 hover:shadow-[0_0_80px_-15px_rgba(251,191,36,0.3)] hover:-translate-y-1">

              {/* Light Sweep Animation */}
              <motion.div
                className="absolute inset-y-0 w-[100%] sm:w-[50%] bg-gradient-to-r from-transparent via-amber-500/15 to-transparent -skew-x-12 pointer-events-none z-0"
                animate={{ left: ["-150%", "250%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-8 text-xs font-bold tracking-widest text-amber-500 uppercase">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Exclusive Opportunity
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
                  Land a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Direct Internship</span>
                </h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto mb-10">
                  Stand out during the event and get an exclusive chance to secure an internship with DevsBazaar! Top performers will get to work directly with industry experts on scalable, high-value client projects globally.
                </p>
                <p className="text-xs text-white/40">
                  *Terms and conditions apply. Selections based on performance during the event.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-24 px-6 max-w-3xl mx-auto scroll-mt-24">
          <motion.div {...fade()} className="text-center mb-16">
            <h2 className="inline-block px-8 py-3 rounded-full border border-white/10 bg-white/[0.02] text-2xl sm:text-3xl font-bold text-white mb-4 shadow-sm backdrop-blur-sm">
              Frequently Asked Questions
            </h2>
          </motion.div>
          <div className="space-y-4">
            {FAQ.map((item, i) => (
              <FAQItem key={item.q} q={item.q} a={item.a} index={i} />
            ))}
          </div>
        </section>

        {/* ── REGISTER CTA ── */}
        <section id="register" className="py-32 px-6 scroll-mt-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div {...fade()}
              className="group relative rounded-[2.5rem] border border-white/20 p-12 sm:p-20 bg-black overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_80px_-15px_rgba(255,255,255,0.15)] hover:-translate-y-1">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_50%)] group-hover:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_50%)] transition-all duration-500" />
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Ready to Decode?</h2>
                <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                  Registrations for duo teams will open soon. Secure your spot in the ultimate 2-day product building challenge.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="#" className="inline-flex items-center justify-center bg-white text-black hover:bg-neutral-200 font-bold rounded-full px-10 h-14 text-lg transition-transform hover:scale-105">
                    Register Now
                  </Link>
                  <Link href="#" className="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/10 font-bold rounded-full px-10 h-14 text-lg transition-transform hover:scale-105 bg-black">
                    Join Community
                  </Link>
                </div>
                <p className="text-sm text-white/30 mt-8 font-medium tracking-wide uppercase">
                  Organized by Coding Club BMSIT&amp;M · Powered by DevsBazaar
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="border-t border-white/10 py-10 px-6 text-center text-sm text-white/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 DECODE2DEPLOY. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Guidelines</a>
              <a href="#" className="hover:text-white transition-colors">Code of Conduct</a>
            </div>
          </div>
        </footer>
        <ScrollToTop />
      </div>
    </div>
  );
}
