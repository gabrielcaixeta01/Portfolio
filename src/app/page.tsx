'use client';
import React from 'react';

export default function Home() {
  return (
    <div className="w-screen font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white text-black dark:bg-gray-900 dark:text-white">
      <main className="flex flex-col gap-[64px] row-start-2 w-full max-w-4xl justify-center">
        {/* Seção: Sobre Mim */}
        <section id="sobre" className="scroll-mt-24">
          <h1 className="text-3xl font-bold mb-2">Sobre mim</h1>
          <p className="text-lg">
            Olá! Sou Gabriel, estudante de Engenharia de Computação na UnB, apaixonado por desenvolvimento web e inteligência artificial.
          </p>
        </section>

        {/* Seção: Projetos */}
        <section id="projetos" className="scroll-mt-24">
          <h1 className="text-3xl font-bold mb-2">Projetos</h1>
          <p className="text-lg">
            Aqui estão alguns dos projetos que desenvolvi com tecnologias como Next.js, NestJS, Python e VHDL.
          </p>
        </section>

        {/* Seção: Conhecimentos */}
        <section id="conhecimentos" className="scroll-mt-24">
          <h1 className="text-3xl font-bold mb-2">Conhecimentos</h1>
          <p className="text-lg">
            Tenho experiência com React, Next.js, Tailwind, Node.js, Python, C++, VHDL e Machine Learning.
          </p>
        </section>

        {/* Seção: Contato */}
        <section id="contato" className="scroll-mt-24">
          <h1 className="text-3xl font-bold mb-2">Contato</h1>
          <p className="text-lg">
            Você pode entrar em contato comigo pelo LinkedIn ou GitHub, ou enviar um e-mail para gabrielcaixetahomero.com.
          </p>
        </section>
      </main>
    </div>
  );
}