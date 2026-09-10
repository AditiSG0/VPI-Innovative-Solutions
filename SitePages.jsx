import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, Magnetic, Marquee, MaskedLine, Reveal, ScrollText, spotlightMove } from "@/components/motion";
import FacilitySection from "@/components/FacilitySection";
import PremiumLine from "@/components/PremiumLine";
import StatementScene from "@/components/StatementScene";

gsap.registerPlugin(ScrollTrigger);
import { Button } from "@/components/ui/button";
import PrecisionScene from "@/components/PrecisionScene";
import QuoteForm from "@/components/QuoteForm";

const factoryImage = "https://vpiinnovativesolutions.com/wp-content/uploads/2025/05/upscalemedia-transformed.png";
const productImage = "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-3-1.jpg";
const facilityImages = [
  "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/mac-2.png",
  "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/mec-3.png",
  "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/Miyano-machine.png",
  "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-24-at-11.37.04_de9b4444.jpg",
  "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-7-1.jpg"
];

const industries = [
  ["Automotive", "/industries/automotive", "High-performance precision components for mobility innovation."],
  ["Electronics", "/industries/electronics", "Intricate parts for next-generation technology."],
  ["Robotics", "/industries/robotics", "Engineered solutions for automation systems."],
  ["Medical", "/industries/medical", "Precision components for life-saving devices."],
  ["Die & mould", "/industries/die-mould", "Complex tooling components built for accuracy and repeatability."],
  ["Energy", "/industries/energy", "Precision-engineered components for demanding energy applications."],
  ["Food", "/industries/food", "Hygienic, reliable components for food processing and packaging."],
  ["Advanced Critical R&D", "/industries/critical-rd", "High-accuracy components for mission-critical and specialized applications."],
  ["Telecom", "/industries/telecom", "Precision components for high-frequency and communication systems."],
];

const industryContent = {
  automotive: { name: "Automotive Industry", number: "01", lead: "High-performance parts for mobility innovation.", copy: "VPI Innovative Solutions supports automotive applications with precision-engineered components designed for reliability, consistency and demanding production environments.", tags: ["PRECISION MACHINING", "HIGH-VOLUME PRODUCTION", "CRITICAL COMPONENTS", "QUALITY CONTROL"] },
  electronics: { name: "Electronics Industry", number: "02", lead: "Intricate parts for next-gen technology.", copy: "We manufacture intricate components and assemblies where dimensional accuracy, surface finish and repeatability are essential to electronic systems.", tags: ["MICRO-COMPONENTS", "ENCLOSURES", "PRECISION MACHINING", "SURFACE FINISH"] },
  robotics: { name: "Robotics Industry", number: "03", lead: "Engineered solutions for automation systems.", copy: "Our machining capabilities support automation and robotics with repeatable components, fixtures and complex machined interfaces.", tags: ["AUTOMATION", "COMPLEX GEOMETRY", "FIXTURES", "REPEATABILITY"] },
  medical: { name: "Medical Industry", number: "04", lead: "Precision components for life-saving devices.", copy: "VPI delivers precision-machined components for medical applications where dimensional integrity, cleanliness and consistent quality are critical.", tags: ["MEDICAL COMPONENTS", "TIGHT TOLERANCES", "INSPECTION", "CRITICAL APPLICATIONS"] },
  "die-mould": { name: "Die & Mold Industry", number: "05", lead: "Precision where tooling geometry matters.", copy: "We support die and mold applications with complex geometries, advanced CNC processes and controlled finishing for demanding tooling requirements.", tags: ["TOOL & DIE STEELS", "COMPLEX GEOMETRY", "EDM", "PRECISION GRINDING"] },
  energy: { name: "Energy Industry", number: "06", lead: "Precision-engineered components for demanding environments.", copy: "Our advanced machining processes support high-performance energy components requiring material expertise, stability and dimensional control.", tags: ["HIGH-PERFORMANCE MATERIALS", "MULTI-AXIS CNC", "TRACEABILITY", "VALIDATION"] },
  food: { name: "Food Industry", number: "07", lead: "Hygienic precision for food processing and packaging.", copy: "We manufacture precision-engineered components and assemblies for food processing, packaging and automation, designed for hygiene, reliability and precision.", tags: ["SS304 / SS316 / SS316L", "HYGIENIC DESIGN", "ELECTROPOLISHING", "CONTAMINATION-FREE PACKAGING"] },
  "critical-rd": { name: "Advanced Critical R&D", number: "08", lead: "Precision for mission-critical and specialized applications.", copy: "VPI manufactures components for advanced applications demanding high accuracy, stability and material performance, from prototype validation to production-ready runs.", tags: ["5-AXIS CNC", "WIRE EDM", "MICRO-MACHINING", "CMM VALIDATION"] },
  telecom: { name: "Telecom Industry", number: "09", lead: "Precision components for communication systems.", copy: "We support telecom applications with high-precision components designed around dimensional accuracy, signal integrity and repeatable production.", tags: ["RF COMPONENTS", "MICRO-COMPONENTS", "HIGH PRECISION", "REPEATABLE PRODUCTION"] },
};

