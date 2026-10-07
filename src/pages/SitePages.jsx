import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, Magnetic, Marquee, MaskedLine, Reveal, spotlightMove } from "@/components/motion";
import { Button } from "@/components/ui/button";
import VpiTimeline from "@/components/VpiTimeline";
import RoboticsShowcase from "@/components/RoboticsShowcase";
import QuoteForm from "@/components/QuoteForm";
import HeroScrollMedia from "@/components/HeroScrollMedia";
import RoboticsLanding from "@/components/RoboticsLanding";
import { CompanyDetail } from "@/components/VpiCompanyDetail";

gsap.registerPlugin(ScrollTrigger);

const VPI = "https://vpiinnovativesolutions.com/wp-content/uploads/2025";
const machineImages = [
  `${VPI}/06/banner-mill-e-700.jpg`,
  `${VPI}/06/mac-2.png`,
  `${VPI}/06/mec-3.png`,
  `${VPI}/06/Miyano-machine.png`,
  `${VPI}/06/WhatsApp-Image-2025-06-24-at-11.37.04_de9b4444.jpg`,
];
const factoryImage = machineImages[0];
const aboutBgImage = "https://vpiinnovativesolutions.com/wp-content/uploads/2025/06/About-us-BG-1.png";
const productImages = {
  collet: `${VPI}/06/collect-chuck-3-1.jpg`,
  lineup: `${VPI}/06/collect-chuck-2-1.jpg`,
  revolving: `${VPI}/06/GROUP-7-1.jpg`,
  revolvingLine: `${VPI}/06/GROUP-6.jpg`,
  components: `${VPI}/06/GROUP-15-scaled.jpg`,
  comp1: `${VPI}/06/compo1.jpg`,
  comp2: `${VPI}/06/compo2.jpg`,
  comp3: `${VPI}/06/compo3.jpg`,
  comp6: `${VPI}/06/compo6.jpg`,
  comp7: `${VPI}/06/compo7.jpg`,
  micro: `${VPI}/08/WhatsApp-Image-2025-08-18-at-12.31.08_8fe9b6be.jpg`,
};

const visionText = [
  "We empower industries with smart, sustainable, and forward-thinking solutions.",
  "By integrating innovation with responsibility, we drive meaningful progress.",
  "Our approach combines technology, efficiency, and environmental care.",
  "Together, we’re building a better, brighter, and more resilient tomorrow.",
];

const industryImages = {
  robotics: "/vpi/industry/robotics.png",
  medical: "/vpi/industry/medical.png",
  electronics: "/vpi/industry/electronics.png",
  automotive: "/vpi/industry/automotive.png",
  aerospace: "/vpi/industry/aerospace.png",
};

const industries = [
  ["Automobile", "/industries/automotive", "Precision components that drive the future of mobility with unmatched durability and performance.", industryImages.automotive],
  ["Electronics", "/industries/electronics", "Micro-precision components for the devices powering our connected world.", industryImages.electronics],
  ["Robotics", "/industries/robotics", "Engineered solutions for automation systems and precision robotic applications.", industryImages.robotics],
  ["Medical", "/industries/medical", "Precision components for life-saving devices and demanding medical applications.", industryImages.medical],
  ["Aerospace", "/aerospace-industry", "Precision components for aviation and space applications where accuracy and reliability matter.", industryImages.aerospace]
];

