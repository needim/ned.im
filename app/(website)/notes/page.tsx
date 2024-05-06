import { Container } from "@/components/blocks/container";

export default function Notes() {
  return (
    <Container className="mt-16">
      <div className="max-w-2xl">
        <h1 className="tracking-tight text-5xl">Notes</h1>
        <div className="pro text-muted-foreground text-balance">
          <p className="mt-2">The notes I&apos;ve taken during my journey.</p>
        </div>
      </div>
    </Container>
  );
}