const vgRange = [
  ["VG-20 A8-80", "A2-8", "3500", "23", "29.4 (3000)", "63.7 (6500)", "10", "5–60"],
  ["VG-20 A6-60", "A2-6", "4000", "11.35", "19.6 (2000)", "42.1 (4300)", "3", "2–25"],
  ["VG-20 FL 220-80", "220 (h6)", "6000", "5.5", "29.4 (3000)", "52.9 (5400)", "8", "3–42"],
  ["VG-20 FL 110-25", "110 mm (h6)", "5000", "14.1", "33 (7260)", "63.7 (6500)", "10", "5–60"],
  ["VG-20 FL 170-42", "170 mm (h6)", "4000", "16", "33 (7260)", "57.75 (12705)", "10", "10–80"],
  ["VG-20 FL 170-60", "170 mm (h6)", "3500", "23", "24.5 (2500)", "57.75 (12705)", "10", "10–80"],
  ["VG-20 A5-42", "A2-5", "5000", "6.35", "19.6 (2000)", "52.9 (5400)", "8", "3–42"],
  ["VG-20 A4-25", "A2-4", "6000", "5.1", "29.4 (3000)", "42.1 (4300)", "3", "2–25"],
  ["VO-20 A6-60", "M83 × 2.0p", "69", "—", "M87 × 1.5p", "106.36", "133", "165"],
  ["VG-20 A8-80", "M80 × 2.0p", "91", "—", "M100 × 1.5", "139.7", "171", "220"],
];

