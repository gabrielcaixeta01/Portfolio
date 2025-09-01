"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define all translations for the entire portfolio
const translations = {
  pt: {
    // Navbar
    navbar: {
      home: "Início",
      about: "Sobre",
      projects: "Projetos",
      skills: "Conhecimentos",
      contact: "Contato",
      portuguese: "Português",
      english: "English",
    },
    // About Section
    about: {
      title: "Sobre",
      paragraph1:
        "Sou Gabriel, estudante de Engenharia de Computação na Universidade de Brasília (UnB) com sólida experiência em desenvolvimento full stack. Especializo-me na criação de aplicações web modernas usando Next.js, NestJS, TypeScript, Tailwind CSS, PostgreSQL e Prisma, complementado por ampla experiência em Python e Machine Learning.",
      paragraph2:
        "Meu foco está em criar aplicações performáticas, escaláveis e de fácil uso que resolvem problemas do mundo real. Combino precisão técnica com arquitetura limpa para entregar soluções robustas e de fácil manutenção.",
      paragraph3:
        "Atualmente expandindo meus conhecimentos em IA e sistemas embarcados, estou sempre buscando novos desafios que ampliem os limites da tecnologia. Vamos nos conectar e explorar como podemos colaborar em projetos empolgantes juntos.",
    },
    // Projects Section
    projects: {
      title: "Projetos",
      description:
        "Aqui estão alguns dos projetos que desenvolvi, aplicando tecnologias modernas e boas práticas de engenharia de software:",
      smartTicker: {
        title: "Smart Ticker",
        description:
          "Plataforma de previsão de ações com modelo Random Forest e análise de sentimento de notícias, integrando Next.js e Python.",
      },
      agendaUnb: {
        title: "Agenda Acadêmica UnB",
        description:
          "Organizador visual de grades horárias com Tailwind CSS, upload de imagem e extração automática das matérias.",
      },
      contaPalavras: {
        title: "Conta Palavras",
        description:
          "Aplicação de linha de comando (CLI) em C++ orientada a testes com Catch2, criada para a disciplina de Técnicas de Programação.",
      },
      marketplace: {
        title: "Marketplace Odontológico",
        description:
          "Projeto em desenvolvimento voltado para venda rápida e segura de produtos odontológicos, com foco na experiência do usuário.",
      },
      fipePredictor: {
        title: "Preditor Tabela FIPE",
        description:
          "Preditor de preços de carros usando dados da Tabela FIPE, com modelos de regressão linear e MLP treinados em Python (Jupyter).",
      },
    },
    // Skills Section
    skills: {
      title: "Conhecimentos",
      description:
        "Tenho sólida experiência nas principais tecnologias de desenvolvimento web, além de uma base forte em algoritmos e sistemas digitais.",
      skillsData: [
        {
          name: "React",
          description:
            "Uma biblioteca JavaScript para criar interfaces de usuário interativas e reativas, com foco em componentes reutilizáveis.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "Next.js",
          description:
            "Framework React para produção que oferece renderização híbrida, roteamento automático e otimizações de performance.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "TypeScript",
          description:
            "Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenibilidade do código.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "Tailwind CSS",
          description:
            "Framework CSS utilitário que permite criar designs personalizados rapidamente usando classes pré-definidas.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "Node.js",
          description:
            "Runtime JavaScript que permite executar código JavaScript no servidor, ideal para APIs e aplicações backend.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "NestJS",
          description:
            "Framework Node.js progressivo para construir aplicações server-side eficientes e escaláveis com TypeScript.",
          experience: 2,
          maxExperience: 3,
        },
        {
          name: "Python",
          description:
            "Linguagem versátil usada para desenvolvimento web, análise de dados, machine learning e automação.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "Git",
          description:
            "Sistema de controle de versão distribuído essencial para colaboração em projetos de desenvolvimento.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "C++",
          description:
            "Linguagem de programação para algoritmos, estruturas de dados e soluções de alto desempenho.",
          experience: 1.5,
          maxExperience: 3,
        },
        {
          name: "Jupyter",
          description:
            "Ambiente interativo para prototipagem e análise exploratória de dados com notebooks.",
          experience: 1,
          maxExperience: 3,
        },
        {
          name: "Google Colab",
          description:
            "Plataforma de notebooks em nuvem para machine learning com acesso a GPU facilitado.",
          experience: 1,
          maxExperience: 3,
        },
        {
          name: "Figma",
          description:
            "Ferramenta de design de interfaces, prototipagem colaborativa e handoff para desenvolvimento.",
          experience: 2.5,
          maxExperience: 3,
        },
      ],
      frontend: "Front-end:",
      frontendSkills: "React, Next.js, Tailwind CSS, TypeScript",
      backend: "Back-end:",
      backendSkills: "Node.js, NestJS, REST APIs",
      machineLearning: "Machine Learning:",
      mlSkills:
        "Python (scikit-learn, pandas, matplotlib), Random Forest, regressão linear e MLP",
      others: "Outros:",
      otherSkills: "Git, GitHub, VHDL, C++, testes automatizados, Figma",
      conclusion:
        "Estou constantemente estudando para me manter atualizado com o mercado e as inovações da área.",
      experienceLabel: "Experiência",
      yearsLabel: "anos",
      pauseLabel: "Pausar",
      playLabel: "Reproduzir",
    },
    // Contact Section
    contact: {
      title: "Contato",
      description:
        "Ficarei feliz em conversar com você sobre oportunidades, ideias ou qualquer projeto interessante. Sinta-se à vontade para entrar em contato pelas redes abaixo ou por e-mail.",
      linkedin: "LinkedIn:",
      github: "GitHub:",
      email: "E-mail:",
      copy: "Copiar",
    },
  },
  en: {
    // Navbar
    navbar: {
      home: "Home",
      about: "About",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      portuguese: "Português",
      english: "English",
    },
    // About Section
    about: {
      title: "About",
      paragraph1:
        "I'm Gabriel, a Computer Engineering student at the University of Brasília (UnB) with strong expertise in full stack development. I specialize in building modern web applications using Next.js, NestJS, TypeScript, Tailwind CSS, PostgreSQL, and Prisma, complemented by extensive experience in Python and Machine Learning.",
      paragraph2:
        "My focus is on creating performant, scalable, and user-friendly applications that solve real-world problems. I combine technical precision with clean architecture to deliver solutions that are both robust and maintainable.",
      paragraph3:
        "Currently expanding my knowledge in AI and embedded systems, I'm always seeking new challenges that push the boundaries of technology. Let's connect and explore how we can collaborate on exciting projects together.",
    },
    // Projects Section
    projects: {
      title: "Projects",
      description:
        "Here are some of the projects I've developed, applying modern technologies and software engineering best practices:",
      smartTicker: {
        title: "Smart Ticker",
        description:
          "Stock prediction platform with Random Forest model and news sentiment analysis, integrating Next.js and Python.",
      },
      agendaUnb: {
        title: "UnB Academic Agenda",
        description:
          "Visual schedule organizer with Tailwind CSS, image upload and automatic subject extraction.",
      },
      contaPalavras: {
        title: "Word Counter",
        description:
          "Command line interface (CLI) application in C++ test-oriented with Catch2, created for the Programming Techniques course.",
      },
      marketplace: {
        title: "Dental Marketplace",
        description:
          "Project in development focused on fast and secure sales of dental products, with focus on user experience.",
      },
      fipePredictor: {
        title: "FIPE Table Predictor",
        description:
          "Car price predictor using FIPE Table data, with linear regression and MLP models trained in Python (Jupyter).",
      },
    },
    // Skills Section
    skills: {
      title: "Skills",
      description:
        "I have solid experience in the main web development technologies, in addition to a strong foundation in algorithms and digital systems.",
      skillsData: [
        {
          name: "React",
          description:
            "A JavaScript library for building interactive and reactive user interfaces, focusing on reusable components.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "Next.js",
          description:
            "React framework for production that offers hybrid rendering, automatic routing and performance optimizations.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "TypeScript",
          description:
            "JavaScript superset that adds static typing, improving code robustness and maintainability.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "Tailwind CSS",
          description:
            "Utility-first CSS framework that allows creating custom designs quickly using predefined classes.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "Node.js",
          description:
            "JavaScript runtime that allows executing JavaScript code on the server, ideal for APIs and backend applications.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "NestJS",
          description:
            "Progressive Node.js framework for building efficient and scalable server-side applications with TypeScript.",
          experience: 2,
          maxExperience: 3,
        },
        {
          name: "Python",
          description:
            "Versatile language used for web development, data analysis, machine learning and automation.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "Git",
          description:
            "Distributed version control system essential for collaboration in development projects.",
          experience: 3,
          maxExperience: 3,
        },
        {
          name: "C++",
          description:
            "Programming language for algorithms, data structures and high-performance solutions.",
          experience: 1.5,
          maxExperience: 3,
        },
        {
          name: "Jupyter",
          description:
            "Interactive environment for prototyping and exploratory data analysis with notebooks.",
          experience: 1,
          maxExperience: 3,
        },
        {
          name: "Google Colab",
          description:
            "Cloud notebook platform for machine learning with easy GPU access.",
          experience: 1,
          maxExperience: 3,
        },
        {
          name: "Figma",
          description:
            "Interface design tool, collaborative prototyping and development handoff.",
          experience: 2.5,
          maxExperience: 3,
        },
      ],
      frontend: "Front-end:",
      frontendSkills: "React, Next.js, Tailwind CSS, TypeScript",
      backend: "Back-end:",
      backendSkills: "Node.js, NestJS, REST APIs",
      machineLearning: "Machine Learning:",
      mlSkills:
        "Python (scikit-learn, pandas, matplotlib), Random Forest, linear regression and MLP",
      others: "Others:",
      otherSkills: "Git, GitHub, VHDL, C++, automated testing, Figma",
      conclusion:
        "I am constantly studying to stay updated with the market and innovations in the field.",
      experienceLabel: "Experience",
      yearsLabel: "years",
      pauseLabel: "Pause",
      playLabel: "Play",
    },
    // Contact Section
    contact: {
      title: "Contact",
      description:
        "I'll be happy to talk with you about opportunities, ideas or any interesting project. Feel free to get in touch through the networks below or by email.",
      linkedin: "LinkedIn:",
      github: "GitHub:",
      email: "Email:",
      copy: "Copy",
    },
  },
};

// Context types
interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: typeof translations.pt;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("pt");

  const t = translations[language as keyof typeof translations];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
