import Image from 'next/image';

export function Intro() {
  return (
    <section
      id="intro"
      aria-labelledby="intro-title"
      className="flex min-h-dvh items-center bg-surface text-on-surface"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
          <Image
            src="/img/bruno-nardini-matrix.png"
            alt="Bruno Nardini"
            width={1254}
            height={1254}
            className="w-full rounded-md"
            sizes="(max-width: 768px) 100vw, 36rem"
          />
          <div>
            <h2
              id="intro-title"
              className="md-typescale-headline-large text-pretty text-on-surface"
            >
              Olá, eu sou o Nardini
            </h2>
            <p className="md-typescale-body-large mt-4 text-pretty text-on-surface">
              A mudança é inerente à carreira que escolhemos. Engenharia de
              software é uma área movida por inovação, e isso significa passar
              boa parte do tempo aprendendo, questionando o que já sabemos e,
              muitas vezes, nos sentindo novamente como iniciantes diante de
              algo pouco familiar.
              <br />
              <br />
              Este blog é uma das formas que encontrei de organizar meus
              aprendizados, compartilhar experiências e trocar conhecimento
              sobre os desafios que encontro pelo caminho.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
