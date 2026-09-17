import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PrecisionScene() {
  const sectionRef = useRef(null);
  const imageARef = useRef(null);
  const imageBRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageA = imageARef.current;
    const imageB = imageBRef.current;
    const frame = frameRef.current;
    if (!section || !imageA || !imageB || !frame) return undefined;

    const media = gsap.matchMedia();

    const common = (mobile = false) => {
      const ctx = gsap.context(() => {
        gsap.set(imageA, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: mobile ? 0.94 : 0.96,
          rotation: 0,
          transformOrigin: "50% 50%",
          transformPerspective: 1200,
        });
        gsap.set(imageB, {
          opacity: 0,
          x: mobile ? 8 : 16,
          y: mobile ? 4 : 0,
          scale: mobile ? 0.92 : 0.94,
          rotation: mobile ? 2 : 4,
          transformOrigin: "50% 50%",
          transformPerspective: 1200,
        });
        gsap.set(frame, {
          rotateY: mobile ? 0 : -4,
          rotateX: mobile ? 0 : 1,
          scale: mobile ? 0.98 : 0.97,
          transformPerspective: 1600,
          transformOrigin: "50% 50%",
        });

        const update = (self) => {
          const progress = self.progress;
          const p = progress < 0.5 ? progress * 2 : (progress - 0.5) * 2;

          if (progress <= 0.5) {
            gsap.set(imageA, {
              opacity: 1 - progress * 0.85,
              x: gsap.utils.interpolate(0, -7, progress * 2),
              y: gsap.utils.interpolate(0, 3, progress * 2),
              scale: gsap.utils.interpolate(mobile ? 0.94 : 0.96, mobile ? 1.0 : 1.02, progress * 2),
              rotation: gsap.utils.interpolate(0, -2, progress * 2),
            });
            gsap.set(imageB, {
              opacity: progress * 1.7,
              x: gsap.utils.interpolate(mobile ? 8 : 16, 5, progress * 2),
              y: gsap.utils.interpolate(4, 0, progress * 2),
              scale: gsap.utils.interpolate(mobile ? 0.92 : 0.94, mobile ? 0.98 : 1.0, progress * 2),
              rotation: gsap.utils.interpolate(mobile ? 2 : 4, 2, progress * 2),
            });
            gsap.set(frame, {
              rotateY: gsap.utils.interpolate(mobile ? 0 : -4, mobile ? 4 : 1, progress * 2),
              rotateX: gsap.utils.interpolate(mobile ? 0 : 1, mobile ? 1 : 0, progress * 2),
              scale: gsap.utils.interpolate(mobile ? 0.98 : 0.97, 1.0, progress * 2),
            });
          } else {
            gsap.set(imageA, {
              opacity: 0.15 * (1 - p),
              x: gsap.utils.interpolate(-7, -18, p),
              y: gsap.utils.interpolate(3, -3, p),
              scale: gsap.utils.interpolate(mobile ? 1.0 : 1.02, mobile ? 1.04 : 1.07, p),
              rotation: gsap.utils.interpolate(-2, -5, p),
            });
            gsap.set(imageB, {
              opacity: gsap.utils.interpolate(0.85, 1, p),
              x: gsap.utils.interpolate(5, 0, p),
              y: gsap.utils.interpolate(0, -2, p),
              scale: gsap.utils.interpolate(mobile ? 0.98 : 1.0, mobile ? 1.02 : 1.05, p),
              rotation: gsap.utils.interpolate(2, 0, p),
            });
            gsap.set(frame, {
              rotateY: gsap.utils.interpolate(mobile ? 4 : 1, mobile ? 7 : 7, p),
              rotateX: gsap.utils.interpolate(mobile ? 1 : 0, mobile ? 2 : 2, p),
              scale: gsap.utils.interpolate(1.0, mobile ? 1.02 : 1.04, p),
            });
          }
        };

        const trigger = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: mobile ? true : 0.85,
          onUpdate: update,
        });
        update(trigger);
        return () => trigger.kill();
      }, section);
      return () => ctx.revert();
    };

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => common(false));
    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => common(true));

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
          <div ref={frameRef} className="collet-product-frame collet-photo-frame">
            <div className="product-frame-topline">VG-20 / VPI INNOVATIVE SOLUTIONS</div>
            <div className="collet-photo-surface">
              <img ref={imageARef} className="collet-rotation-image" src="/vpi/vg20-angle-1.jpg" alt="VPI VG-20 CNC Collet Chuck" />
              <img ref={imageBRef} className="collet-rotation-image" src="/vpi/vg20-angle-2.jpg" alt="VPI VG-20 CNC Collet Chuck alternate view" />
            </div>
            <div className="product-frame-corner">VG-20 / PRODUCT VIEW</div>
          </div>
          <div className="collet-scanline" />
        </div>

        <div className="scene-axis axis-x">ROTATION / PRODUCT VIEW</div>
        <div className="scene-axis axis-y">VPI / VG-20</div>
        <div className="scene-legend"><span className="legend-dot" />VPI / VG-20 CNC COLLET CHUCK</div>
      </div>
    </section>
  );
}
