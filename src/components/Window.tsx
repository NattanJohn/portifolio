"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, Variants, useMotionValue } from "framer-motion";
import { X, Square, Copy } from "lucide-react";
import useSound from "use-sound";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  isFocused: boolean;
  index?: number;
  dragConstraints: React.RefObject<HTMLDivElement | null>; 
}

export default function Window({ 
  title, 
  children, 
  onClose, 
  onFocus, 
  isFocused, 
  index = 0,
  dragConstraints 
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.4 });
  const [playClose] = useSound("/sounds/click.mp3", { volume: 0.3, playbackRate: 0.8 });
  const [playMaximize] = useSound("/sounds/click.mp3", { volume: 0.4, playbackRate: 1.2 });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const offset = useMemo(() => (isMobile ? 0 : index * 25), [index, isMobile]);

  const windowVariants: Variants = {
    normal: {
      width: isMobile ? "100%" : "600px",
      height: isMobile ? "calc(100vh - 180px)" : "450px",
      top: isMobile ? 70 : 120 + offset, 
      left: isMobile ? 0 : `calc(50% - 300px + ${offset}px)`,
      x: 0, y: 0, opacity: 1,
      scale: 1
    },
    maximized: {
      width: "100%", 
      height: isMobile ? "calc(100vh - 180px)" : "calc(100vh - 200px)", 
      top: isMobile ? 70 : 90, 
      left: 0, x: 0, y: 0, opacity: 1,
      scale: 1
    },
  };

  const handleToggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) return;
    playMaximize();
    x.set(0); y.set(0);
    setIsMaximized(!isMaximized);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClose();
    onClose();
  };

  const handleFocus = () => {
    if (!isFocused) playClick();
    onFocus();
  };

  const dynamicStyles = {
    borderColor: isFocused ? "var(--accent-color)" : "rgba(255,255,255,0.05)",
    boxShadow: isFocused ? `0 0 30px var(--accent-shadow)` : "none",
  };

  const headerStyles = {
    backgroundColor: isFocused ? "var(--accent-color)" : "rgba(255,255,255,0.03)",
    borderColor: isFocused ? "var(--accent-color)" : "rgba(255,255,255,0.1)",
  };

  return (
    <motion.div
      onMouseDown={handleFocus}
      style={{ 
        x, y, 
        backdropFilter: "blur(20px)",
        zIndex: isFocused ? 1000 : 30 + index,
        position: "fixed",
        ...dynamicStyles
      }}
      drag={!isMaximized && !isMobile}
      dragMomentum={false}
      dragConstraints={dragConstraints} 
      dragElastic={0} 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={(isMaximized || isMobile) ? "maximized" : "normal"}
      variants={windowVariants}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ type: "spring", stiffness: 450, damping: 40 }}
      className={`bg-[#050508]/90 border-2 flex flex-col shadow-2xl overflow-hidden box-border transition-[border-color,box-shadow] duration-500
        ${(isMaximized || isMobile) ? "rounded-none" : "rounded-lg"}
      `}
    >
      <div 
        style={headerStyles}
        className={`p-3 flex justify-between items-center select-none shrink-0 border-b transition-all duration-500
        ${!isMobile && !isMaximized ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        <div className="flex items-center gap-2 ml-1">
          <div 
            style={{ backgroundColor: isFocused ? "#fff" : "var(--accent-color)" }}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${isFocused ? "shadow-[0_0_8px_#fff]" : ""}`} 
          />
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white">
            {title}
          </span>
        </div>

        <div className="flex gap-4 px-2">
          {!isMobile && (
            <button onClick={handleToggleMaximize} className="hover:scale-110 transition-transform opacity-60 hover:opacity-100">
              {isMaximized ? <Copy size={14} className="text-white" /> : <Square size={14} className="text-white" />}
            </button>
          )}
          <X size={20} className="text-white opacity-60 hover:opacity-100 hover:text-red-500 cursor-pointer transition-all" onClick={handleClose} />
        </div>
      </div>

      <div className="relative grow overflow-hidden bg-black/20">
        <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-4 md:p-6 font-mono text-white/80 text-xs md:text-sm">
          {children}
        </div>
      </div>

      <div 
        style={{ borderTopColor: isFocused ? "var(--accent-color)" : "rgba(255,255,255,0.05)" }}
        className="px-3 py-1 flex justify-between items-center shrink-0 border-t text-[9px] font-mono bg-black/40 transition-colors duration-500"
      >
        <div className="flex gap-3 text-white/30 uppercase">
          <span>ID: {index}</span>
          <span className="hidden md:inline">Status: {isFocused ? "Active" : "Standby"}</span>
        </div>
        <span 
          style={{ color: isFocused ? "var(--accent-color)" : "rgba(255,255,255,0.2)" }}
          className={`tracking-widest uppercase font-bold transition-colors ${isFocused ? "animate-pulse" : ""}`}
        >
          ● {isFocused ? "Online" : "Idle"}
        </span>
      </div>
    </motion.div>
  );
}