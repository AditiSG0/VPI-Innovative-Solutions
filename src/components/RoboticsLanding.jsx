import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import "./RoboticsLanding.css";

const VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";
const EASE = [0.16, 1, 0.3, 1];

export default function RoboticsLanding() {
  return <section className="robotics-landing">
    <motion.nav className="robotics-nav" initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: EASE }}>
      <Link className="robotics-brand" to="/industries">VPI / ROBOTICS</Link>
      <div className="robotics-nav-tags"><span>PRECISION</span><span>AUTOMATION</span><span>RBT / 03</span></div>
      <Link className="robotics-plus" to="/contact" aria-label="Contact VPI"><Plus size={18}/></Link>
    </motion.nav>

    <motion.div className="robotics-video-wrap" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.8, ease: EASE }}>
      <video autoPlay muted loop playsInline preload="auto" src={VIDEO} aria-label="Robotics manufacturing video" />
      <div className="robotics-video-shade" />
    </motion.div>

    <motion.div className="robotics-footer" initial={{ y: 20 }} animate={{ y: 0 }} transition={{ delay: .5, duration: 1, ease: EASE }}>
      <div className="robotics-footer-copy">
        <motion.span className="robotics-subtitle" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .6, duration: .8, ease: EASE }}>PRECISION ENGINEERING / ROBOTIC SYSTEMS</motion.span>
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .8, duration: .8, ease: EASE }}>Robotics</motion.h1>
        <motion.p initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .8, duration: .8, ease: EASE }}>Lightweight, high-strength components enabling the next generation of automation.</motion.p>
      </div>
      <motion.div className="robotics-footer-actions" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: .8, ease: EASE }}>
        <Link to="/contact">CONTACT VPI <Plus size={14}/></Link>
        <Link to="/industries">ALL INDUSTRIES</Link>
      </motion.div>
    </motion.div>
  </section>;
}
