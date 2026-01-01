"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Github,
  Terminal as TerminalIcon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface Project {
  id: string;
  title: string;
  category: string;
  tech: string[];
  description: string;
  contributions: string[];
  links?: {
    repo?: string;
    live?: string;
  };
}

const projects: Project[] = [
  {
    id: "marketplace",
    title: "MARKETPLACE_B2B_B2C.EXE",
    category: "Full-Stack System",
    tech: ["React", "TypeScript", "GraphQL", "Hasura", "Node.js"],
    description:
      "Plataforma de conexão entre empresas (B2B) e pessoas (B2C) com prestadores de serviço e freelancers.",
    contributions: [
      "Integração completa com GraphQL e Hasura para consulta de dados.",
      "Desenvolvimento de UIs com Shadcn UI garantindo responsividade.",
      "Implementação de microsserviço de autenticação JWT.",
      "Sistema de upload e processamento de mídias para catálogos.",
    ],
  },
  {
    id: "dashboard",
    title: "PACKAGING_MONITOR.SYS",
    category: "Real-time Dashboard",
    tech: ["React", ".NET 6", "Recharts", "Data Analysis"],
    description:
      "Sistema crítico de monitoramento em tempo real para o centro de produção de uma fábrica.",
    contributions: [
      "Visualização de indicadores de produtividade em telões industriais.",
      "Cálculo automático de erros de pesagem com métricas por turno.",
      "Integração com backend .NET para consumo de dados em tempo real.",
      "Geração de relatórios em Excel para análise gerencial.",
    ],
  },
  {
    id: "pomodoro",
    title: "POMODORO_PRODUTIVIDADE.BIN",
    category: "Personal Utility",
    tech: ["React", "TypeScript", "Web Workers", "Context API"],
    description:
      "Aplicação de gerenciamento de tempo focada em performance e UX.",
    contributions: [
      "Uso de Web Workers para precisão do cronômetro.",
      "Gerenciamento de estado global com Context API.",
      "Temas dinâmicos e alertas sonoros de ciclo concluído.",
      "Interface 100% responsiva com deploy automatizado.",
    ],
    links: {
      repo: "https://github.com/NattanJohn/pomodoro",
      live: "https://pomodoro-iota-sandy.vercel.app/",
    },
  },
];

export default function ProjectsWidget() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { theme } = useTheme();

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <div className="h-full flex flex-col font-mono italic select-none">
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div
              style={{
                color: "var(--accent-color)",
                borderBottomColor: "rgba(255,255,255,0.1)",
              }}
              className="flex items-center gap-2 mb-6 border-b pb-2"
            >
              <TerminalIcon size={16} />
              <h3 className="text-[11px] font-bold uppercase tracking-widest">
                SELECT_PROJECT_TO_BOOT
              </h3>
            </div>

            <div className="grid gap-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedId(project.id)}
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                  className="flex items-center justify-between p-4 border hover:bg-white/5 group transition-all text-left relative overflow-hidden"
                >
                  <div className="space-y-1 relative z-10">
                    <span
                      style={{ color: "var(--accent-color)" }}
                      className="text-xs font-bold brightness-125 transition-all"
                    >
                      {project.title}
                    </span>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest">
                      TYPE: {project.category}
                    </p>
                  </div>
                  <ChevronRight
                    size={18}
                    style={{ color: "var(--accent-color)" }}
                    className="group-hover:translate-x-1 transition-transform opacity-50 group-hover:opacity-100"
                  />
                  <div
                    style={{ backgroundColor: "var(--accent-color)" }}
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="space-y-6"
          >
            <button
              onClick={() => setSelectedId(null)}
              style={{ color: "var(--accent-color)" }}
              className="flex items-center gap-2 hover:brightness-150 text-[10px] uppercase font-bold mb-4 transition-all"
            >
              <ArrowLeft size={14} /> VOLTAR_AO_DIRETORIO
            </button>

            <header className="space-y-4">
              <h3
                style={{
                  color: "var(--accent-color)",
                  textShadow: "0 0 10px var(--accent-shadow)",
                }}
                className="text-xl md:text-2xl font-black tracking-tighter uppercase leading-none"
              >
                {selectedProject?.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.tech.map((t) => (
                  <span
                    key={t}
                    style={{
                      borderColor: "var(--accent-color)",
                      color: "var(--accent-color)",
                    }}
                    className="text-[9px] bg-white/5 border px-2 py-0.5 uppercase opacity-80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </header>

            <div className="space-y-6">
              <div
                style={{ borderLeftColor: "var(--accent-color)" }}
                className="bg-white/3 p-4 border-l-2"
              >
                <p className="text-xs text-white/70 leading-relaxed not-italic">
                  {selectedProject?.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4
                  style={{ color: "var(--accent-color)" }}
                  className="text-[10px] font-bold uppercase tracking-tighter opacity-80"
                >
                  {"// PRINCIPAIS_CONTRIBUIÇÕES:"}
                </h4>
                <ul className="space-y-3">
                  {selectedProject?.contributions.map((c, i) => (
                    <li
                      key={i}
                      className="text-[11px] flex items-start gap-2 text-white/60 not-italic"
                    >
                      <span
                        style={{ color: "var(--accent-color)" }}
                        className="font-bold brightness-125"
                      >
                        »
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(selectedProject?.links?.repo || selectedProject?.links?.live) && (
              <div className="flex gap-6 pt-6 border-t border-white/5">
                {selectedProject.links.repo && (
                  <a
                    href={selectedProject.links.repo}
                    target="_blank"
                    style={{ color: "var(--accent-color)" }}
                    className="flex items-center gap-2 text-[10px] font-bold hover:brightness-150 transition-all"
                  >
                    <Github size={14} /> [ SOURCE_CODE ]
                  </a>
                )}
                {selectedProject.links.live && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    style={{ color: "var(--accent-color)" }}
                    className="flex items-center gap-2 text-[10px] font-bold hover:brightness-150 transition-all"
                  >
                    <ExternalLink size={14} /> [ LIVE_DEMO ]
                  </a>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
