"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "BEAN SOFTWARES",
    role: "DESENVOLVEDOR FULL STACK",
    period: "AGO 2024 - ABR 2025",
    tech: "JavaScript, React, Typescript, HTML, CSS, NodeJS, Docker, Tailwind, Material UI, GraphQL",
    description: [
      "Reduzi o tempo de carregamento dos sistemas internos em até 40%, aplicando otimizações de assets, lazy loading, melhoria de renderização de componentes e redução de requisições desnecessárias.",
      "Desenvolvi a arquitetura de autenticação e autorização (JWT) utilizando Node.js, implementando módulos de controle de usuários e permissões, o que garantiu a segurança da aplicação e a integridade dos dados.",
      "Desenvolvi e mantive APIs REST e GraphQL com validação de dados, tratamento de exceções, controle de permissões e boas práticas de segurança aplicadas em ambiente de produção.",
      "Modelei e otimizei bancos de dados PostgreSQL, criando tabelas normalizadas, aplicando índices personalizados e refi nando consultas SQL para ganho de performance e integridade dos dados.",
      "Criei dashboards e relatórios automatizados para análise de indicadores internos, transformando dados operacionais em gráfi cos dinâmicos e visuais interativos com Recharts e React, otimizando a tomada de decisão de gestores.",
      "Utilizei Docker para padronização de ambientes de desenvolvimento, Git/GitHub para versionamento e controle de branches, e Postman para testes e documentação de APIs.",
      "Participei de code reviews, decisões técnicas e padronização de processos, garantindo qualidade, escalabilidade e consistência nas entregas da equipe.",
      "Contribuí na documentação técnica e de APIs REST, facilitando o onboarding de novos desenvolvedores.",
      "Modelei gráficos interativos com Recharts e React, otimizando decisões operacionais.",
    ],
  },
  {
    company: "PREFEITURA DE BALNEÁRIO CAMBORIÚ",
    role: "DESENVOLVEDOR FRONT-END",
    period: "MAR 2023 - AGO 2024",
    tech: "JavaScript, React, NextJS, Typescript, HTML, CSS, NodeJS, Tailwind, Material UI",
    description: [
      "Reduzi o tempo de carregamento das páginas em até 30% aplicando técnicas de lazy loading, otimização de assets, compressão de imagens e melhorias na renderização de componentes React, resultando em navegação mais rápida e fl uida para os usuários internos.",
      "Implementei módulos de controle de usuários e permissões, dashboards internos para monitoramento de processos e fi ltros inteligentes de dados, garantindo maior organização e segurança nas operações.",
      "Modelei e desenvolvi páginas web responsivas utilizando React, Next.js e CSS moderno, incluindo práticas de acessibilidade (ARIA, contraste e navegação por teclado) para atender diferentes perfi s de usuários.",
      "Realizei integrações com APIs REST, criando funções para tratamento de erros, validação de dados e manipulação efi ciente das respostas, utilizando Postman para testes e documentação, garantindo consistência e confi abilidade das informações.",
      "Utilizei Git para controle de versões, criação de branches e gestão de merges, garantindo histórico organizado.",
      "Minimizei erros operacionais através de validações eficientes e tratamento de exceções.",
    ],
  },
  {
    company: "SYMME",
    role: "DESENVOLVEDOR FRONT-END",
    period: "ABR 2022 - MAR 2023",
    tech: "JavaScript, React, HTML, CSS, Material UI",
    description: [
      "Realizei manutenção e implementações de pequenas funcionalidades no site, utilizando ReactJS, JavaScript, HTML e CSS, garantindo que novas features fossem integradas de forma consistente e segura.",
      "Corrigi bugs e inconsistências no layout e na experiência do usuário, aplicando ajustes responsivos para diferentes navegadores e dispositivos, melhorando a estabilidade e confi abilidade do site..",
      "Trabalhei no suporte ao aplicativo, utilizado por colaboradores para bater ponto, consultar escalas e acompanhar horários, colaborando para que a interface fosse mais intuitiva e estável.",
      "Otimizei o desempenho do site e do app por meio de melhorias na renderização de componentes, lazy loading e ajustes de scripts, resultando em carregamento mais rápido e experiência mais fl uida.",
      "Estruturei componentes modulares e reutilizáveis, facilitando a manutenção do código, a implementação de novas funcionalidades e a padronização visual das interfaces.",
      "Colaborei em reuniões de planejamento e sprints ágeis, acompanhando prioridades de desenvolvimento, realizando estimativas de tarefas e garantindo entregas dentro dos prazos.",
      "Utilizei GitHub para versionamento de código, controle de branches e colaboração em equipe, assegurando histórico organizado e processos de merge eficientes.",
    ],
  },
];

export default function ExperienceWidget() {
  return (
    <div className="space-y-8 font-mono italic text-cyan-100/90 pb-10">
      <h3 className="text-pink-500 font-bold border-b border-pink-500/30 mb-4 uppercase tracking-tighter">
        {" > "} WORK_HISTORY_LOGS
      </h3>

      <div className="relative border-l border-pink-500/30 ml-2 pl-6 space-y-10">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="relative"
          >
            {/* Ponto na Timeline */}
            <div className="absolute -left-7.75 top-1 w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee] rotate-45" />

            {/* Cabeçalho */}
            <div className="mb-3">
              <h4 className="text-pink-500 font-black text-sm uppercase tracking-tight">
                {exp.company}
              </h4>
              <div className="flex flex-wrap justify-between items-center text-[10px] text-cyan-400/80 mb-2 gap-2">
                <span className="border border-cyan-500/30 px-1">
                  {exp.role}
                </span>
                <span className="bg-pink-500/10 px-2 py-0.5 border border-pink-500/20 text-pink-400">
                  {exp.period}
                </span>
              </div>
              <div className="text-[9px] text-cyan-300/50 uppercase leading-tight border-t border-cyan-500/10 pt-1">
                <span className="text-pink-500/70">CORE_STACK:</span> {exp.tech}
              </div>
            </div>

            {/* Lista de Bullets */}
            <ul className="space-y-2">
              {exp.description.map((item, i) => (
                <li
                  key={i}
                  className="text-[10px] md:text-[11px] flex items-start gap-2 leading-relaxed"
                >
                  <span className="text-pink-500 font-bold mt-0.5">»</span>
                  <span className="opacity-80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 text-center border-t border-pink-500/10">
        <span className="text-[9px] text-pink-500/40 animate-pulse uppercase tracking-[0.3em]">
          End of transmission
        </span>
      </div>
    </div>
  );
}
