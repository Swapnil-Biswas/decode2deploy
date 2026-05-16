"use client";

import { motion, useInView, animate, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { StarsBackground } from "@/components/ui/stars-background";
import { NotificationPopup } from "@/components/ui/notification";
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
  const [status, setStatus] = useState<"upcoming" | "ongoing" | "completed">("upcoming");

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();
    const end = target + 2 * 24 * 60 * 60 * 1000; // 2 days later

    const updateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setStatus("upcoming");
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else if (now < end) {
        setStatus("ongoing");
      } else {
        setStatus("completed");
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

  if (status === "ongoing") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center mt-2 mb-12"
      >
        <div className="px-8 py-5 sm:px-12 sm:py-6 rounded-2xl bg-cyan-500/[0.05] border border-cyan-500/30 backdrop-blur-md shadow-[0_0_40px_-10px_rgba(34,211,238,0.2)]">
          <div className="text-xl sm:text-3xl font-extrabold text-white tracking-wider uppercase flex items-center gap-4">
            <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,1)]"></span>
            </span>
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Hackathon Ongoing</span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (status === "completed") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center mt-2 mb-12"
      >
        <div className="relative group px-8 py-5 sm:px-12 sm:py-6 rounded-2xl bg-gradient-to-br from-yellow-500/[0.08] to-transparent border border-yellow-500/30 backdrop-blur-md shadow-[0_0_40px_-10px_rgba(234,179,8,0.25)] overflow-hidden">
          {/* Subtle animated sweep */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-yellow-500/10 to-transparent -skew-x-12"
          />
          <div className="relative text-xl sm:text-3xl font-extrabold tracking-wider uppercase flex items-center gap-4">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.6)]" />
            <span className="bg-gradient-to-r from-white via-yellow-200 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(250,204,21,0.2)]">
              Hackathon Concluded
            </span>
          </div>
        </div>
      </motion.div>
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
  { rank: "1st", amount: "₹5,000", perks: ["Certificate of Excellence", "Internship Fast-track", "DevsBazaar Mentorship"], border: "border-white/10 hover:border-yellow-500/30", bg: "from-white/[0.05] to-transparent", hoverGlow: "hover:shadow-[0_0_40px_-15px_rgba(255,215,0,0.5)]", glow: "shadow-[0_0_40px_-15px_rgba(255,255,255,0.08)]", sweep: "from-transparent via-yellow-500/20 to-transparent" },
  { rank: "2nd", amount: "₹4,000", perks: ["Certificate of Excellence", "Internship Referrals"], border: "border-white/10 hover:border-gray-400/30", bg: "from-white/[0.02] to-transparent", hoverGlow: "hover:shadow-[0_0_40px_-15px_rgba(192,192,192,0.4)]", glow: "", sweep: "from-transparent via-gray-400/20 to-transparent" },
  { rank: "3rd", amount: "₹2,000", perks: ["Certificate of Excellence", "Community Recognition"], border: "border-white/10 hover:border-orange-600/30", bg: "from-white/[0.02] to-transparent", hoverGlow: "hover:shadow-[0_0_40px_-15px_rgba(205,127,50,0.4)]", glow: "", sweep: "from-transparent via-orange-600/20 to-transparent" },
  { rank: "Best Innovation", amount: "₹1,000", perks: ["Certificate of Excellence", "Community Spotlight", "Special Mention"], border: "border-white/10 hover:border-cyan-400/30", bg: "from-white/[0.02] to-transparent", hoverGlow: "hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.4)]", glow: "", sweep: "from-transparent via-cyan-400/20 to-transparent" },
];

const STATS = [
  { to: 2, prefix: "", suffix: "", unit: "Days", label: "Immersive challenge", icon: Clock },
  { to: 12, prefix: "₹", suffix: "K+", unit: "", label: "Total prize pool", icon: Trophy },
  { to: 200, prefix: "", suffix: "+", unit: "", label: "Expected participants", icon: Users },
  { to: 50, prefix: "", suffix: "", unit: "", label: "Final teams", icon: Code2 },
];

