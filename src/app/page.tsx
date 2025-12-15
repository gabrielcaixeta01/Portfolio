"use client";
import React from "react";
import Hero from "@/components/sections/Hero";
import SobreMim from "@/components/sections/SobreMim";
import Projetos from "@/components/sections/Projetos";
import Conhecimentos from "@/components/sections/Conhecimentos";
import Contato from "@/components/sections/Contato";
import TimeLine from "@/components/sections/TimeLine";

export default function Home() {
  return (
    <div className="w-full min-h-screen font-sans">
      <Hero />
      <main className="container mx-auto px-4 sm:px-6 pt-32 flex flex-col gap-32 sm:gap-24">
        <SobreMim />
        <TimeLine />
        <Projetos />
        <Conhecimentos />
        <Contato />
      </main>
    </div>
  );
}
