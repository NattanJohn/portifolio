"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Status() {
  const { theme } = useTheme();
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 15) + 5);
      setRam(Math.floor(Math.random() * 10) + 42);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const boxStyle = {
    borderColor: "var(--accent-color)",
    borderWidth: "1px",
  };

  return (
    <div className="fixed bottom-24 right-6 hidden lg:flex flex-col gap-4 pointer-events-none select-none opacity-40 hover:opacity-100 transition-all duration-500 z-50">
      <div
        style={boxStyle}
        className="bg-black/60 backdrop-blur-md p-3 font-mono text-[10px] uppercase transition-all duration-500 border-l-4"
      >
        <p
          style={{ color: "var(--accent-color)" }}
          className="mb-2 font-bold tracking-tighter transition-colors"
        >
          {"// CPU_LOAD"}
        </p>
        <div className="w-32 h-1 bg-white/5 relative overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              backgroundColor: "var(--accent-color)",
              boxShadow: `0 0 15px var(--accent-color)`,
            }}
            animate={{ width: `${cpu}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>
        <div className="flex justify-between mt-1 items-center">
          <span className="text-[8px] text-white/20">STABLE</span>
          <p className="text-white/60 font-bold">{cpu}%</p>
        </div>
      </div>

      <div
        style={boxStyle}
        className="bg-black/60 backdrop-blur-md p-3 font-mono text-[10px] uppercase transition-all duration-500 border-l-4"
      >
        <p
          style={{ color: "var(--accent-color)" }}
          className="mb-2 font-bold tracking-tighter transition-colors"
        >
          {"// MEM_USAGE"}
        </p>
        <div className="w-32 h-1 bg-white/5 relative overflow-hidden">
          <motion.div
            className="h-full"
            style={{
              backgroundColor: "var(--accent-color)",
              boxShadow: `0 0 15px var(--accent-color)`,
            }}
            animate={{ width: `${ram}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>
        <div className="flex justify-between mt-1 items-center">
          <span className="text-[8px] text-white/20">OPTIMIZED</span>
          <p className="text-white/60 font-bold">{ram}%</p>
        </div>
      </div>
    </div>
  );
}
