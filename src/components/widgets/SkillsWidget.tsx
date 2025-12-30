"use client";
import { motion } from "framer-motion";

export default function SkillsWidget() {
  const skills = [
    { name: "TypeScript", level: "90%" },
    { name: "React / Next.js", level: "95%" },
    { name: "Node.js / NestJS", level: "85%" },
    { name: "GraphQL / REST", level: "85%" },
    { name: "PostgreSQL / SQL", level: "80%" },
    { name: "Docker", level: "75%" },
  ];

  return (
    <div className="space-y-6 text-cyan-100/90 font-mono italic">
      <section>
        <h3 className="text-pink-500 font-bold border-b border-pink-500/30 mb-2 uppercase tracking-tighter">
          {">"} RESUMO_SISTEMA
        </h3>
        <p className="text-[11px] leading-relaxed">
          Desenvolvedor Full-Stack com experiência sólida na criação de soluções web escaláveis, atuando de ponta a ponta[cite: 6]. 
          Especialista em interfaces performáticas e APIs robustas, focado em performance, usabilidade e entrega de valor[cite: 7, 9].
        </p>
      </section>

      <section>
        <h3 className="text-pink-500 font-bold border-b border-pink-500/30 mb-3 uppercase tracking-tighter">
          {">"} HARDWARE_CAPABILITIES
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-[10px] uppercase tracking-widest">
                <span>{skill.name}</span>
                <span className="text-pink-400">{skill.level}</span>
              </div>
              <div className="h-1.5 bg-pink-500/10 rounded-none overflow-hidden border border-pink-500/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: skill.level }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 pt-4 border-t border-pink-500/10">
        <div>
          <h4 className="text-[9px] text-pink-500 uppercase font-bold tracking-tighter">Localização</h4>
          <p className="text-[11px]">Matinhos - PR [cite: 4]</p>
        </div>
        <div>
          <h4 className="text-[9px] text-pink-500 uppercase font-bold tracking-tighter">Educação</h4>
          <p className="text-[11px]">ADS - Uniavan [cite: 55]</p>
        </div>
        <div>
          <h4 className="text-[9px] text-pink-500 uppercase font-bold tracking-tighter">Idiomas</h4>
          <p className="text-[11px]">Inglês: Intermediário [cite: 63]</p>
        </div>
        <div>
          <h4 className="text-[9px] text-pink-500 uppercase font-bold tracking-tighter">Status</h4>
          <p className="text-[11px] text-cyan-400 animate-pulse">DISPONÍVEL_PARA_PROJETOS</p>
        </div>
      </section>
    </div>
  );
}