import { createFileRoute } from "@tanstack/react-router";
import { useCopy } from "@/i18n";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { ContactDock } from "@/components/site/ContactDock";
import { Follow } from "@/components/site/Follow";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { Intro, Marquee } from "@/components/site/Intro";
import { LanguageSync } from "@/components/site/LanguageSync";
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
  const t = useCopy();
  return (
    <>
      <LanguageSync />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:bg-ink focus:px-4 focus:py-3 focus:text-ivory"
      >
        {t.skip}
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
        <Follow />
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
