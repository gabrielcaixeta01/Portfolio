export default function Projetos() {
  return (
    <section id="projetos" className="scroll-mt-24 text-center max-w-4xl">
      <h2 className="text-4xl font-bold mb-4">Projetos</h2>
      <p className="text-lg leading-relaxed mb-4">
        Aqui estão alguns dos projetos que desenvolvi, aplicando tecnologias modernas e boas práticas de engenharia de software:
      </p>
      <ul className="text-left list-disc list-inside text-lg space-y-2">
        <li>
          <strong>Smart Ticker</strong> — Plataforma de previsão de ações com Random Forest e análise de notícias, 
          integrando Next.js + Python.
        </li>
        <li>
          <strong>Agenda Acadêmica UnB</strong> — Organizador visual de grades horárias com Tailwind e upload de imagem para extração automática.
        </li>
        <li>
          <strong>Conta Palavras</strong> — CLI em C++ orientado a testes com Catch2, desenvolvido para disciplina de técnicas de programação.
        </li>
        <li>
          <strong>Marketplace Odontológico</strong> — Projeto em andamento focado na venda rápida e segura de produtos para dentistas.
        </li>
      </ul>
    </section>
  );
}