const mediaArticles = [
  { number: "01", slug: "precision-machining", tag: "CAPABILITIES", date: "2025", read: "VPI / CNC", title: "Precision Machining", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-7-1.jpg", excerpt: "Advanced CNC technologies for high-accuracy components, custom tooling and production-ready manufacturing.", body: ["VPI Innovative Solutions specializes in precision machining, delivering high-accuracy parts and custom tooling with speed, consistency and uncompromising quality.", "Our capabilities include multi-axis milling, turn-mill, Swiss turn, EDM and multi-axis grinding, supported by a state-of-the-art quality department powered by Mitutoyo.", "From prototypes to large-scale production and complex, application-specific components, our experienced team and advanced infrastructure are built around your exact specifications."] },
  { number: "02", slug: "manufacturing-excellence", tag: "INDUSTRIES", date: "2025", read: "VPI / QUALITY", title: "Manufacturing Excellence", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-2-1.jpg", excerpt: "Precision, reliability and consistency across medical, electronics, automotive, aerospace and other critical industries.", body: ["At VPI Innovative Solutions, manufacturing excellence is delivered through advanced CNC technologies and disciplined quality systems.", "Our focus is on the part, the process and the application. We combine precision machining with measurement, traceability and process control to deliver reliable components.", "The result is a manufacturing partner capable of supporting demanding applications from prototype development through high-volume production."] },
  { number: "03", slug: "legacy-to-innovation", tag: "COMPANY HISTORY", date: "1983 →", read: "VPI / JOURNEY", title: "From Vision to Innovation", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-15-scaled.jpg", excerpt: "A manufacturing journey shaped by engineering, learning, quality systems and continuous innovation.", body: ["VP Industries was established in 1983 by Late Shri V. Gowrishankar with a vision to generate employment and uplift non-technical individuals through engineering.", "The company expanded into machining services and industrial support, later working with L&T and Automotive Axles Ltd. and learning world-class manufacturing systems and ISO standards.", "In 2006, VPI Innovative Solutions was founded to deliver advanced engineering. The VG-20 Series followed in 2007, and today's multi-axis CNC capabilities continue that engineering legacy."] },
];

const vrImage = "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-6.jpg";
const vcImage = "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-2-1.jpg";

const productFamilies = [
  { slug: "vg-series", number: "01", name: "CNC Collet Chucks", sub: "VG SERIES", path: "/products/cnc-collet-chucks", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-3-1.jpg", copy: "High-precision CNC collet chucks engineered for demanding machining applications." },
  { slug: "vr-series", number: "02", name: "Precision Components", sub: "CUSTOM MACHINING", path: "/products/revolving-centres", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/compo6.jpg", copy: "High-precision turned and machined components manufactured to application-specific specifications." },
  { slug: "vc-series", number: "03", name: "Specialized Components", sub: "ENGINEERED SOLUTIONS", path: "/products/quick-change-collets", image: "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/compo7.jpg", copy: "Custom tooling and complex components produced with controlled processes and micron-level accuracy." },
];

const vgHeaders = ["Model", "Spindle", "Max RPM", "Weight (kg)", "Operating force kN", "Clamping force kN", "Sleeve stroke mm", "Min–Max L mm"];

const vrHeaders = ["Model", "Shank", "Max RPM", "Radial load kN", "Point runout mm", "Weight (kg)"];
const vrRange = [
  ["VR-2", "MT2", "7,000", "1.8", "0.003", "0.6"],
  ["VR-3", "MT3", "6,000", "3.2", "0.003", "1.1"],
  ["VR-4", "MT4", "5,000", "5.5", "0.004", "2.3"],
  ["VR-5", "MT5", "4,000", "9.0", "0.005", "4.6"],
  ["VR-6", "MT6", "3,000", "14.5", "0.005", "8.9"],
];

const vcHeaders = ["Model", "Clamping range mm", "Repeatability mm", "Changeover", "Compatible chucks"];
const vcRange = [
  ["VC-20", "2–20", "0.005", "< 10 s", "VG-20 A4 / A5 / A6"],
  ["VC-32", "3–32", "0.005", "< 10 s", "VG-20 A6 / FL 110"],
  ["VC-42", "4–42", "0.008", "< 15 s", "VG-20 FL 170-42"],
  ["VC-65", "6–65", "0.008", "< 15 s", "VG-20 A8 / FL 220"],
];

function PageHero({ number, eyebrow, title, accent, lead, image = factoryImage }) {
  return <section className="inner-hero" data-theme="dark" data-testid="page-hero"><div className="inner-hero-image"><motion.img src={image} alt="Precision engineering environment" initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: EASE }} /><div /></div><div className="page-pad inner-hero-content"><motion.span className="eyebrow cyan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>{eyebrow} / {number}</motion.span><h1><MaskedLine delay={0.2}>{title}</MaskedLine><MaskedLine delay={0.32}><em>{accent}</em></MaskedLine></h1><motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }}>{lead}</motion.p></div><span className="inner-hero-scroll"><ArrowDown size={14} /> SCROLL TO EXPLORE</span></section>;
}

function PageIntro({ kicker, title, children, number = "02" }) {
  return <section className="page-intro page-pad" data-theme="steel" data-testid="page-intro"><Reveal className="section-number">{number} <span>/ 06</span></Reveal><Reveal delay={0.08}><span className="eyebrow cyan">{kicker}</span><h2>{title}</h2>{children}</Reveal></section>;
}

function LinkButton({ to, children, testId }) {
  return <Magnetic><Button asChild className="quote-button"><Link to={to} data-testid={testId}>{children} <ArrowUpRight size={15} /></Link></Button></Magnetic>;
}

function MetricStrip({ items }) {
  return <div className="metric-strip page-pad" data-theme="black">{items.map(([value, label]) => <div key={label} data-testid={`metric-${label.toLowerCase().replaceAll(" ", "-")}`}><strong>{value}</strong><span>{label}</span></div>)}</div>;
}

function SpecTable({ headers, rows, prefix }) {
  return <div className="spec-range-scroll" data-reveal><table className="spec-range-table" data-testid={`${prefix}-table`}><thead><tr>{headers.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={`${row[0]}-${row[1]}`} data-testid={`${prefix}-row-${row[0].toLowerCase().replaceAll(" ", "-")}`}>{row.map((cell, cellIndex) => <td key={cellIndex} className={cellIndex === 0 ? "model-cell" : ""}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function RangeSection({ kicker, title, accent, note, headers, rows, prefix }) {
  return <section className="spec-range page-pad" data-theme="steel" data-testid={`${prefix}-section`}><div className="section-heading-row"><div><span className="eyebrow cyan">{kicker}</span><h2>{title}<br /><em>{accent}</em></h2></div><span className="spec-range-note">{note}</span></div><SpecTable headers={headers} rows={rows} prefix={prefix} /></section>;
}

const marqueeItems = ["Precision empowered", "Innovation delivered", "Runout ≤ 0.005 mm", "Balance grade G 2.5", "VG · VR · VC Series", "Machining since 1998"];

const manifestoChapters = [
  ["01", "We hold what others approximate.", "A tolerance is a promise. We build the process that keeps it — from first toolpath to final inspection."],
  ["02", "Speed means nothing without repeatability.", "The thousandth part must match the first. That is the only metric that matters at production scale."],
  ["03", "Engineering is a conversation.", "We design with your team, not just for your drawing — so the part that arrives is the part you meant."],
];

export function HomePage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const contentFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray(".industry-col", gridRef.current).forEach((col, index) => {
        const drift = [80, -48, 112][index] || 70;
        gsap.fromTo(col, { y: drift }, { y: -drift, ease: "none", scrollTrigger: { trigger: gridRef.current, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      });
    });
    return () => media.revert();
  }, []);
  return <div data-testid="home-page">
    <section ref={heroRef} className="hero-section home-hero" data-theme="dark">
      <motion.img className="hero-video" style={{ y: imageY }} src={factoryImage} alt="VPI Innovative Solutions precision manufacturing" data-testid="hero-video" />
      <div className="hero-scrim" /><div className="hero-grid" />
      <motion.div className="hero-scan" initial={{ top: "-2%", opacity: 0 }} animate={{ top: "102%", opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }} />
      <motion.div className="hero-content page-pad" style={{ opacity: contentFade }}>
        <div className="hero-topline"><span className="eyebrow">VPI INNOVATIVE SOLUTIONS / 01</span><span className="hero-status"><i /> PRECISION EMPOWERED</span></div>
        <div className="hero-heading-wrap">
          <motion.p className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}>PRECISION ENGINEERING</motion.p>
          <h1><MaskedLine delay={0.28}>PRECISION</MaskedLine><MaskedLine delay={0.37}><em>EMPOWERED.</em></MaskedLine><MaskedLine delay={0.46}>INNOVATION</MaskedLine><MaskedLine delay={0.55}><em>DELIVERED.</em></MaskedLine></h1>
          <motion.p className="hero-subhead" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.78, ease: EASE }}>TRANSFORMING CONCEPTS INTO REALITY</motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.92, ease: EASE }}><LinkButton to="/contact" testId="hero-quote-button">GET INSTANT QUOTE</LinkButton></motion.div>
        </div>
        <div className="hero-bottom"><span>LEADERS IN CNC COMPONENT<br />MANUFACTURING</span><span className="scroll-prompt"><ArrowDown size={15} /> EXPLORE THE SYSTEM</span><span>VPI / 01 — 06</span></div>
      </motion.div>
    </section>
    <Marquee items={["PRECISION", "QUALITY", "CUSTOMIZATION", "INNOVATION", "RELIABILITY", "CONSISTENCY"]} />
    <PageIntro number="02" kicker="ABOUT US" title={<>Your trusted partner for<br /><em>precision machining.</em></>}><p className="page-lead">We streamline precision manufacturing, specializing in CNC collet chucks and high-precision turned and machined components. We deliver high-accuracy parts and custom tooling with speed, consistency, and uncompromising quality.</p><LinkButton to="/about">LEARN MORE</LinkButton></PageIntro>
    <StatementScene />
    <section className="manifesto page-pad" data-theme="dark" data-testid="manifesto-section"><span className="eyebrow cyan">OUR CORE VALUES / 03</span>{[["01","FOCUSED ON INNOVATION","Innovation powers our response to the evolving needs of modern manufacturing."],["02","RESILIENT IN EVERY CHALLENGE","We build process discipline and engineering confidence into every component."],["03","DEDICATED TO CONTINUOUS GROWTH","Continuous improvement keeps our capabilities moving with our customers."],["04","GROUNDED IN PRECISION","In every micron we machine and every decision we make, we carry forward a quiet promise to create with purpose and deliver with precision."]].map(([number,line,note], index) => <Reveal key={number} delay={index * 0.05}><div className="manifesto-chapter"><span className="manifesto-number">VALUE {number}</span><h2>{line}</h2><p>{note}</p></div></Reveal>)}</section>
    <section className="home-overview page-pad" data-theme="steel"><Reveal className="overview-image"><img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/05/upscalemedia-transformed.png" alt="VPI leadership and engineering" /></Reveal><Reveal className="overview-copy" delay={0.1}><span className="eyebrow cyan">04 / MANUFACTURING CAPABILITIES</span><h2>Excellence for<br /><em>every industry.</em></h2><p className="body-copy">At VPI Innovative Solutions, we deliver manufacturing excellence for the Medical, Electronics, Automotive, and Aerospace industries through advanced CNC technologies and a state-of-the-art quality department powered by Mitutoyo.</p><LinkButton to="/services">EXPLORE SERVICES</LinkButton></Reveal></section>
    <section className="process-section page-pad" data-theme="dark"><Reveal><div className="section-heading-row"><div><span className="eyebrow cyan">05 / FROM DRAWING TO DELIVERY</span><h2>Four steps.<br /><em>One standard.</em></h2></div><Link to="/contact" className="text-link">GET INSTANT QUOTE <ArrowUpRight size={15} /></Link></div></Reveal><ProcessSteps /></section>
    <section className="industry-overview page-pad" data-theme="dark"><Reveal><div className="section-heading-row"><div><span className="eyebrow cyan">06 / INDUSTRIES WE MAKE AN IMPACT</span><h2>Manufacturing for<br /><em>real applications.</em></h2></div><Link to="/industries/automotive" className="text-link">EXPLORE INDUSTRIES <ArrowUpRight size={15} /></Link></div></Reveal><div className="industry-parallax" ref={gridRef}>{[[0,3,6],[1,4,7],[2,5,8]].map((column,colIndex)=><div className="industry-col" key={colIndex}>{column.map((itemIndex)=>{const [name,path,copy]=industries[itemIndex];return <Link to={path} className="industry-card" key={path} onMouseMove={spotlightMove}><span className="service-number">0{itemIndex+1}</span><h3>{name}</h3><p>{copy}</p><ArrowUpRight size={17}/></Link>})}</div>)}</div></section>
    <section className="home-cta page-pad" data-theme="black"><Reveal><span className="eyebrow cyan">07 / OUR VISION</span><h2>Smart. Sustainable.<br /><em>Forward-thinking.</em></h2><p className="page-lead">We empower industries with smart, sustainable, and forward-thinking solutions by integrating innovation with responsibility.</p><LinkButton to="/contact">START A CONVERSATION</LinkButton></Reveal></section>
  </div>;
}

