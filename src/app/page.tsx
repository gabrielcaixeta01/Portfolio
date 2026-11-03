"use client";

import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUpRight, FiMail } from "react-icons/fi";
import { useLanguage, type Entry, type Project } from "@/contexts/LanguageContext";
import { asset } from "@/lib/asset";

const SECTIONS = ["about", "experience", "education", "projects", "skills"] as const;
type SectionId = (typeof SECTIONS)[number];

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/gabrielcaixeta01", icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gabriel-caixeta-romero", icon: FaLinkedin },
  { label: "E-mail", href: "mailto:gabrielcaixetaromero@gmail.com", icon: FiMail },
];

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("about");
  useEffect(() => {
    // Active = last section whose top has crossed 35% of the viewport.
    // At the very bottom of the page the last section wins, even if it's
    // too short to ever reach that line.
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setActive(SECTIONS[SECTIONS.length - 1]);

      const line = window.innerHeight * 0.35;
      let current: SectionId = SECTIONS[0];
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return active;
}

function Section({ id, title, children }: { id: SectionId; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-label={title} className="mb-20 scroll-mt-16 lg:mb-28 lg:scroll-mt-24">
      <h2 className="sticky top-0 z-10 -mx-6 mb-6 bg-[var(--background)]/80 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-[var(--heading)] backdrop-blur lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0 lg:mb-8 lg:backdrop-blur-none">
        {title}
      </h2>
      {children}
    </section>
  );
}

function OrgName({ entry }: { entry: Entry }) {
  if (!entry.href) return <>{entry.org}</>;
  return (
    <a href={entry.href} target="_blank" rel="noopener noreferrer" className="link">
      {entry.org}
    </a>
  );
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ol className="space-y-10">
      {entries.map((e) => (
        <li key={e.title} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
          <p className="pt-0.5 font-mono text-xs uppercase tracking-wide text-[var(--muted)]">{e.period}</p>
          <div>
            <h3 className="font-medium text-[var(--heading)]">
              {e.title} <span className="text-[var(--muted)]">·</span> <OrgName entry={e} />
            </h3>
            {e.bullets.length > 0 && (
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed">
                {e.bullets.map((b) => (
                  <li key={b} className="relative pl-4 before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]">
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function ProjectItem({ p }: { p: Project }) {
  const main = p.href ?? p.github;
  return (
    <li className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <p className="pt-0.5 font-mono text-xs uppercase tracking-wide text-[var(--muted)]">{p.year ?? ""}</p>
      <div>
        <h3 className="font-medium text-[var(--heading)]">
          {main ? (
            <a href={main} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1">
              {p.title}
              <FiArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
          ) : (
            p.title
          )}
        </h3>
        <p className="mt-1 text-sm leading-relaxed">{p.description}</p>
        <p className="mt-2 font-mono text-xs text-[var(--accent)]">{p.stack}</p>
        {p.github && p.href && (
          <a href={p.github} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-flex items-center gap-1.5 text-xs">
            <FaGithub aria-hidden /> GitHub
          </a>
        )}
      </div>
    </li>
  );
}

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const active = useActiveSection();

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-16 lg:px-16">
      {/* Sidebar */}
      <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--heading)] sm:text-5xl">
            Gabriel Caixeta
          </h1>
          <p className="mt-3 text-lg font-medium text-[var(--heading)]">{t.role}</p>
          <p className="mt-4 max-w-xs leading-relaxed">{t.tagline}</p>

          <nav aria-label="Seções" className="mt-14 hidden lg:block">
            <ul className="space-y-3">
              {SECTIONS.map((id) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a href={`#${id}`} className="group flex items-center gap-4 py-1">
                      <span
                        className={`h-px transition-all duration-200 ${
                          isActive ? "w-16 bg-[var(--heading)]" : "w-8 bg-[var(--muted)] group-hover:w-16 group-hover:bg-[var(--heading)]"
                        }`}
                      />
                      <span
                        className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                          isActive ? "text-[var(--heading)]" : "text-[var(--muted)] group-hover:text-[var(--heading)]"
                        }`}
                      >
                        {t.nav[id]}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Photo fills the free space between nav and socials on desktop */}
        <div className="mt-8 lg:my-10 lg:flex lg:min-h-0 lg:flex-1 lg:items-center lg:justify-start">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, image pre-resized */}
          <img
            src={asset("/gabriel-sm.jpg")}
            alt="Gabriel Caixeta"
            width={256}
            height={256}
            className="aspect-square h-40 w-40 rounded-2xl border border-[var(--border)] object-cover lg:h-full lg:max-h-64 lg:w-auto"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-5 lg:mt-0">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="text-[var(--muted)] transition-colors hover:text-[var(--heading)]"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <a
            href={asset("/cv.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="link inline-flex items-center gap-1 text-sm font-medium"
          >
            {t.resume}
            <FiArrowUpRight aria-hidden className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="rounded border border-[var(--border)] px-2 py-1 font-mono text-xs text-[var(--muted)] transition-colors hover:border-[var(--muted)] hover:text-[var(--heading)]"
          >
            {language === "pt" ? "EN" : "PT"}
            <span className="sr-only"> — {t.switchLang}</span>
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="pt-16 lg:w-[58%] lg:py-24">
        <Section id="about" title={t.nav.about}>
          <div className="space-y-4 leading-relaxed">
            {t.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Section>

        <Section id="experience" title={t.nav.experience}>
          <EntryList entries={t.experience} />
        </Section>

        <Section id="education" title={t.nav.education}>
          <EntryList entries={t.education} />
        </Section>

        <Section id="projects" title={t.nav.projects}>
          <ol className="space-y-10">
            {t.projects.map((p) => (
              <ProjectItem key={p.title} p={p} />
            ))}
          </ol>
        </Section>

        <Section id="skills" title={t.nav.skills}>
          <dl className="space-y-5">
            {t.skills.map((s) => (
              <div key={s.label} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-mono text-xs uppercase tracking-wide text-[var(--muted)] sm:pt-0.5">{s.label}</dt>
                <dd className="text-sm">{s.items.join(" · ")}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <footer className="pb-16 text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Gabriel Caixeta Romero · {t.footer}
        </footer>
      </main>
    </div>
  );
}
