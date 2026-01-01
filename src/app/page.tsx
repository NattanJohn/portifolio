"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SYSTEM_EVENTS, NotifyEventDetail } from "../libs/events";
import { useTheme } from "@/context/ThemeContext";

// Componentes Core
import BootScreen from "@/components/BootScreen";
import Dock from "@/components/Dock";
import Window from "@/components/Window";
import Notification from "@/components/Notification";
import StatsWidget from "@/components/Status";

// Widgets das Janelas
import SkillsWidget from "@/components/widgets/SkillsWidget";
import TerminalWidget from "@/components/widgets/TerminalWidget";
import ExperienceWidget from "@/components/widgets/ExperienceWidget";
import ContactWidget from "@/components/widgets/ContactsWidget";
import ProjectsWidget from "@/components/widgets/ProjectWidget";
import MatrixRain from "@/components/MatrixRain";
import AchievementToast from "@/components/AchievementToast";
import AchievementsWidget from "@/components/widgets/AchievementsWidget";

type WindowApp = {
  id: string;
  title: string;
  component: React.ReactNode;
};

export default function Home() {
  const { theme } = useTheme(); // Consumindo o novo Contexto
  const [isBooting, setIsBooting] = useState(true);
  const [openWindows, setOpenWindows] = useState<WindowApp[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);

  // Notificações
  const [showNotify, setShowNotify] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState("");

  const desktopRef = useRef<HTMLDivElement>(null);

  const triggerNotification = (msg: string) => {
    setNotifyMsg(msg);
    setShowNotify(true);
    setTimeout(() => setShowNotify(false), 5000);
  };

  useEffect(() => {
    // Listener apenas para notificações (eventos do Terminal)
    const handleNotify = (e: Event) => {
      const customEvent = e as CustomEvent<NotifyEventDetail>;
      triggerNotification(customEvent.detail.message);
    };

    window.addEventListener(SYSTEM_EVENTS.NOTIFY, handleNotify);
    return () => window.removeEventListener(SYSTEM_EVENTS.NOTIFY, handleNotify);
  }, []);

  useEffect(() => {
    if (!isBooting) {
      setTimeout(
        () => triggerNotification("SISTEMA OPERACIONAL CARREGADO."),
        1000
      );
    }
  }, [isBooting]);

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
      case "achievements":
        title = "ACHIEVEMENT_LOG.BIN";
        component = <AchievementsWidget />;
        break;
    }

    if (component) {
      setOpenWindows((prev) => [...prev, { id, title, component }]);
      setActiveWindow(id);
      triggerNotification(`EXECUTANDO: ${title}`);
    }
  };

  const closeApp = (id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindow === id) setActiveWindow(null);
  };

  return (
    <main
      className="relative h-screen w-screen overflow-hidden bg-[#0a0a0f] crt-effect"
      style={
        {
          "--accent-color": theme.color,
          "--accent-shadow": `${theme.color}44`,
        } as React.CSSProperties
      }
    >
      <MatrixRain />
      <AchievementToast />
      <AnimatePresence>
        {isBooting ? (
          <BootScreen key="boot" onComplete={() => setIsBooting(false)} />
        ) : (
          <motion.div
            key="desktop"
            ref={desktopRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative h-full w-full"
          >
            <div className="retro-grid" />

            <Notification message={notifyMsg} visible={showNotify} />
            <StatsWidget />

            <header className="p-8 flex justify-between items-start z-10 relative pointer-events-none">
              <div className="pointer-events-auto">
                <h1
                  style={{
                    color: "var(--accent-color)",
                    textShadow: `0 0 15px var(--accent-shadow)`,
                  }}
                  className="text-4xl font-black italic tracking-tighter transition-all duration-500"
                >
                  NATTAN_OS
                </h1>
                <p
                  style={{ color: "var(--accent-color)" }}
                  className="font-mono text-xs uppercase tracking-[0.3em] opacity-60 transition-colors duration-500"
                >
                  Status: Online | Core: Stable
                </p>
              </div>

              <div
                style={{ color: "var(--accent-color)" }}
                className="text-right font-mono text-[10px] hidden md:block opacity-50 transition-colors duration-500"
              >
                <p>LOC: MATINHOS_PR</p>
                <p>KERNEL: R_T_N_STACK</p>
              </div>
            </header>

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

            <Dock onSelectItem={openApp} />

            <div
              style={{ color: "var(--accent-color)" }}
              className="fixed bottom-4 right-6 text-[10px] font-mono opacity-30 hidden md:block transition-colors duration-500"
            >
              UPLOADING_RESOURCES... 100%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-50" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] z-50 opacity-20" />
    </main>
  );
}
