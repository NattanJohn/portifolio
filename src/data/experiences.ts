export interface Experience {
  company: string;
  role: string;
  period: string;
  tech: string;
  description: string[];
}

export const experiences: Experience[] = [
  {
    company: "BEAN SOFTWARES",
    role: "DESENVOLVEDOR FULL STACK",
    period: "AGO 2024 - ABR 2025",
    tech: "JavaScript, React, Typescript, NodeJS, Docker, GraphQL",
    description: [
      "Reduzi o tempo de carregamento dos sistemas internos em até 40%, aplicando otimizações de assets e lazy loading.",
      "Desenvolvi a arquitetura de autenticação JWT e módulos de controle de usuários/permissões.",
      "Modelei e otimizei bancos de dados PostgreSQL com índices personalizados para ganho de performance.",
      "Criei dashboards automatizados com Recharts e React para análise de indicadores dinâmicos.",
      "Utilizei Docker para padronização de ambientes e GitHub para CI/CD e versionamento."
    ],
  },
  {
    company: "PREFEITURA DE BALNEÁRIO CAMBORIÚ",
    role: "DESENVOLVEDOR FRONT-END",
    period: "MAR 2023 - AGO 2024",
    tech: "NextJS, Typescript, Tailwind, Material UI, APIs REST",
    description: [
      "Reduzi latência em 30% otimizando renderização de componentes e compressão de imagens no Next.js.",
      "Implementei dashboards de monitoramento e filtros inteligentes de dados para operações internas.",
      "Desenvolvi interfaces acessíveis (ARIA) seguindo padrões modernos de UX governamental.",
      "Integração robusta com APIs REST com tratamento extensivo de exceções e erros operacionais."
    ],
  },
  {
    company: "SYMME",
    role: "DESENVOLVEDOR FRONT-END",
    period: "ABR 2022 - MAR 2023",
    tech: "JavaScript, React, CSS Modules, Material UI",
    description: [
      "Manutenção e implementação de novas features em sistemas de gestão de ponto e escalas.",
      "Estruturação de componentes modulares e reutilizáveis, garantindo padronização visual.",
      "Correção de bugs críticos de layout e otimização de performance mobile.",
      "Colaboração ativa em sprints ágeis e planejamento técnico de UI."
    ],
  },
];
