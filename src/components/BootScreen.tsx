"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";
import { useTheme } from "@/context/ThemeContext";

const bootLines = [
  "NATTAN_OS v1.0.4 - KERNEL BOOTING...",
  "CHECKING MEMORY: 640KB RAM... OK",
  "LOADING CORE_STACK: REACT, NODE, TS... OK",
  "OPTIMIZING LATENCY: -40%... OK",
  "DRIVERS LOADED: RECHARTS, FRAMER_MOTION",
  "INITIALIZING INTERFACE..."
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const { theme } = useTheme();
  const [started, setStarted] = useState(false);
  const [text, setText] = useState<string[]>([]);
  
  const [playBoot] = useSound("/sounds/press.mp3", { volume: 0.5 });


  useEffect(() => {
    if (started) {
      playBoot();
      
      bootLines.forEach((line, index) => {
        setTimeout(() => {
          setText((prev) => [...prev, line]);
          
          if (index === bootLines.length - 1) {
            setTimeout(onComplete, 1200);
          }
        }, index * 450);
      });
    }
  }, [started, playBoot, onComplete]);

  if (!started) {
    return (
      <div 
        className="fixed inset-0 bg-[#050508] flex flex-col items-center justify-center cursor-pointer z-1000 p-6 text-center"
        onClick={() => setStarted(true)}
      >
        <div className="vhs-overlay opacity-30" />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative group"
        >
          <div 
            style={{ backgroundColor: "var(--accent-color)" }}
            className="absolute inset-0 blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"
          />
          
          <motion.p 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ 
              color: "var(--accent-color)", 
              borderColor: "var(--accent-color)",
              backgroundColor: "rgba(0,0,0,0.5)" 
            }}
            className="font-mono text-sm md:text-xl tracking-[0.4em] uppercase px-8 py-4 border-2 rounded-sm transition-all duration-500 relative z-10"
          >
            [ TAP_TO_BOOT_SYSTEM ]
          </motion.p>
        </motion.div>

        <p className="mt-8 font-mono text-[10px] text-white/20 uppercase tracking-[0.3em] animate-pulse">
          Secure Boot Enabled | RSA_KEY: OK
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#050508] flex items-center justify-center font-mono p-6 z-1000] overflow-hidden">
      <div className="vhs-overlay opacity-50" />
      
      <div className="max-w-xl w-full flex flex-col items-start justify-center min-h-75 relative z-20">
        {text.map((line, i) => (
          <motion.p 
            key={i} 
            initial={{ opacity: 0, x: -5 }} 
            animate={{ opacity: 1, x: 0 }}
            style={{ 
              color: "var(--accent-color)",
              textShadow: i === text.length - 1 ? `0 0 10px var(--accent-shadow)` : "none"
            }}
            className={`mb-2 uppercase tracking-widest leading-tight text-[10px] md:text-sm w-full transition-all duration-300 ${
              i === text.length - 1 ? "font-bold" : "opacity-60"
            }`}
          >
            <span className="mr-3 opacity-30 select-none">
              {String(i).padStart(2, '0')}
            </span>
            <span className="mr-2">{`>>`}</span>
            {line}
          </motion.p>
        ))}

        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.6 }}
          style={{ 
            backgroundColor: "var(--accent-color)",
            boxShadow: `0 0 15px var(--accent-color)` 
          }}
          className="w-2.5 h-5 mt-4 transition-colors duration-500"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] z-10 opacity-30" />
    </div>
  );
}