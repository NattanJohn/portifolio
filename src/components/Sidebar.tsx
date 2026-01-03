"use client";
import { motion, AnimatePresence } from "framer-motion";
import WeatherWidget from "./widgets/WeatherWidget";
import { X, Cpu, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [time, setTime] = useState(new Date());
    const [playClose] = useSound("/sounds/click.mp3", { volume: 0.3, playbackRate: 0.8 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClose();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-90"
          />

          <motion.div
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 h-full w-75 bg-black/80 border-r border-white/10 backdrop-blur-xl z-100 p-6 shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-white/50 hover:text-(--accent-color) hover:bg-white/5 rounded-full transition-all"
            >
              <X size={20} onClick={handleClose} />
            </button>

            <div className="mt-8 space-y-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-(--accent-color) opacity-70">
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">System_Time</span>
                </div>
                <div className="text-4xl font-black tracking-tighter text-white/90 font-mono">
                  {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-(--accent-color) opacity-70 border-b border-white/5 pb-2">
                  <Cpu size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Environmental_Sensors</span>
                </div>
                <div className="bg-white/5 rounded-sm border border-white/5 hover:border-(--accent-color)/30 transition-colors">
                  <WeatherWidget />
                </div>
              </div>

              <div className="p-4 bg-black/40 border-l-2 border-(--accent-color) space-y-2">
                <p className="text-[9px] text-white/40 uppercase">OS_Kernel: <span className="text-white/80">Nattan_v2.0.4</span></p>
                <p className="text-[9px] text-white/40 uppercase">Connection: <span className="text-green-500">Encrypted_AES</span></p>
                <div className="h-1 w-full bg-white/5 mt-2">
                  <motion.div 
                    animate={{ width: ["10%", "85%", "40%", "95%"] }}
                    transition={{ repeat: Infinity, duration: 5 }}
                    className="h-full bg-(--accent-color) shadow-[0_0_5px_var(--accent-color)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}