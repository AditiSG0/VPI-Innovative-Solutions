import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function Readout({ sx, sy }) {
  const textX = useTransform(sx, (v) => `X ${String(Math.max(0, Math.round(v))).padStart(4, "0")}`);
  const textY = useTransform(sy, (v) => `Y ${String(Math.max(0, Math.round(v))).padStart(4, "0")}`);
  return <><motion.span>{textX}</motion.span><motion.span>{textY}</motion.span></>;
}

export default function Crosshair() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 420, damping: 42, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 420, damping: 42, mass: 0.4 });
  useEffect(() => {
    const move = (event) => { x.set(event.clientX); y.set(event.clientY); };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);
  return (
    <div className="crosshair" data-testid="cursor-crosshair" aria-hidden="true">
      <motion.div className="crosshair-line crosshair-v" style={{ x: sx }} />
      <motion.div className="crosshair-line crosshair-h" style={{ y: sy }} />
      <motion.div className="crosshair-readout" style={{ x: sx, y: sy }}><Readout sx={sx} sy={sy} /></motion.div>
    </div>
  );
}
