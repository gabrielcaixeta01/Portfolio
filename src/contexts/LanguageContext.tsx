"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Timeline Event Interface
interface TimelineItem {
  title: string;
  subtitle?: string;
  description: string;
  type?: "education" | "work" | "achievement" | "other";
}

interface TimelineYear {
  year: string;
  events: TimelineItem[];
}

// Define all translations for the entire portfolio
const translations = {
  pt: {
    // Navbar
    navbar: {
      home: "Início",
      about: "Sobre",
      timeline: "Linha do Tempo",
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
        "Sou Gabriel, estudante de Engenharia de Computação na Universidade de Brasília (UnB) e desenvolvedor com foco na construção de aplicações modernas, performáticas e centradas no usuário. Atuo principalmente no desenvolvimento front-end com Next.js, TypeScript e Tailwind CSS, priorizando usabilidade, arquitetura de componentes e experiência do usuário.",
      paragraph2:
        "Possuo também experiência em desenvolvimento full stack, utilizando NestJS, PostgreSQL e Prisma, o que me permite desenvolver aplicações completas, escaláveis e bem integradas. Busco entregar soluções bem estruturadas, de fácil manutenção e alinhadas às necessidades reais dos usuários.",
    },
    // Projects Section
    projects: {
      title: "Projetos",
      description:
        "Aqui estão alguns dos projetos que desenvolvi, aplicando tecnologias modernas e boas práticas de engenharia de software:",
      
      electrumSite: {
        title: "Observatório Electrum",
        description:
          "Um projeto de pesquisa que analisa o ecossistema de servidores Electrum por meio de varredura de rede, fingerprinting comportamental e clustering de metadados.",
        image: "/electrum.png",
      },
      giogas: {
        title: "Site GIOGÁS",
        description:
          "Site institucional para a GIOGÁS, empresa do Rio de Janeiro.",
        image: "/giogas.png",
      },
      kodo: {
        title: "Kodo",
        description:
          "App PWA de gerenciamento de tarefas com foco em produtividade, utilizando Next.js, Tailwind CSS e Supabase para armazenamento dos dados.",
        image: "/kodo.png",
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
    // Timeline Section
    timeline: {
      title: "Minha Jornada",
      description: "Uma linha do tempo com os principais marcos da minha trajetória acadêmica e profissional.",
      years: [
        {
          year: "2025",
          events: [
            {
              title: "TJDFT",
              subtitle: "Estágio em TI",
              description: "Capacitação nas ferramentas do PowerApps e desenvolvimento de painéis PowerBI.",
              type: "work" as const,
            },
            {
              title: "Site para GIOGÁS",
              subtitle: "Projeto Freelancer",
              description: "Desenvolvimento do site institucional da GIOGÁS, empresa sediada no Rio de Janeiro.",
              type: "work" as const,
            },
            {
              title: "Bitcoin Dev Launchpad — Vinteum",
              subtitle: "Capacitação em Desenvolvimento Bitcoin",
              description: "Coleção de desafios práticos criados para desenvolvedores brasileiros que querem aprender na prática sobre Bitcoin.",
              type: "achievement" as const,
            },
            {
              title: "Cryptocurrency Design and Engeneering",
              subtitle: "Parceria MIT & UnB",
              description: "Matéria desenvolvida em uma parceria entre o MIT e a UnB, focada em design e engenharia do sistemas Bitcoin.",
              type: "education" as const,
            },
            {
              title: "CS50 – Introdução à Ciência da Computação de Harvard",
              subtitle: "Certificação Online",
              description: "Conclusão do curso introdutório de ciência da computação de Harvard, abrangendo algoritmos, estruturas de dados, segurança e desenvolvimento web.",
              type: "achievement" as const,
            },
          ],
        },
        {
          year: "2024",
          events: [
            {
              title: "Desenvolvedor Full Stack",
              subtitle: "Empresa Júnior de Computação (CJR)",
              description: "Capacitação em aplicações web, desde de a prototipação com Figma até o desenvolvimento utilizando Next.js, NestJS e Tailwind CSS.",
              type: "work" as const,
            },
          ],
        },
        {
          year: "2023",
          events: [
            {
              title: "Ingresso em Engenharia de Computação",
              subtitle: "Universidade de Brasília (UnB)",
              description: "Início da graduação em Engenharia de Computação, com foco em desenvolvimento de software e sistemas digitais.",
              type: "education" as const,
            },
          ],
        },
      ] as TimelineYear[],
    },
  },
  en: {
    // Navbar
    navbar: {
      home: "Home",
      about: "About",
      timeline: "Timeline",
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
        "I'm Gabriel, a Computer Engineering student at the University of Brasília (UnB) and a developer focused on building modern, high-performance, user-centered applications. I primarily work in front-end development with Next.js, TypeScript, and Tailwind CSS, prioritizing usability, component architecture, and user experience.",
      paragraph2:
        "I also have experience in full stack development, using NestJS, PostgreSQL, and Prisma, which allows me to develop complete, scalable, and well-integrated applications. I aim to deliver well-structured solutions, easy to maintain and aligned with real user needs.",
    },
    // Projects Section
    projects: {
      title: "Projects",
      description:
        "Here are some of the projects I've developed, applying modern technologies and software engineering best practices:",
      
      electrumSite: {
        title: "Electrum Observatory",
        description:
          "A research project analyzing the Electrum server ecosystem through network scanning, behavioral fingerprinting, and metadata clustering.",
        image: "/electrum.png",
      },
      giogas: {
        title: "GIOGÁS Website",
        description:
          "Institutional website for GIOGÁS, a company based in Rio de Janeiro.",
        image: "/giogas.png",
      },
      kodo: {
        title: "Kodo",
        description:
          "PWA task management app focused on productivity, using Next.js, Tailwind CSS, and Supabase for data storage.",
        image: "/kodo.png",
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
    // Timeline Section
    timeline: {
      title: "My Journey",
      description: "A timeline with the main milestones of my academic and professional journey.",
      years: [
        {
          year: "2025",
          events: [
            {
              title: "TJDFT",
              subtitle: "IT Internship",
              description: "Training in PowerApps tools and PowerBI dashboard development.",
              type: "work" as const,
            },
            {
              title: "Website for GIOGÁS",
              subtitle: "Freelance Project",
              description: "Development of the institutional website for GIOGÁS, a company based in Rio de Janeiro.",
              type: "work" as const,
            },
            {
              title: "Bitcoin Dev Launchpad — Vinteum",
              subtitle: "Bitcoin Development Training",
              description: "A collection of practical challenges created for Brazilian developers who want to learn about Bitcoin in practice.",
              type: "achievement" as const,
            },
            {
              title: "Cryptocurrency Design and Engineering",
              subtitle: "MIT & UnB Partnership",
              description: "Course developed in partnership between MIT and UnB, focused on design and engineering of Bitcoin systems.",
              type: "education" as const,
            },
            {
              title: "CS50 – Introduction to Computer Science from Harvard",
              subtitle: "Online Certification",
              description: "Completion of Harvard's introductory computer science course, covering algorithms, data structures, security and web development.",
              type: "achievement" as const,
            },
          ],
        },
        {
          year: "2024",
          events: [
            {
              title: "Full Stack Developer",
              subtitle: "Junior Computing Company (CJR)",
              description: "Training in web applications, from prototyping with Figma to development using Next.js, NestJS and Tailwind CSS.",
              type: "work" as const,
            },
          ],
        },
        {
          year: "2023",
          events: [
            {
              title: "Computer Engineering Enrollment",
              subtitle: "University of Brasília (UnB)",
              description: "Started undergraduate studies in Computer Engineering, focusing on software development and digital systems.",
              type: "education" as const,
            },
          ],
        },
      ] as TimelineYear[],
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
