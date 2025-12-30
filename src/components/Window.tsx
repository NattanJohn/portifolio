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
  
  // Sons do Sistema
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

  const offset = useMemo(() => (isMobile ? 0 : index * 30), [index, isMobile]);

  const windowVariants: Variants = {
    normal: {
      width: isMobile ? "100%" : "600px",
      height: isMobile ? "calc(100vh - 180px)" : "450px",
      top: isMobile ? 70 : 150 + offset, 
      left: isMobile ? 0 : `calc(50% - 300px + ${offset}px)`,
      x: 0,
      y: 0,
      opacity: 1,
    },
    maximized: {
      width: "100%", 
      height: isMobile ? "calc(100vh - 180px)" : "calc(100vh - 200px)", 
      top: isMobile ? 70 : 90, 
      left: 0,
      x: 0,
      y: 0,
      opacity: 1,
    },
  };

  const handleToggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) return;
    playMaximize();
    x.set(0);
    y.set(0);
    setIsMaximized(!isMaximized);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClose();
    onClose();
  };

  const handleFocus = () => {
    if (!isFocused) {
      playClick();
    }
    onFocus();
  };

  return (
    <motion.div
      onMouseDown={handleFocus}
      style={{ 
        x, 
        y, 
        backdropFilter: "blur(15px)",
        zIndex: isFocused ? 100 : 30 + index,
        position: "fixed",
      }}
      
      drag={!isMaximized && !isMobile}
      dragMomentum={false}
      dragConstraints={dragConstraints} 
      dragElastic={0} 

      initial={{ opacity: 0, y: 20 }}
      animate={(isMaximized || isMobile) ? "maximized" : "normal"}
      variants={windowVariants}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 35 }}
      
      className={`bg-[#1a1a2e]/95 border-2 flex flex-col shadow-2xl overflow-hidden box-border
        ${isFocused ? "border-cyan-400 shadow-[0_0_50px_rgba(0,255,255,0.15)]" : "border-pink-500/20"}
        ${(isMaximized || isMobile) ? "rounded-none" : "rounded-sm"}
      `}
    >
      <div 
        className={`p-3 flex justify-between items-center select-none shrink-0 border-b
        ${!isMobile && !isMaximized ? "cursor-grab active:cursor-grabbing" : ""}
        ${isFocused ? "bg-cyan-600/90 border-cyan-400" : "bg-pink-900/40 border-pink-500/10"}`}
      >
        <div className="flex items-center gap-2 ml-1">
          <div className={`w-1.5 h-1.5 rounded-full ${isFocused ? "bg-white shadow-[0_0_8px_#fff]" : "bg-pink-500/30"}`} />
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-white">
            {title}.SYS
          </span>
        </div>

        <div className="flex gap-4 px-2">
          {!isMobile && (
            <button onClick={handleToggleMaximize} className="hover:scale-110 transition-transform outline-none">
              {isMaximized ? <Copy size={14} className="text-white" /> : <Square size={14} className="text-white" />}
            </button>
          )}
          <X size={20} className="text-white hover:text-red-500 cursor-pointer transition-colors" onClick={handleClose} />
        </div>
      </div>

      <div className="relative grow overflow-hidden bg-black/20">
        <div className="absolute inset-0 overflow-y-auto custom-scrollbar p-4 md:p-6 font-mono text-cyan-100/80 text-xs md:text-sm">
          {children}
        </div>
      </div>

      <div className={`px-3 py-1 flex justify-between items-center shrink-0 border-t text-[9px] font-mono
        ${isFocused ? "bg-cyan-900/20 text-cyan-500/60" : "bg-black/20 text-pink-500/20"}`}>
        <div className="flex gap-3">
          <span>INDEX: {index}</span>
          <span className="hidden md:inline">SYSTEM: STABLE</span>
        </div>
        <span className="tracking-widest animate-pulse uppercase">● ONLINE</span>
      </div>
    </motion.div>
  );
}