import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { EASE, Reveal } from "@/components/motion";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { id: "turning", title: "CNC Turning", copy: "Advanced turning capability for high-precision turned components and production requirements.", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/mac-2.png" },
  { id: "milling", title: "5-axis CNC Milling", copy: "Multi-axis machining for complex geometries, tight tolerances and demanding component applications.", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/banner-mill-e-700.jpg" },
  { id: "machining", title: "Advanced Machining", copy: "Modern CNC infrastructure supporting prototypes, complex components and high-volume production.", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/Miyano-machine.png" },
  { id: "components", title: "Precision Components", copy: "High-quality machined components manufactured for critical industrial applications.", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/compo3.jpg" },
];

const machineBrands = [
  { country: "Japan", code: "jp", brands: ["Tsugami", "Citizen Miyano", "Citizen Cincom", "Mazak", "Matsuura (4 Axis HMC)", "Mitutoyo (CMM CNC 1 Mtr)", "Kitamura (Machining Challenges — Simplified)"] },
  { country: "Germany", code: "de", brands: ["DMG Mori (9 Axis Machine)", "Traub", "WMW", "Forte", "Chiron", "Zeiss", "Gedee Weiler"] },
  { country: "United Kingdom", code: "gb", brands: ["Delapena (Auto Honning)", "Matchmaker CNC (4 Axis VMC)", "Jones & Shipman (High Speed Precision ID Grinder)", "XYZ Machine Tools", "Colchester Machine Tool Solutions"] },
  { country: "Taiwan", code: "tw", brands: ["Huey Long (3 Axis VMC)"] },
  { country: "Czech Republic", code: "cz", brands: ["TOS"] },
  { country: "India", code: "in", brands: ["Askar", "Jyoti", "HMT Machine Tools Limited", "Bhagwansons (Centerless Grinders)"] },
  { country: "Switzerland", code: "ch", brands: ["Tornos", "+GF+", "Agie Charmilles (Robofil, 5 Axis VMC / Wire EDM)"] },
  { country: "United States", code: "us", brands: ["Hardinge (9 Axis Machine)", "Hurco (4 Axis VMC)", "Cemb USA (Balancing Machines)"] },
];

export default function FacilitySection() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const triggers = panels.map((panel, index) => ScrollTrigger.create({
      trigger: section.querySelector(`[data-facility-panel="${panel.id}"]`),
      start: "top 55%",
      end: "bottom 55%",
      onToggle: (self) => { if (self.isActive) setActive(index); },
    }));
    const media = gsap.matchMedia();
    media.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(section.querySelector(".facility-thumbs"), { y: 70 }, { y: -70, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 } });
    });
    return () => { triggers.forEach((trigger) => trigger.kill()); media.revert(); };
  }, []);

  return (
    <section ref={sectionRef} className="facility-section page-pad" data-theme="dark" data-testid="facility-section">
      <Reveal>
        <div className="facility-heading">
          <span className="eyebrow cyan">THE FLOOR / 05</span>
          <h2>Our CNC<br /><em>machining facility.</em></h2>
          <motion.span className="facility-underline" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.25, ease: EASE }} />
        </div>
      </Reveal>
      <div className="facility-grid">
        <div className="facility-thumbs" data-testid="facility-thumbs">
          {panels.map((panel, index) => (
            <button key={panel.id} type="button" className={`facility-thumb ${index === active ? "is-active" : ""}`} data-testid={`facility-thumb-${index + 1}`} onClick={() => sectionRef.current.querySelector(`[data-facility-panel="${panel.id}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" })}>
              <img src={panel.image} alt={panel.title} loading="lazy" />
              <span>{panel.title}</span>
            </button>
          ))}
        </div>
        <div className="facility-panels">
          {panels.map((panel, index) => (
            <article key={panel.id} className="facility-panel" data-facility-panel={panel.id} data-testid={`facility-panel-${index + 1}`}>
              <div className="facility-panel-image"><img src={panel.image} alt={panel.title} loading="lazy" /></div>
              <div className="facility-panel-copy"><span className="service-number">0{index + 1} / CELL</span><h3>{panel.title}</h3><p>{panel.copy}</p></div>
            </article>
          ))}
        </div>
      </div>
      <Reveal><span className="eyebrow cyan machine-kicker">MACHINES ON THE FLOOR / 30+</span></Reveal>
      <Reveal className="machine-brands-image"><img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/whole-countery-products-1.png" alt="VPI machine brands and equipment" loading="lazy" /></Reveal>
      <div className="machine-grid" data-testid="machine-grid">
        {machineBrands.map((group, groupIndex) => (
          <Reveal key={group.country} delay={groupIndex * 0.07} className="machine-group-wrap">
            <div className="machine-group" data-testid={`machine-group-${group.country.toLowerCase().replaceAll(" ", "-")}`}>
              <div className="machine-group-head"><span>{group.country}</span></div>
              <ul>{group.brands.map((brand) => <li key={brand}>{brand}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
