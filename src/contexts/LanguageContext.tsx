"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define all translations for the entire portfolio
const translations = {
  pt: {
    // Navbar
    navbar: {
      about: "Sobre Mim",
      projects: "Projetos",
      skills: "Conhecimentos",
      contact: "Contato",
      portuguese: "Português",
      english: "English",
    },
    // About Section
    about: {
      title: "Sobre mim",
      paragraph1:
        "Olá! Sou Gabriel, estudante de Engenharia de Computação na Universidade de Brasília (UnB). Tenho grande interesse por tecnologia, com foco em desenvolvimento web full stack e inteligência artificial.",
      paragraph2:
        "Ao longo da minha jornada acadêmica e profissional, busquei combinar habilidades técnicas com criatividade, contribuindo para soluções eficientes, intuitivas e modernas.",
      paragraph3:
        "Atualmente, estou aprofundando meus conhecimentos em frameworks como Next.js e NestJS, além de explorar áreas como aprendizado de máquina e sistemas embarcados. Acredito no poder da tecnologia para transformar o mundo, e estou sempre em busca de novos desafios e oportunidades de aprendizado.",
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
          experience: 2.5,
          maxExperience: 3,
        },
        {
          name: "TypeScript",
          description:
            "Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenibilidade do código.",
          experience: 2,
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
          experience: 2,
          maxExperience: 3,
        },
        {
          name: "NestJS",
          description:
            "Framework Node.js progressivo para construir aplicações server-side eficientes e escaláveis com TypeScript.",
          experience: 1.5,
          maxExperience: 3,
        },
        {
          name: "Python",
          description:
            "Linguagem versátil usada para desenvolvimento web, análise de dados, machine learning e automação.",
          experience: 2.5,
          maxExperience: 3,
        },
        {
          name: "Git",
          description:
            "Sistema de controle de versão distribuído essencial para colaboração em projetos de desenvolvimento.",
          experience: 3,
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
    },
  },
  en: {
    // Navbar
    navbar: {
      about: "About Me",
      projects: "Projects",
      skills: "Skills",
      contact: "Contact",
      portuguese: "Português",
      english: "English",
    },
    // About Section
    about: {
      title: "About me",
      paragraph1:
        "Hello! I'm Gabriel, a Computer Engineering student at the University of Brasília (UnB). I have great interest in technology, with a focus on full stack web development and artificial intelligence.",
      paragraph2:
        "Throughout my academic and professional journey, I have sought to combine technical skills with creativity, contributing to efficient, intuitive and modern solutions.",
      paragraph3:
        "Currently, I am deepening my knowledge in frameworks like Next.js and NestJS, in addition to exploring areas like machine learning and embedded systems. I believe in the power of technology to transform the world, and I am always looking for new challenges and learning opportunities.",
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
          experience: 2.5,
          maxExperience: 3,
        },
        {
          name: "TypeScript",
          description:
            "JavaScript superset that adds static typing, improving code robustness and maintainability.",
          experience: 2,
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
          experience: 2,
          maxExperience: 3,
        },
        {
          name: "NestJS",
          description:
            "Progressive Node.js framework for building efficient and scalable server-side applications with TypeScript.",
          experience: 1.5,
          maxExperience: 3,
        },
        {
          name: "Python",
          description:
            "Versatile language used for web development, data analysis, machine learning and automation.",
          experience: 2.5,
          maxExperience: 3,
        },
        {
          name: "Git",
          description:
            "Distributed version control system essential for collaboration in development projects.",
          experience: 3,
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
