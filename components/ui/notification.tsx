"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, Bell, Zap } from "lucide-react";

export function NotificationPopup() {
  const [activeNotif, setActiveNotif] = useState<'none' | 'register' | 'devsbazaar'>('none');
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Check if the current date is before May 18th, 2026 midnight
    const cutoffDate = new Date("2026-05-18T00:00:00+05:30").getTime();
    const now = new Date().getTime();

    if (now < cutoffDate) {
      // 1. Show register notification at 0.5s
      const t1 = setTimeout(() => setActiveNotif('register'), 500);
      // 2. Switch to DevsBazaar notification at 6.0s (gives 5s for first + 0.5s transition)
      const t2 = setTimeout(() => setActiveNotif('devsbazaar'), 6000);
      // 3. Hide completely at 11.5s
      const t3 = setTimeout(() => setActiveNotif('none'), 11500);

      timersRef.current = [t1, t2, t3];

      return () => {
        timersRef.current.forEach(clearTimeout);
      };
    }
  }, []);

  const dismissRegister = () => {
    timersRef.current.forEach(clearTimeout);
    setActiveNotif('devsbazaar');
    const t = setTimeout(() => setActiveNotif('none'), 5000);
    timersRef.current = [t];
  };

  const dismissDevsBazaar = () => {
    timersRef.current.forEach(clearTimeout);
    setActiveNotif('none');
  };

  const handleDragEndRegister = (event: any, info: PanInfo) => {
    if (info.offset.x > 30 || info.velocity.x > 150) {
      dismissRegister();
    }
  };

  const handleDragEndDevsBazaar = (event: any, info: PanInfo) => {
    if (info.offset.x > 30 || info.velocity.x > 150) {
      dismissDevsBazaar();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {activeNotif === 'register' && (
        <motion.div
          key="register"
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-20 right-4 sm:top-24 sm:right-8 z-[100] max-w-[260px] sm:max-w-[320px] w-[calc(100vw-32px)] sm:w-full touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0.05, right: 1 }}
          onDragEnd={handleDragEndRegister}
        >
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] p-4 sm:p-5 pt-5 sm:pt-6 cursor-grab active:cursor-grabbing">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"
            />
            
            <button 
              onClick={dismissRegister}
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors z-10 hidden sm:block"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 sm:gap-4 pointer-events-none">
              <div className="p-1.5 sm:p-2 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[13px] sm:text-sm font-bold text-white mb-0.5 sm:mb-1">Registrations Open!</h4>
                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed sm:leading-relaxed mb-2.5 sm:mb-3">
                  Registrations are open, register as soon as possible to secure your spot.
                </p>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfx74aB9jGOHn5nxjtHyBBE553pP_Ksms3gip5vrJxgke5pNg/viewform?usp=publish-editor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block pointer-events-auto text-[10px] sm:text-xs font-bold text-black bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {activeNotif === 'devsbazaar' && (
        <motion.div
          key="devsbazaar"
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-20 right-4 sm:top-24 sm:right-8 z-[100] max-w-[260px] sm:max-w-[320px] w-[calc(100vw-32px)] sm:w-full touch-pan-y"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0.05, right: 1 }}
          onDragEnd={handleDragEndDevsBazaar}
        >
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_-10px_rgba(34,211,238,0.3)] p-4 sm:p-5 pt-5 sm:pt-6 cursor-grab active:cursor-grabbing">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="absolute top-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"
            />
            
            <button 
              onClick={dismissDevsBazaar}
              className="absolute top-3 right-3 text-white/50 hover:text-white transition-colors z-10 hidden sm:block"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-3 sm:gap-4 pointer-events-none">
              <div className="p-1.5 sm:p-2 rounded-full bg-cyan-500/20 text-cyan-400 shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h4 className="text-[13px] sm:text-sm font-bold text-white mb-0.5 sm:mb-1">Powered by DevsBazaar</h4>
                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed sm:leading-relaxed mb-2.5 sm:mb-3">
                  Discover more about our community, upcoming events, and tech opportunities.
                </p>
                <a 
                  href="https://devsbazaar.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block pointer-events-auto text-[10px] sm:text-xs font-bold text-black bg-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full hover:bg-neutral-200 transition-colors"
                >
                  Visit DevsBazaar
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
