"use client";
import { motion } from "framer-motion";
import { 
  User, 
  Code2, 
  Terminal as TerminalIcon, 
  Briefcase, 
  MessageSquare 
} from "lucide-react";
import useSound from "use-sound";

const menuItems = [
  { id: "about", icon: <User size={24} />, label: "Sobre" },
  { id: "experience", icon: <Briefcase size={24} />, label: "Experiência" },
  { id: "projects", icon: <Code2 size={24} />, label: "Projetos" },
  { id: "terminal", icon: <TerminalIcon size={24} />, label: "Terminal" },
  { id: "contact", icon: <MessageSquare size={24} />, label: "Contato" },
];

export default function Dock({ onSelectItem }: { onSelectItem: (id: string) => void }) {
  // Som de clique estilo retrô
  const [playClick] = useSound("/sounds/click.mp3", { 
    volume: 0.4,
    playbackRate: 1.2 
  });

  const handleClick = (id: string) => {
    try {
      playClick(); 
    } catch (e) {
      console.log("Som ainda não carregado ou bloqueado pelo browser", e);
    }
    onSelectItem(id); 
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 15 }}
        className="flex items-center gap-4 px-6 py-3 bg-black/60 backdrop-blur-xl border border-pink-500/50 rounded-2xl shadow-[0_0_30px_rgba(255,0,255,0.15)]"
      >
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ 
              scale: 1.3, 
              y: -10,
              color: "#00f2ff",
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(item.id)}
            className="relative group p-3 text-pink-500 transition-colors flex flex-col items-center outline-none"
          >
            <div className="group-hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.8)]">
              {item.icon}
            </div>
            
            <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-pink-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all uppercase font-mono border border-pink-400 shadow-[0_0_10px_rgba(255,0,0,0.5)] pointer-events-none whitespace-nowrap">
              {item.label}.EXE
            </span>

            <motion.div 
              layoutId={`indicator-${item.id}`}
              className="w-1 h-1 bg-cyan-400 rounded-full mt-1 opacity-40 group-hover:opacity-100 shadow-[0_0_5px_#00f2ff]" 
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}