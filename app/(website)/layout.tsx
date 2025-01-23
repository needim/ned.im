import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { HeaderGradient } from "@/components/blocks/header-gradient";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderGradient />
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
      <div className="pointer-events-none bg-white dark:bg-black fixed bottom-0 left-0 h-28 [mask-image:linear-gradient(transparent,#000000)] w-full" />
    </>
  );
}
