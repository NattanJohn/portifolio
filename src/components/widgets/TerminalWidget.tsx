"use client";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import useSound from "use-sound";
import { useAchievements } from "@/context/AchievementContext";

const INITIAL_MESSAGE = [
  "NATTAN_OS [Version 1.0.4]",
  "System: Intel 8084 Processor @ 4.77MHz",
  "Type 'help' for a list of available commands.",
  "",
];

export default function TerminalWidget() {
  const [history, setHistory] = useState<string[]>(INITIAL_MESSAGE);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme, theme } = useTheme();
  const [errorCount, setErrorCount] = useState(0);
  const { unlockAchievement } = useAchievements();

  const [playPress] = useSound("/sounds/press.mp3", { volume: 0.1 });
  const [playSuccess] = useSound("/sounds/success.wav", { volume: 0.3 });
  const [playError] = useSound("/sounds/error.wav", { volume: 0.3 });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    let response = "";
    let isError = false;

    switch (command) {
      case "help":
        response =
          "SISTEMA DE AJUDA - NATTAN_OS\n" +
          "------------------------------------------------------------\n" +
          "ABOUT           Informações sobre o núcleo do sistema.\n" +
          "SKILLS          Módulos e tecnologias carregadas.\n" +
          "NEOFETCH        Resumo do sistema e hardware.\n" +
          "SUDO            Acesso de superusuário (cuidado!).\n" +
          "DESTRUCT        Inicia sequência de autodestruição.\n" +
          "MATRIX          Inicia efeito visual Matrix Rain.\n" +
          "SOCIAL          Lista de conexões disponíveis.\n" +
          "NPM INSTALL     Download do firmware (CV).\n" +
          "THEME MATRIX    Protocolo Matrix (Verde).\n" +
          "THEME CYBERPUNK Protocolo Night City (Rosa).\n" +
          "LS              Lista arquivos do diretório.\n" +
          "CLEAR           Reinicia o buffer do console.\n" +
          "------------------------------------------------------------";

        break;

      case "about":
        response =
          "NATTAN_OS v1.0.4 - KERNEL_INFO\n" +
          "------------------------------------------------------------\n" +
          "Desenvolvedor Full Stack com 3 anos de experiência.\n" +
          "Especialista em ecossistemas React, Node.js.\n" +
          "Localização: Matinhos - PR | Status: Disponível.";
        break;

      case "skills":
        response =
          "CAPACIDADES_DO_SISTEMA:\n" +
          "------------------------------------------------------------\n" +
          "FRONTEND:    JavaScript, Typescript, React, Next.js, Tailwind, Framer Motion\n" +
          "BACKEND:     Node.js, NestJS, PostgreSQL, GraphQL, RESTAPI\n";
        break;

      case "npm install":
        response =
          "INICIANDO DOWNLOAD: NATTAN_JOHN_CV.PDF...\n" +
          "[████████████████████] 100%\n" +
          "ESTADO: Transferência concluída com sucesso.";

        const cvPath = "/NATTAN_JOHN.pdf";
        const link = document.createElement("a");
        link.href = cvPath;
        link.download = "NATTAN_JOHN.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        unlockAchievement("cv");

        break;

      case "neofetch":
        response =
          "   _  _     _   _             USER: guest@nattanos\n" +
          "  | \\| |   | | | |            OS: NattanOS v1.0.4\n" +
          "  | .` | __| |_| |_ __ _      KERNEL: Next.js 15.1\n" +
          "  |_|\\_|/ _` __| __/ _` |     UPTIME: 40% Optimized\n" +
          "         | (_| |_| || (_| |    PACKAGES: 1337 (npm)\n" +
          "          \\__,_\\__|\\__\\__,_|   THEME: " +
          theme.name.toUpperCase();

        break;

      case "sudo":
        unlockAchievement("hacker");
        response =
          "ADMIN_ACCESS_GRANTED: Você agora tem permissões de superusuário. Mas cuidado, grandes poderes trazem grandes bugs.";
        break;

      case "destruct":
        unlockAchievement("destruct");
        response =
          "CRITICAL_ERROR: Sistema entrando em sequência de autodestruição em 3... 2... 1...";
        document.body.classList.add("animate-shake");
        setTimeout(() => document.body.classList.remove("animate-shake"), 500);
        break;

      case "matrix":
        unlockAchievement("matrix");
        response =
          "EXECUTANDO_SCRIPT: rain.sh... ESTADO: BACKGROUND_PROCESS_STARTED.";
        window.dispatchEvent(new CustomEvent("TERMINAL_MATRIX_TRIGGER"));
        break;

      case "social":
        response =
          "CONEXÕES_DISPONÍVEIS:\n" +
          "------------------------------------------------------------\n" +
          "LINKEDIN: linkedin.com/in/nattan-john\n" +
          "GITHUB:   github.com/NattanJohn\n" +
          "EMAIL:    nattanjhon123@gmail.com";

        break;

      case "theme matrix":
        unlockAchievement("visual_enhancer");
        setTheme({ name: "matrix", color: "#22c55e" });
        response = "ESTÉTICA ATUALIZADA: [MATRIX_PROTOCOL] ATIVADO.";
        break;

      case "theme cyberpunk":
        unlockAchievement("night_city");
        setTheme({ name: "cyberpunk", color: "#ec4899" });
        response = "ESTÉTICA ATUALIZADA: [NIGHT_CITY_PROTOCOL] ATIVADO.";
        break;

      case "ls":
        response =
          "about.txt   exp.log   skills.json   projects/   cv_nattan.pdf";
        break;

      case "clear":
        setHistory([]);
        return;

      case "":
        return;

      default:
        response = `ERROR: Comando '${command}' não reconhecido. Digite 'help'.`;
        isError = true;
        setErrorCount((prev) => {
          const newCount = prev + 1;

          if (newCount === 5) {
            unlockAchievement("lost");
          }

          return newCount;
        });
        break;
    }

    if (isError) playError();
    else playSuccess();

    setHistory((prev) => [...prev, `GUEST@NATTAN_OS:~$ ${cmd}`, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput("");
  };

  return (
    <div className="h-full w-full flex flex-col font-mono overflow-hidden">
      {/* Área de Mensagens */}
      <div
        ref={scrollRef}
        className="grow overflow-y-auto custom-scrollbar text-[11px] md:text-xs space-y-2 p-2"
        style={{ color: "var(--accent-color)" }}
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed whitespace-pre-wrap transition-colors duration-500 ${
              line.startsWith("GUEST@")
                ? "brightness-150 font-bold"
                : "opacity-80"
            }`}
          >
            {line}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex mt-2 shrink-0 border-t border-white/5 pt-3 pb-1 px-2"
      >
        <span
          style={{ color: "var(--accent-color)" }}
          className="mr-2 font-bold brightness-125 shrink-0"
        >
          GUEST@NATTAN_OS:~$
        </span>
        <input
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="bg-transparent border-none outline-none grow w-full"
          style={{ color: "var(--accent-color)" }}
          value={input}
          onChange={(e) => {
            playPress();
            setInput(e.target.value);
          }}
        />
      </form>

      <div className="absolute inset-0 pointer-events-none bg-scanline opacity-[0.03]" />
    </div>
  );
}