function ProcessSteps() {
  const steps = [
    ["01","Share your requirement","Upload a drawing or share the component requirement. Include material, quantity, finish and critical dimensions.","DRAWING / CAD","https://vpiinnovativesolutions.com/wp-content/uploads/2025/08/WhatsApp-Image-2025-08-18-at-12.31.08_8fe9b6be.jpg"],
    ["02","Engineering review","Our engineering team reviews the application, tolerance stack and manufacturability, then identifies the right machining route.","DFM / PROCESS PLAN","https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/compo3.jpg"],
    ["03","Precision manufacturing","The component moves through the appropriate CNC process, supported by multi-axis milling, turn-mill, Swiss turn, EDM, grinding and controlled inspection.","CNC / IN-PROCESS","https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-7-1.jpg"],
    ["04","Inspection & delivery","Dimensional checks and quality controls verify the finished component before documentation, packing and delivery.","CMM / RELEASE","https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-2-1.jpg"],
  ];
  return <div className="process-steps">{steps.map(([number,title,copy,meta,image],index)=><Reveal key={number} delay={index*0.07} className="process-step-wrap"><article className="process-step" onMouseMove={spotlightMove}><div className="process-step-image"><img src={image} alt={title} loading="lazy" /><span className="process-step-chip">{meta}</span></div><div className="process-step-copy"><div className="process-step-head"><span className="service-number">{number}</span><span className="process-step-index">STAGE {number}</span></div><h3>{title}</h3><p>{copy}</p><span className="process-arrow">NEXT STAGE <ArrowUpRight size={14} /></span></div></article></Reveal>)}</div>;
}

