import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./IndustryVideoHero.css";

/**
 * Full-screen industry hero.
 * The poster remains visible until the locally hosted MP4 can play.
 * Video files are intentionally kept in public/videos/industries/.
 */
export default function IndustryVideoHero({ industry, video, poster, eyebrow, description }) {
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="industry-video-hero" data-testid="industry-video-hero">
      <div className="industry-video-hero-media">
        {poster ? <img className="industry-video-poster" src={poster} alt="" aria-hidden="true" /> : null}
        {video && !videoFailed ? (
          <video
            className={`industry-video-background ${videoReady ? "is-ready" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            <source src={video} type="video/mp4" />
          </video>
        ) : null}
        <div className="industry-video-shade" />
        <div className="industry-video-grid" />
      </div>

      <motion.div className="industry-video-nav" initial={{ y: -18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .75 }}>
        <Link to="/industries" className="industry-video-brand">VPI / INDUSTRIES</Link>
        <div className="industry-video-tags"><span>PRECISION</span><span>ENGINEERING</span><span>VPI / 0{industry === "Automobile" ? "1" : industry === "Electronics" ? "2" : industry === "Medical" ? "3" : "4"}</span></div>
        <Link to="/contact" className="industry-video-contact" aria-label="Contact VPI"><ArrowUpRight size={18}/></Link>
      </motion.div>

      <motion.div className="industry-video-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .25 }}>
        <span className="industry-video-eyebrow">{eyebrow}</span>
        <h1>{industry}</h1>
        <p>{description}</p>
        <div className="industry-video-actions">
          <Link to="/contact">DISCUSS YOUR REQUIREMENTS <ArrowUpRight size={15}/></Link>
          <Link to="/industries">ALL INDUSTRIES</Link>
        </div>
      </motion.div>

      <div className="industry-video-bottom"><span>VPI INNOVATIVE SOLUTIONS</span><span><ArrowDown size={14}/> SCROLL TO EXPLORE</span></div>
    </section>
  );
}
