"use client";
import { useAchievements, Achievement } from "@/context/AchievementContext";
import { Lock, Trophy } from "lucide-react";

export default function AchievementsWidget() {
  const { achievements } = useAchievements();

  return (
    <div className="p-4 font-mono overflow-y-auto h-full custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((a: Achievement) => (
          <div 
            key={a.id}
            className={`p-3 border-2 flex items-center gap-4 transition-all duration-500 ${
              a.unlocked 
                ? "border-(--accent-color) bg-(--accent-color)/5 opacity-100" 
                : "border-white/10 bg-white/5 opacity-40 grayscale"
            }`}
          >
            <div className={`p-2 shadow-[2px_2px_0px_#000] ${a.unlocked ? "bg-(--accent-color) text-black" : "bg-zinc-800 text-zinc-500"}`}>
              {a.unlocked ? <Trophy size={20} /> : <Lock size={20} />}
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase leading-none">{a.title}</h3>
              <p className="text-[9px] opacity-60 mt-1 leading-tight">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 border-t border-white/10 pt-4 text-center">
        <p className="text-[9px] opacity-40 italic">
          PROGRESSO_DO_SISTEMA: {achievements.filter((a: Achievement) => a.unlocked).length} / {achievements.length} MÓDULOS_PLATINADOS
        </p>
      </div>
    </div>
  );
}