import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: "01",
    title: "High Precision",
    copy: "Exceptional concentricity for precision turning operations with micron-level accuracy."
  },
  {
    number: "02",
    title: "Optimized Design",
    copy: "Lightweight, compact structure for fast acceleration and minimal vibration."
  },
  {
    number: "03",
    title: "Superior Durability",
    copy: "Built with premium materials and precision engineering for long-lasting performance."
  },
  {
    number: "04",
    title: "Versatile Compatibility",
    copy: "Works seamlessly with a wide range of CNC lathes and machining centers."
  },
  {
    number: "05",
    title: "Flexible Applications",
    copy: "Ideal for both high-volume production and precision toolroom environments."
  },
];

export default function ProductProcessScene() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const stageRefs = useRef([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const stageNodes = stageRefs.current.filter(Boolean);
    if (!section || !image || stageNodes.length !== STEPS.length) return undefined;

    gsap.set(image, { rotation: -2, rotationX: 0, rotationY: 0, scale: 1.02, transformPerspective: 1200 });
    gsap.set(stageNodes, { opacity: 0.25, y: 12 });
    gsap.set(stageNodes[0], { opacity: 1, y: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            const next = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
            setStep(next);
          },
        },
      });

      // A clean product-inspection movement. The image stays intact; only the presentation tilts as the visitor advances through the five VPI features.
      const keyframes = [
        { p: 0.00, vars: { rotation: -1.2, rotationX: 0, rotationY: -1, scale: 1.00, x: 0, y: 0 } },
        { p: 0.18, vars: { rotation: 1.6, rotationX: 1.0, rotationY: -2.2, scale: 1.015, x: 7, y: -3 } },
        { p: 0.36, vars: { rotation: -2.1, rotationX: -0.8, rotationY: 2.3, scale: 1.025, x: -8, y: 2 } },
        { p: 0.54, vars: { rotation: 2.3, rotationX: 1.2, rotationY: -2.6, scale: 1.035, x: 8, y: -4 } },
        { p: 0.72, vars: { rotation: -1.7, rotationX: -1.0, rotationY: 2.5, scale: 1.045, x: -7, y: 2 } },
        { p: 0.88, vars: { rotation: 1.3, rotationX: 0.6, rotationY: -1.8, scale: 1.05, x: 5, y: -2 } },
        { p: 1.00, vars: { rotation: 0, rotationX: 0, rotationY: 0, scale: 1.03, x: 0, y: 0 } },
      ];
      keyframes.slice(1).forEach(({ p, vars }) => tl.to(image, { ...vars, ease: "none", duration: 0.2 }, p));

      stageNodes.forEach((node, index) => {
        const start = Math.max(0, index / STEPS.length - 0.015);
        const end = Math.min(1, (index + 1) / STEPS.length);
        tl.to(node, { opacity: 1, y: 0, duration: 0.08, ease: "none" }, start);
        if (index < stageNodes.length - 1) {
          tl.to(node, { opacity: 0.25, y: 12, duration: 0.06, ease: "none" }, end - 0.02);
        }
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      ctx.revert();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const active = STEPS[step];

  return (
    <section ref={sectionRef} className="product-process-scene" data-theme="gray" aria-label="VG-20 CNC Collet Chuck product feature sequence">
      <div className="product-process-sticky page-pad">
        <div className="product-process-copy">
          <div>
            <span className="eyebrow product-blue">VG-20 CNC COLLET CHUCK / 01—05</span>
            <h2>Precision <em>in every detail.</em></h2>
            <p className="product-process-intro">The VG-20 CNC Collet Chuck is engineered for accuracy, rigidity, and durability in high-speed machining applications.</p>
          </div>

          <div className="product-process-steps">
            {STEPS.map((item, index) => (
              <div
                key={item.number}
                ref={(node) => { stageRefs.current[index] = node; }}
                className={`product-process-step ${index === step ? "is-active" : ""}`}
              >
                <span className="product-step-number">{item.number}</span>
                <div>
                  <span className="product-step-kicker">VG-20 / {item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="product-process-visual">
          <div className="product-process-frame">
            <div className="product-process-frame-label">VPI / PRECISION TOOLING</div>
            <img ref={imageRef} src="/vpi/vg20-original.png" alt="VPI VG-20 CNC Collet Chuck" draggable="false" />
            <div className="product-process-frame-footer"><span>{active.number} / 05</span><span>VG-20 CNC COLLET CHUCK</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
