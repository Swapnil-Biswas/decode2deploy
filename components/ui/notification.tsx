"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell } from "lucide-react";
import Link from "next/link";

export function NotificationPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the current date is before May 18th, 2026 midnight
    const cutoffDate = new Date("2026-05-18T00:00:00+05:30").getTime();
    const now = new Date().getTime();

    if (now < cutoffDate) {
      // Show notification after a brief delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500); // 0.5s delay before showing

      // Auto-hide after 5 seconds + 0.5s delay = 5.5s total
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5500);

      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 50, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-20 right-4 sm:top-24 sm:right-8 z-[100] max-w-[320px] w-full"
        >
          <div className="relative overflow-hidden rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] p-5 pt-6">
            {/* Progress line */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"
            />
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Registrations Open!</h4>
                <p className="text-xs text-white/70 leading-relaxed mb-3">
                  Registrations are open, register as soon as possible to secure your spot.
                </p>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfx74aB9jGOHn5nxjtHyBBE553pP_Ksms3gip5vrJxgke5pNg/viewform?usp=publish-editor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-black bg-white px-4 py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