const industryData = {
  automotive: {
    title: "Automobile Industry",
    hero: "https://in.pinterest.com/pin/473089135859899970/",
    slugTitle: "Automotive Industry",
    image: machineImages[0],
    summary: "At VPI Innovative Solutions, we manufacture high-precision automotive components that meet the industry’s most demanding standards for accuracy, reliability, and performance. From prototypes to large-scale production, our parts support critical systems such as fuel injection, transmission, braking, steering, and sensor assemblies.",
    technical: "With multi-axis CNC machining, turn-mill centers, and sliding head technology, we produce complex geometries with micron-level repeatability. Our inspection lab, powered by Mitutoyo CMM and advanced metrology systems, ensures zero-defect quality assurance at every stage.",
    materials: ["EN Series Steels: EN8, EN19, EN24, EN31", "Case-Hardening Steels: 16MnCr5, 20MnCr5, 16NiCr4, 18CrNiMo7-6, SCM420", "Stainless Steels: SS303, SS304, SS316", "Aluminium Alloys: AL6061, AL7075", "Brass, Copper, and other specialized automotive-grade materials"],
    finishingTitle: "Post-Machining Processes",
    finishing: ["Heat Treatment: Carburizing, case hardening, nitriding, quenching, tempering", "Surface Treatments: Zinc, Nickel, Tin, Phosphate coating, Anodizing, Passivation", "Deburring, Ultrasonic Cleaning, Grinding, and Super-finishing"],
    focusTitle: "Our Commitment",
    focus: "Driven by precision and innovation, VPI Innovative Solutions supports the evolution of modern mobility through components that deliver lightweight design, superior durability, and consistent quality — where every micron matters.",
    gallery: [machineImages[0], machineImages[1], productImages.revolving, productImages.components],
  },
  electronics: {
    title: "Electronics Industry",
    hero: "https://in.pinterest.com/pin/770960029942441388/",
    image: machineImages[1],
    summary: "At VPI Innovative Solutions, we specialize in the manufacture of precision-machined components for the electronics and semiconductor industry, where compactness, accuracy, and surface quality are critical. Our machining systems are optimized for micro-scale components as small as 0.5 mm, ensuring precise dimensional control and consistent quality in every production batch.",
    technical: "Equipped with multi-axis CNC machining, turn-mill centers, and sliding head technology, we produce micro and miniature precision parts with stable dimensional accuracy and burr-free edges.\n\nOur inspection infrastructure, powered by Mitutoyo CMM, profile projectors, and surface roughness measurement systems, ensures full traceability and compliance with electronic component standards.",
    materials: ["Aluminium Alloys: AL6061, AL7075, AL2024", "Brass and Copper Alloys for conductive applications", "Stainless Steels and Engineering Plastics for structural and insulating components"],
    finishingTitle: "Post-Machining & Finishing",
    finishing: ["Anodizing and Passivation for corrosion protection and electrical insulation", "Micro-deburring and Ultrasonic Cleaning for contamination-free surfaces", "Polishing and Super-finishing for high reflectivity and smooth contact surfaces"],
    focusTitle: "Our Focus",
    focus: "With advanced process control and micro-machining capability, VPI Innovative Solutions supports the electronics sector with components that meet stringent dimensional standards, high surface finish requirements, and compact design challenges — ensuring reliability in every precision-built electronic assembly.",
    gallery: [machineImages[1], productImages.comp2, productImages.comp1, `${VPI}/06/compo2.jpg`],
  },
  robotics: {
    title: "Robotics Industry",
    hero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4",
    image: machineImages[2],
    summary: "At VPI Innovative Solutions, we manufacture precision-engineered components used in robotic assemblies, motion systems, and automation modules. Our parts are designed to deliver dimensional accuracy, repeatability, and stability required for robotic actuation, control, and sensor integration.\n\nWe routinely produce components within ±5–6 micron tolerances, ensuring perfect fitment and alignment in complex assemblies.",
    technical: "With multi-axis CNC machining, turn-mill, and sliding head technology, we manufacture intricate components requiring simultaneous operations and close-tolerance control.\n\nDimensional verification is carried out using Mitutoyo CMM systems and precision metrology equipment, ensuring compliance with design specifications.",
    materials: ["Stainless Steels: SS304, SS316, SS416", "Aluminium Alloys: AL6061, AL7075, AL2024", "EN Series Steels: EN8, EN19, EN24", "Case-Hardening Steels: 16MnCr5, 20MnCr5, 16NiCr4, 18CrNiMo7-6, SCM420", "Brass, Copper, and Titanium"],
    finishingTitle: "Post-Machining & Finishing",
    finishing: ["Heat Treatments: Case hardening, carburizing, nitriding, quenching, tempering", "Surface Treatments: Nickel, Zinc, Anodizing, Electroless coatings", "Grinding, Lapping, and Super-finishing for low-friction movement and assembly reliability"],
    focusTitle: "Our Focus",
    focus: "With deep precision engineering expertise and robust inspection systems, VPI Innovative Solutions supports the robotics sector through components that meet tight tolerance requirements, demanding surface finish standards, and complex geometrical challenges — delivering performance where precision defines reliability.",
    gallery: [machineImages[2], machineImages[3], productImages.comp3, productImages.comp7],
  },
  medical: {
    title: "Medical Industry",
    hero: "https://in.pinterest.com/pin/4594305041611213696/",
    image: productImages.comp6,
    summary: "At VPI Innovative Solutions, we manufacture precision components used in medical equipment and critical healthcare devices, where accuracy, reliability, and cleanliness are essential. Our machining processes and inspection controls ensure every part meets stringent biocompatibility and dimensional standards required in the medical domain.",
    technical: "Our infrastructure includes multi-axis CNC machining, turn-mill centers, and sliding head technology, enabling the manufacture of intricate geometries and close-tolerance fits.\n\nEvery process is validated through statistical process control (SPC) and verified using Mitutoyo CMM systems, contour measurement, and surface roughness analysis to maintain full traceability and compliance with customer requirements.",
    materials: ["Stainless Steels: SS304, SS316L, SS410, SS420", "Aluminium Alloys: AL6061, AL7075", "Titanium Alloys: Ti-6Al-4V and medical-grade variants", "Brass and Copper Alloys for electrical and fluidic interfaces", "Engineering Plastics: PEEK, Delrin, PTFE, UHMWPE"],
    finishingTitle: "Post-Machining & Finishing",
    finishing: ["Surface Treatments: Passivation, Electropolishing, Anodizing, Ultrasonic Cleaning", "Heat Treatments: Stress relieving, solution annealing, age hardening", "Micro-deburring, Super-finishing, and Controlled Surface Preparation"],
    focusTitle: "Our Focus",
    focus: "Through advanced process engineering, precision machining, and rigorous quality validation, VPI Innovative Solutions supports the medical sector with components that deliver functional accuracy, mechanical integrity, and long-term reliability in every critical assembly.",
    gallery: [productImages.comp6, productImages.comp2, productImages.comp1, productImages.comp7],
  },
  aerospace: {
    title: "Aerospace Industry",
    hero: "https://in.pinterest.com/pin/565624034459385684/",
    image: industryImages.aerospace,
    summary: "VPI supports aerospace and space applications with precision-engineered, mission-critical components where dimensional accuracy, material performance and repeatability are essential.",
    technical: "Our advanced CNC capabilities support complex aerospace geometries, close tolerances and controlled production. Quality systems and inspection processes are applied throughout manufacturing to maintain consistency and traceability.",
    materials: ["Titanium alloys", "Aerospace-grade stainless steels", "High-strength aluminium alloys", "Nickel-based and other difficult-to-machine alloys"],
    finishingTitle: "Post-Machining & Finishing",
    finishing: ["Precision grinding and super-finishing", "Controlled deburring and surface preparation", "Heat treatment and specialist surface treatments as required"],
    focusTitle: "Our Focus",
    focus: "Precision, repeatability and process control for demanding aviation and space applications.",
    gallery: [industryImages.aerospace, machineImages[0], productImages.comp7, productImages.components],
  },

};