function DetailPage({ number, eyebrow, title, accent, lead, kicker, body, items, cta = "/contact", image = factoryImage }) {
  return <div data-testid="detail-page"><PageHero number={number} eyebrow={eyebrow} title={title} accent={accent} lead={lead} image={image} /><PageIntro number="02" kicker={kicker} title={<>Precision that<br /><em>delivers.</em></>}><ScrollText className="page-lead" text={body} /><div className="detail-list">{items.map((item)=><div key={item}><CheckCircle2 size={16}/><span>{item}</span></div>)}</div><LinkButton to={cta}>LET’S TALK</LinkButton></PageIntro><MetricStrip items={[["±5μm","Tolerance precision"],["0.5 mm","Micro-machining"],["5-axis","CNC machining"]]} /></div>;
}

export function AboutPage() { return <><DetailPage number="01" eyebrow="COMPANY" title="Your trusted" accent="partner." lead="Precision machining that delivers high-accuracy parts, custom tooling, speed and consistency." kicker="ABOUT US" body="We streamline precision manufacturing, specializing in CNC collet chucks and high-precision turned and machined components. From prototypes to large-scale production and complex, application-specific components, our experienced team and advanced infrastructure deliver precision, reliability, and on-time performance tailored to your exact specifications." items={["Advanced CNC technologies","State-of-the-art quality department powered by Mitutoyo","Prototypes to large-scale production"]} image={factoryImage} /></>; }
export function ManagementPage() { return <DetailPage number="02" eyebrow="COMPANY" title="Engineering-led" accent="leadership." lead="Technical capability, process discipline and a long-term view of manufacturing." kicker="MANAGEMENT" body="VPI Innovative Solutions is built around engineering thinking, manufacturing experience and a commitment to continuous improvement. Our focus remains on quality, reliability and delivering solutions tailored to exact specifications." items={["Engineering-led decisions","Quality-first manufacturing","Continuous improvement"]} image={factoryImage} />; }
export function CSRPage() { return <DetailPage number="03" eyebrow="COMPANY" title="Innovation with" accent="responsibility." lead="Smart, sustainable and forward-thinking solutions for industry." kicker="CORPORATE SOCIAL RESPONSIBILITY" body="By integrating innovation with responsibility, we drive meaningful progress. Our approach combines technology, efficiency, and environmental care while building stronger capabilities and opportunities around us." items={["Technology and efficiency","Environmental care","Skills and capability development"]} image={factoryImage} />; }
export function VisionPage() { return <DetailPage number="04" eyebrow="COMPANY" title="Smart, sustainable," accent="forward-thinking." lead="Together, we’re building a better, brighter and more resilient tomorrow." kicker="OUR VISION" body="We empower industries with smart, sustainable, and forward-thinking solutions. By integrating innovation with responsibility, we drive meaningful progress. Our approach combines technology, efficiency, and environmental care." items={["Smart industrial solutions","Sustainable thinking","Forward-looking engineering"]} image={factoryImage} />; }
export function HistoryPage() { return <><DetailPage number="05" eyebrow="COMPANY" title="From vision to" accent="innovation." lead="A manufacturing journey shaped by engineering, learning and continuous growth." kicker="OUR JOURNEY" body="VP Industries was established in 1983 by Late Shri V. Gowrishankar. From machining services and industrial support to VPI Innovative Solutions and the VG-20 Series, every stage of the journey has strengthened our engineering legacy." items={["1983 foundation","2006 VPI Innovative Solutions","2007 VG-20 Series","2020s CNC evolution"]} image="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-15-scaled.jpg" /><FacilitySection /></>; }
export function WhyUsPage() { return <DetailPage number="06" eyebrow="COMPANY" title="Precision, quality," accent="customization." lead="A single-source manufacturing partner for performance-driven solutions." kicker="WHY US" body="We deliver high-accuracy parts and custom tooling with speed, consistency, and uncompromising quality. With cutting-edge capabilities in multi-axis milling, turn-mill, Swiss turn, EDM, and multi-axis grinding, VPI serves as your trusted single-source partner for performance-driven manufacturing solutions." items={["Instant price quotes","Dedicated machines","Dedicated team","Comprehensive services"]} image={factoryImage} />; }
export function RDPage() { return <DetailPage number="07" eyebrow="COMPANY" title="Advanced" accent="critical R&D." lead="Precision components for specialized applications that demand the highest levels of accuracy, stability and material performance." kicker="RESEARCH & DEVELOPMENT" body="With multi-axis CNC machining, turn-mill centers, 5-axis Wire EDM and micro-machining technology, we achieve fine surface finishes and dimensional accuracies within 10 microns on complex geometries. Our process control systems ensure stability, traceability and repeatability from prototype validation to production-ready runs." items={["5-axis Wire EDM","Micro-machining","Difficult-to-machine materials","CMM-based dimensional inspection"]} image="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/compo3.jpg" />; }

