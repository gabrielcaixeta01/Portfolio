import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full mt-8 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-between">
        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} Gabriel Caixeta
        </p>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/gabrielcaixeta01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="
              w-8 h-8 rounded-full
              border border-white/[0.08]
              flex items-center justify-center
              text-zinc-400
              hover:text-zinc-100 hover:border-white/20
              transition-all duration-200
            "
          >
            <FaGithub size={14} />
          </a>
          <a
            href="https://linkedin.com/in/gabriel-caixeta-romero"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="
              w-8 h-8 rounded-full
              border border-white/[0.08]
              flex items-center justify-center
              text-zinc-400
              hover:text-[#0A66C2] hover:border-[#0A66C2]/30
              transition-all duration-200
            "
          >
            <FaLinkedin size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
