"use client";
import Hero from "@/components/sections/Hero";
import SobreMim from "@/components/sections/SobreMim";
import Projetos from "@/components/sections/Projetos";
import Conhecimentos from "@/components/sections/Conhecimentos";
import Contato from "@/components/sections/Contato";
import Trajetoria from "@/components/sections/Trajetoria";
import Footer from "@/components/Footer";
import CircularScramble from "@/components/CircularScramble";

export default function Home() {
  return (
    <div className="w-full min-h-screen font-sans">
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 pt-20 flex flex-col gap-20 sm:gap-16">
        <SobreMim />
        <Trajetoria />
        <Projetos />
      </main>

      {/* Circular scramble interlude — between Projetos and Conhecimentos */}
      <CircularScramble />

      <main className="container mx-auto px-4 sm:px-6 flex flex-col gap-20 sm:gap-16">
        <Conhecimentos />
        <Contato />
      </main>
      <Footer />
    </div>
  );
}
