"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, ExternalLink, Github, Terminal as TerminalIcon } from "lucide-react";

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
    tech: ["React", "TypeScript", "GraphQL", "Hasura", "Node.js", "JWT"],
    description: "Plataforma de conexão entre empresas (B2B) e pessoas (B2C) com prestadores de serviço e freelancers.",
    contributions: [
      "Integração completa com GraphQL e Hasura para consulta de dados complexos.",
      "Desenvolvimento de UIs com Shadcn UI garantindo acessibilidade e design responsivo.",
      "Implementação de microsserviço de autenticação JWT e gestão de perfis (fornecedor/cliente).",
      "Sistema de upload e processamento de mídias para catálogos de serviços."
    ]
  },
  {
    id: "dashboard",
    title: "PACKAGING_MONITOR.SYS",
    category: "Real-time Dashboard",
    tech: ["React", ".NET 6", "Recharts", "Data Analysis"],
    description: "Sistema crítico de monitoramento em tempo real para o centro de produção de uma fábrica.",
    contributions: [
      "Visualização clara de indicadores de produtividade e qualidade em telões industriais.",
      "Cálculo automático de erros de pesagem com tolerância e métricas por turno.",
      "Integração com backend .NET para consumo de dados processados da linha de produção.",
      "Geração de relatórios em Excel para análise gerencial e histórica."
    ]
  },
  {
    id: "pomodoro",
    title: "POMODORO_PRODUTIVIDADE.BIN",
    category: "Personal Utility",
    tech: ["React", "TypeScript", "Web Workers", "Context API"],
    description: "Aplicação de gerenciamento de tempo utilizando a técnica Pomodoro, focada em performance e UX.",
    contributions: [
      "Uso de Web Workers para garantir a precisão do cronômetro sem travar a UI.",
      "Gerenciamento de estado global com Context API e persistência de histórico.",
      "Temas dinâmicos (Dark/Light) e alertas sonoros de ciclo concluído.",
      "Interface 100% responsiva com deploy automatizado via Vercel."
    ],
    links: {
      repo: "https://github.com/NattanJohn/pomodoro",
      live: "https://pomodoro-iota-sandy.vercel.app/"
    }
  }
];

export default function ProjectsWidget() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedProject = projects.find((p) => p.id === selectedId);

  return (
    <div className="h-full flex flex-col font-mono italic">
      <AnimatePresence mode="wait">
        {!selectedId ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 text-pink-500 mb-6 border-b border-pink-500/20 pb-2">
              <TerminalIcon size={16} />
              <h3 className="text-sm font-bold uppercase tracking-tighter">
                {" > "} SELECT_PROJECT_TO_BOOT
              </h3>
            </div>

            <div className="grid gap-3">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => setSelectedId(project.id)}
                  className="flex items-center justify-between p-4 border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 hover:border-cyan-400 group transition-all text-left"
                >
                  <div className="space-y-1">
                    <span className="text-xs text-cyan-400 font-bold group-hover:text-cyan-300">
                      {project.title}
                    </span>
                    <p className="text-[10px] text-pink-500/60 uppercase tracking-widest">
                      TYPE: {project.category}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-cyan-500 group-hover:translate-x-1 transition-transform" />
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
              className="flex items-center gap-2 text-pink-500 hover:text-pink-400 text-[10px] uppercase font-bold mb-4"
            >
              <ArrowLeft size={14} /> VOLTAR_AO_DIRETORIO
            </button>

            <header className="space-y-2">
              <h3 className="text-xl font-black text-cyan-400 tracking-tighter uppercase leading-none">
                {selectedProject?.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject?.tech.map((t) => (
                  <span key={t} className="text-[9px] bg-pink-500/10 border border-pink-500/30 px-2 py-0.5 text-pink-400 uppercase">
                    {t}
                  </span>
                ))}
              </div>
            </header>

            <div className="space-y-4">
              <div className="bg-black/40 p-4 border-l-2 border-cyan-500">
                <p className="text-xs text-cyan-100/80 leading-relaxed">
                  {selectedProject?.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] text-pink-500 font-bold uppercase underline">PRINCIPAIS_CONTRIBUIÇÕES:</h4>
                <ul className="space-y-2">
                  {selectedProject?.contributions.map((c, i) => (
                    <li key={i} className="text-[11px] flex items-start gap-2">
                      <span className="text-cyan-500">»</span>
                      <span className="opacity-80">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {(selectedProject?.links?.repo || selectedProject?.links?.live) && (
              <div className="flex gap-4 pt-4 border-t border-pink-500/10">
                {selectedProject.links.repo && (
                  <a href={selectedProject.links.repo} target="_blank" className="flex items-center gap-2 text-[10px] text-cyan-400 hover:underline">
                    <Github size={14} /> SOURCE_CODE
                  </a>
                )}
                {selectedProject.links.live && (
                  <a href={selectedProject.links.live} target="_blank" className="flex items-center gap-2 text-[10px] text-pink-400 hover:underline">
                    <ExternalLink size={14} /> LIVE_DEMO
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