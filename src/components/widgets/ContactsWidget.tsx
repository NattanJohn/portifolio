"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Phone, Share2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useAchievements } from "@/context/AchievementContext";

export default function ContactWidget() {
  const { theme } = useTheme();
  const { unlockAchievement } = useAchievements();

  const handleLinkClick = () => {
    unlockAchievement("contact");
};

  const contacts = [
    {
      label: "EMAIL_SERVER",
      value: "nattanjhon123@gmail.com",
      link: "mailto:nattanjhon123@gmail.com",
      icon: <Mail size={16} />,
    },
    {
      label: "LINKEDIN_STATION",
      value: "linkedin.com/in/nattan-john",
      link: "https://www.linkedin.com/in/nattan-john",
      icon: <Linkedin size={16} />,
    },
    {
      label: "GITHUB_NODE",
      value: "github.com/NattanJohn",
      link: "https://github.com/NattanJohn",
      icon: <Github size={16} />,
    },
  ];

  return (
    <div className="space-y-6 font-mono italic select-none">
      <div className="text-center space-y-2 mb-8">
        <motion.h3 
          style={{ color: "var(--accent-color)", textShadow: "0 0 10px var(--accent-shadow)" }}
          className="font-bold uppercase tracking-[0.3em] text-sm md:text-lg transition-all duration-500"
        >
          {" > "} ESTABLISHING_CONNECTION
        </motion.h3>
        <div className="flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span style={{ backgroundColor: "var(--accent-color)" }} className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"></span>
            <span style={{ backgroundColor: "var(--accent-color)" }} className="relative inline-flex rounded-full h-2 w-2"></span>
          </span>
          <p className="text-[10px] text-white/40 uppercase tracking-widest">
            ENCRYPTING_CHANNEL_AES_256... <span style={{ color: "var(--accent-color)" }}>READY.</span>
          </p>
        </div>
      </div>

      <div className="grid gap-3">
        {contacts.map((contact, idx) => (
          <motion.a
            key={idx}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => handleLinkClick()}
            style={{ 
              borderColor: "rgba(255,255,255,0.1)",
              backgroundColor: "rgba(255,255,255,0.02)" 
            }}
            className="flex items-center gap-4 p-4 border group transition-all relative overflow-hidden"
          >
            <div 
              style={{ color: "var(--accent-color)" }}
              className="group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_var(--accent-color)] transition-all relative z-10"
            >
              {contact.icon}
            </div>

            <div className="flex flex-col relative z-10">
              <span 
                style={{ color: "var(--accent-color)" }}
                className="text-[9px] uppercase font-bold opacity-60 group-hover:opacity-100 transition-opacity"
              >
                {contact.label}
              </span>
              <span className="text-xs text-white/80 group-hover:text-white transition-colors">
                {contact.value}
              </span>
            </div>

            <div 
              style={{ backgroundColor: "var(--accent-color)" }}
              className="absolute inset-0 opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300"
            />
          </motion.a>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 text-[10px] text-white/50">
          <MapPin size={14} style={{ color: "var(--accent-color)" }} />
          <span className="tracking-tighter">LOC: <span className="text-white/80">MATINHOS_PR [BR]</span></span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-white/50">
          <Phone size={14} style={{ color: "var(--accent-color)" }} />
          <span className="tracking-tighter">COMMS: <span className="text-white/80">+55 41 99771-8248</span></span>
        </div>
      </div>

      <div 
        style={{ borderColor: "var(--accent-color)", backgroundColor: "rgba(255,255,255,0.02)" }}
        className="mt-6 p-4 border-l-2 relative"
      >
        <div className="absolute top-2 right-2 opacity-20">
          <Share2 size={12} style={{ color: "var(--accent-color)" }} />
        </div>
        <p className="text-[10px] text-white/60 leading-relaxed not-italic">
          <span style={{ color: "var(--accent-color)" }} className="font-bold uppercase mr-1">System_Note:</span> 
          O kernel está operando em baixa latência. Sinta-se à vontade para enviar um {"ping"} via e-mail para propostas de recrutamento ou colaborações técnicas.
        </p>
      </div>
    </div>
  );
}