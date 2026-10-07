import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const started = performance.now();
    let raf;
    const tick = (now) => {
      const elapsed = now - started;
      const next = Math.min(100, Math.round((elapsed / 1450) * 100));
      setProgress(next);
      if (next < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setVisible(false), 420);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return <AnimatePresence>
    {visible && <motion.div className="vpi-preloader" initial={{opacity:1}} exit={{opacity:0}} transition={{duration:.45,ease:[.16,1,.3,1]}}>
      <div className="vpi-preloader-grid" />
      <motion.div className="vpi-preloader-image" initial={{scale:1.12}} animate={{scale:1}} transition={{duration:1.8,ease:[.16,1,.3,1]}} />
      <div className="vpi-preloader-content">
        <div className="vpi-preloader-top"><span>VPI</span><span>INNOVATIVE SOLUTIONS</span></div>
        <div className="vpi-preloader-centre">
          <motion.div initial={{y:35,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.15,duration:.75,ease:[.16,1,.3,1]}} className="vpi-preloader-title">PRECISION<br/><em>IN MOTION.</em></motion.div>
          <div className="vpi-preloader-meta"><span>PRECISION ENGINEERING</span><span>01 / 100</span></div>
        </div>
        <div className="vpi-preloader-bottom">
          <span>LOADING SYSTEM</span>
          <div className="vpi-preloader-line"><motion.i animate={{scaleX:progress/100}} transition={{duration:.15}} /></div>
          <strong>{String(progress).padStart(2,'0')}</strong>
        </div>
      </div>
      <motion.div className="vpi-preloader-curtain curtain-a" initial={{scaleX:1}} animate={{scaleX:0}} transition={{delay:1.45,duration:.8,ease:[.76,0,.24,1]}} />
      <motion.div className="vpi-preloader-curtain curtain-b" initial={{scaleX:1}} animate={{scaleX:0}} transition={{delay:1.52,duration:.8,ease:[.76,0,.24,1]}} />
    </motion.div>}
  </AnimatePresence>;
}