export function IndustryPage({ data }) { return <div data-testid={`industry-page-${data.number}`}><PageHero number={data.number} eyebrow="INDUSTRY" title={data.name} accent="in motion." lead={data.lead} /><PageIntro number="02" kicker="APPLICATION / ENGINEERING" title={<>Precision for<br /><em>real conditions.</em></>}><p className="page-lead">{data.copy}</p><LinkButton to="/contact" testId="industry-quote-button">START A BRIEF</LinkButton></PageIntro><section className="industry-detail page-pad" data-theme="steel"><div className="industry-detail-card"><span className="eyebrow cyan">WHERE WE ADD VALUE</span><h2>Control every<br /><em>interface.</em></h2><div className="detail-list">{data.tags.map((tag) => <div key={tag} data-reveal data-testid={`industry-tag-${tag.toLowerCase().replaceAll(" ", "-")}`}><CheckCircle2 size={16} /><span>{tag}</span></div>)}</div></div><div className="industry-detail-image"><img src={productImage} alt={`${data.name} precision component`} /></div></section><MetricStrip items={[["100%", "Traceable process"], ["0.005 mm", "Typical runout"], ["24 h", "Quote response"]]} /></div>; }
export function AutomotivePage() { return <IndustryPage data={industryContent.automotive} />; }
export function ElectronicsPage() { return <IndustryPage data={industryContent.electronics} />; }
export function RoboticsPage() { return <IndustryPage data={industryContent.robotics} />; }
export function MedicalPage() { return <IndustryPage data={industryContent.medical} />; }
export function DieMouldPage() { return <IndustryPage data={industryContent["die-mould"]} />; }
export function EnergyPage() { return <IndustryPage data={industryContent.energy} />; }
export function FoodPage() { return <IndustryPage data={industryContent.food} />; }
export function CriticalRDPage() { return <IndustryPage data={industryContent["critical-rd"]} />; }
export function TelecomPage() { return <IndustryPage data={industryContent.telecom} />; }

