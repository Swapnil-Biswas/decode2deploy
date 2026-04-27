"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="h-full w-full text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.03}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + path.id * 0.25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  presenter = "CODING CLUB BMSIT&M PRESENTS",
  title = "DECODE2DEPLOY",
  poweredBy = "DEVSBAZAAR",
}: {
  presenter?: string;
  title?: string;
  poweredBy?: string;
}) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-3 py-10 sm:px-6 sm:py-12">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.13),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.12),rgba(0,0,0,0.82))]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mx-auto flex w-full flex-col items-center"
        >
          <motion.p
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-4 max-w-full text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-white/58 sm:mb-6 sm:text-sm sm:tracking-[0.28em] md:text-lg md:tracking-[0.34em]"
          >
            {presenter}
          </motion.p>

          <motion.h1
            initial={{ y: 34, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              delay: 0.12,
              type: "spring",
              stiffness: 115,
              damping: 20,
            }}
            data-title={title}
            className="decode-metal-title w-full pb-3 text-center text-[clamp(2rem,8vw,7rem)] font-black uppercase leading-none tracking-[-0.02em]"
          >
            {title}
          </motion.h1>

          <motion.div
            initial={{ y: 22, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.75, ease: "easeOut" }}
            className="mb-6 mt-3 flex flex-col items-center gap-1.5 sm:mb-8 sm:mt-4"
          >
            <p className="text-xs font-medium text-white/58 sm:text-base md:text-xl">
              Powered by
            </p>
            <p className="decode-metal-static text-[clamp(1.1rem,4.5vw,2.6rem)] font-black uppercase tracking-wide">
              {poweredBy}
            </p>
          </motion.div>

          <Link href="/hackathon" className="group relative inline-block max-w-full overflow-hidden rounded-2xl bg-gradient-to-b from-black/10 to-white/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl dark:from-white/10 dark:to-black/10">
            <Button
              variant="ghost"
              className="min-h-12 max-w-[calc(100vw-2rem)] rounded-[1.15rem] border border-black/10 bg-white/95 px-5 py-3 text-sm font-semibold text-black backdrop-blur-md transition-all duration-300 hover:bg-white/100 hover:shadow-md group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-black/95 dark:text-white dark:hover:bg-black/100 dark:hover:shadow-neutral-800/50 sm:min-h-14 sm:px-8 sm:py-6 sm:text-lg"
            >
              <span className="opacity-90 transition-opacity group-hover:opacity-100">
                Explore More
              </span>
              <span className="ml-3 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                →
              </span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
