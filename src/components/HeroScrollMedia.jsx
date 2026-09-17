import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const media = [
  {
    src: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-3-1.jpg",
    alt: "VPI CNC Collet Chuck"
  },
  {
    src: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-2-1.jpg",
    alt: "VPI CNC Collet Chuck product view"
  },
  {
    src: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-15-scaled.jpg",
    alt: "VPI precision-machined components"
  },
  {
    src: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-7-1.jpg",
    alt: "VPI precision manufacturing product"
  }
];

export default function HeroScrollMedia() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -0.7]);
  const opacities = [
    useTransform(scrollYProgress, [0, 0.18, 0.34], [1, 1, 0]),
    useTransform(scrollYProgress, [0.18, 0.35, 0.52], [0, 1, 0]),
    useTransform(scrollYProgress, [0.35, 0.58, 0.78], [0, 1, 0]),
    useTransform(scrollYProgress, [0.62, 0.82, 1], [0, 1, 1]),
  ];

  return (
    <div ref={ref} className="hero-scroll-media" aria-hidden="true">
      {media.map((item, index) => (
        <motion.img
          key={item.src}
          className="hero-media-layer"
          src={item.src}
          alt={item.alt}
          style={{ opacity: opacities[index], x, y, scale, rotate }}
          loading={index === 0 ? "eager" : "lazy"}
        />
      ))}
    </div>
  );
}
