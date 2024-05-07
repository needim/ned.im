import { Container } from "@/components/blocks/container";

export default function Notes() {
  return (
    <Container className="mt-16">
      <div className="max-w-2xl">
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
              >
                Crimson Pro
              </a>{" "}
              by Bonnie Shaver-Troup, Thomas Jockin, Santiago Orozco, Héctor
              Gómez, Superunion
            </li>
            <li>
              <a target="_blank" href="https://vercel.com/font">
                Geist Sans
              </a>{" "}
              by Vercel
            </li>
            <li>
              <a target="_blank" href="https://vercel.com/font">
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
              <a target="_blank" href="https://ademilter.com">
                https://ademilter.com
              </a>{" "}
              by Adem İlter
            </li>
            <li>
              <a target="_blank" href="https://onur.dev">
                https://onur.dev
              </a>{" "}
              by Onur Şuyalçınkaya
            </li>
            <li>
              <a target="_blank" href="https://leerob.io">
                https://leerob.io
              </a>{" "}
              by Lee Robinson
            </li>
            <li>
              <a target="_blank" href="https://flowbite.com">
                https://flowbite.com
              </a>{" "}
              by Zoltán Szőgyényi (changelog timeline)
            </li>
            <li>
              <a target="_blank" href="https://spotlight.tailwindui.com">
                https://spotlight.tailwindui.com
              </a>{" "}
              by Tailwind UI (header interactions)
            </li>
            <li>
              <a target="_blank" href="https://opaque.framer.website">
                https://opaque.framer.website
              </a>{" "}
              by Aaron Rolston
            </li>
            <li>
              <a target="_blank" href="https://benton.framer.website">
                https://benton.framer.website
              </a>{" "}
              by Fouroom
            </li>
            <li>
              <a target="_blank" href="https://www.joshwcomeau.com">
                https://www.joshwcomeau.com
              </a>{" "}
              by Josh W. Comeau
            </li>
            <li>
              <a target="_blank" href="https://www.raycast.com">
                https://www.raycast.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
