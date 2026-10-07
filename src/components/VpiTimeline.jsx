import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  ["1983", "The Foundation", "VP Industries was founded by Late Shri V. Gowrishankar to uplift non-technical individuals through engineering."],
  ["1987", "A Legacy Continues", "The company shifted into machining services and industrial support following the founder's legacy."],
  ["1988–1990", "Strategic Growth", "Joined L&T and Automotive Axles Ltd. programs, learning world-class manufacturing systems and ISO standards."],
  ["2006", "Birth of VPI Innovative Solutions", "Founded to deliver advanced engineering, setting the stage for high-impact industrial innovation."],
  ["2007", "VG-20 Series", "High-precision collet chucks and accessories released — a tribute to our founder’s engineering legacy."],
  ["2020s", "CNC Evolution", "Advanced multi-axis CNC machines empower new levels of accuracy, complexity, and scale."],
  ["2025 & Beyond", "New Frontiers", "We are expanding into aerospace and cutting-edge R&D that supports national growth and innovation."],
];

export default function VpiTimeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const fillRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    const fill = fillRef.current;
    if (!section || !line || !fill) return undefined;

    const triggers = milestones.map((_, index) => ScrollTrigger.create({
      trigger: section.querySelector(`[data-milestone="${index}"]`),
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => setActive(index),
      onEnterBack: () => setActive(index),
    }));

    const progress = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(fill, { scaleY: self.progress, transformOrigin: "top center" });
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    return () => {
      triggers.forEach((trigger) => trigger.kill());
      progress.kill();
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return (
    <section ref={sectionRef} className="vpi-timeline" data-theme="white" aria-labelledby="vpi-timeline-title">
      <div className="page-pad vpi-timeline-intro">
        <div>
          <span className="eyebrow gold">VPI / OUR JOURNEY</span>
          <h2 id="vpi-timeline-title">From vision to <em>innovation</em></h2>
        </div>
        <p className="page-lead">A living timeline of the milestones that shaped VPI Innovative Solutions, from our founding legacy to advanced CNC manufacturing and our next phase of growth.</p>
      </div>
      <div className="page-pad vpi-timeline-body">
        <div className="vpi-timeline-line" ref={lineRef}><span ref={fillRef} /></div>
        <div className="vpi-timeline-list">
          {milestones.map(([year, title, copy], index) => (
            <article key={year} data-milestone={index} className={`vpi-timeline-item ${active === index ? "is-active" : ""}`}>
              <div className="vpi-timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <div className="vpi-timeline-year">{year}</div>
              <div className="vpi-timeline-card">
                <span className="service-number gold">{year}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="page-pad vpi-timeline-end"><ArrowDown size={16} /><span>SCROLL TO CONTINUE</span></div>
    </section>
  );
}
