import { Container } from "@/components/blocks/container";

export default function Notes() {
  return (
    <Container className="mt-16">
      <div className="max-w-3xl">
        <h1 className="tracking-tight text-5xl">Colophon</h1>
        <div className="pro text-muted-foreground text-balance">
          <p className="mt-2">The website deets.</p>
        </div>

        <div className="mt-12 pro">
          <h2 className="text-3xl">Typefaces</h2>
          <ul className="mt-4">
            <li>
              <a
                target="_blank"
                href="https://fonts.google.com/specimen/Lexend"
                rel="noreferrer"
              >
                Lexend
              </a>{" "}
              by Bonnie Shaver-Troup, Thomas Jockin, Santiago Orozco, Héctor
              Gómez, Superunion
            </li>
            <li>
              <a
                target="_blank"
                href="https://vercel.com/font"
                rel="noreferrer"
              >
                Geist Sans
              </a>{" "}
              by Vercel
            </li>
            <li>
              <a
                target="_blank"
                href="https://vercel.com/font"
                rel="noreferrer"
              >
                Geist Mono
              </a>{" "}
              by Rasmus Andersson
            </li>
          </ul>
        </div>

        <div className="mt-12 pro">
          <h2 className="text-3xl">Inspirations</h2>
          <ul className="mt-4">
            <li>
              <a target="_blank" href="https://ademilter.com" rel="noreferrer">
                https://ademilter.com
              </a>{" "}
              by Adem İlter
            </li>
            <li>
              <a target="_blank" href="https://onur.dev" rel="noreferrer">
                https://onur.dev
              </a>{" "}
              by Onur Şuyalçınkaya
            </li>
            <li>
              <a target="_blank" href="https://leerob.io" rel="noreferrer">
                https://leerob.io
              </a>{" "}
              by Lee Robinson
            </li>
            <li>
              <a target="_blank" href="https://flowbite.com" rel="noreferrer">
                https://flowbite.com
              </a>{" "}
              by Zoltán Szőgyényi (changelog timeline)
            </li>
            <li>
              <a
                target="_blank"
                href="https://spotlight.tailwindui.com"
                rel="noreferrer"
              >
                https://spotlight.tailwindui.com
              </a>{" "}
              by Tailwind UI (header interactions)
            </li>
            <li>
              <a
                target="_blank"
                href="https://opaque.framer.website"
                rel="noreferrer"
              >
                https://opaque.framer.website
              </a>{" "}
              by Aaron Rolston
            </li>
            <li>
              <a
                target="_blank"
                href="https://benton.framer.website"
                rel="noreferrer"
              >
                https://benton.framer.website
              </a>{" "}
              by Fouroom
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.joshwcomeau.com"
                rel="noreferrer"
              >
                https://www.joshwcomeau.com
              </a>{" "}
              by Josh W. Comeau
            </li>
            <li>
              <a
                target="_blank"
                href="https://kamranahmed.info/"
                rel="noreferrer"
              >
                https://kamranahmed.info/
              </a>{" "}
              by Kamran Ahmed
            </li>
            <li>
              <a
                target="_blank"
                href="https://www.raycast.com"
                rel="noreferrer"
              >
                https://www.raycast.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
