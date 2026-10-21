import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { ContactDock } from "@/components/site/ContactDock";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Intro, Marquee } from "@/components/site/Intro";
import { Location } from "@/components/site/Location";
import { MobileCTA } from "@/components/site/MobileCTA";
import { Nav } from "@/components/site/Nav";
import { Process } from "@/components/site/Process";
import { Services } from "@/components/site/Services";
import { Testimonials } from "@/components/site/Testimonials";
import { WhatsAppChat } from "@/components/site/WhatsAppChat";
import { Work } from "@/components/site/Work";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <Intro />
        <Services />
        <Work />
        <Process />
        <About />
        <Testimonials />
        <Contact />
        <Location />
      </main>
      <Footer />
      <MobileCTA />
      <ContactDock />
      <WhatsAppChat />
    </>
  );
}
