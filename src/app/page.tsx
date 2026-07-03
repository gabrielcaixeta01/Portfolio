"use client";
import Hero from "@/components/sections/Hero";
import SobreMim from "@/components/sections/SobreMim";
import RedeProjetos from "@/components/sections/RedeProjetos";
import Conhecimentos from "@/components/sections/Conhecimentos";
import Contato from "@/components/sections/Contato";
import Trajetoria from "@/components/sections/Trajetoria";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full min-h-screen font-sans">
      <Hero />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col gap-20 sm:gap-16">
          <SobreMim />
          <Trajetoria />
        </div>

        {/* full-bleed 3D network — the projects section */}
        <RedeProjetos />

        <div className="container mx-auto px-4 sm:px-6 flex flex-col gap-20 sm:gap-16">
          <Conhecimentos />
          <Contato />
        </div>
      </main>
      <Footer />
    </div>
  );
}
