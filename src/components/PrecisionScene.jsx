import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { number: "01", title: "Precision assembly", copy: "A purpose-built CNC collet chuck assembly engineered for accurate, repeatable workholding." },
  { number: "02", title: "Collet interface", copy: "The inner sleeve / collet interface is designed to maintain concentric, stable clamping through the machining cycle." },
  { number: "03", title: "Rigid main body", copy: "The main body provides the structural rigidity required for demanding turning and high-speed machining applications." },
  { number: "04", title: "Controlled sealing", copy: "Sealing components and end-cap geometry complete the assembly for dependable operation and long service life." },
];

export default function PrecisionScene() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return undefined;

    const media = gsap.matchMedia();
    let scrollTrigger;
    let mobileTween;

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => setStage(Math.min(3, Math.floor(self.progress * 4))),
          },
        });

        scrollTrigger = tl.scrollTrigger;

        gsap.set(image, {
          xPercent: 7,
          yPercent: 0,
          scale: 0.78,
          rotation: -3,
          transformOrigin: "50% 50%",
        });

        tl.to(image, { xPercent: 4, yPercent: 0, scale: 0.88, rotation: -1.5, ease: "none" }, 0);
        tl.to(image, { xPercent: 1, yPercent: 2, scale: 0.98, rotation: 0, ease: "none" }, 0.23);
        tl.to(image, { xPercent: -2, yPercent: -1, scale: 1.08, rotation: 1.3, ease: "none" }, 0.5);
        tl.to(image, { xPercent: -5, yPercent: 1, scale: 1.16, rotation: 2.5, ease: "none" }, 0.76);
      }, section);

      return () => ctx.revert();
    });

    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(image, { xPercent: 2, scale: 0.9, rotation: -1.5 });
      mobileTween = gsap.to(image, {
        xPercent: -2,
        rotation: 1.5,
        scale: 0.95,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      scrollTrigger?.kill();
      mobileTween?.kill();
      media.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="exploded-view" className="scene-section collet-scene" data-theme="black" data-testid="exploded-view-section">
      <div className="scene-sticky">
        <div className="scene-label">
          <span>VPI CNC COLLET CHUCK / VG-20</span>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="collet-visual" aria-hidden="true">
          <div className="collet-glow" />
          <img
            ref={imageRef}
            className="collet-exploded-image"
            src="/vpi/vg20-exploded.png"
            alt="Exploded view of VPI VG-20 CNC Collet Chuck"
          />
          <div className="collet-scanline" />
        </div>

        <div className="scene-axis axis-x">X + 000.005</div>
        <div className="scene-axis axis-y">Y + 000.000</div>

        <div className="scene-stage-copy" data-testid="exploded-view-callout">
          <span className="eyebrow cyan">STAGE {stages[stage].number} / 04</span>
          <h3>{stages[stage].title}</h3>
          <p>{stages[stage].copy}</p>
          <div className="stage-progress"><span style={{ width: `${((stage + 1) / 4) * 100}%` }} /></div>
        </div>

        <div className="scene-legend"><span className="legend-dot" />VPI / VG-20 CNC COLLET CHUCK</div>
      </div>
    </section>
  );
}
