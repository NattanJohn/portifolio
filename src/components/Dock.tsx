"use client";
import { motion } from "framer-motion";
import { 
  User, 
  Code2, 
  Terminal as TerminalIcon, 
  Briefcase, 
  MessageSquare, 
  Trophy,
  Settings
} from "lucide-react";
import useSound from "use-sound";
import { useTheme } from "@/context/ThemeContext";

const menuItems = [
  { id: "about", icon: <User size={22} />, label: "Sobre" },
  { id: "experience", icon: <Briefcase size={22} />, label: "Experiência" },
  { id: "projects", icon: <Code2 size={22} />, label: "Projetos" },
  { id: "terminal", icon: <TerminalIcon size={22} />, label: "Terminal" },
  { id: "contact", icon: <MessageSquare size={22} />, label: "Contato" },
  { id: "achievements", icon: < Trophy  size={22} />, label: "Conquistas" },
  { id: "system_dashboard", icon: <Settings />, label: "PAINEL" },
];

export default function Dock({ onSelectItem }: { onSelectItem: (id: string) => void }) {
  const { theme } = useTheme();
  console.log(theme);
  const [playClick] = useSound("/sounds/click.mp3", { 
    volume: 0.4,
    playbackRate: 1.2 
  });

  const handleClick = (id: string) => {
    try {
      playClick(); 
    } catch (e) {
      console.log("Audio block by browser", e);
    }
    onSelectItem(id); 
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-200">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 18, stiffness: 120 }}
        style={{ 
          borderColor: "var(--accent-color)",
          boxShadow: "0 0 25px var(--accent-shadow), inset 0 0 10px var(--accent-shadow)" 
        }}
        className="flex items-center gap-2 md:gap-4 px-4 md:px-6 py-2 bg-[#0a0a0f]/80 backdrop-blur-2xl border-2 rounded-2xl transition-all duration-500"
      >
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ 
              scale: 1.2, 
              y: -8,
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(item.id)}
            style={{ color: "var(--accent-color)",  }}
            className="relative group p-3 transition-all flex flex-col items-center outline-none"
          >
            <div className="relative z-10 group-hover:drop-shadow-[0_0_8px_var(--accent-color)] transition-all duration-300">
              {item.icon}
            </div>

            <span 
              style={{ 
                backgroundColor: "var(--accent-color)",
                boxShadow: "0 0 15px var(--accent-shadow)"
              }}
              className="absolute -top-14 left-1/2 -translate-x-1/2 text-white text-[9px] px-2 py-1.5 rounded-sm opacity-0 group-hover:opacity-100 transition-all uppercase font-mono pointer-events-none whitespace-nowrap z-60 border border-white/20"
            >
              {item.label}.EXE
              <div 
                style={{ borderTopColor: "var(--accent-color)" }}
                className="absolute top-full left-1/2 -translate-x-1/2 border-x-[5px] border-x-transparent border-t-[5px]"
              />
            </span>

            <motion.div 
              style={{ 
                backgroundColor: "var(--accent-color)",
                boxShadow: "0 0 10px var(--accent-color)"
              }}
              className="w-1 h-1 rounded-full mt-1.5 opacity-20 group-hover:opacity-100 transition-all duration-300" 
            />

            <div 
              style={{ backgroundColor: "var(--accent-color)" }}
              className="absolute inset-0 opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300"
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}