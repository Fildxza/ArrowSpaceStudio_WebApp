import { useEffect, useState } from "react";

/**
 * True once the hero has scrolled out of view and while neither the contact
 * section nor the footer is on screen — used by the floating contact controls
 * so they never cover the hero or the enquiry form.
 */
export function useQuickContactVisible(): boolean {
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const hero = document.getElementById("top");
    const ends = [
      document.getElementById("contact"),
      document.getElementById("location"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => !!el);

    const heroIO = new IntersectionObserver(([e]) => setPastHero(!e?.isIntersecting));
    const visible = new Set<Element>();
    const endIO = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setNearEnd(visible.size > 0);
    });

    if (hero) heroIO.observe(hero);
    ends.forEach((el) => endIO.observe(el));
    return () => {
      heroIO.disconnect();
      endIO.disconnect();
    };
  }, []);

  return pastHero && !nearEnd;
}
