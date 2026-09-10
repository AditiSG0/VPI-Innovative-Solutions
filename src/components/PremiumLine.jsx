import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, spotlightMove } from "@/components/motion";

gsap.registerPlugin(ScrollTrigger);

const products = [
  { name: "VG-20 A6-60", sub: "COLLET CHUCK", spec: "A2-6 · 4,000 RPM · 42.1 kN CLAMPING", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-3-1.jpg", path: "/products/cnc-collet-chucks" },
  { name: "VG-20 A6-60", sub: "NOSE DETAIL", spec: "≤ 0.005 MM RUNOUT · G 2.5 BALANCED", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-2-1.jpg", path: "/products/cnc-collet-chucks" },
  { name: "VG Series Set", sub: "SERIALIZED WOODEN CASE", spec: "FULL COLLET RANGE · CERTIFIED", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-15-scaled.jpg", path: "/products/cnc-collet-chucks" },
  { name: "VR Series", sub: "REVOLVING CENTRES", spec: "MT2–MT6 · 0.003 MM POINT RUNOUT", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-6.jpg", path: "/products/revolving-centres" },
];

export default function PremiumLine() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const media = gsap.matchMedia();
    media.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray(".premium-image img", section).forEach((img, index) => {
        const drift = index % 2 === 0 ? -24 : 28;
        gsap.fromTo(img, { y: drift, scale: 1.12 }, { y: -drift, scale: 1.12, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.1 } });
      });
    });
    return () => media.revert();
  }, []);

  const nudge = (dir) => trackRef.current?.scrollBy({ left: dir * 420, behavior: "smooth" });

  return (
    <section ref={sectionRef} className="premium-section page-pad" data-theme="black" data-testid="premium-line">
      <Reveal>
        <div className="section-heading-row">
          <div><span className="eyebrow cyan">VPI'S PREMIUM LINE</span><h2>Shop the<br /><em>flagships.</em></h2></div>
          <div className="premium-nav">
            <button type="button" onClick={() => nudge(-1)} data-testid="premium-prev" aria-label="Previous products"><ArrowLeft size={16} /></button>
            <button type="button" onClick={() => nudge(1)} data-testid="premium-next" aria-label="Next products"><ArrowRight size={16} /></button>
          </div>
        </div>
      </Reveal>
      <div className="premium-track" ref={trackRef} data-testid="premium-track">
        {products.map((product, index) => (
          <Reveal key={`${product.name}-${index}`} delay={index * 0.09} className="premium-card-wrap">
            <Link to={product.path} className="premium-card" onMouseMove={spotlightMove} data-testid={`premium-card-${index + 1}`}>
              <div className="premium-image"><img src={product.image} alt={`${product.name} — ${product.sub}`} loading="lazy" /></div>
              <div className="premium-meta"><span className="service-number">{product.sub}</span><h3>{product.name}</h3><p>{product.spec}</p></div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
