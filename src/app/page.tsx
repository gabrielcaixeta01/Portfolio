'use client';
import React from 'react';

export default function Home() {
 

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white text-black dark:bg-gray-900 dark:text-white">
      

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to My Portfolio</h1>
        <p className="text-lg">This is a showcase of my work and skills.</p>
      </main>
    </div>
  );
}