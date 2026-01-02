export interface Project {
  id: string;
  title: string;
  category: string;
  tech: string[];
  description: string;
  contributions: string[];
  features?: string[];
  links?: {
    repo?: string;
    live?: string;
  };
}

export const projects: Project[] = [
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
    category: "Productivity Tool",
    tech: ["React", "TypeScript", "Web Workers", "Context API", "Vite"],
    description:
      "Aplicação de gerenciamento de tempo baseada na Técnica Pomodoro, com foco em experiência do usuário, personalização e precisão do cronômetro.",
    contributions: [
      "Implementação de Web Workers para um cronômetro preciso sem travamentos na UI.",
      "Gerenciamento de estado global com Context API para evitar prop drilling e facilitar expansão futura.",
      "Customização completa dos tempos de foco e descanso, com armazenamento local das preferências.",
      "Temas claros e escuros com troca instantânea e persistência entre sessões.",
      "Alertas sonoros ao final de cada ciclo para maior feedback ao usuário.",
      "Interface responsiva otimizada para desktop e mobile, com deploy contínuo na Vercel.",
    ],
    features: [
      "Timer com contagem regressiva",
      "Temas claro e escuro",
      "Configuração dos tempos dos ciclos",
      "Histórico de produtividade concluída",
      "Alertas sonoros",
      "Interface responsiva",
    ],
    links: {
      repo: "https://github.com/NattanJohn/pomodoro",
      live: "https://pomodoro-iota-sandy.vercel.app/",
    },
  },

  {
    id: "climate_monitoring",
    title: "CLIMATE_DASHBOARD.EXE",
    category: "Full-Stack Distributed System",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind",
      "shadcn/ui",
      "NestJS",
      "MongoDB",
      "Python",
      "Go",
      "RabbitMQ",
      "Docker",
      "Docker Compose",
    ],
    description:
      "Plataforma distribuída de monitoramento climático em tempo quase real, integrada com pipeline de coleta, processamento, persistência e exibição de dados meteorológicos com insights gerados por IA.",
    contributions: [
      "Arquitetura orientada a eventos com microsserviços e mensageria (RabbitMQ).",
      "Pipeline completo: coleta em Python → validação em Go → API NestJS → Dashboard React.",
      "Coleta periódica de clima usando Open-Meteo com publicação assíncrona na fila.",
      "Persistência dos logs climáticos e gerenciamento de usuários em MongoDB.",
      "Dashboard em tempo real com insights de IA sobre índice de conforto climático.",
      "Sistema de autenticação JWT e CRUD de usuários integrado ao frontend.",
      "Exportação de dados climáticos em CSV e XLSX via API.",
      "Infraestrutura totalmente containerizada com inicialização via Docker Compose.",
    ],
     features: [
    "Busca por cidade",
    "Clima atual e sensação térmica",
    "Velocidade do vento e umidade",
    "Localização automática por GPS",
    "Histórico de cidades pesquisadas",
    "Interface responsiva estilo terminal",
    "Ícones dinâmicos conforme condição climática",
    "Modo claro e escuro persistente",
    "Atualização automática dos dados em intervalo configurável"
  ],
    links: {
      repo: "https://github.com/NattanJohn/dashboard-clima",
    },
  },

  {
    id: "news_web_list",
    title: "NEWS_WEB_LIST.EXE",
    category: "Frontend + Fullstack para Portfolio/SEO",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript 5",
      "Atomic Design",
      "SCSS Modules",
      "Express",
      "Node.js",
      "Docker",
      "Jest",
      "React Testing Library",
      "Playwright",
    ],
    description:
      "Portal de notícias moderno focado em acessibilidade, performance mobile e SEO profissional. Possui renderização dinâmica, testes automatizados, otimização de imagens e arquitetura baseada em Atomic Design.",
    contributions: [
      "Desenvolvimento completo do frontend com Next.js 16 e SSR para SEO eficiente.",
      "Criação de backend em Express servindo dados localmente via JSON para prototipagem rápida.",
      "Implementação de Dark/Light Theme com persistência e transições suaves.",
      "Sistema de acessibilidade com 4 controles (fonte, contraste, espaçamento, escala de cinza).",
      "Componentização escalável com Atomic Design (atoms → molecules → organisms → templates).",
      "Paginação baseada em URL compartilhável e amigável para indexação.",
      "Otimização de imagens com WebP automático, blur placeholders e preload SSR.",
      "Estrutura de testes completa: 31 unitários (Jest + RTL) e 6 E2E (Playwright).",
      "Deploy do frontend (Vercel) e backend (Render) com suporte a Docker e multi-stage builds.",
      "Arquitetura preparada para expansão com SSR, ISR e pipelines de dados reais.",
    ],
     features: [
    "Renderização server-side (SSR) para SEO real",
    "Paginação indexável via URL",
    "Dark/Light Theme com persistência",
    "Sistema de acessibilidade integrado",
    "Leitura por categorias e sessões fixas",
    "Histórico das notícias acessadas recentemente",
    "Arquitetura Atomic Design",
    "Imagens otimizadas com lazy-loading",
    "Testes unitários, de integração e E2E"
  ],
    links: {
      live: "https://new-web-list.vercel.app/",
      repo: "https://github.com/NattanJohn/new-web-list",
    },
  },
];
