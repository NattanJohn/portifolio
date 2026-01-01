"use client";
import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

const experiences = [
  {
    company: "BEAN SOFTWARES",
    role: "DESENVOLVEDOR FULL STACK",
    period: "AGO 2024 - ABR 2025",
    tech: "JavaScript, React, Typescript, NodeJS, Docker, GraphQL",
    description: [
      "Reduzi o tempo de carregamento dos sistemas internos em até 40%, aplicando otimizações de assets e lazy loading.",
      "Desenvolvi a arquitetura de autenticação JWT e módulos de controle de usuários/permissões.",
      "Modelei e otimizei bancos de dados PostgreSQL com índices personalizados para ganho de performance.",
      "Criei dashboards automatizados com Recharts e React para análise de indicadores dinâmicos.",
      "Utilizei Docker para padronização de ambientes e GitHub para CI/CD e versionamento."
    ],
  },
  {
    company: "PREFEITURA DE BALNEÁRIO CAMBORIÚ",
    role: "DESENVOLVEDOR FRONT-END",
    period: "MAR 2023 - AGO 2024",
    tech: "NextJS, Typescript, Tailwind, Material UI, APIs REST",
    description: [
      "Reduzi latência em 30% otimizando renderização de componentes e compressão de imagens no Next.js.",
      "Implementei dashboards de monitoramento e filtros inteligentes de dados para operações internas.",
      "Desenvolvi interfaces acessíveis (ARIA) seguindo padrões modernos de UX governamental.",
      "Integração robusta com APIs REST com tratamento extensivo de exceções e erros operacionais."
    ],
  },
  {
    company: "SYMME",
    role: "DESENVOLVEDOR FRONT-END",
    period: "ABR 2022 - MAR 2023",
    tech: "JavaScript, React, CSS Modules, Material UI",
    description: [
      "Manutenção e implementação de novas features em sistemas de gestão de ponto e escalas.",
      "Estruturação de componentes modulares e reutilizáveis, garantindo padronização visual.",
      "Correção de bugs críticos de layout e otimização de performance mobile.",
      "Colaboração ativa em sprints ágeis e planejamento técnico de UI."
    ],
  },
];

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
            {/* Ponto na Timeline (Losango) */}
            <div 
              style={{ 
                backgroundColor: "var(--accent-color)", 
                boxShadow: `0 0 10px var(--accent-shadow)` 
              }}
              className={`absolute -left-9.25 top-1.5 w-2.5 h-2.5 rotate-45 transition-all duration-500 ${index === 0 ? 'animate-pulse' : 'opacity-50'}`} 
            />

            {/* Cabeçalho da Experiência */}
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

            {/* Descrição em Bullets */}
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

      {/* Footer do Log */}
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