const OBJECTIVES = [
  { icon: Search, title: "Decode Signals", desc: "Analyze ambiguous real-world signals and messy clues to uncover hidden requirements." },
  { icon: Lightbulb, title: "Identify Problems", desc: "Pinpoint core product problems before writing a single line of code." },
  { icon: Workflow, title: "Think Like Product Managers", desc: "Adopt the mindset of product managers and engineers to design viable features." },
  { icon: Code2, title: "Build Scalable Solutions", desc: "Execute practical, scalable solutions and deploy them for live evaluation." },
];

const FAQ = [
  { q: "Do I need to be an expert coder?", a: "No, beginners are completely welcome. The event is focused on problem-solving, collaboration, and learning." },
  { q: "Can I participate alone?", a: "You must register in a team of 3-4 members." },
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
      <NotificationPopup />
      <StarsBackground />

      {/* Floating Clues Trigger */}
      <Link href="/clues" className="fixed z-50 flex items-center justify-center transition-all duration-300 group
        /* Mobile: Bottom Left FAB */
        bottom-6 left-4 sm:left-6 w-12 h-12 rounded-full
        bg-cyan-950/40 border border-cyan-500/30 text-cyan-50 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.15)]
        /* Desktop: Left Center Vertical */
        md:bottom-auto md:w-auto md:h-auto md:left-0 md:top-1/2 md:-translate-y-1/2 md:flex-col md:gap-3 
        md:rounded-r-2xl md:rounded-l-none md:px-2 md:py-5 md:border-l-0 
        md:bg-white/[0.03] md:border-white/10 md:text-white/50 md:shadow-none
        /* Hover Effects */
        hover:text-cyan-400 hover:bg-white/[0.08] hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]
      ">
        <Search className="w-5 h-5 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all" />
        
        {/* Desktop Text Only */}
        <span className="hidden md:flex flex-col items-center text-[10px] sm:text-xs font-extrabold tracking-[0.2em] leading-[1.2]">
          <span>C</span>
          <span>L</span>
          <span>U</span>
          <span>E</span>
          <span>S</span>
        </span>
      </Link>

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
          <Button disabled className="bg-white/20 text-white/50 cursor-not-allowed text-sm font-semibold rounded-full px-6 h-9">
            Registration Closed
          </Button>
        </div>
      </header>

      <div className="relative z-10">
        {/* ── HERO ── */}
        <section id="overview" className="relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-20 sm:pt-32 sm:pb-24 min-h-[85vh] scroll-mt-24">
          <motion.div {...fade(0)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 mb-8 text-xs font-semibold tracking-widest text-white/80 uppercase">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            2-Day Technical Event · BMSIT&amp;M, Bengaluru
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
            <CountdownTimer targetDate="2026-05-18T09:00:00+05:30" />
          </motion.div>

          <motion.div {...fade(0.4)} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button disabled size="lg" className="w-full sm:w-auto bg-white/10 text-white/50 cursor-not-allowed font-semibold rounded-full px-10 h-14 text-base">
              Registration Closed
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-14 text-base border-white/20 text-white hover:bg-white/10 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <a href="#format">
                Explore More <ArrowLeft className="w-4 h-4 ml-2" style={{ transform: "rotate(180deg)" }} />
              </a>
            </Button>
          </motion.div>

          {/* DevsBazaar Floating Box */}
          <motion.div
            {...fade(0.5)}
            className="flex flex-col mt-16 lg:mt-0 lg:absolute lg:bottom-8 lg:right-8 p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md w-full max-w-[300px] lg:max-w-[260px] text-left shadow-2xl transition-all hover:bg-white/[0.05] hover:border-white/20"
          >
            <h3 className="text-sm font-bold text-white mb-2">Powered by DevsBazaar</h3>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">Discover more about our community, upcoming events, and tech opportunities.</p>
            <Button asChild size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-none transition-all text-xs font-semibold rounded-full h-9">
              <a href="https://devsbazaar.com/" target="_blank" rel="noopener noreferrer">
                Visit DevsBazaar
              </a>
            </Button>
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
              <div className="relative z-10 flex flex-col h-full justify-center">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-white/60 uppercase mb-6">
                  <Shield className="w-4 h-4" /> Confidential
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Problem Statement</h3>
                <p className="text-white/60 mb-8 text-sm leading-relaxed">
                  The true challenge will remain hidden until the second day of the hackathon. Decode the signals.
                </p>

                <div className="relative group w-full p-6 rounded-2xl bg-black/40 border border-white/5 overflow-hidden">
                  <div className="blur-[6px] select-none opacity-40 font-mono text-xs sm:text-sm text-left break-all h-32 overflow-hidden flex flex-col gap-2 transition-all duration-500 group-hover:blur-md">
                    <p>0x48656c6c6f20576f726c64212054686973206973206120736563726574206d6573736167652e204465636f646520697420696620796f752063616e2e</p>
                    <p>U29tZSBvZiB0aGUgYmVzdCBzb2x1dGlvbnMgYXJlIGhpZGRlbiBpbiBwbGFpbiBzaWdodC4=</p>
                    <p>eW91IGFyZSBub3Qgc3VwcG9zZWQgdG8gcmVhZCB0aGlzIHlldC4gV2FpdCBmb3IgdGhlIGhhY2thdGhvbiE=</p>
                    <p>4a 75 73 74 20 6b 69 64 64 69 6e 67 2c 20 6b 65 65 70 20 6c 6f 6f 6b 69 6e 67 2e</p>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                    <motion.div
                      onClick={() => window.history.pushState({}, '', '/hackathon/token=LOCK-796')}
                      whileHover={{ y: -12 }}
                      whileTap={{ y: -12 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="flex flex-col items-center justify-center p-5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 cursor-pointer shadow-[0_0_30px_-5px_rgba(255,255,255,0.2)] hover:bg-white/15"
                    >
                      <Lock className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>
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
                              <Button asChild size="sm" className="bg-violet-500 hover:bg-violet-600 text-white border-none text-xs font-bold px-4 h-8 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:scale-105">
                                <a href="https://looksgoodtomeow.in/" target="_blank" rel="noopener noreferrer">
                                  Try Beta Now
                                </a>
                              </Button>
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
              <p className="text-lg text-white/50 max-w-2xl mx-auto">₹12,000+ total prize pool alongside exclusive mentorship, internship referrals, and community recognition.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-6">
              {PRIZES.slice(0, 3).map((p, i) => (
                <motion.div key={p.rank} {...fade(i * 0.1)}
                  className={`group relative rounded-3xl border ${p.border} p-8 bg-gradient-to-b ${p.bg} ${p.glow} ${p.hoverGlow} transition-all duration-300 flex flex-col items-center text-center ${p.rank === "1st" ? "order-1 md:order-2 md:-mt-8 md:pb-12" :
                    p.rank === "2nd" ? "order-2 md:order-1" :
                      "order-3 md:order-3"
                    }`}>

                  {/* Sweep Effect Container */}
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
                    <div className={`absolute inset-0 -translate-x-[150%] skew-x-[-30deg] bg-gradient-to-r ${p.sweep} transition-transform duration-700 ease-out group-hover:translate-x-[150%]`} />
                  </div>

                  {p.rank === "1st" && (
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

            <motion.div {...fade(0.3)} className="flex justify-center mb-12">
              {PRIZES.slice(3).map((p) => (
                <div key={p.rank} className={`w-full max-w-sm group relative rounded-3xl border ${p.border} p-8 bg-gradient-to-b ${p.bg} ${p.glow} ${p.hoverGlow} transition-all duration-300 flex flex-col items-center text-center`}>
                  <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-0">
                    <div className={`absolute inset-0 -translate-x-[150%] skew-x-[-30deg] bg-gradient-to-r ${p.sweep} transition-transform duration-700 ease-out group-hover:translate-x-[150%]`} />
                  </div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold bg-cyan-400 text-black uppercase tracking-widest shadow-lg z-10">
                    Special Award
                  </div>
                  <div className="relative z-10 text-sm text-white/40 font-semibold uppercase tracking-widest mb-2 mt-4">{p.rank}</div>
                  <div className="relative z-10 text-4xl font-extrabold text-white mb-6">{p.amount}</div>
                  <ul className="relative z-10 space-y-3 text-left w-full border-t border-white/10 pt-6 mt-auto">
                    {p.perks.map((pk) => (
                      <li key={pk} className="flex items-start gap-3 text-sm text-white/60">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" /> {pk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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

        {/* ── ABOUT DEVSBAZAAR ── */}
        <section id="about-devsbazaar" className="py-24 px-6 bg-white/[0.02] border-y border-white/10 scroll-mt-24">
          <div className="max-w-4xl mx-auto text-center flex justify-center">
            <motion.div {...fade()} className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0B] p-[2px] w-full group shadow-2xl">

              {/* Rotating Laser Border */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] sm:w-[200%] aspect-square bg-[conic-gradient(from_0deg,transparent_25%,rgba(255,255,255,1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,1)_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Inner Content Container */}
              <div className="relative z-10 bg-[#0A0A0B] rounded-[calc(2.5rem-2px)] p-10 sm:p-16 flex flex-col items-center border border-white/5 backdrop-blur-xl h-full">

                {/* Logo */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] bg-white/[0.05] border border-white/10 flex items-center justify-center mb-10 shadow-[0_0_40px_-10px_rgba(34,211,238,0.25)] p-3 overflow-hidden">
                  <img src="/devsbazaar-logo.png" alt="DevsBazaar Logo" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.4)]" />
                </div>

                {/* Text */}
                <a href="https://devsbazaar.com/" target="_blank" rel="noopener noreferrer" className="group/heading inline-flex justify-center mb-8">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight group-hover/heading:text-cyan-400 group-hover/heading:underline decoration-cyan-400/50 underline-offset-8 transition-all duration-300 flex items-center gap-[0.25em]">
                    <span className="relative inline-grid overflow-hidden place-items-end py-1">
                      <span className="col-start-1 row-start-1 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/heading:translate-y-[120%]">
                        About
                      </span>
                      <span className="col-start-1 row-start-1 -translate-y-[120%] transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/heading:translate-y-0">
                        Visit
                      </span>
                    </span>
                    <span className="py-1">DevsBazaar</span>
                  </h2>
                </a>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
                  DevsBazaar is a full-stack IT solutions company delivering scalable web and software solutions for startups, institutions, and high-value clients globally. We specialize in development, maintenance, and version upgrades of digital platforms, ensuring reliable and future-ready technology systems.
                </p>
                <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto mt-6">
                  Having successfully executed projects worth up to $5,000+ and supported organizations at a national level, DevsBazaar is committed to empowering innovation and supporting the developer community.
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
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight">Registrations Closed</h2>
                <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
                  Registrations for DECODE2DEPLOY are now closed. Thank you for the overwhelming response! You can still join our community.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <span className="inline-flex items-center justify-center bg-white/10 text-white/50 cursor-not-allowed font-bold rounded-full px-10 h-14 text-lg">
                    Registration Closed
                  </span>
                  <Link href="https://chat.whatsapp.com/KkXQRuFjlCnCLuYV7G24Vf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center border border-white/20 text-white hover:bg-white/10 font-bold rounded-full px-10 h-14 text-lg transition-transform hover:scale-105 bg-black">
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

        {/* ── CONTACT US ── */}
        <section className="pb-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div {...fade()} className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.04] hover:border-white/20 hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)]">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Need Help? Contact Us</h3>
              <p className="text-sm text-white/50 mb-8">Reach out to our organizing team for any queries regarding the event.</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
                <div className="flex flex-col items-center group">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Anmol Narayan</span>
                  <span className="text-[10px] font-medium text-cyan-500/70 uppercase tracking-widest mb-1">(President)</span>
                  <a href="tel:+919876543210" className="text-lg font-mono font-medium text-white group-hover:text-cyan-400 transition-colors">+91 72668 99255</a>
                </div>
                <div className="hidden sm:block w-px h-10 bg-white/10" />
                <div className="w-16 h-px bg-white/10 sm:hidden" />
                <div className="flex flex-col items-center group">
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Alok Verma</span>
                  <span className="text-[10px] font-medium text-cyan-500/70 uppercase tracking-widest mb-1">(Operation Head)</span>
                  <a href="tel:+919876543211" className="text-lg font-mono font-medium text-white group-hover:text-cyan-400 transition-colors">+91 77598 19223</a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        <footer className="border-t border-white/10 py-10 px-6 text-center text-sm text-white/30">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 CODING CLUB BMSIT&M. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/guidelines" className="hover:text-white transition-colors">Guidelines</Link>
              <Link href="/code-of-conduct" className="hover:text-white transition-colors">Code of Conduct</Link>
            </div>
          </div>
        </footer>
        <ScrollToTop />
      </div>
    </div>
  );
}
