/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer className="w-full border-t border-[var(--pc-border)] bg-[var(--pc-bg)] backdrop-blur-sm mt-16">
      <div className="w-full text-center mx-auto px-4 sm:px-6 py-10 sm:py-12">
          <p className="text-xs text-[var(--cc-text)] opacity-45">
            © {new Date().getFullYear()} Gabriel Caixeta.{" "}
            {language === "pt" ? "Todos os direitos reservados." : "All rights reserved."}
          </p>
      </div>
    </footer>
  );
}
