"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useSound from "use-sound";

const bootLines = [
  "NATTAN_OS v1.0.4 - KERNEL BOOTING...",
  "CHECKING MEMORY: 640KB RAM... OK",
  "LOADING CORE_STACK: REACT, NODE, TS... OK",
  "OPTIMIZING LATENCY: -40%... OK",
  "DRIVERS LOADED: RECHARTS, FRAMER_MOTION",
  "INITIALIZING INTERFACE..."
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
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
            setTimeout(onComplete, 1500);
          }
        }, index * 600);
      });
    }
  }, [started, playBoot, onComplete]);

  if (!started) {
    return (
      <div 
        className="fixed inset-0 bg-black flex flex-col items-center justify-center cursor-pointer z-100 p-6 text-center"
        onClick={() => setStarted(true)}
      >
        <div className="vhs-overlay opacity-50" />
        <motion.p 
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="font-mono text-pink-500 text-sm md:text-xl tracking-[0.2em] uppercase glitch-text px-6 py-3 border border-pink-500/30 bg-pink-500/5 rounded-sm"
        >
          [ TAP_TO_BOOT_SYSTEM ]
        </motion.p>
        <p className="mt-4 font-mono text-[10px] text-cyan-500/40 uppercase tracking-[0.3em]">
          Audio Context Initialization Required
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center font-mono text-green-500 p-6 z-100 overflow-hidden">
      <div className="vhs-overlay" />
      <div className="max-w-xl w-full flex flex-col items-start justify-center min-h-75">
        {text.map((line, i) => (
          <motion.p 
            key={i} 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className={`mb-2 uppercase tracking-widest leading-tight text-[9px] md:text-sm wrap-break-words w-full ${
              i === text.length - 1 ? "glitch-text text-white" : "text-green-500"
            }`}
          >
            <span className="text-green-800 mr-2 opacity-50 select-none">LOG_{i}:</span>
            <span className="text-green-400">{`> `}</span>
            {line}
          </motion.p>
        ))}

        <motion.div 
          animate={{ opacity: [0, 1] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-green-500 mt-2 shadow-[0_0_8px_#22c55e]"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] z-10" />
    </div>
  );
}