export function ServicesPage() { const services=[["01","Multi-axis milling","Advanced CNC milling for complex geometries and high-precision components."],["02","Turn-mill & Swiss turn","Stable, repeatable machining for turned and machined components."],["03","EDM & micro-machining","Fine features, complex contours and dimensional accuracies within demanding specifications."],["04","Grinding & quality control","Multi-axis grinding and Mitutoyo-powered quality control for precision, reliability and consistency."]]; return <div data-testid="services-page"><PageHero number="01" eyebrow="SERVICES" title="Precision" accent="in every process." lead="Your trusted single-source partner for performance-driven manufacturing solutions." image={factoryImage}/><PageIntro number="02" kicker="ON-DEMAND CNC MACHINING SERVICES" title={<>Optimize your<br /><em>manufacturing process.</em></>}><p className="page-lead">Experience precision, quality and customization. Receive instant price quotes for your CNC machining needs by sharing your design files.</p><LinkButton to="/contact">GET INSTANT QUOTE</LinkButton></PageIntro><section className="service-grid page-pad" data-theme="dark">{services.map(([number,title,copy],index)=><Reveal key={number} delay={index*.06} className="service-panel-wrap"><article className="service-panel" onMouseMove={spotlightMove}><span className="service-number">{number}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</section><section className="process-section page-pad" data-theme="steel"><Reveal><div className="section-heading-row"><div><span className="eyebrow cyan">OUR MANUFACTURING PROCESS</span><h2>From requirement<br /><em>to finished part.</em></h2></div></div></Reveal><ProcessSteps/></section></div>; }
export function ProductsPage() { return <div data-testid="products-page"><PageHero number="01" eyebrow="PRODUCTS" title="VPI’s Premium" accent="line." lead="Discover our high-quality metal components and precision engineering solutions." image="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-2-1.jpg" /><PageIntro number="02" kicker="PRODUCTS" title={<>Precision products.<br /><em>Engineered for performance.</em></>}><p className="page-lead">Explore CNC collet chucks and precision-engineered components manufactured to demanding dimensional and application requirements.</p></PageIntro><section className="media-grid page-pad" data-theme="dark">{productFamilies.map((family,index)=><Reveal key={family.path} delay={index*.07} className="media-card-wrap"><Link to={family.path} className="media-card family-card" onMouseMove={spotlightMove}><div className="media-card-image"><img src={family.image} alt={`${family.name} ${family.sub}`} loading="lazy"/></div><div className="media-card-body"><span className="service-number">{family.number} / {family.sub}</span><h3>{family.name}</h3><p>{family.copy}</p><span className="text-link media-toggle">EXPLORE <ArrowUpRight size={14}/></span></div></Link></Reveal>)}</section><section className="product-overview page-pad" data-theme="steel"><Reveal className="product-overview-image"><img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/GROUP-15-scaled.jpg" alt="VPI precision components"/></Reveal><Reveal delay={0.1}><span className="eyebrow cyan">VPI PRECISION COMPONENTS</span><h2>High-quality metal<br /><em>components.</em></h2><p className="page-lead">Discover precision-engineered components manufactured from high-grade alloys with micron-level accuracy for critical industrial applications.</p><LinkButton to="/contact">EXPLORE SERVICES</LinkButton></Reveal></section></div>; }

export function CNCColletChucksPage() { return <div data-testid="cnc-collet-chucks-page"><PageHero number="01" eyebrow="PRODUCTS / VG SERIES" title="CNC Collet" accent="chucks." lead="The heart of your high-performance machine." image="https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/collect-chuck-3-1.jpg" /><PageIntro number="02" kicker="INTERACTIVE ASSEMBLY" title={<>Designed to<br /><em>stay true.</em></>}><p className="page-lead">Explore the VG Series, VPI’s precision CNC collet chuck range engineered for high-performance machining applications.</p></PageIntro><PrecisionScene /><section className="spec-section page-pad" data-theme="dark"><div><span className="eyebrow cyan">VG SERIES / TECHNICAL DATA</span><h2>Full spec,<br /><em>no asterisks.</em></h2><p className="body-copy">The complete VG-20 model range — every spindle interface, speed rating and clamping force, straight from the engineering desk.</p><div className="button-row"><Button asChild className="quote-button"><a href="/VG-Series-Spec-Sheet.pdf" download="VG-Series-Spec-Sheet.pdf" data-testid="spec-download-button">SPEC SHEET <ArrowDown size={15} /></a></Button><LinkButton to="/contact" testId="spec-quote-button">ASK ENGINEERING</LinkButton></div></div><div className="spec-table" data-testid="product-spec-table">{[["Series", "VG-20"], ["Models", "10 configurations"], ["Spindle interfaces", "A2-4 → A2-8 / FL / thread"], ["Max speed", "6,000 rpm"], ["Clamping force", "Up to 63.7 kN"], ["Typical runout", "≤ 0.005 mm"], ["Balance grade", "G 2.5"], ["Application", "CNC turning / milling"]].map(([label, value]) => <div className="spec-row" key={label} data-reveal data-testid={`spec-row-${label.toLowerCase().replaceAll(" ", "-")}`}><span>{label}</span><strong>{value}</strong></div>)}</div></section><RangeSection kicker="FULL SPECIFICATIONS" title="VG-20 series." accent="Every model." note="FORCE VALUES: kN (kgf)" headers={vgHeaders} rows={vgRange} prefix="spec-range" /></div>; }

export function MediaPage() {
  return <div data-testid="media-page"><PageHero number="01" eyebrow="MEDIA" title="See precision" accent="at work." lead="Stories, surfaces and the details behind the cut." /><PageIntro number="02" kicker="LATEST FROM VPI" title={<>The work is<br /><em>the story.</em></>}><p className="page-lead">Shop-floor notes, application briefs and the material moments that make a part perform — straight from the VPI engineering desk.</p></PageIntro><section className="media-grid page-pad" data-theme="dark">{mediaArticles.map((article, index) => <Reveal key={article.slug} delay={index * 0.07} className="media-card-wrap"><Link to={`/media/${article.slug}`} className="media-card" onMouseMove={spotlightMove} data-testid={`media-card-${index + 1}`}><div className="media-card-image"><img src={article.image} alt={article.title} loading="lazy" /></div><div className="media-card-body"><span className="service-number">{article.number} / {article.tag}</span><h3>{article.title}</h3><div className="media-meta"><span>{article.date}</span><span>{article.read}</span></div><p>{article.excerpt}</p><span className="text-link media-toggle" data-testid={`media-article-toggle-${index + 1}`}>READ THE FIELD NOTE <ArrowUpRight size={14} /></span></div></Link></Reveal>)}</section></div>;
}

function FamilyPage({ slug, eyebrow, title, accent, lead, image, kicker, intro, tableNote, headers, rows, metrics }) {
  return <div data-testid={`family-page-${slug}`}><PageHero number="01" eyebrow={eyebrow} title={title} accent={accent} lead={lead} image={image} /><PageIntro number="02" kicker={kicker} title={<>Built for<br /><em>the long cycle.</em></>}><p className="page-lead">{intro}</p><LinkButton to="/contact" testId={`${slug}-quote-button`}>ASK ENGINEERING</LinkButton></PageIntro><RangeSection kicker="FULL SPECIFICATIONS" title="Every model." accent="No asterisks." note={tableNote} headers={headers} rows={rows} prefix={slug} /><MetricStrip items={metrics} /></div>;
}

export function RevolvingCentresPage() { return <FamilyPage slug="revolving-centres" eyebrow="PRODUCTS / VR SERIES" title="Revolving" accent="centres." lead="Live centres that stay true at speed." image={vrImage} kicker="VR SERIES" intro="High-speed revolving centres with sealed precision bearings and hardened points — runout you can measure in single microns, cycle after cycle." tableNote="RUNOUT MEASURED AT POINT" headers={vrHeaders} rows={vrRange} metrics={[["0.003 mm", "Point runout"], ["7,000 rpm", "Max speed"], ["24 h", "Quote response"]]} />; }

export function QuickChangeColletsPage() { return <FamilyPage slug="quick-change-collets" eyebrow="PRODUCTS / VC SERIES" title="Quick-change" accent="collets." lead="Swap setups in seconds. Keep the microns." image={vcImage} kicker="VC SERIES" intro="VC Series collets click into the VG-20 system with sub-ten-second changeovers, so small batches stop costing you big setup time." tableNote="REPEATABILITY AFTER CHANGEOVER" headers={vcHeaders} rows={vcRange} metrics={[["< 10 s", "Changeover"], ["0.005 mm", "Repeatability"], ["24 h", "Quote response"]]} />; }

export function ArticlePage() {
  const { slug } = useParams();
  const article = mediaArticles.find((item) => item.slug === slug);
  if (!article) return <Navigate to="/media" replace />;
  const related = mediaArticles.filter((item) => item.slug !== slug);
  return <div data-testid={`article-page-${article.slug}`}><section className="inner-hero" data-theme="dark" data-testid="article-hero"><div className="inner-hero-image"><img src={article.image} alt={article.title} /><div /></div><div className="page-pad inner-hero-content"><span className="eyebrow cyan">MEDIA / {article.tag} — {article.date} — {article.read}</span><h1>{article.title}</h1><p>{article.excerpt}</p></div></section><section className="article-body-section page-pad" data-theme="dark" data-testid="article-body">{article.body.map((paragraph) => <p key={paragraph.slice(0, 28)} data-reveal>{paragraph}</p>)}<Link to="/media" className="text-link" data-testid="article-back-link">BACK TO MEDIA <ArrowUpRight size={14} /></Link></section><section className="related-section page-pad" data-theme="steel" data-testid="related-articles"><div className="section-heading-row"><div><span className="eyebrow cyan">KEEP READING</span><h2>Related<br /><em>field notes.</em></h2></div></div><div className="media-grid related-grid">{related.map((item) => <Link key={item.slug} to={`/media/${item.slug}`} className="media-card" onMouseMove={spotlightMove} data-testid={`related-article-${item.slug}`}><div className="media-card-image"><img src={item.image} alt={item.title} loading="lazy" /></div><div className="media-card-body"><span className="service-number">{item.number} / {item.tag}</span><h3>{item.title}</h3><p>{item.excerpt}</p><span className="text-link media-toggle">READ THE FIELD NOTE <ArrowUpRight size={14} /></span></div></Link>)}</div></section></div>;
}
const openRoles = [
  ["CNC Turning Programmer", "MYSORE / FULL-TIME", "Fanuc-driven turning cells running VG Series workholding on production-critical parts."],
  ["5-Axis Machinist", "MYSORE / FULL-TIME", "Simultaneous 5-axis work on complex geometry — fixtures, flanges and profiles."],
  ["Quality Engineer", "MYSORE / FULL-TIME", "CMM inspection, runout verification and batch traceability on the metrology bench."],
  ["Tooling Design Apprentice", "MYSORE / APPRENTICESHIP", "Learn fixture and collet design beside senior engineers, on live programs."],
];

export function CareerPage() { return <><DetailPage number="01" eyebrow="CAREER" title="Build the" accent="next cut." lead="Bring curiosity, care and a desire to make things better." kicker="WORK WITH VPI" body="We are always interested in meeting people who care about engineering, craft and the difference a well-made part can make." items={["Learn beside experienced makers", "Work on meaningful applications", "Grow with a precision-first team"]} cta="/contact" /><section className="roles-section page-pad" data-theme="dark" data-testid="roles-section"><Reveal><div className="section-heading-row"><div><span className="eyebrow cyan">OPEN ROLES / 04</span><h2>Join the<br /><em>floor.</em></h2></div><Link to="/contact" className="text-link" data-testid="roles-apply-link">APPLY VIA CONTACT <ArrowUpRight size={15} /></Link></div></Reveal><div className="roles-list">{openRoles.map(([title, tag, copy], index) => <Reveal key={title} delay={index * 0.07} className="role-wrap"><Link to="/contact" className="role-row" onMouseMove={spotlightMove} data-testid={`role-${index + 1}`}><span className="service-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p><span className="role-tag">{tag}</span><ArrowUpRight size={17} /></Link></Reveal>)}</div></section><section className="culture-section page-pad" data-theme="steel" data-testid="culture-section"><Reveal className="culture-image"><img src="https://vpiinnovativesolutions.com/wp-content/uploads/2025/05/upscalemedia-transformed.png" alt="VPI engineering team" loading="lazy" /></Reveal><Reveal className="culture-copy" delay={0.1}><span className="eyebrow cyan">CULTURE / 05</span><h2>Care is a<br /><em>machinable</em> quality.</h2><p className="page-lead">We hire for curiosity and train for precision. If you like your tolerances tight and your questions answered, you will fit in here.</p><div className="detail-list">{["Apprenticeships beside senior machinists", "Modern CNC cells across turning, milling and grinding", "A quality lab where measurement is respected"].map((item) => <div key={item} data-reveal data-testid={`culture-item-${item.toLowerCase().replaceAll(" ", "-").slice(0, 24)}`}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div><LinkButton to="/contact" testId="culture-cta">INTRODUCE YOURSELF</LinkButton></Reveal></section></>; }
export function ContactPage() { return <div data-testid="contact-page"><PageHero number="01" eyebrow="CONTACT" title="Let’s build" accent="what’s next." lead="Bring us the brief. We’ll bring the engineering." /><section className="contact-section page-pad routed-contact" data-theme="steel"><div className="contact-grid"><div className="contact-intro"><span className="eyebrow cyan">START A CONVERSATION</span><h2>Make the<br /><em>complex clear.</em></h2><p className="body-copy">Tell us about your application, material, quantity or tolerance requirements.</p><div className="contact-meta"><span>GENERAL ENQUIRIES</span><a href="mailto:vpisolutions@gmail.com" data-testid="contact-email-link">vpisolutions@gmail.com</a><span>TECHNICAL DESK</span><a href="mailto:tech@vpisolutions.net" data-testid="contact-tech-email-link">tech@vpisolutions.net</a><span>ENGINEERING DESK</span><a href="tel:+919900911202" data-testid="contact-phone-link">+91 99009911202</a></div></div><div className="contact-form-wrap"><div className="form-header"><span>QUOTE / 01</span><span>RESPONSE WITHIN 24H</span></div><QuoteForm /></div></div></section></div>; }
