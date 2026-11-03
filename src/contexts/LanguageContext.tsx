"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Entry {
  title: string;
  org: string;
  href?: string;
  period: string;
  bullets: string[];
}

export interface Project {
  title: string;
  stack: string;
  year?: string;
  description: string;
  href?: string;
  github?: string;
}

const translations = {
  pt: {
    role: "Engenharia de Computação · Machine Learning & Dados",
    tagline:
      "Estudante da UnB construindo modelos de ML e curtindo um vibe coding nas horas livres.",
    location: "Brasília, DF",
    nav: {
      about: "Sobre",
      experience: "Experiência",
      education: "Formação",
      projects: "Projetos",
      skills: "Competências",
    },
    resume: "Ver currículo",
    switchLang: "English",
    about: [
      "Estudo Engenharia de Computação na UnB e atualmente estou no sétimo semestre. O que mais me interessa em machine learning é usar dados para tomar decisões que as IAs não tomam sozinhas: entender o que está acontecendo num negócio e onde dá para otimizar. Hoje estou participando do programa GCI World em Data Science, da Universidade de Tóquio, e estagio na Apex-Brasil, onde aprendi as etapas de desenvolvimento de um sistema de escala nacional.",
      "Gosto de desenvolver pensando em me divertir: construir algo que resolva um problema real e que meus amigos gostem de usar. Também me interesso por finanças e pelo mercado financeiro.",
      "Fora da tela, gosto de praticar esportes para manter a mente descansada: jogando tênis e futebol e correndo de vez em nunca.",
    ],
    experience: [
      {
        title: "Estagiário de Sistemas e Aplicações",
        org: "Apex-Brasil",
        href: "https://apexbrasil.com.br/",
        period: "mar 2026 — atual",
        bullets: [
          "Homologação de sistemas: execução de casos de teste e reporte de bugs antes da produção.",
          "Uso do Claude para estruturar chamados de bug a partir da descrição, reprodução e correção esperada.",
          "Automação de fluxos do sistema de convênios HARPIA a partir das requisições da API.",
        ],
      },
      {
        title: "Estagiário de Dados e Automação",
        org: "TJDFT",
        href: "https://www.tjdft.jus.br/",
        period: "ago 2025 — fev 2026",
        bullets: [
          "Painéis em Power BI de frequência dos servidores dos fóruns, usados pela gerência.",
          "Automação de processos internos com Power Apps.",
        ],
      },
      {
        title: "Desenvolvedor Full Stack",
        org: "CJR — Empresa Júnior da UnB",
        period: "jan 2024 — dez 2024",
        bullets: [
          "Aplicações web em React, Next.js e TypeScript para clientes reais.",
        ],
      },
    ] as Entry[],
    education: [
      {
        title: "GCI World 2026 — Data Science",
        org: "Universidade de Tóquio (Matsuo-Iwasawa Lab)",
        period: "em andamento",
        bullets: [
          "Programa de 14 semanas em ML supervisionado, avaliação de modelos e engenharia de features.",
          "Competição Home Credit Default Risk: modelo de risco de inadimplência avaliado por AUC-ROC.",
          "Projeto final: modelo de churn e proposta de retenção para uma operadora de telecom.",
        ],
      },
      {
        title: "Engenharia de Computação",
        org: "Universidade de Brasília (UnB)",
        period: "2023 — 2028 (previsão)",
        bullets: [],
      },
      {
        title: "CS50 — Introduction to Computer Science",
        org: "Harvard (online)",
        href: "https://cs50.harvard.edu/x/",
        period: "2025",
        bullets: [],
      },
    ] as Entry[],
    projects: [
      {
        title: "Radar de Vagas",
        stack: "Python · Claude API · GitHub Actions",
        year: "2026",
        description:
          "Triagem de oportunidades com LLM: coleta vagas de estágio e concursos e usa a Claude API para dar nota e justificativa a cada uma. Roda semanalmente no GitHub Actions e envia um relatório priorizado por e-mail toda segunda-feira.",
      },
      {
        title: "Observatório Electrum",
        stack: "Python · scikit-learn · Jupyter",
        description:
          "Pesquisa sobre o ecossistema de servidores Electrum (Bitcoin): pipeline de varredura e fingerprinting comportamental, com clustering de metadados para identificar operadores recorrentes e medir a centralização da rede.",
        href: "https://gabrielcaixeta01.github.io/electrum-observatory/",
        github: "https://github.com/gabrielcaixeta01/electrum-observatory",
      },
      {
        title: "Home Credit Default Risk",
        stack: "Python · pandas · scikit-learn",
        year: "2026",
        description:
          "Competição do GCI World: modelo de risco de inadimplência com engenharia de features sobre dados tabulares de crédito, avaliado por AUC-ROC.",
      },
    ] as Project[],
    skills: [
      { label: "Linguagens", items: ["Python", "C++", "SQL", "TypeScript"] },
      {
        label: "Dados e ML",
        items: ["scikit-learn", "pandas", "NumPy", "Matplotlib", "Jupyter", "Power BI"],
      },
      {
        label: "IA generativa",
        items: ["Claude API", "Claude Code", "ChatGPT", "Gemini"],
      },
      { label: "Web e ferramentas", items: ["React", "Next.js", "Git", "Power Apps"] },
      { label: "Idiomas", items: ["Português (nativo)", "Inglês (fluente, C1)"] },
    ],
    footer: "Feito com Next.js · hospedado no GitHub Pages",
  },
  en: {
    role: "Computer Engineering · Machine Learning & Data",
    tagline:
      "Student at UnB building ML models and doing some vibe coding in my free time.",
    location: "Brasília, Brazil",
    nav: {
      about: "About",
      experience: "Experience",
      education: "Education",
      projects: "Projects",
      skills: "Skills",
    },
    resume: "View résumé (PT)",
    switchLang: "Português",
    about: [
      "I study Computer Engineering at the University of Brasília and I'm currently in my seventh semester. What interests me most in machine learning is using data to make decisions that AI can't make on its own: understanding what's happening in a business and where it can be optimized. I'm currently in the GCI World program in Data Science from the University of Tokyo and interning at Apex-Brasil, where I've learned the stages of developing a nationwide system.",
      "I like building things for fun: something that solves a real problem and that my friends enjoy using. I'm also interested in finance and the financial markets.",
      "Away from the screen, I play sports to rest my mind: tennis, football and, once in a blue moon, a run.",
    ],
    experience: [
      {
        title: "Systems and Applications Intern",
        org: "Apex-Brasil",
        href: "https://apexbrasil.com.br/",
        period: "Mar 2026 — present",
        bullets: [
          "System acceptance testing: running test cases and reporting bugs before production.",
          "Using Claude to structure bug tickets from description, reproduction steps and expected fix.",
          "Automating workflows in the HARPIA agreements system from its API requests.",
        ],
      },
      {
        title: "Data and Automation Intern",
        org: "TJDFT (Federal District Court)",
        href: "https://www.tjdft.jus.br/",
        period: "Aug 2025 — Feb 2026",
        bullets: [
          "Power BI dashboards on courthouse staff attendance, used by management.",
          "Internal process automation with Power Apps.",
        ],
      },
      {
        title: "Full Stack Developer",
        org: "CJR — UnB's student-run company",
        period: "Jan 2024 — Dec 2024",
        bullets: ["Web applications in React, Next.js and TypeScript for real clients."],
      },
    ] as Entry[],
    education: [
      {
        title: "GCI World 2026 — Data Science",
        org: "University of Tokyo (Matsuo-Iwasawa Lab)",
        period: "in progress",
        bullets: [
          "14-week program on supervised ML, model evaluation and feature engineering.",
          "Home Credit Default Risk competition: credit default model evaluated by AUC-ROC.",
          "Final project: churn model and retention proposal for a telecom operator.",
        ],
      },
      {
        title: "B.Eng. Computer Engineering",
        org: "University of Brasília (UnB)",
        period: "2023 — 2028 (expected)",
        bullets: [],
      },
      {
        title: "CS50 — Introduction to Computer Science",
        org: "Harvard (online)",
        href: "https://cs50.harvard.edu/x/",
        period: "2025",
        bullets: [],
      },
    ] as Entry[],
    projects: [
      {
        title: "Job Radar",
        stack: "Python · Claude API · GitHub Actions",
        year: "2026",
        description:
          "LLM-based opportunity triage: collects internship and public-sector job postings and uses the Claude API to score and justify each one. Runs weekly on GitHub Actions and emails a prioritized report every Monday.",
      },
      {
        title: "Electrum Observatory",
        stack: "Python · scikit-learn · Jupyter",
        description:
          "Research on the Electrum (Bitcoin) server ecosystem: a scanning and behavioral-fingerprinting pipeline, with metadata clustering to identify recurring operators and measure network centralization.",
        href: "https://gabrielcaixeta01.github.io/electrum-observatory/",
        github: "https://github.com/gabrielcaixeta01/electrum-observatory",
      },
      {
        title: "Home Credit Default Risk",
        stack: "Python · pandas · scikit-learn",
        year: "2026",
        description:
          "GCI World competition: credit default risk model with feature engineering over tabular credit data, evaluated by AUC-ROC.",
      },
    ] as Project[],
    skills: [
      { label: "Languages", items: ["Python", "C++", "SQL", "TypeScript"] },
      {
        label: "Data & ML",
        items: ["scikit-learn", "pandas", "NumPy", "Matplotlib", "Jupyter", "Power BI"],
      },
      {
        label: "Generative AI",
        items: ["Claude API", "Claude Code", "ChatGPT", "Gemini"],
      },
      { label: "Web & tools", items: ["React", "Next.js", "Git", "Power Apps"] },
      { label: "Languages spoken", items: ["Portuguese (native)", "English (fluent, C1)"] },
    ],
    footer: "Built with Next.js · hosted on GitHub Pages",
  },
};

type Language = keyof typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.pt;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt");
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
