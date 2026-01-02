"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import useSound from "use-sound";

export type Achievement = {
  id: string;
  title: string;
  desc: string;
  unlocked: boolean;
};

const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: "hacker", title: "HACKER_MAN", desc: "Acessou o núcleo via sudo.", unlocked: false },
  { id: "cv", title: "HEADHUNTER_DETECTED", desc: "Download do firmware NATTAN_CV concluído.", unlocked: false },
  { id: "destruct", title: "SYSTEM_CRASHER", desc: "Sobreviveu à sequência de autodestruição.", unlocked: false },
  { id: "matrix", title: "THE_CHOSEN_ONE", desc: "Ativou o protocolo Matrix com sucesso.", unlocked: false },
  { id: "lost", title: "LOST_IN_THE_SHELL", desc: "Digitou 5 comandos inválidos. Leia o manual!", unlocked: false },
  { id: "contact", title: "ESTABLISHING_COMMS", desc: "Iniciou conexão via canais externos.", unlocked: false },
  { id: "night_city", title: "NIGHT_CITY_LEGEND", desc: "Ativou o protocolo Night City.", unlocked: false },
  { id: "visual_enhancer", title: "VISUAL_ENHANCER", desc: "Ativou o protocolo Matrix Rain.", unlocked: false },
];

interface AchievementContextType {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
}

const AchievementContext = createContext<AchievementContextType | null>(null);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos apenas com a lista padrão para evitar erro de SSR
  const [achievements, setAchievements] = useState<Achievement[]>(ALL_ACHIEVEMENTS);

  const [playSuccess] = useSound("/sounds/achievement.wav", { 
    volume: 0.6,
    interrupt: true
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nattan_os_achievements");
      if (saved) {
        try {
          const unlockedIds = JSON.parse(saved) as string[];
          setAchievements(prev => prev.map(ach => ({
            ...ach,
            unlocked: unlockedIds.includes(ach.id)
          })));
        } catch (e) {
          console.error("Erro ao carregar conquistas:", e);
        }
      }
    }
  }, []);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const target = prev.find(a => a.id === id);
      
      if (!target || target.unlocked) return prev;
      
      // Toca o som de sucesso
      playSuccess();

      // Dispara o evento visual para o Toast
      window.dispatchEvent(new CustomEvent("ACHIEVEMENT_UNLOCKED", { 
        detail: { ...target, unlocked: true } 
      }));

      const newState = prev.map(ach => 
        ach.id === id ? { ...ach, unlocked: true } : ach
      );
      
      // Salva no localStorage apenas se estivermos no navegador
      if (typeof window !== "undefined") {
        const idsToSave = newState
          .filter(ach => ach.unlocked)
          .map(ach => ach.id);
        localStorage.setItem("nattan_os_achievements", JSON.stringify(idsToSave));
      }

      return newState;
    });
  };

  return (
    <AchievementContext.Provider value={{ achievements, unlockAchievement }}>
      {children}
    </AchievementContext.Provider>
  );
}

export const useAchievements = () => {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievements deve ser usado dentro de um AchievementProvider");
  }
  return context;
};