const vgHeaders = ["Model", "Spindle", "Max RPM", "Weight (kg)", "Operating Force (kN/kgf)", "Clamping Force (kN/kgf)", "Sleeve Stroke (mm)", "Min-Max l (mm)", "Min-Max n (mm)", "Min-Max u (mm)"];
const vgRows = [
  ["VG-20 A8-80", "A2-8", "3500", "23", "29.4 (3000)", "63.7 (6500)", "10", "5 - 60", "8 - 52", "7 - 42"],
  ["VG-20 A6-60", "A2-6", "4000", "11.35", "19.6 (2000)", "42.1 (4300)", "3", "2 - 25", "3 - 19", "4 - 22"],
  ["VG-20 FL 220-80", "220 (h6)", "6000", "5.5", "29.4 (3000)", "52.9 (5400)", "8", "3 - 42", "5 - 28", "7 - 42"],
  ["VG-20 FL 110-25", "110 mm (h6)", "5000", "14.1", "33 (7260)", "63.7 (6500)", "10", "5 - 60", "8 - 52", "7 - 66"],
  ["VG-20 FL 170-42", "170 mm (h6)", "4000", "16", "33 (7260)", "57.75 (12705)", "10", "10 - 80", "8 - 68", "5 - 36"],
  ["VG-20 FL 170-60", "170 mm (h6)", "3500", "23", "24.5 (2500)", "57.75 (12705)", "10", "10 - 80", "8 - 68", "7 - 66"],
  ["VG-20 A5-42", "A2-5", "5000", "6.35", "19.6 (2000)", "52.9 (5400)", "8", "3 - 42", "5 - 28", "5 - 36"],
  ["VG-20 A4-25", "A2-4", "6000", "5.1", "29.4 (3000)", "42.1 (4300)", "3", "2 - 25", "3 - 19", "4 - 22"],
  ["VO-20 A6-60", "M83 x 2.0p", "69", "M87 x 1.5p", "106.36", "133", "165", "8.6", "155", "27"],
  ["VG-20 A8-80", "M80 x 2.0p", "91", "M100 x 1.5", "139.7", "171", "220", "8.6", "155", "36"],
];

function PageHero({ number, eyebrow, title, accent, lead, image = factoryImage }) {
  return <section className="inner-hero" data-theme="dark" data-testid="page-hero">
    <div className="inner-hero-image">{image ? <img src={image} alt="VPI Innovative Solutions" onError={(e) => {
      const fallbacks = { Automobile: "/vpi/industry/automotive.png", Electronics: "/vpi/industry/electronics.png", Medical: "/vpi/industry/medical.png", Aerospace: "/vpi/industry/aerospace.png" };
      const key = String(title || "").replace(/ Industry$/i, "");
      if (String(image).includes("pinterest") && fallbacks[key] && e.currentTarget.src !== new URL(fallbacks[key], window.location.href).href) e.currentTarget.src = fallbacks[key];
      else e.currentTarget.style.opacity = ".15";
    }} /> : null}<div /></div>
    <div className="page-pad inner-hero-content">
      <span className="eyebrow cyan">{eyebrow} / {number}</span>
      <h1>{title}{accent ? <><br /><em>{accent}</em></> : null}</h1>
      {lead ? <p>{lead}</p> : null}
    </div>
    <span className="inner-hero-scroll"><ArrowDown size={14} /> SCROLL TO EXPLORE</span>
  </section>;
}

function LinkButton({ to, children, testId }) {
  return <Magnetic><Button asChild className="quote-button"><Link to={to} data-testid={testId}>{children} <ArrowUpRight size={15} /></Link></Button></Magnetic>;
}

function PageIntro({ kicker, title, children, number = "02" }) {
  return <section className="page-intro page-pad" data-theme="steel">
    <div className="section-number">{number} <span>/ 06</span></div>
    <div className="page-intro-content"><span className="eyebrow cyan">{kicker}</span><h2>{title}</h2>{children}</div>
  </section>;
}

