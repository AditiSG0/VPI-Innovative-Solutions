import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EASE = [0.22, 1, 0.36, 1];

export const spotlightMove = (event) => {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
};

export function Reveal({ children, delay = 0, y = 30, className, testId }) {
  return <motion.div className={className} data-testid={testId} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.85, delay, ease: EASE }}>{children}</motion.div>;
}

export function MaskedLine({ children, delay = 0 }) {
  return <span className="mask-line"><motion.span initial={{ y: "115%" }} animate={{ y: "0%" }} transition={{ duration: 1.05, delay, ease: EASE }}>{children}</motion.span></span>;
}

export function Magnetic({ children, strength = 0.32, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 170, damping: 14, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 170, damping: 14, mass: 0.25 });
  const onMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return <motion.div ref={ref} className={`magnetic ${className || ""}`} style={{ x: springX, y: springY }} onMouseMove={onMove} onMouseLeave={onLeave}>{children}</motion.div>;
}

export function Marquee({ items }) {
  return <div className="marquee" data-theme="black" data-testid="editorial-marquee"><div className="marquee-track">{[0, 1].map((copy) => <div className="marquee-row" key={copy} aria-hidden={copy === 1}>{items.map((item) => <span key={item}>{item}<i /></span>)}</div>)}</div></div>;
}

export function ScrollText({ text, className = "", testId, pin = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const words = el.querySelectorAll(".st-word");
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(words, { opacity: 0.1 }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: el, start: pin ? "top 62%" : "top 80%", end: pin ? "+=55%" : "top 34%", scrub: 1, pin } });
    });
    media.add("(max-width: 767px)", () => { gsap.set(words, { opacity: 1 }); });
    return () => media.revert();
  }, [text, pin]);
  return <p ref={ref} className={`scroll-text ${className}`} data-testid={testId}>{text.split(" ").map((word, index) => <span className="st-word" key={index}>{word}&nbsp;</span>)}</p>;
}
