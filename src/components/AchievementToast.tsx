"use client";
import { useState, useEffect, useRef } from "react";
import PixelTrophy from "./PixelTrophy";
import { motion, AnimatePresence } from "framer-motion";
import useSound from "use-sound";
import confetti from "canvas-confetti";

export default function AchievementToast() {
  const [achievement, setAchievement] = useState<{ title: string; desc: string } | null>(null);
  const unlockedAchievements = useRef<Set<string>>(new Set());
  
  const [playBling] = useSound("/sounds/achievement.mp3", { volume: 0.5 });

  useEffect(() => {
    const handleAchievement = (e: Event) => {
      const customEvent = e as CustomEvent<{ title: string; desc: string }>;
      const data = customEvent.detail;

      if (unlockedAchievements.current.has(data.title)) return;

      unlockedAchievements.current.add(data.title);
      setAchievement(data);
      playBling();
      const pixelConfetti = () => {
        confetti({
          particleCount: 30,
          spread: 70,
          origin: { x: 0.9, y: 0.2 },
          shapes: ['square'],
          ticks: 200,
          gravity: 1.2, 
          scalar: 0.8,
          colors: ["#ffffff", "var(--accent-color)", "#000000"],
        });
      };
      
      pixelConfetti();

      // 4. Duração na tela (10s)
      setTimeout(() => setAchievement(null), 10000);
    };

    window.addEventListener("ACHIEVEMENT_UNLOCKED", handleAchievement);
    return () => window.removeEventListener("ACHIEVEMENT_UNLOCKED", handleAchievement);
  }, [playBling]);

  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          className="fixed top-20 right-5 z-9999 flex items-center gap-4 bg-black border-2 border-(--accent-color) p-4 rounded-none shadow-[4px_4px_0px_#000] font-mono italic"
        >
          <div className="absolute left-0 top-0 w-full h-9.5 bg-white/20 animate-scan" />
          
          <div className="bg-(--accent-color) p-2 text-black shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
            <PixelTrophy />
          </div>

          <div className="relative z-10">
            <h4 className="text-(--accent-color) font-bold text-[9px] uppercase tracking-[0.2em] opacity-70">
              NEW_DATA_UNLOCKED
            </h4>
            <p className="text-white text-xs uppercase font-black">
              {achievement.title}
            </p>
            <p className="text-white/50 text-[9px] leading-tight mt-1 max-w-37.5">
              {achievement.desc}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}