function MetricStrip({ items }) {
  return <div className="metric-strip page-pad" data-theme="black">{items.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>;
}

function VpiVisionFooter() { return null; }

function SpecTable({ headers, rows, prefix }) {
  return <div className="spec-range-scroll" data-reveal><table className="spec-range-table"><thead><tr>{headers.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index} className={index === 0 ? "model-cell" : ""}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function RangeSection({ kicker, title, accent, note, headers, rows, prefix }) {
  return <section className="spec-range page-pad" data-theme="steel"><div className="section-heading-row"><div><span className="eyebrow cyan">{kicker}</span><h2>{title}<br /><em>{accent}</em></h2></div>{note ? <span className="spec-range-note">{note}</span> : null}</div><SpecTable headers={headers} rows={rows} prefix={prefix} /></section>;
}

function ProcessSteps() {
  const steps = [
    ["01", "Send your drawings", "Upload STEP, IGES or a PDF drawing. Tell us material and quantity.", "DRAWING / CAD", productImages.micro],
    ["02", "Get a real quote", "Our engineering team reviews manufacturability, flags risk, returns a real price and lead time.", "DFM / QUOTE", productImages.comp3],
    ["03", "We cut it in-house", "Cut on our own CNC floor with controlled machining and inspection.", "CNC / IN-HOUSE", productImages.revolving],
    ["04", "We ship the part", "Documented quality control, packed and delivered to the required destination.", "QUALITY / DELIVERY", productImages.collet],
  ];
  return <div className="process-steps">{steps.map(([number, title, copy, meta, image], index) => <Reveal key={number} delay={index * 0.07}><article className="process-step" onMouseMove={spotlightMove}><div className="process-step-image"><img src={image} alt={title} loading="lazy" /><span className="process-step-chip">{meta}</span></div><div className="process-step-copy"><div className="process-step-head"><span className="service-number">{number}</span><span className="process-step-index">{title}</span></div><h3>{title}</h3><p>{copy}</p><span className="process-arrow">NEXT STAGE <ArrowUpRight size={14} /></span></div></article></Reveal>)}</div>;
}



function OfficialPage({ eyebrow, title, accent, lead, kicker, image, paragraphs = [], bullets = [], extraTitle, extraParagraphs = [], extraBullets = [], extraImage }) {
  return (
    <div className="official-page">
      <PageHero number="01" eyebrow={eyebrow} title={title} accent={accent} lead={lead} image={image} />
      <PageIntro kicker={kicker} title={<>{title}{accent ? <> <em>{accent}</em></> : null}</>}>
        <div className="official-copy">
          {paragraphs.map((paragraph) => <p className="page-lead" key={paragraph}>{paragraph}</p>)}
          {bullets.length ? <div className="detail-list">{bullets.map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div> : null}
        </div>
      </PageIntro>
      {(extraTitle || extraParagraphs.length || extraBullets.length || extraImage) ? <section className="official-extra page-pad" data-theme="steel"><div className="official-extra-grid"><div><span className="eyebrow cyan">VPI / {extraTitle || "DETAILS"}</span>{extraTitle ? <h2>{extraTitle}</h2> : null}{extraParagraphs.map((paragraph) => <p className="page-lead" key={paragraph}>{paragraph}</p>)}{extraBullets.length ? <div className="detail-list">{extraBullets.map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div> : null}</div>{extraImage ? <div className="official-extra-image"><img src={extraImage} alt={extraTitle || "VPI"} /></div> : null}</div></section> : null}
    </div>
  );
}

export function AerospacePage() { return <IndustryPage data={industryData.aerospace} />; }

export function IndustriesPage() {
  return <div className="industries-page">
    <PageHero number="01" eyebrow="INDUSTRIES" title="Strength You Can Shape." accent="Industries We Empower" lead="Precision Engineering Reimagined | VPI Innovative Solutions" image="/vpi/industry/automotive.png" />
    <PageIntro kicker="Precision Engineering for Tomorrow's Challenges" title={<>Precision Engineering<br /><em>for Tomorrow’s Challenges</em></>}>
      <p className="page-lead">At VPI Innovative Solutions, we don't just manufacture components. We engineer possibilities. Our machining, tooling, and design expertise support industries where precision is mission-critical.</p>
    </PageIntro>
    <section className="industry-overview page-pad" data-theme="dark">
      <div className="industry-parallax">
        {industries.map(([name,path,copy,image], i) => <Link to={path} className="industry-card" key={path}><div className="industry-card-image"><img src={image} alt={name} /></div><div className="industry-card-content"><span className="service-number">0{i+1}</span><h3>{name}</h3><p>{copy}</p><ArrowUpRight size={17}/></div></Link>)}
      </div>
    </section>
    <section className="page-pad industrial-solutions-section" data-theme="steel"><span className="eyebrow cyan">VPI's Industrial Solutions</span><h2>Precision manufacturing for <em>real industries.</em></h2><p className="page-lead">VPI provides tailored CNC machining, custom metalwork, precision tooling and component manufacturing, with quality and reliability built into every stage.</p><LinkButton to="/services">OUR SERVICES</LinkButton></section>
  </div>;
}

function SimpleIndustryPage({ title, copy }) {
  return <div><PageHero number="01" eyebrow="INDUSTRY" title={title} accent="" lead="Welcome to VPI Innovative Industries" image={productImages.components} /><PageIntro kicker="Industries We Empower" title={<>{title}<br /><em>Precision Engineering</em></>}><p className="page-lead">{copy}</p><LinkButton to="/contact">CONTACT US</LinkButton></PageIntro><VpiVisionFooter /></div>;
}

export function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);
  return <div data-testid="home-page">
    <section ref={heroRef} className="hero-section home-hero" data-theme="dark">
      <HeroScrollMedia />
      <div className="hero-scrim" /><div className="hero-grid" />
      <motion.div className="hero-scan" initial={{ top: "-2%", opacity: 0 }} animate={{ top: "102%", opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }} />
      <motion.div className="hero-content page-pad" style={{ opacity: contentFade }}>
        <div className="hero-topline"><span className="eyebrow">VPI INNOVATIVE SOLUTIONS</span><span className="hero-status"><i /> PRECISION EMPOWERED</span></div>
        <div className="hero-heading-wrap"><motion.p className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}>PRECISION ENGINEERING</motion.p><h1><MaskedLine delay={0.28}>PRECISION</MaskedLine><MaskedLine delay={0.37}><em>EMPOWERED.</em></MaskedLine><MaskedLine delay={0.46}>INNOVATION</MaskedLine><MaskedLine delay={0.55}><em>DELIVERED.</em></MaskedLine></h1><motion.p className="hero-subhead" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.78, ease: EASE }}>TRANSFORMING CONCEPTS INTO REALITY</motion.p><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.92, ease: EASE }}><LinkButton to="/contact">GET INSTANT QUOTE</LinkButton></motion.div></div>
        <div className="hero-bottom"><span>LEADERS IN CNC COMPONENT<br />MANUFACTURING</span><span className="scroll-prompt"><ArrowDown size={15} /> EXPLORE</span><span>VPI INNOVATIVE SOLUTIONS</span></div>
      </motion.div>
    </section>
    <VpiTimeline />
    <Marquee items={["PRECISION", "QUALITY", "CUSTOMIZATION", "INNOVATION", "RELIABILITY", "CONSISTENCY"]} />
    <section className="home-trust-strip page-pad" data-theme="black">
      <div className="trust-upload"><span className="eyebrow cyan">01 / UPLOAD</span><h3>Upload Secure &amp; Confidential</h3><p>Upload your design files for precision CNC machining requirements.</p><LinkButton to="/contact">GET INSTANT QUOTE</LinkButton></div>
      <div className="trust-cert"><span className="eyebrow cyan">02 / CERTIFIED FOR EXCELLENCE</span><strong>Leaders in CNC Component Manufacturing.</strong><span className="trust-line" /></div>
    </section>
    <section className="home-on-demand page-pad" data-theme="steel"><div><span className="eyebrow cyan">ON-DEMAND CNC MACHINING SERVICES</span><h2>Optimize Your<br /><em>Manufacturing Process with VPI</em></h2><p className="page-lead">Experience precision, quality, and customization like never before. Receive instant price quotes for your CNC machining needs by uploading your design files.</p><LinkButton to="/services">BOOST YOUR PRODUCTION</LinkButton></div><div className="on-demand-grid">{["Boost Your Production", "Instant Price Quotes", "Dedicated Machines", "Dedicated Team", "Comprehensive Services"].map((item, index) => <div key={item}><span className="service-number">0{index + 1}</span><h3>{item}</h3></div>)}</div></section>
    <PageIntro kicker="ABOUT US" title={<>Your Trusted Partner for<br /><em>Precision Machining That Delivers</em></>}><p className="page-lead">We streamline precision manufacturing—specializing in the production of CNC collet chucks and high-precision turned and machined components. We deliver high-accuracy parts and custom tooling with speed, consistency, and uncompromising quality. From prototypes to large-scale production and complex, application-specific components, our experienced team and advanced infrastructure deliver precision, reliability, and on-time performance tailored to your exact specifications. With cutting-edge capabilities in multi-axis milling, turn-mill, Swiss turn, EDM, and multi-axis grinding.</p><p className="body-copy">VPI serves as your trusted single-source partner for performance-driven manufacturing solutions.</p><LinkButton to="/contact">CONTACT US</LinkButton></PageIntro>
    <section className="home-overview page-pad" data-theme="steel"><Reveal className="overview-image"><img src={productImages.collet} alt="VPI CNC Collet Chuck" /></Reveal><Reveal className="overview-copy"><span className="eyebrow cyan">VPI - INNOVATION MEETS PRECISION</span><h2>Precision <em>Built for Performance</em></h2><p className="body-copy">VPI Innovative Solutions specializes in CNC collet chucks and high-precision turned and machined components, delivering high-accuracy parts and custom tooling with speed, consistency, and uncompromising quality.</p><LinkButton to="/products">EXPLORE PRODUCTS</LinkButton></Reveal></section>
    <section className="manifesto page-pad" data-theme="dark"><span className="eyebrow cyan">OUR CORE VALUES</span><Reveal><p className="page-lead">At VPI Innovative Solutions, our values guide every decision and define how we work. We believe quality is first engineered and then measured, ensuring excellence from design to delivery. Agility, innovation, and precision power our response to the evolving needs of modern manufacturing. Through accountability and continuous improvement, we build not just parts — but lasting partnerships built on trust and performance.</p></Reveal></section>
    <section className="home-overview page-pad" data-theme="steel"><Reveal className="overview-image"><img src={machineImages[1]} alt="VPI CNC Machines" /></Reveal><Reveal className="overview-copy"><span className="eyebrow cyan">VPI MANUFACTURING CAPABILITIES</span><h2>Manufacturing Excellence<br /><em>For Every Industry</em></h2><p className="body-copy">At VPI Innovative Solutions, we deliver manufacturing excellence for the Medical, Electronics, Automotive, and Aerospace industries through advanced CNC technologies and a state of the art quality department powered by Mitutoyo ensuring precision, reliability, and consistency in every component.</p><div className="detail-list">{["±5μm tolerance precision", "Micro-machining to 0.5mm", "Aerospace-grade materials", "5-axis CNC machining", "Mitutoyo quality control", "High-volume production"].map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div><LinkButton to="/services">EXPLORE SERVICES</LinkButton></Reveal></section>
    <section className="industry-overview page-pad" data-theme="dark"><Reveal><div className="section-heading-row"><div><span className="eyebrow cyan">INDUSTRIES WE MAKE AN IMPACT</span><h2>Precision Engineering<br /><em>for Tomorrow’s Challenges</em></h2></div><Link to="/industries" className="text-link">EXPLORE INDUSTRIES <ArrowUpRight size={15} /></Link></div></Reveal><div className="industry-home-grid">{[["Robotics","/industries/robotics","Lightweight, high-strength components enabling the next generation of automation.",industryImages.robotics],["Medical","/industries/medical","Biocompatible, precision-engineered solutions that meet the strictest healthcare standards.",industryImages.medical],["Electronics","/industries/electronics","Micro-precision components for the devices powering our connected world.",industryImages.electronics],["Automobile","/industries/automotive","Precision components that drive the future of mobility with unmatched durability and performance.",industryImages.automotive],["Aerospace","/aerospace-industry","Precision components for aviation and space.",industryImages.aerospace]].map(([name,path,copy,image], index) => <Link to={path} className="industry-card" key={path} onMouseMove={spotlightMove}><span className="service-number">0{index + 1}</span><img className="industry-card-image" src={image} alt={`${name} industry`} loading="lazy" /><h3>{name}</h3><p>{copy}</p><ArrowUpRight size={17} /></Link>)}</div></section>
    <section className="product-overview page-pad" data-theme="steel"><Reveal className="product-overview-image"><img src={productImages.components} alt="VPI Precision Components" /></Reveal><Reveal><span className="eyebrow cyan">VPI PREMIUM PRODUCTS</span><h2>VPI’s Premium<br /><em>line</em></h2><p className="page-lead">Explore Products</p><LinkButton to="/products">EXPLORE PRODUCTS</LinkButton></Reveal></section>
    <RoboticsShowcase />
    
    <VpiVisionFooter />
  </div>;
}

