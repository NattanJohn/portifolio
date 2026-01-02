"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { experiences } from "@/data/experiences";

export default function ExperienceWidget() {
  const { theme } = useTheme();

  return (
    <div className="space-y-8 font-mono italic text-white/80 pb-10 select-none">
      <h3 
        style={{ color: "var(--accent-color)", borderBottomColor: "rgba(255,255,255,0.1)" }}
        className="font-bold border-b mb-6 uppercase tracking-[0.2em] text-xs transition-colors duration-500"
      >
        { " > " } WORK_HISTORY_LOGS
      </h3>

      <div 
        style={{ borderLeftColor: "rgba(255,255,255,0.1)" }}
        className="relative border-l ml-3 pl-8 space-y-12"
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="relative"
          >
            <div 
              style={{ 
                backgroundColor: "var(--accent-color)", 
                boxShadow: `0 0 10px var(--accent-shadow)` 
              }}
              className={`absolute -left-9.25 top-1.5 w-2.5 h-2.5 rotate-45 transition-all duration-500 ${index === 0 ? 'animate-pulse' : 'opacity-50'}`} 
            />

            <div className="mb-4">
              <h4 
                style={{ color: "var(--accent-color)" }}
                className="font-black text-sm uppercase tracking-tight brightness-125 mb-1"
              >
                {exp.company}
              </h4>
              
              <div className="flex flex-wrap items-center text-[10px] gap-3 mb-3">
                <span className="text-white bg-white/5 border border-white/10 px-2 py-0.5 rounded-sm">
                  {exp.role}
                </span>
                <span 
                  style={{ color: "var(--accent-color)", borderColor: "var(--accent-color)" }}
                  className="border px-2 py-0.5 opacity-80"
                >
                  {exp.period}
                </span>
              </div>

              <div className="text-[9px] text-white/40 uppercase leading-tight border-t border-white/5 pt-2">
                <span style={{ color: "var(--accent-color)" }} className="opacity-70 font-bold">CORE_STACK:</span> {exp.tech}
              </div>
            </div>

            <ul className="space-y-2.5 not-italic">
              {exp.description.map((item, i) => (
                <li
                  key={i}
                  className="text-[11px] flex items-start gap-2 leading-relaxed text-white/60 hover:text-white transition-colors"
                >
                  <span style={{ color: "var(--accent-color)" }} className="font-bold brightness-110">»</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="pt-8 text-center border-t border-white/5">
        <span 
          style={{ color: "var(--accent-color)" }}
          className="text-[9px] opacity-30 animate-pulse uppercase tracking-[0.5em]"
        >
          --- End of system record ---
        </span>
      </div>
    </div>
  );
}