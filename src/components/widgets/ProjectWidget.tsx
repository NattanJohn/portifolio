"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Terminal as TerminalIcon,
  CheckCircle2 // Ícone novo para as features
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { projects } from "@/data/projects";

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
                    backgroundColor: "rgba(255,255,255,0.02)"
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
            className="space-y-6 pb-8"
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
                  textShadow: "0 0 10px var(--accent-shadow)"
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
                      color: "var(--accent-color)"
                    }}
                    className="text-[9px] bg-white/5 border px-2 py-0.5 uppercase opacity-80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </header>

            <div className="space-y-6">
              {/* DESCRIÇÃO */}
              <div
                style={{ borderLeftColor: "var(--accent-color)" }}
                className="bg-white/3 p-4 border-l-2"
              >
                <p className="text-xs text-white/70 leading-relaxed not-italic">
                  {selectedProject?.description}
                </p>
              </div>

              {/* FEATURES (NOVA SEÇÃO) */}
              {selectedProject?.features && (
                <div className="space-y-3">
                  <h4
                    style={{ color: "var(--accent-color)" }}
                    className="text-[10px] font-bold uppercase tracking-tighter opacity-80"
                  >
                    {"// FEATURES_DO_SISTEMA:"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedProject.features.map((feature, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 text-[10px] text-white/50 not-italic border border-white/5 p-2 bg-white/2"
                      >
                        <CheckCircle2 size={12} style={{ color: "var(--accent-color)" }} className="opacity-70" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CONTRIBUIÇÕES */}
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

            {/* LINKS */}
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