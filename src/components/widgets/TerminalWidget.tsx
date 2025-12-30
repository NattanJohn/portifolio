"use client";
import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";

const INITIAL_MESSAGE = [
  "NATTAN_OS [Version 1.0.4]",
  "System: Intel 8084 Processor @ 4.77MHz",
  "Type 'help' for a list of available commands.",
  ""
];

export default function TerminalWidget() {
  const [history, setHistory] = useState<string[]>(INITIAL_MESSAGE);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

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
          "ABOUT           Exibe informações sobre o núcleo do sistema.\n" +
          "SKILLS          Lista módulos e tecnologias carregadas.\n" +
          "NEOFETCH        Exibe o resumo do sistema e hardware.\n" +
          "GIT STATUS      Verifica o estado da branch principal.\n" +
          "NPM INSTALL     Faz o download do firmware (CV).\n" +
          "LS              Lista os arquivos do diretório atual.\n" +
          "CLEAR           Reinicia o buffer do console.\n" +
          "------------------------------------------------------------";
        break;

      case "neofetch":
        response = 
          "   _  _     _   _             USER: guest@nattanos\n" +
          "  | \\| |   | | | |            OS: NattanOS v1.0.4 x86_64\n" +
          "  | .` | __| |_| |_ __ _ _    KERNEL: Next.js 15.1 (Turbo)\n" +
          "  |_|\\_|/ _` __| __/ _` | ' \\   UPTIME: 40% Optimized\n" +
          "       | (_| |_| || (_| | | |  PACKAGES: 1337 (npm)\n" +
          "        \\__,_\\__|\\__\\__,_|_| |_| SHELL: custom-zsh\n" +
          "                              RESOLUTION: 1920x1080\n" +
          "                              UI: Retro-Neon-Vibe";
        break;

      case "about":
        response = 
          "PROFILE_INFO:\n\n" +
          "NOME:           Nattan John Lana da Silva\n" +
          "CARGO:          Desenvolvedor Full Stack Júnior\n" +
          "FOCO:           Performance, UI Retro & Clean Code\n" +
          "DESC:           Especialista em reduzir latência (-40%)\n" +
          "                e criar dashboards de alto impacto.";
        break;

      case "skills":
        response = 
          "MODULES_LOADED:\n\n" +
          "FRONTEND:       React, Next.js, TypeScript, Tailwind\n" +
          "BACKEND:        Node.js, Express, APIs REST, GraphQL\n" +
          "DATA_VIZ:       Recharts, D3.js (Dashboard Expert)\n" +
          "INFRA:          PostgreSQL, Docker, Git, CI/CD\n" +
          "DESIGN:         Framer Motion, Styled Components";
        break;

      case "git status":
        response = 
          "BRANCH:         master\n" +
          "STATUS:         Open to work / Hiring recommended\n" +
          "CHANGES:        None. Everything is optimized.\n" +
          "REMOTE:         https://github.com/nattan-john";
        break;

      case "npm install nattan":
        response = 
          "FETCHING:       https://registry.npmjs.org/nattan-john\n" +
          "STATUS:         [██████████] 100%\n\n" +
          "SUCCESS:        NATTAN_JOHN_CV.PDF unlocked.\n" +
          "ACTION:         Abrindo arquivo no navegador...";
        window.open('/NATTAN_JOHN.pdf', '_blank');
        break;

      case "ls":
        response = 
          "PERMISSION:     -rw-r--r--\n" +
          "DIRECTORY:      /root/nattan_os/docs\n\n" +
          "FILE_NAME       SIZE        TYPE\n" +
          "---------       ----        ----\n" +
          "about.txt       1.2kb       TEXT\n" +
          "exp.log         3.5kb       LOG\n" +
          "skills.json     0.8kb       JSON\n" +
          "projects/       <DIR>       FOLDER\n" +
          "cv_nattan.pdf   450kb       PDF";
        break;

      case "clear":
        setHistory([]);
        return;

      case "":
        return;

      default:
        response = 
          "ERROR_404: Comando '" + command + "' não reconhecido.\n" +
          "Tente digitar 'help' para ver a lista de comandos.";
        isError = true;
    }

    if (isError) playError(); else playSuccess();
    setHistory((prev) => [...prev, `NATTAN@USER:~$ ${cmd}`, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput("");
  };

  return (
    <div 
      className="h-full w-full bg-black/80 font-mono text-green-400 p-4 flex flex-col overflow-hidden"
    >
      <div 
        ref={scrollRef}
        className="grow overflow-y-auto custom-scrollbar text-sm space-y-1"
      >
        {history.map((line, i) => (
          <div key={i} className={`leading-relaxed whitespace-pre-wrap ${line.startsWith('NATTAN@') ? 'text-pink-500' : ''}`}>
            {line}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="flex mt-2 shrink-0 border-t border-green-900/30 pt-2">
        <span className="mr-2 text-pink-500 font-bold tracking-tighter shrink-0">NATTAN@USER:~$</span>
        <input
          autoFocus
          className="bg-transparent border-none outline-none text-green-400 grow w-full"
          value={input}
          onChange={(e) => {
            playPress();
            setInput(e.target.value);
          }}
        />
      </form>
    </div>
  );
}