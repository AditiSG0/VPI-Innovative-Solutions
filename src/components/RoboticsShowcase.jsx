import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function RoboticsShowcase() {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const section = ref.current;
    const image = imageRef.current;
    const frame = frameRef.current;
    if (!section || !image || !frame) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(image, { yPercent: 8, scale: 1.08 }, {
        yPercent: -8,
        scale: 1,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      gsap.fromTo(frame, { y: 70 }, {
        y: -40,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, section);

    const onMove = (event) => {
      const rect = frame.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      gsap.to(frame, { rotateY: px * 5, rotateX: -py * 4, duration: 0.45, ease: "power3.out", overwrite: true });
      gsap.to(image, { x: px * 10, y: py * 10, duration: 0.6, ease: "power3.out", overwrite: true });
    };
    const reset = () => {
      gsap.to(frame, { rotateY: 0, rotateX: 0, duration: 0.65, ease: "power3.out", overwrite: true });
      gsap.to(image, { x: 0, duration: 0.65, ease: "power3.out", overwrite: true });
    };
    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerleave", reset);

    return () => {
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerleave", reset);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} className="robotics-showcase" data-theme="navy">
      <div className="page-pad robotics-grid">
        <div className="robotics-copy">
          <span className="eyebrow gold">ROBOTICS / 03</span>
          <h2>Precision that <em>moves</em></h2>
          <p className="page-lead">Lightweight, high-strength components enabling the next generation of automation.</p>
          <div className="robotics-annotations">
            <span><b>01</b> Lightweight structures</span>
            <span><b>02</b> Dimensional repeatability</span>
            <span><b>03</b> Motion-system stability</span>
          </div>
          <Link className="robotics-link" to="/industries/robotics">EXPLORE ROBOTICS <ArrowUpRight size={15} /></Link>
        </div>
        <div ref={frameRef} className="robotics-visual" aria-label="VPI robotics industry visual">
          <div className="robotics-grid-overlay" />
          <div className="robotics-corner">RBT / PRECISION SYSTEMS</div>
          <img ref={imageRef} src="/vpi/industry/robotics.png" alt="Robotics industry" />
        </div>
      </div>
    </section>
  );
}
