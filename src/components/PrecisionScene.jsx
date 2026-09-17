import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { number: "01", title: "Assembled view", copy: "VG-20 CNC collet chuck shown in its complete assembled form for an immediate product reference." },
  { number: "02", title: "Inspection angle", copy: "Scroll to turn the product through a controlled presentation angle while keeping the original VPI product image visible." },
  { number: "03", title: "Precision detail", copy: "A closer inspection view highlights the knurled grip, machined body, spindle-side geometry, and finished surfaces." },
  { number: "04", title: "Final orientation", copy: "The product settles into its final inspection angle, ready for the next section of the VPI product story." },
];

export default function PrecisionScene() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const productFrameRef = useRef(null);
  const [stage, setStage] = useState(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const frame = productFrameRef.current;
    if (!section || !image || !frame) return undefined;

    const media = gsap.matchMedia();

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.set(image, {
          x: 0,
          y: 0,
          scale: 0.9,
          rotation: 0,
          rotationY: 0,
          transformPerspective: 1400,
          transformOrigin: "50% 50%",
        });

        gsap.set(frame, {
          rotateX: 0,
          rotateY: -5,
          scale: 0.96,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;
              setStage(Math.min(3, Math.floor(progress * 4)));
              setAngle(Math.round(progress * 22));
            },
          },
        });

        tl.to(frame, { rotateY: 2, scale: 0.99, ease: "none", duration: 0.28 }, 0);
        tl.to(image, { scale: 1.01, rotation: 2, x: -10, y: 0, ease: "none", duration: 0.25 }, 0);
        tl.to(frame, { rotateY: 6, rotateX: 1.5, scale: 1.02, ease: "none", duration: 0.25 }, 0.25);
        tl.to(image, { scale: 1.07, rotation: -2, x: 6, y: -8, ease: "none", duration: 0.25 }, 0.25);
        tl.to(frame, { rotateY: 10, rotateX: 2.5, scale: 1.05, ease: "none", duration: 0.25 }, 0.5);
        tl.to(image, { scale: 1.13, rotation: 3, x: -8, y: 4, ease: "none", duration: 0.25 }, 0.5);
        tl.to(frame, { rotateY: 14, rotateX: 3.5, scale: 1.08, ease: "none", duration: 0.25 }, 0.75);
        tl.to(image, { scale: 1.18, rotation: -1, x: 10, y: -2, ease: "none", duration: 0.25 }, 0.75);
      }, section);

      return () => ctx.revert();
    });

    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(image, { scale: 0.95, rotation: 0 });
      gsap.set(frame, { rotateY: 0, scale: 0.98 });

      const onUpdate = (self) => {
        const progress = self.progress;
        setStage(Math.min(3, Math.floor(progress * 4)));
        setAngle(Math.round(progress * 14));
      };

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate,
      });

      gsap.to(image, {
        scale: 1.03,
        rotation: 5,
        duration: 1,
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true },
        ease: "none",
      });

      gsap.to(frame, {
        rotateY: 8,
        scale: 1.02,
        duration: 1,
        scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: true },
        ease: "none",
      });

      return () => trigger.kill();
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} id="precision-rotation" className="scene-section collet-scene" data-theme="black" data-testid="precision-rotation-section">
      <div className="scene-sticky">
        <div className="scene-label">
          <span>VPI CNC COLLET CHUCK / VG-20</span>
          <span>SCROLL TO ROTATE</span>
        </div>

        <div className="collet-visual" aria-hidden="true">
          <div className="collet-grid-panel" />
          <div className="collet-glow" />
          <div ref={productFrameRef} className="collet-product-frame">
            <div className="product-frame-topline">VG-20 A6-60 / VPI INNOVATIVE SOLUTIONS</div>
            <img
              ref={imageRef}
              className="collet-assembled-image"
              src="/vpi/vg20-assembled-cutout.png"
              alt="VPI VG-20 CNC Collet Chuck"
            />
            <div className="product-frame-reflection" />
            <div className="product-frame-corner">PRECISION / VG-20</div>
          </div>
          <div className="collet-scanline" />
        </div>

        <div className="scene-axis axis-x">ROTATION + {String(angle).padStart(2, "0")}°</div>
        <div className="scene-axis axis-y">Y + 000.000</div>

        <div className="scene-stage-copy" data-testid="precision-rotation-callout">
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
