import { useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Crosshair from "@/components/Crosshair";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

export default function SiteLayout() {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false, autoRaf: false });
    lenisRef.current = lenis;
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.normalizeScroll(true);
    return () => { gsap.ticker.remove(raf); lenis.destroy(); lenisRef.current = null; ScrollTrigger.normalizeScroll(false); };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
    let revealTriggers = [];
    let themeTriggers = [];
    const setup = () => {
      const revealTargets = gsap.utils.toArray("[data-reveal]");
      if (revealTargets.length) {
        gsap.set(revealTargets, { autoAlpha: 0, y: 18, willChange: "transform, opacity" });
        revealTriggers = ScrollTrigger.batch(revealTargets, { start: "top 88%", onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, ease: "power2.out", overwrite: true }) });
      }
      const shell = document.querySelector(".site-shell");
      themeTriggers = gsap.utils.toArray("[data-theme]").map((section) => ScrollTrigger.create({ trigger: section, start: "top 58%", end: "bottom 58%", onToggle: (self) => { if (self.isActive && shell) shell.setAttribute("data-active-theme", section.dataset.theme); } }));
      const imageLoads = Array.from(document.images).map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => { image.addEventListener("load", resolve, { once: true }); image.addEventListener("error", resolve, { once: true }); }));
      Promise.all(imageLoads).then(refresh);
      refresh();
    };
    const setupTimer = window.setTimeout(setup, 540);
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh, { once: true });
    const timer = window.setTimeout(refresh, 1200);
    return () => { window.removeEventListener("load", refresh); window.clearTimeout(timer); window.clearTimeout(setupTimer); revealTriggers.forEach((trigger) => trigger.kill()); themeTriggers.forEach((trigger) => trigger.kill()); };
  }, [location.pathname]);

  return <><Crosshair /><Navbar /><AnimatePresence mode="wait" initial={false}><PageTransition key={location.pathname}><Outlet /></PageTransition></AnimatePresence><Footer /><div className="corner-badge" data-testid="corner-badge" aria-hidden="true"><svg viewBox="0 0 100 100"><defs><path id="badge-circle-path" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" /></defs><g className="badge-ring"><text className="badge-text"><textPath href="#badge-circle-path">PRECISION GRADE • ISO-ALIGNED MANUFACTURING • EST. 1998 • </textPath></text></g><g className="badge-cross"><line x1="50" y1="39" x2="50" y2="61" /><line x1="39" y1="50" x2="61" y2="50" /><circle cx="50" cy="50" r="8" /></g></svg></div></>;
}