export function CompanyPage() {
  const cards=[['01','About Us','/about'],['02','Management','/management'],['03','CSR','/csr'],['04','Company Vision','/vision'],['05','Company History','/history'],['06','Why Us','/why-us'],['07','R&D','/rd']];
  return <div className="company-page"><PageHero number="01" eyebrow="VPI / COMPANY" title="Built on Precision." accent="Driven by Innovation." lead="A precision manufacturing partner for demanding industries." image="/vpi/heroes/services-hero.png"/><section className="company-overview-grid page-pad" data-theme="dark">{cards.map(([n,t,p])=><Link to={p} className="company-overview-card" key={p}><span className="service-number">{n}</span><h3>{t}</h3><p>Explore the official VPI information, engineering capabilities and story behind this part of the company.</p><span className="text-link">EXPLORE <ArrowUpRight size={14}/></span></Link>)}</section></div>;
}

export function AboutPage() { return <CompanyDetail type="about" />; }
export function ManagementPage() { return <CompanyDetail type="management" />; }
export function CSRPage() { return <CompanyDetail type="csr" />; }
export function VisionPage() { return <CompanyDetail type="vision" />; }
export function HistoryPage() { return <CompanyDetail type="history" />; }
export function WhyUsPage() { return <CompanyDetail type="why" />; }
export function RDPage() { return <CompanyDetail type="rd" />; }
export function AutomotivePage() { return <IndustryPage data={industryData.automotive} />; }
export function ElectronicsPage() { return <IndustryPage data={industryData.electronics} />; }
export function RoboticsPage() { return <RoboticsLanding />; } />; }
export function MedicalPage() { return <IndustryPage data={industryData.medical} />; }

