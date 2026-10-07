import { useEffect, useRef } from "react";
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>
    <Crosshair />
    <Navbar />
    <PageTransition key={location.pathname}>
      <Outlet />
    </PageTransition>
    <Footer />
    <div className="corner-badge" data-testid="corner-badge" aria-hidden="true">
      <svg viewBox="0 0 100 100">
        <defs><path id="badge-circle-path" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" /></defs>
        <g className="badge-ring"><text className="badge-text"><textPath href="#badge-circle-path">PRECISION GRADE • ISO-ALIGNED MANUFACTURING • EST. 1998 • </textPath></text></g>
        <g className="badge-cross"><line x1="50" y1="39" x2="50" y2="61" /><line x1="39" y1="50" x2="61" y2="50" /><circle cx="50" cy="50" r="8" /></g>
      </svg>
    </div>
  </>;
}
