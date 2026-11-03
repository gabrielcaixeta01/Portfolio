import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Gabriel Caixeta — Machine Learning & Dados",
  description:
    "Gabriel Caixeta, estudante de Engenharia de Computação na UnB com foco em machine learning, dados e automação com LLMs.",
  openGraph: {
    title: "Gabriel Caixeta — Machine Learning & Dados",
    description:
      "Machine learning, dados e automação com LLMs. Experiência, formação e projetos de Gabriel Caixeta.",
    url: "https://gabrielcaixeta01.github.io/Portfolio/",
    siteName: "Gabriel Caixeta",
    images: [
      {
        url: "https://gabrielcaixeta01.github.io/Portfolio/og.png",
        width: 1200,
        height: 630,
        alt: "Gabriel Caixeta — Machine Learning & Dados",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Caixeta — Machine Learning & Dados",
    description: "Machine learning, dados e automação com LLMs.",
    images: ["https://gabrielcaixeta01.github.io/Portfolio/og.png"],
  },
  metadataBase: new URL("https://gabrielcaixeta01.github.io/Portfolio/"),
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gabriel Caixeta Romero",
  jobTitle: "Computer Engineering Student — Machine Learning & Data",
  url: "https://gabrielcaixeta01.github.io/Portfolio/",
  sameAs: [
    "https://github.com/gabrielcaixeta01",
    "https://www.linkedin.com/in/gabriel-caixeta-romero",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidade de Brasília",
  },
};

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={inter.variable} suppressHydrationWarning>
      <body className="font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