export function ServicesPage() {
  const services = [
    ["01", "Custom Machining", "Tailored to exact design and tolerance requirements."],
    ["02", "Precision Expertise", "Decades of experience in high-accuracy machining."],
    ["03", "Scalable Solutions", "From single parts to batch runs with ease."],
    ["04", "Quality Control", "Integrated CMMs, tool presetters, and more."],
  ];
  return <div><PageHero number="01" eyebrow="VPI’S SERVICES" title="PRECISION MANUFACTURING." accent="SCALABLE CAPABILITIES." lead="BUILT FOR INNOVATION" image="/vpi/heroes/services-hero.png" /><PageIntro kicker="Expertise You Can Trust" title={<>VPI'S <em>Services</em></>}><p className="page-lead">Discover custom CNC solutions built for complexity and scale. Our flexible production setup ensures precision, adaptability, and efficiency across every industry we serve.</p><LinkButton to="/contact">EXPLORE OUR SERVICES</LinkButton></PageIntro><section className="service-grid page-pad" data-theme="dark">{services.map(([number, title, copy]) => <Reveal key={number}><article className="service-panel" onMouseMove={spotlightMove}><span className="service-number">{number}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</section><section className="page-pad" data-theme="steel"><div className="section-heading-row"><div><span className="eyebrow cyan">Advanced Design & Machining Capabilities</span><h2>Our <em>Capabilities</em></h2></div></div><div className="detail-list">{["CNC Milling – 3, 4, and 5 Axis", "Sliding Head CNC – 9 to 13 Axis", "Turn-Mills – 5 to 9 Axis", "Turning Centers – 2 Axis", "CNC Grinding – 3 Axis", "EDM – 5 Axis"].map((item) => <div key={item}><CheckCircle2 size={16}/><span>{item}</span></div>)}</div><div className="page-lead">{["Turn Mill: 9 Axis | 240 X 500", "Turn Mill: 7 Axis | 200 X 500", "Sliding Head Machines: 13 Axis | 32 X 330; 9 Axis | 16 X 220; 7 Axis | 20 X 220; 5 Axis | 26 X 280", "Vertical Machining Center: 3 Axis | 1020 X 560 X 560; 4 Axis | 760 X 500 X 600; 5 Axis | 500 x 450 x 450", "Horizontal Machining Center: 4 Axis | 900 X 700 X 700; 4 Axis | 310 X 310 X 330", "Wire EDM: 5 Axis | 600 X 450 X 400", "CNC Grinding: 3 Axis | 100 X 50; SG | 400 X 100"].map((item) => <p key={item}>{item}</p>)}</div></section><VpiVisionFooter /></div>;
}

export function ProductsPage() {
  return <div><PageHero number="01" eyebrow="PRODUCTS" title="VPI’s Premium" accent="line." lead="VPI Product Solutions" image={productImages.lineup} /><PageIntro kicker="CNC Collet Chucks & Revolving Centers" title={<>Precision CNC<br /><em>Tooling Solutions</em></>}><p className="page-lead">At VPI, we deliver precision-engineered metal components and assemblies tailored to meet the highest industry standards. Our product range includes custom CNC-machined parts, metal enclosures, brackets, shafts, and precision tools designed for durability and performance.</p><div className="detail-list">{["High-precision CNC machining", "Custom metal components", "Durable and high-performance"].map((x) => <div key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div></PageIntro><section className="media-grid page-pad" data-theme="dark">{[[productImages.collet,"VPI CNC Collet Chucks"],[productImages.components,"VPI Precision Components"],[productImages.lineup,"CNC Collet Chucks & Revolving Centers"]].map(([image,title]) => <Reveal key={title}><div className="media-card"><div className="media-card-image"><img src={image} alt={title} loading="lazy" /></div><div className="media-card-body"><span className="service-number">VPI PRODUCT SOLUTIONS</span><h3>{title}</h3></div></div></Reveal>)}</section><section className="page-pad" data-theme="steel"><div className="detail-list"><div><CheckCircle2 size={16}/><span>High-volume production</span></div><div><CheckCircle2 size={16}/><span>Specialized prototyping</span></div><div><CheckCircle2 size={16}/><span>Advanced manufacturing</span></div></div><LinkButton to="/products/cnc-collet-chucks">REQUEST PRODUCT DETAILS</LinkButton></section><VpiVisionFooter /></div>;
}

export function CNCColletChucksPage() {
  return <div><PageHero number="01" eyebrow="CNC COLLET CHUCKS" title="VG-20 CNC Collet" accent="Chuck" lead="Precision-engineered CNC Collet Chuck designed for accuracy, rigidity, and durability in high-speed machining applications" image={productImages.collet} /><PageIntro kicker="Key Features" title={<>VG-20 <em>Collet Chuck</em></>}><div className="detail-list">{["High Precision: Exceptional concentricity for precision turning operations with micron-level accuracy", "Optimized Design: Lightweight, compact structure for fast acceleration and minimal vibration", "Superior Durability: Built with premium materials and precision engineering for long-lasting performance", "Versatile Compatibility: Works seamlessly with a wide range of CNC lathes and machining centers", "Flexible Applications: Ideal for both high-volume production and precision toolroom environments"].map((x) => <div key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div><LinkButton to="/contact">GET QUOTE</LinkButton></PageIntro><section className="product-feature-showcase page-pad" data-theme="navy"><div className="product-feature-image"><img src={productImages.collet} alt="VPI CNC Collet Chuck" /></div><div className="product-feature-copy"><span className="eyebrow gold">VG-20 / PRODUCT DETAIL</span><h2>Engineered for <em>precision</em></h2><p className="page-lead">High-precision collet chucks designed for maximum grip and minimal runout in CNC applications.</p><div className="product-feature-points"><div><span>01</span><b>Ultra-precise concentricity</b></div><div><span>02</span><b>Quick-change functionality</b></div><div><span>03</span><b>Extended tool life</b></div></div></div></section><section className="spec-section page-pad" data-theme="dark"><span className="eyebrow cyan">Technical Specifications</span><div className="spec-table">{[["Model","VG-20"],["Max RPM","4500 RPM"],["Clamping Range","Ø16mm - Ø50mm"],["Weight","3.5 kg"],["Mounting Type","A2-5 Spindle Nose"]].map(([a,b]) => <div className="spec-row" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></section><RangeSection kicker="VG-20 Collet Chuck Full Specifications" title="VG-20" accent="Specifications" headers={vgHeaders} rows={vgRows} note="VG-20 CNC Collet Chuck" prefix="vg20" /><section className="page-pad" data-theme="steel"><span className="eyebrow cyan">Applications</span><h2>Manufacturing <em>Industries</em></h2><div className="detail-list">{["Automotive components", "Aerospace parts", "Medical devices", "General machining", "Precision turning", "High-speed machining", "Small batch production", "Mass production", "Prototype development"].map((x) => <div key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div></section><VpiVisionFooter /></div>;
}

export function RevolvingCentresPage() { return <OfficialPage eyebrow="PRODUCTS" title="Revolving" accent="Centers" lead="Precision product solution" kicker="Revolving Centers" image={productImages.revolving} paragraphs={["Revolving Centers"]} />; }
export function QuickChangeColletsPage() { return <ProductsPage />; }

export function MediaPage() {
  const posts = [
    ["01", "Next-Generation CNC Machining Technologies", "April 28, 2025", "Explore how VPI is revolutionizing precision manufacturing with advanced collet chuck systems that enhance productivity while minimizing downtime.", machineImages[0]],
    ["02", "VPI Expands International Partnership Network", "May 2, 2025", "VPI Innovative Solutions announces strategic partnerships with leading European manufacturers to enhance global supply chain capabilities.", productImages.components],
    ["03", "Introducing the VG-20 CNC Collet Chuck Series", "May 5, 2025", "Our newest precision-engineered solution delivers exceptional concentricity and stability for high-speed machining applications.", productImages.collet],
  ];
  return <div><PageHero number="01" eyebrow="MEDIA" title="VPI’s Innovative" accent="Media" lead="Blogs and Updates" image={productImages.lineup} /><PageIntro kicker="Blogs and Updates" title={<>Stay updated with the latest insights, trends, and <em>innovations</em> in the manufacturing industry.</>}><p className="page-lead">Our Blogs and Updates section brings you detailed articles, technical write-ups, and news on the cutting-edge projects we are working on, industry advancements, and much more.</p></PageIntro><section className="media-grid page-pad" data-theme="dark">{posts.map(([number,title,date,excerpt,image]) => <Reveal key={title}><article className="media-card"><div className="media-card-image"><img src={image} alt={title} loading="lazy" /></div><div className="media-card-body"><span className="service-number">{number}</span><h3>{title}</h3><div className="media-meta"><span>{date}</span><span>LinkedIn</span></div><p>{excerpt}</p><a href="https://www.linkedin.com/company/vpi-innovative-solutions-mysore" target="_blank" rel="noreferrer" className="text-link">READ ON LINKEDIN <ArrowUpRight size={14}/></a></div></article></Reveal>)}</section><VpiVisionFooter /></div>;
}

export function ArticlePage() { const { slug } = useParams(); if (!slug) return <Navigate to="/media" replace />; return <MediaPage />; }

export function CareerPage() {
  const positions = ["Production Supervisor / Shift Supervisor", "Operators (Milling Centers, Swiss Turns, Mill Turns, Grinding, EDM Wire Cut, Lathe, Setter)", "Engineering Manager", "NPD Coordinator / Project Engineer", "Assistant Manager Purchase", "Quality Inspector", "Quality Engineer (APQP, PPAP, FMEA, etc.)", "Purchase Executive & Vendor Development Engineer"];
  return <div><PageHero number="01" eyebrow="CAREER" title="Build the" accent="next cut" lead="Join Our Team" image="/vpi/heroes/career-hero.png" /><PageIntro kicker="Why Work With Us?" title={<>Work with <em>VPI</em></>}><div className="detail-list">{["Innovative Projects", "Accelerated Growth", "Collaborative Culture", "Continuous Learning", "Make an Impact", "Rewards & Benefits"].map((x) => <div key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div></PageIntro><section className="roles-section page-pad" data-theme="dark"><div className="section-heading-row"><div><span className="eyebrow cyan">Open Positions</span><h2>Current <em>Openings</em></h2></div></div><div className="roles-list">{positions.map((position, i) => <Reveal key={position}><div className="role-row"><span className="service-number">0{i+1}</span><h3>{position}</h3><span className="role-tag">MYSORE</span></div></Reveal>)}</div></section><VpiVisionFooter /></div>;
}

export function ContactPage() { return <div><PageHero number="01" eyebrow="CONTACT US" title="Contact" accent="Us" lead="VPI Innovative Solutions - Location" image="/vpi/heroes/contact-hero.png" /><PageIntro kicker="Contact Us" title={<>Get in <em>touch</em></>}><p className="page-lead">13 P A, KIADB 1ST MAIN ROAD, INDUSTRIAL AREA, Koorgally, Mysuru, Karnataka 571130, India</p><div className="contact-meta"><span>+91 9900911202</span><a href="mailto:vpisolutions@gmail.com">vpisolutions@gmail.com</a></div></PageIntro><section className="contact-section page-pad" data-theme="steel"><div className="contact-grid"><div className="contact-form-wrap"><QuoteForm /></div><div className="contact-map-card"><div className="contact-map-head"><span className="eyebrow cyan">OUR LOCATION</span><a href="https://www.google.com/maps/search/?api=1&query=13+P+A+KIADB+1ST+MAIN+ROAD+INDUSTRIAL+AREA+Koorgally+Mysuru+Karnataka+571130+India" target="_blank" rel="noreferrer">OPEN IN MAPS <ArrowUpRight size={14} /></a></div><iframe title="VPI Innovative Solutions map" src="https://www.google.com/maps?q=13+P+A+KIADB+1ST+MAIN+ROAD+INDUSTRIAL+AREA+Koorgally+Mysuru+Karnataka+571130+India&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div></section><VpiVisionFooter /></div>; }
