"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function Notification({ message, visible }: { message: string, visible: boolean }) {

  const { theme } = useTheme();
  console.log(theme);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: 400, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 400, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          style={{ 
            borderLeftColor: "var(--accent-color)",
            boxShadow: `0 0 20px var(--accent-shadow), 0 10px 30px rgba(0,0,0,0.7)`
          }}
          className="fixed top-24 right-6 z-200 w-72 border-l-4 bg-[#0a0a0f]/95 p-4 backdrop-blur-xl transition-all duration-500 rounded-r-sm"
        >
          <div className="flex items-start gap-3">
            {/* Ícone com brilho dinâmico */}
            <div className="mt-1">
              <Terminal 
                size={18} 
                style={{ 
                  color: "var(--accent-color)",
                  filter: `drop-shadow(0 0 5px var(--accent-color))`
                }} 
                className="transition-all duration-500"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span 
                  style={{ color: "var(--accent-color)" }}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500"
                >
                  System_Alert
                </span>
                <span className="text-[8px] text-white/20 font-mono">NOW</span>
              </div>
              <p className="text-xs text-white/90 font-mono leading-relaxed wrap-break-words">
                {`> ${message}`}
              </p>
            </div>
          </div>

          {/* Barra de progresso/pulso inferior */}
          <div className="absolute bottom-0 left-0 h-0.5 w-full overflow-hidden opacity-30">
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              style={{ backgroundColor: "var(--accent-color)" }}
              className="h-full w-1/2" 
            />
          </div>

          {/* Overlay de scanline interno à notificação */}
          <div 
            style={{ backgroundColor: "var(--accent-color)" }}
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}