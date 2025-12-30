"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import Dock from "@/components/Dock";
import Window from "@/components/Window";
import SkillsWidget from "@/components/widgets/SkillsWidget";
import TerminalWidget from "@/components/widgets/TerminalWidget";
import ExperienceWidget from "@/components/widgets/ExperienceWidget";
import ContactWidget from "@/components/widgets/ContactsWidget";
import ProjectsWidget from "@/components/widgets/ProjectWidget";

type WindowApp = {
  id: string;
  title: string;
  component: React.ReactNode;
};

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [openWindows, setOpenWindows] = useState<WindowApp[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  // Referência para limitar o movimento das janelas
  const desktopRef = useRef<HTMLDivElement>(null);

  const openApp = (id: string) => {
    if (openWindows.find((w) => w.id === id)) {
      setActiveWindow(id);
      return;
    }

    let title = "";
    let component: React.ReactNode = null;

    switch (id) {
      case "about":
        title = "MY_PROFILE";
        component = <SkillsWidget />;
        break;
      case "terminal":
        title = "SYSTEM_TERMINAL";
        component = <TerminalWidget />;
        break;
      case "experience":
        title = "WORK_HISTORY.EXE";
        component = <ExperienceWidget />;
        break;
      case "projects":
        title = "PROJECT_FILES.LOG";
        component = <ProjectsWidget />;
        break;
      case "contact":
        title = "COMMS_CHANNEL.SYS";
        component = <ContactWidget />;
        break;
    }

    if (component) {
      setOpenWindows((prev) => [...prev, { id, title, component }]);
      setActiveWindow(id);
    }
  };

  const closeApp = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0d0221] crt-effect">
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootScreen key="boot" onComplete={() => setIsBooting(false)} />
        ) : (
          <motion.div
            key="desktop"
            ref={desktopRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative h-full w-full"
          >
            <div className="retro-grid" />

            {/* Header */}
            <header className="p-8 flex justify-between items-start z-10 relative pointer-events-none">
              <div className="pointer-events-auto">
                <h1 className="text-4xl font-black text-pink-500 italic tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,242,255,0.7)]">
                  NATTAN_OS
                </h1>
                <p className="text-cyan-300 font-mono text-sm opacity-80 uppercase tracking-widest">
                  System Status: Online | Buffer: 40% Optimized
                </p>
              </div>
              <div className="text-right font-mono text-xs text-pink-400 hidden md:block">
                <p>LOC: MATINHOS_PR</p>
                <p>IP: 127.0.0.1</p>
                <p>KERNEL: R_T_N_STACK</p>
              </div>
            </header>

            {/* Windows Layer */}
            <AnimatePresence>
              {openWindows.map((win, idx) => (
                <Window
                  key={win.id}
                  title={win.title}
                  index={idx}
                  isFocused={activeWindow === win.id}
                  onFocus={() => setActiveWindow(win.id)}
                  onClose={() => closeApp(win.id)}
                  dragConstraints={desktopRef}
                >
                  {win.component}
                </Window>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {openWindows.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="text-cyan-500 font-mono uppercase tracking-[0.5em] text-xl"
                >
                  System Idle...
                </motion.p>
              </div>
            )}

            <Dock onSelectItem={openApp} />

            <div className="fixed bottom-4 right-6 text-[10px] font-mono text-pink-500/50 hidden md:block">
              LATENCY: 0.4s | OPTIMIZATION_LEVEL: 40%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay Effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-50" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] z-50" />
    </main>
  );
}
