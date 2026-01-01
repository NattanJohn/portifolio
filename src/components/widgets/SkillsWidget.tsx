"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function SkillsWidget() {
  const { theme } = useTheme();
  console.log(theme);

  const skills = [
    { name: "TypeScript", level: "90%" },
    { name: "React / Next.js", level: "95%" },
    { name: "Node.js / NestJS", level: "85%" },
    { name: "GraphQL / REST", level: "85%" },
    { name: "PostgreSQL / SQL", level: "80%" },
    { name: "Docker", level: "75%" },
  ];

  const sectionHeaderStyle = {
    color: "var(--accent-color)",
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  };

  return (
    <div className="space-y-6 font-mono italic">
      <section>
        <h3 
          style={sectionHeaderStyle}
          className="font-bold border-b mb-3 uppercase tracking-tighter text-xs md:text-sm transition-colors duration-500"
        >
          {">"} RESUMO_SISTEMA
        </h3>
        <p className="text-[11px] leading-relaxed text-white/70 not-italic">
          Desenvolvedor Full-Stack com experiência sólida na criação de soluções web escaláveis. 
          Especialista em interfaces performáticas e APIs robustas, focado em performance e usabilidade.
        </p>
      </section>

      <section>
        <h3 
          style={sectionHeaderStyle}
          className="font-bold border-b mb-4 uppercase tracking-tighter text-xs md:text-sm transition-colors duration-500"
        >
          {">"} HARDWARE_CAPABILITIES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1.5 group">
              <div className="flex justify-between text-[10px] uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">
                <span>{skill.name}</span>
                <span style={{ color: "var(--accent-color)" }}>{skill.level}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-none overflow-hidden border border-white/10 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: skill.level }}
                  transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                  style={{ 
                    backgroundColor: "var(--accent-color)",
                    boxShadow: `0 0 10px var(--accent-shadow)` 
                  }}
                  className="h-full relative z-10"
                />
                <div 
                   style={{ backgroundColor: "var(--accent-color)" }}
                   className="absolute inset-0 opacity-5 w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 not-italic">
        <div className="space-y-1">
          <h4 style={{ color: "var(--accent-color)" }} className="text-[9px] uppercase font-bold tracking-tighter opacity-70">Localização</h4>
          <p className="text-[11px] text-white/80">Matinhos - PR</p>
        </div>
        <div className="space-y-1">
          <h4 style={{ color: "var(--accent-color)" }} className="text-[9px] uppercase font-bold tracking-tighter opacity-70">Educação</h4>
          <p className="text-[11px] text-white/80">ADS - Uniavan</p>
        </div>
        <div className="space-y-1">
          <h4 style={{ color: "var(--accent-color)" }} className="text-[9px] uppercase font-bold tracking-tighter opacity-70">Idiomas</h4>
          <p className="text-[11px] text-white/80">Inglês: Intermediário</p>
        </div>
        <div className="space-y-1">
          <h4 style={{ color: "var(--accent-color)" }} className="text-[9px] uppercase font-bold tracking-tighter opacity-70">Status</h4>
          <p 
            style={{ color: "var(--accent-color)" }} 
            className="text-[10px] font-bold animate-pulse tracking-tight"
          >
            ● DISPONÍVEL_PARA_PROJETOS
          </p>
        </div>
      </section>
    </div>
  );
}