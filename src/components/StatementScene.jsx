import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PARTS = [
  { key: "frontCap", label: "Front Cap", src: "/vpi/collet-parts/front-cap.png" },
  { key: "washer", label: "Sealing Washer", src: "/vpi/collet-parts/sealing-washer.png" },
  { key: "innerSleeve", label: "Inner Sleeve / Collet", src: "/vpi/collet-parts/inner-sleeve-collet.png" },
  { key: "mainBody", label: "Main Body", src: "/vpi/collet-parts/main-body.png" },
  { key: "oring", label: "O-Ring", src: "/vpi/collet-parts/o-ring.png" },
  { key: "endCap", label: "End Cap", src: "/vpi/collet-parts/end-cap.png" },
];

const stages = [
  { number: "01", title: "VG-20 / A6-60", copy: "Fully assembled VPI collet chuck, positioned as the starting point of the scroll sequence." },
  { number: "02", title: "Component separation", copy: "The outer components begin to release from the assembled position as the scroll progresses." },
  { number: "03", title: "Precision interfaces", copy: "The front cap, sealing washer, inner sleeve, main body and retaining elements separate for inspection." },
  { number: "04", title: "Exploded view", copy: "The complete VG-20 assembly is shown fully exploded, exposing every major component and interface." },
];

const STATEMENT = "Every micron is a promise we intend to keep.";

export default function StatementScene() {
  const sectionRef = useRef(null);
  const assemblyRef = useRef(null);
  const pieceRefs = useRef({});
  const labelRefs = useRef([]);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const assembly = assemblyRef.current;
    const pieceNodes = PARTS.map(({ key }) => pieceRefs.current[key]).filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    if (!section || !assembly || pieceNodes.length !== PARTS.length) return undefined;

    const q = gsap.utils.selector(assembly);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.1,
        invalidateOnRefresh: true,
        onUpdate: ({ progress }) => setStage(Math.min(3, Math.floor(progress * 4))),
      },
    });

    // Start as one assembled chuck.
    gsap.set(pieceNodes, { rotation: 0, y: 0 });
    gsap.set(pieceNodes, { x: 0 });
    gsap.set(labels, { opacity: 0, y: 10 });

    // Slight assembled drift keeps the object alive before it starts opening.
    tl.to(assembly, { rotate: -1.5, y: 4, duration: 0.16, ease: "none" }, 0);

    // Controlled separation. The final offsets are based on the original exploded product image.
    const explode = {
      frontCap: { x: -250, y: 0, r: -2 },
      washer: { x: -125, y: 0, r: 1 },
      innerSleeve: { x: -70, y: -2, r: -0.5 },
      mainBody: { x: 95, y: 0, r: 0.5 },
      oring: { x: 185, y: 0, r: 1.5 },
      endCap: { x: 300, y: -4, r: 2 },
    };

    Object.entries(explode).forEach(([key, end]) => {
      const node = pieceRefs.current[key];
      tl.to(node, { x: end.x, y: end.y, rotation: end.r, ease: "none", duration: 0.72 }, 0.22);
    });

    tl.to(assembly, { rotate: 2, scale: 1.02, duration: 0.22, ease: "none" }, 0.46);
    tl.to(labels, { opacity: 1, y: 0, stagger: 0.04, duration: 0.14, ease: "none" }, 0.78);
    tl.to(assembly, { rotate: 4, scale: 1.04, duration: 0.18, ease: "none" }, 0.8);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="statement-scene" data-theme="black" data-testid="statement-scene">
      <div className="statement-sticky">
        <div className="statement-copy">
          <span className="eyebrow cyan">THE VPI STANDARD / 03</span>
          <p className="scroll-text st-big" data-testid="home-statement">
            {STATEMENT.split(" ").map((word, index) => (
              <span className="st-word" key={index}>{word}&nbsp;</span>
            ))}
          </p>
          <div className="statement-stage" data-testid="statement-stage-callout">
            <span className="eyebrow cyan">STAGE {stages[stage].number} / 04</span>
            <h3>{stages[stage].title}</h3>
            <p>{stages[stage].copy}</p>
            <div className="stage-progress"><span style={{ width: `${((stage + 1) / 4) * 100}%` }} /></div>
          </div>
        </div>

        <div className="collet-assembly-wrap" aria-label="VPI VG-20 collet chuck scroll assembly">
          <div ref={assemblyRef} className="collet-assembly">
            {PARTS.map((part) => (
              <img
                key={part.key}
                ref={(node) => { pieceRefs.current[part.key] = node; }}
                className={`collet-piece collet-piece-${part.key}`}
                src={part.src}
                alt={part.label}
                draggable="false"
              />
            ))}

            <div className="collet-labels" aria-hidden="true">
              {PARTS.map((part, index) => (
                <span
                  key={part.key}
                  ref={(node) => { labelRefs.current[index] = node; }}
                  className={`collet-label collet-label-${part.key}`}
                >{part.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
