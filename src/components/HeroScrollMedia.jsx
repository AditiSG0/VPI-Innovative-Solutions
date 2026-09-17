import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const media = [
  {
    src: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-3-1.jpg",
    alt: "VPI CNC Collet Chuck"
  },
  {
    src: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/mac-2.png",
    alt: "VPI CNC machine"
  },
  {
    src: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/mec-3.png",
    alt: "VPI precision machining equipment"
  },
  {
    src: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/Miyano-machine.png",
    alt: "VPI CNC machining equipment"
  }
];

export default function HeroScrollMedia() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -1.4]);
  const opacities = [
    useTransform(scrollYProgress, [0, 0.18, 0.36], [1, 1, 0]),
    useTransform(scrollYProgress, [0.18, 0.4, 0.58], [0, 1, 0]),
    useTransform(scrollYProgress, [0.4, 0.62, 0.82], [0, 1, 0]),
    useTransform(scrollYProgress, [0.64, 0.86, 1], [0, 1, 1]),
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
