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
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const nodes = itemRefs.current.filter(Boolean);
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.milestone);
          setActive(index);
        }
      });
    }, { rootMargin: "-35% 0px -45% 0px", threshold: 0 });
    nodes.forEach(node => observer.observe(node));

    const updateProgress = () => {
      const section = document.querySelector('.vpi-timeline');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const total = Math.max(1, rect.height - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -rect.top / total)));
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => { observer.disconnect(); window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', updateProgress); };
  }, []);

  return (
    <section className="vpi-timeline" aria-labelledby="vpi-timeline-title">
      <div className="vpi-timeline-intro page-pad">
        <div><span className="eyebrow cyan">VPI / OUR JOURNEY</span><h2 id="vpi-timeline-title">From vision to <em>innovation</em></h2></div>
        <p className="page-lead">A living timeline of the milestones that shaped VPI Innovative Solutions, from our founding legacy to advanced CNC manufacturing and our next phase of growth.</p>
      </div>
      <div className="vpi-timeline-body page-pad">
        <div className="vpi-timeline-line" aria-hidden="true"><span style={{ transform: `scaleY(${progress})` }} /></div>
        <div className="vpi-timeline-list">
          {milestones.map(([year, title, copy], index) => (
            <article ref={el => { itemRefs.current[index] = el; }} key={year} data-milestone={index} className={`vpi-timeline-item ${active === index ? 'is-active' : ''}`}>
              <div className="vpi-timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
              <div className="vpi-timeline-year">{year}</div>
              <div className="vpi-timeline-card"><span className="service-number">{year}</span><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </div>
      <div className="vpi-timeline-end page-pad"><ArrowDown size={16} /><span>SCROLL TO CONTINUE</span></div>
    </section>
  );
}
