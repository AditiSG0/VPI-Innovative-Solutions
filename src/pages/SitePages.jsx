import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, Magnetic, Marquee, MaskedLine, Reveal, ScrollText, spotlightMove } from "@/components/motion";
import FacilitySection from "@/components/FacilitySection";
import { Button } from "@/components/ui/button";
import PrecisionScene from "@/components/PrecisionScene";
import QuoteForm from "@/components/QuoteForm";

gsap.registerPlugin(ScrollTrigger);

const VPI = "https://vpiinnovativesolutions.com/wp-content/uploads/2025";
const factoryImage = `${VPI}/05/upscalemedia-transformed.png`;
const logoImage = `${VPI}/06/vpi_logo_transparent_highres.png`;
const machineImages = [
  `${VPI}/06/banner-mill-e-700.jpg`,
  `${VPI}/06/mac-2.png`,
  `${VPI}/06/mec-3.png`,
  `${VPI}/06/Miyano-machine.png`,
  `${VPI}/06/WhatsApp-Image-2025-06-24-at-11.37.04_de9b4444.jpg`,
];
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

const industries = [
  ["Automobile", "/industries/automotive", "Precision components that drive the future of mobility with unmatched durability and performance."],
  ["Electronics", "/industries/electronics", "Micro-precision components for the devices powering our connected world."],
  ["Robotics", "/industries/robotics", "Lightweight, high-strength components enabling the next generation of automation."],
  ["Medical", "/industries/medical", "Biocompatible, precision-engineered solutions that meet the strictest healthcare standards."],
  ["Die & Mould", "/industries/die-mould", "Precision die and mould solutions ensuring consistency and quality across manufacturing processes."],
  ["Energy", "/industries/energy", "High-performance components that empower sustainable and efficient energy systems across industries."],
  ["Advanced Critical R&D", "/industries/critical-rd", "Innovative research and development driving next-generation industrial and technological solutions."],
  ["Food", "/industries/food", "Engineering precision tools and equipment that uphold hygiene, safety, and efficiency in food production."],
  ["Telecom", "/industries/telecom", "High-performance components that support the rapid evolution of global communication networks."],
];

const industryData = {
  automotive: {
    title: "Automobile Industry",
    slugTitle: "Automotive Industry",
    image: machineImages[0],
    summary: "At VPI Innovative Solutions, we manufacture high-precision automotive components that meet the industry’s most demanding standards for accuracy, reliability, and performance. From prototypes to large-scale production, our parts support critical systems such as fuel injection, transmission, braking, steering, and sensor assemblies.",
    technical: "ith multi-axis CNC machining, turn-mill centers, and sliding head technology, we produce complex geometries with micron-level repeatability. Our inspection lab, powered by Mitutoyo CMM and advanced metrology systems, ensures zero-defect quality assurance at every stage.",
    materials: ["EN Series Steels: EN8, EN19, EN24, EN31", "Case-Hardening Steels: 16MnCr5, 20MnCr5, 16NiCr4, 18CrNiMo7-6, SCM420", "Stainless Steels: SS303, SS304, SS316", "Aluminium Alloys: AL6061, AL7075", "Brass, Copper, and other specialized automotive-grade materials"],
    finishingTitle: "Post-Machining Processes",
    finishing: ["Heat Treatment: Carburizing, case hardening, nitriding, quenching, tempering", "Surface Treatments: Zinc, Nickel, Tin, Phosphate coating, Anodizing, Passivation", "Deburring, Ultrasonic Cleaning, Grinding, and Super-finishing"],
    focusTitle: "Our Commitment",
    focus: "Driven by precision and innovation, VPI Innovative Solutions supports the evolution of modern mobility through components that deliver lightweight design, superior durability, and consistent quality — where every micron matters.",
    gallery: [machineImages[0], machineImages[1], productImages.revolving, productImages.components],
  },
  electronics: {
    title: "Electronics Industry",
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
    image: machineImages[2],
    summary: "At VPI Innovative Solutions, we manufacture precision-engineered components used in robotic assemblies, motion systems, and automation modules. Our parts are designed to deliver dimensional accuracy, repeatability, and stability required for robotic actuation, control, and sensor integration.\n\nWe routinely produce components within ±5–6 micron tolerances, ensuring perfect fitment and alignment in complex assemblies.",
    technical: "With multi-axis CNC machining, turn-mill, and sliding head technology, we manufacture intricate components requiring simultaneous operations and close-tolerance control.\n\nDimensional verification is carried out using Mitutoyo CMM systems and precision metrology equipment, ensuring compliance with design specifications.",
    materials: ["Stainless Steels: SS304, SS316, SS416", "Aluminium Alloys: AL6061, AL7075, AL2024", "EN Series Steels: EN8, EN19, EN24", "Case-Hardening Steels: 16MnCr5, 20MnCr5, 16NiCr4, 18CrNiMo7-6, SCM420", "Brass, Copper, and Titanium"],
    finishingTitle: "Post-Machining & Finishing",
    finishing: ["Heat Treatments: Case hardening, carburizing, nitriding, quenching, tempering", "Surface Treatments: Nickel, Zinc, Anodizing, Electroless coatings", "Grinding, Lapping, and Super-finishing for low-friction movement and assembly reliability"],
    focusTitle: "Our Focus",
    focus: "With deep precision engineering expertise and robust inspection systems, VPI Innovative Solutions supports the energy sector through components that meet tight tolerance requirements, demanding surface finish standards, and complex geometrical challenges — delivering performance where precision defines reliability.",
    gallery: [machineImages[2], machineImages[3], productImages.comp3, productImages.comp7],
  },
  medical: {
    title: "Medical Industry",
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
  "die-mould": {
    title: "DIE & MOLD",
    image: productImages.components,
    summary: "At VPI Innovative Solutions, we deliver advanced machining solutions for the Die & Mould industry, where accuracy, surface finish, and dimensional stability are critical to performance and tool life.",
    technical: "Our facility is equipped with state-of-the-art multi-axis machining centers, including high-speed vertical milling and 5-axis simultaneous milling systems capable of handling components up to 900 mm in size. With spindle speeds up to 20,000 RPM, through-spindle coolant systems, and high-rigidity fixturing setups, we achieve exceptional contour accuracy, surface integrity, and repeatable dimensional control across complex geometries.\n\nWe work extensively with tool steels (D2, H13, P20, EN31, A2, and special pre-hardened grades), hardened stainless steels, and special alloy materials used in high-performance mould and die tooling. Our machining process is fully optimized through CAM-based toolpath simulation (Mastercam/HyperMill), ensuring efficient tool engagement, minimal thermal distortion, and precise corner definition on intricate cavities and inserts.",
    materials: ["Tool steels: D2, H13, P20, EN31, A2", "Special pre-hardened grades", "Hardened stainless steels", "Special alloy materials used in high-performance mould and die tooling"],
    finishingTitle: "Technical Capabilities",
    finishing: ["High-speed vertical milling", "5-axis simultaneous milling", "Through-spindle coolant systems", "CAM-based toolpath simulation (Mastercam/HyperMill)"],
    focusTitle: "Die&Mold Summary",
    focus: "Advanced machining solutions for the Die & Mould industry, where accuracy, surface finish, and dimensional stability are critical to performance and tool life.",
    gallery: [productImages.components, machineImages[4], productImages.comp6, productImages.comp6],
  },
  "critical-rd": {
    title: "Advance Critical R&D",
    image: productImages.comp3,
    summary: "At VPI Innovative Solutions, we manufacture precision-engineered components for advanced and specialized applications that demand the highest levels of accuracy, stability, and material performance. These parts are often used in mission-critical, high-stress, and high-temperature environments, where even minor deviations can impact functionality.",
    technical: "With a combination of multi-axis CNC machining, turn-mill centers, 5-axis Wire EDM, and micro-machining technology, we achieve fine surface finishes and dimensional accuracies within 10 microns on complex geometries.\n\nOur process control systems ensure stability, traceability, and repeatability across all machining operations — from prototype validation to production-ready runs.",
    materials: ["Titanium Alloys: Ti-6Al-4V and other aerospace/medical-grade variants", "Special Stainless Steels: SS316L, SS420, SS440C, 17-4PH, and Duplex grades", "Tool & Die Steels: H13, D2, SKD11", "Case-Hardening Steels: 16MnCr5, 20MnCr5, SCM420", "High-Strength Aluminium Alloys: AL7075, AL6082", "Copper, Brass, and Nickel-Based Alloys"],
    finishingTitle: "Post-Machining & Validation",
    finishing: ["Heat Treatment, Coating, Grinding, and Super-Finishing", "CMM-based dimensional inspection, surface profiling, and micro-geometry verification", "Process documentation and traceability for prototype and production components"],
    focusTitle: "Our Focus",
    focus: "Through advanced process engineering, material expertise, and precision validation systems, VPI Innovative Solutions supports R&D, prototype development, and mission-critical industries by delivering components that meet stringent functional, dimensional, and surface finish requirements — ensuring reliability in every one-of-one and specialized part we produce.",
    gallery: [productImages.comp3, productImages.comp6, productImages.comp7, productImages.comp3],
  },
  telecom: {
    title: "TELECOM INDUSTRY",
    image: machineImages[0],
    summary: "At VPI Innovative Solutions, we specialize in manufacturing high-precision machined components that form the backbone of modern telecommunication infrastructure. Our parts are engineered for use in RF systems, Communication modules, fiber-optic assemblies, and signal transmission equipment, where dimensional accuracy and electrical integrity are critical.",
    technical: "Our machining expertise covers a comprehensive range of non-ferrous, ferrous, and high-performance materials tailored for telecom applications:",
    materials: ["Aluminium Alloys: AL6061, AL7075, AL6082, AL2024 — for lightweight housings, RF enclosures, and structural frames.", "Copper & Brass Alloys: C360, C110, and CuBe — ensuring superior electrical conductivity for signal components and connectors.", "Stainless Steels: SS303, SS304, SS316 — providing strength and corrosion resistance for outdoor and marine telecom installations.", "Surface Treatments: Anodizing, Electroless Nickel, Zinc Plating, Passivation for corrosion and RF shielding enhancement.", "Heat Treatments: Solution annealing, stress relieving, and aging for strength and dimensional stability.", "Super-finishing & Polishing: Achieving low surface roughness for improved conductivity and contact precision.", "Assembly Support: Sub-assembly and fitment verification for plug-and-play telecom modules."],
    finishingTitle: "Our Focus",
    finishing: ["Each process is executed under stringent quality control to ensure electrical conductivity, environmental durability, and consistent mechanical integrity."],
    focusTitle: "Our Focus",
    focus: "With advanced machining infrastructure, disciplined process control, and a deep understanding of material behavior in high-frequency applications, VPI Innovative Solutions supports the telecom sector by delivering precision-engineered components that enable seamless communication, signal clarity, and equipment reliability across modern network systems.",
    gallery: [machineImages[0], machineImages[1], productImages.comp7, productImages.micro],
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
  return <section className="inner-hero" data-theme="dark" data-testid="page-hero"><div className="inner-hero-image"><motion.img src={image} alt="VPI Innovative Solutions" initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 1.6, ease: EASE }} /><div /></div><div className="page-pad inner-hero-content"><motion.span className="eyebrow cyan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}>{eyebrow} / {number}</motion.span><h1><MaskedLine delay={0.2}>{title}</MaskedLine>{accent ? <MaskedLine delay={0.32}><em>{accent}</em></MaskedLine> : null}</h1>{lead ? <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5, ease: EASE }}>{lead}</motion.p> : null}</div><span className="inner-hero-scroll"><ArrowDown size={14} /> SCROLL TO EXPLORE</span></section>;
}

function LinkButton({ to, children, testId }) {
  return <Magnetic><Button asChild className="quote-button"><Link to={to} data-testid={testId}>{children} <ArrowUpRight size={15} /></Link></Button></Magnetic>;
}

function PageIntro({ kicker, title, children, number = "02" }) {
  return <section className="page-intro page-pad" data-theme="steel"><Reveal className="section-number">{number} <span>/ 06</span></Reveal><Reveal delay={0.08}><span className="eyebrow cyan">{kicker}</span><h2>{title}</h2>{children}</Reveal></section>;
}

function MetricStrip({ items }) {
  return <div className="metric-strip page-pad" data-theme="black">{items.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>;
}

function VpiVisionFooter() {
  return <section className="home-cta page-pad" data-theme="black"><Reveal><span className="eyebrow cyan">OUR VISION</span><h2>OUR <em>VISION</em></h2><p className="page-lead">{visionText[0]}<br />{visionText[1]}<br />{visionText[2]}<br />{visionText[3]}</p><LinkButton to="/contact">CONTACT US</LinkButton></Reveal></section>;
}

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


export function IndustriesPage() {
  return <div><PageHero number="01" eyebrow="INDUSTRIES" title="Strength You Can Shape." accent="Industries We Empower" lead="Precision Engineering Reimagined | VPI Innovative Solutions" image={productImages.components} /><PageIntro kicker="Precision Engineering for Tomorrow's Challenges" title={<>Precision Engineering<br /><em>for Tomorrow’s Challenges</em></>}><p className="page-lead">At VPI Innovative Solutions, we don't just manufacture components — we engineer possibilities. Our cutting-edge machining, tooling, and design expertise power industries where precision isn't just important, it's mission-critical.</p></PageIntro><section className="industry-overview page-pad" data-theme="dark"><div className="industry-parallax">{industries.map(([name,path,copy], i) => <Link to={path} className="industry-card" key={path} onMouseMove={spotlightMove}><span className="service-number">0{i+1}</span><h3>{name}</h3><p>{copy}</p><ArrowUpRight size={17}/></Link>)}</div></section><section className="page-pad" data-theme="steel"><span className="eyebrow cyan">VPI's Industrial Solutions</span><p className="page-lead">At VPI, we redefine industrial excellence by offering tailored solutions that meet the unique demands of diverse sectors, from custom metalwork to precision CNC machining. Our commitment to quality ensures that every part we produce embodies the strength and reliability that industries rely on, empowering businesses to innovate without compromise. With a focus on customer satisfaction and competitive pricing, we stand ready to partner with you to turn your visions into reality, providing dependable support every step of the way. Unlock the potential of your projects with VPI’s industrial solutions, where craftsmanship meets cutting-edge technology.</p><LinkButton to="/services">OUR SERVICES</LinkButton></section><VpiVisionFooter /></div>;
}

function SimpleIndustryPage({ title, copy }) {
  return <div><PageHero number="01" eyebrow="INDUSTRY" title={title} accent="" lead="Welcome to VPI Innovative Industries" image={productImages.components} /><PageIntro kicker="Industries We Empower" title={<>{title}<br /><em>Precision Engineering</em></>}><p className="page-lead">{copy}</p><LinkButton to="/contact">CONTACT US</LinkButton></PageIntro><VpiVisionFooter /></div>;
}

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
      <motion.img className="hero-video" style={{ y: imageY }} src={factoryImage} alt="VPI Innovative Solutions" />
      <div className="hero-scrim" /><div className="hero-grid" />
      <motion.div className="hero-scan" initial={{ top: "-2%", opacity: 0 }} animate={{ top: "102%", opacity: [0, 1, 1, 0] }} transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }} />
      <motion.div className="hero-content page-pad" style={{ opacity: contentFade }}>
        <div className="hero-topline"><span className="eyebrow">VPI INNOVATIVE SOLUTIONS</span><span className="hero-status"><i /> PRECISION EMPOWERED</span></div>
        <div className="hero-heading-wrap"><motion.p className="hero-kicker" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}>PRECISION ENGINEERING</motion.p><h1><MaskedLine delay={0.28}>PRECISION</MaskedLine><MaskedLine delay={0.37}><em>EMPOWERED.</em></MaskedLine><MaskedLine delay={0.46}>INNOVATION</MaskedLine><MaskedLine delay={0.55}><em>DELIVERED.</em></MaskedLine></h1><motion.p className="hero-subhead" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.78, ease: EASE }}>TRANSFORMING CONCEPTS INTO REALITY</motion.p><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.92, ease: EASE }}><LinkButton to="/contact">GET INSTANT QUOTE</LinkButton></motion.div></div>
        <div className="hero-bottom"><span>LEADERS IN CNC COMPONENT<br />MANUFACTURING</span><span className="scroll-prompt"><ArrowDown size={15} /> EXPLORE</span><span>VPI INNOVATIVE SOLUTIONS</span></div>
      </motion.div>
    </section>
    <Marquee items={["PRECISION", "QUALITY", "CUSTOMIZATION", "INNOVATION", "RELIABILITY", "CONSISTENCY"]} />
    <PageIntro kicker="ABOUT US" title={<>Your Trusted Partner for<br /><em>Precision Machining That Delivers</em></>}><p className="page-lead">We streamline precision manufacturing—specializing in the production of CNC collet chucks and high-precision turned and machined components. We deliver high-accuracy parts and custom tooling with speed, consistency, and uncompromising quality. From prototypes to large-scale production and complex, application-specific components, our experienced team and advanced infrastructure deliver precision, reliability, and on-time performance tailored to your exact specifications. With cutting-edge capabilities in multi-axis milling, turn-mill, Swiss turn, EDM, and multi-axis grinding.</p><LinkButton to="/about">CONTACT US</LinkButton></PageIntro>
    <section className="home-overview page-pad" data-theme="steel"><Reveal className="overview-image"><img src={factoryImage} alt="upscalemedia-transformed" /></Reveal><Reveal className="overview-copy"><span className="eyebrow cyan">ABOUT US</span><h2>VPI - <em>Innovation Meets Precision</em></h2><p className="body-copy">VPI serves as your trusted single-source partner for performance-driven manufacturing solutions.</p></Reveal></section>
    <section className="manifesto page-pad" data-theme="dark"><span className="eyebrow cyan">OUR CORE VALUES</span>{["FOCUSED ON INNOVATION", "RESILIENT IN EVERY CHALLENGE", "DEDICATED TO CONTINUOUS GROWTH", "GROUNDED IN PRECISION"].map((value, i) => <Reveal key={value} delay={i * 0.05}><div className="manifesto-chapter"><span className="manifesto-number">VALUE 0{i + 1}</span><h2>{value}</h2></div></Reveal>)}<p className="page-lead">In every micron we machine and every decision we make, we carry forward a quiet promise<br />To create with purpose, deliver with precision, and grow with integrity.</p></section>
    <section className="home-overview page-pad" data-theme="steel"><Reveal className="overview-image"><img src={machineImages[1]} alt="VPI CNC Machines" /></Reveal><Reveal className="overview-copy"><span className="eyebrow cyan">VPI Manufacturing Capabilities</span><h2>Manufacturing Excellence<br /><em>For Every Industry</em></h2><p className="body-copy">At VPI Innovative Solutions, we deliver manufacturing excellence for the Medical, Electronics, Automotive, and Aerospace industries through advanced CNC technologies and a state of the art quality department powered by Mitutoyo ensuring precision, reliability, and consistency in every component.</p><div className="detail-list">{["±5μm tolerance precision", "Micro-machining to 0.5mm", "Aerospace-grade materials", "5-axis CNC machining", "Mitutoyo quality control", "High-volume production"].map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div><LinkButton to="/services">EXPLORE SERVICES</LinkButton></Reveal></section>
    <section className="process-section page-pad" data-theme="dark"><Reveal><div className="section-heading-row"><div><span className="eyebrow cyan">CAD TO FINISHED PART</span><h2>Four steps.<br /><em>One standard.</em></h2></div></div></Reveal><ProcessSteps /></section>
    <section className="industry-overview page-pad" data-theme="dark"><Reveal><div className="section-heading-row"><div><span className="eyebrow cyan">INDUSTRIES WE MAKE AN IMPACT</span><h2>Precision Engineering<br /><em>for Tomorrow’s Challenges</em></h2></div><Link to="/industries" className="text-link">EXPLORE INDUSTRIES <ArrowUpRight size={15} /></Link></div></Reveal><div className="industry-parallax" ref={gridRef}>{[[0,3,6],[1,4,7],[2,5,8]].map((column, colIndex) => <div className="industry-col" key={colIndex}>{column.map((itemIndex) => { const [name, path, copy] = industries[itemIndex]; return <Link to={path} className="industry-card" key={path} onMouseMove={spotlightMove}><span className="service-number">0{itemIndex + 1}</span><h3>{name}</h3><p>{copy}</p><ArrowUpRight size={17} /></Link>; })}</div>)}</div></section>
    <section className="product-overview page-pad" data-theme="steel"><Reveal className="product-overview-image"><img src={productImages.components} alt="VPI Precision Components" /></Reveal><Reveal><span className="eyebrow cyan">VPI Premium Products</span><h2>VPI’s Premium<br /><em>line</em></h2><p className="page-lead">Explore Products</p><LinkButton to="/products">EXPLORE PRODUCTS</LinkButton></Reveal></section>
    <VpiVisionFooter />
  </div>;
}

function OfficialPage({ eyebrow, title, accent, lead, kicker, image, paragraphs = [], bullets = [], extraTitle, extraParagraphs = [], extraBullets = [] }) {
  return <div><PageHero number="01" eyebrow={eyebrow} title={title} accent={accent} lead={lead} image={image} /><PageIntro kicker={kicker} title={<>VPI Innovative<br /><em>Solutions</em></>}><div className="official-copy">{paragraphs.map((p, i) => <p key={i} className="page-lead">{p}</p>)}</div>{bullets.length ? <div className="detail-list">{bullets.map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div> : null}{extraTitle ? <><span className="eyebrow cyan">{extraTitle}</span>{extraParagraphs.map((p, i) => <p key={i} className="body-copy">{p}</p>)}{extraBullets.length ? <div className="detail-list">{extraBullets.map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div> : null}</> : null}<LinkButton to="/contact">CONTACT US</LinkButton></PageIntro><VpiVisionFooter /></div>;
}

export function AboutPage() { return <OfficialPage eyebrow="ABOUT US" title="About Us" accent="" lead="Welcome to VPI Innovative Solutions" kicker="Short About VPI" image={factoryImage} paragraphs={["Since our inception in 2005, VPI Innovative Solutions has been at the forefront of precision engineering, offering high-performance machining and component manufacturing solutions tailored to the evolving demands of global industries. Based in Mysore, India, we serve as a trusted partner to organizations that value quality, innovation, and reliability above all else.", "At the heart of our operations lies a commitment to technical excellence and manufacturing integrity. Our advanced CNC infrastructure includes multi-axis milling, turn-mill centers, sliding head technology, EDMs, and high-precision grinders—sourced from global leaders such as Mazak, Tsugami, Matsuura, DMG, Citizen, and more.", "In addition to machining critical components, VPI also designs and manufactures high-speed CNC collet chucks and revolving centers, engineered specifically to meet the exacting standards of today’s high-speed, high-precision applications. These in-house solutions reflect our deep understanding of tool-holding dynamics and spindle performance, enabling improved stability, repeatability, and surface finish in demanding machining environments. Our team of engineers and technical experts operates with a clear vision: to blend innovation with process discipline, ensuring that every product meets international benchmarks in quality, reliability, and consistency. From prototyping to production, every stage is guided by data-driven decisions, risk-based thinking, and an uncompromising eye for detail.", "VPI Innovative Solutions – Your Precision Partner in Progress."], extraTitle="Our Machines", extraParagraphs=["Where Innovation Meets Precision in a Culture of Collaboration", "At VPI, our machines are the backbone of precision and performance. We operate advanced CNC machines and cutting-edge metalworking equipment to deliver high-quality results with unmatched accuracy.", "Each machine is maintained to the highest standards, ensuring reliability and efficiency. From milling and turning to custom fabrication, our technology supports a wide range of manufacturing needs."], extraBullets=["25+ Machines", "State-of-the-art equipment", "0.01mm Tolerance", "Unmatched precision", "50+ Experts", "Innovation Hub", "Continuous improvement"]} />; }
export function ManagementPage() { return <OfficialPage eyebrow="MANAGEMENT" title="Management" accent="" lead="Welcome to VPI Innovative Solutions" kicker="Mr. Gowrishankar Sanjay" image={factoryImage} paragraphs={["Mr. Gowrishankar Sanjay, ( Managing Directer & CEO )", "Mr. Gowrishankar Sanjay, an accomplished engineer with over 35 years of experience in manufacturing and advanced engineering solutions, is widely recognized for his precision-driven leadership and unwavering pursuit of technical excellence. A perfectionist by nature, he thrives on leading teams through challenging projects that push the boundaries of innovation and performance.", "Mr. T.V. Dinesh Kumar, ( Senior Manager )", "Mr. T.V. Dinesh Kumar, is widely regarded as the backbone of the team, the steady force who ensures collaboration, consistency, and excellence across every project. A skilled engineer by profession and a leader by temperament, he blends technical acumen with humility, creating an environment where innovation and teamwork thrive."], extraTitle="CEO’s MISSION", extraBullets=["Work collaboratively across departments to solve engineering problems practically and efficiently.", "Stay updated with the latest machining technologies to ensure process excellence.", "Own quality at every stage—from planning to production to delivery.", "Foster a culture of learning, mentorship, and integrity.", "Align personal growth with organizational goals and national purpose.", "Precision Manufacturing", "NPD-Driven Growth", "Nation-Building", "Skill Empowerment"]} />; }
export function CSRPage() { return <OfficialPage eyebrow="CORPORATE SOCIAL RESPONSIBILITY" title="Commitment Beyond" accent="Business" lead="Corporate Social Responsibility - VPI Innovative Solutions" kicker="Environmental Responsibility" image={factoryImage} paragraphs={["We actively engage in sustainable practices to reduce our environmental footprint while maximizing operational efficiency."]} bullets={["✔ Energy-conscious operations and machine optimization", "✔ Responsible waste management & recycling", "✔ Use of non-toxic, eco-friendly materials", "✔ Adoption of sustainable technologies"]} extraTitle="Ethical Business Practices" extraParagraphs={["At VPI, ethics and transparency guide every decision we make. We are committed to conducting business with the highest standards of fairness, accountability, and respect.", "At VPI Innovative Solutions, we take immense pride in being associated with government-backed initiatives aimed at empowering India’s youth. As part of our ongoing commitment to nation-building and inclusive growth, we have partnered with national and regional skill development missions to offer short-term training programs designed to bridge the gap between academic learning and real-world industrial application.", "All of this takes place at Ksetra Tech Park – Land of Merit, our dedicated hub for learning, innovation, and talent nurturing.", "We believe that by investing in education and practical training, we’re not just developing individuals—we’re contributing to the future workforce of India."], extraBullets=["✔ Equal opportunity employment and a safe, inclusive workplace", "✔ Strict anti-corruption and anti-discrimination policies", "✔ Open, transparent communication with all stakeholders", "✔ Respect for labor laws, human rights, and social norms", "✔ Hands-on exposure to advanced CNC machining, metrology, tool setting, and manufacturing workflows", "✔ Real-time experience in a working production environment", "✔ Industry-oriented mentoring from experienced professionals", "✔ Assessments and certifications aligned with government guidelines"]} />; }
export function VisionPage() { return <OfficialPage eyebrow="COMPANY VISION" title="Company’s Vision" accent="& Mission" lead="To be a trusted partner in precision manufacturing and innovation." kicker="Our Mission" image={factoryImage} paragraphs={["Driving innovation through precision engineering and sustainable manufacturing practices that empower communities and build nations"]} bullets={["Deliver CNC components, collet chucks, and revolving centers engineered for high-speed, high-accuracy performance with systemized quality control.", "Allocate 30% of operational capacity to New Product Development—enabling fast prototyping, CAM-led process planning, and tooling innovation.", "Support Make in India and Aatmanirbhar Bharat through indigenous manufacturing and strategic supply chains.", "Provide training and technical development to students, operators, and engineers through Ksetra Tech Park, aligned with government skilling initiatives.", "We operate with zero-defect goals, systemic process discipline, and a culture of continuous improvement while staying environmentally and ethically compliant."]} extraTitle="Team Vision & Mission" extraParagraphs={["Team Vision: To build a technically sound, accountable, and agile workforce capable of solving complex manufacturing challenges and driving innovation on the shopfloor and beyond."]} extraBullets={["Work collaboratively across departments to solve engineering problems practically and efficiently.", "Stay updated with the latest machining technologies to ensure process excellence.", "Own quality at every stage—from planning to production to delivery.", "Foster a culture of learning, mentorship, and integrity.", "Align personal growth with organizational goals and national purpose."]} />; }
export function HistoryPage() { return <OfficialPage eyebrow="COMPANY HISTORY" title="Our Journey:" accent="From Vision to Innovation" lead="Welcome to VPI Innovative Solutions" kicker="Our Legacy - Our Journey" image={productImages.components} paragraphs={["VP Industries was established in 1983 by our visionary founder, Late Shri V. Gowrishankar. With a strong desire to generate employment and uplift non-technical individuals by skilling them with passion, he set the foundation for what we are today. Despite being a B.Com graduate, his innate engineering talent led him to design and manufacture machines—including Special Purpose Machines (SPMs)—primarily focused on affordable, high-productivity solutions for the woodworking industry.", "After his passing in July 1987, the company expanded its focus to machining services, initially supporting manufacturers of CAN making machines and other industrial equipment. By 1988, we began providing job work services to Larsen & Toubro (L&T), marking the beginning of a long and transformative partnership. Through L&T’s supplier development programs—conducted in collaboration with SJCE_STEP in the early 1990s—we were exposed to ISO systems and best manufacturing practices, which played a pivotal role in shaping our quality-driven approach. Around the same time, we also began servicing Automotive Axles Ltd., further broadening our industry reach."]} />; }
export function WhyUsPage() { return <OfficialPage eyebrow="WHY US" title="Why VPI is Right" accent="Choice for You" lead="Precision-Driven. People-Focused. Purpose-Led." kicker="Why VPI Innovative Solutions" image={factoryImage} paragraphs={["With a deep focus on CNC turning, milling, grinding, and tool design, we manufacture components that meet the tightest tolerances and the most demanding standards. Whether it’s a high-speed collet chuck or a critical aerospace part, precision is our promise.", "We house an extensive range of high-end machines—from Mazak and Tsugami to Chiron, DMG, and Tornos. Combined with our in-house team of CAM programmers, tool designers, and quality engineers, we provide end-to-end solutions under one roof.", "We meet international standards while maintaining the agility and responsiveness of a local partner. Our customers across sectors—from automotive to industrial automation—rely on us for both performance and peace of mind.", "Whether you’re a startup looking for a development partner or an established OEM scaling up, we adapt. From small batches to mass production, we bring speed, control, and flexibility to every stage of your journey.", "From custom tool holding solutions to process development, we don’t stop at what works—we pursue what works best. Innovation is part of our DNA, with every product designed to maximize performance, life, and accuracy.", "Our commitment goes beyond machining: We support sustainable practices. We invest in skill-building through Ksetra Tech Park – Land of Merit. We uphold ethical and inclusive business values. You’re not just choosing a vendor—you’re choosing a company that cares.", "We believe in creating relationships built on trust, communication, and consistency. That’s why our clients stay with us, year after year. Choose VPI Innovative Solutions. Where every micron matters, and every customer counts."]} />; }
export function RDPage() { return <OfficialPage eyebrow="RESEARCH & DEVELOPMENT" title="Driving Precision Through" accent="Applied Engineering" lead="Core R&D Competencies" kicker="New Product Development (NPD)" image={productImages.comp3} paragraphs={["We develop an average of 30% NPDs monthly. Our R&D team works closely with production and quality to generate robust process sheets, tool layouts, and fixture designs for each new component.", "We design and test custom CNC collet chucks, revolving centers, and special tool holders. Each tool goes through 3D modeling, simulation, stress analysis (linear/static), and prototyping before being released to production."]} bullets={["Tight tolerances", "Unconventional geometries", "Multi-axis operations", "Complex machining sequences", "High-speed machining", "Stability during interrupted cuts", "Quick changeover and repeatability", "Load distribution to reduce tool wear"]} />; }

function IndustryPage({ data }) {
  return <div className="industry-page"><PageHero number="01" eyebrow="INDUSTRY" title={data.title} accent="" lead="Welcome to VPI Innovative Industries" image={data.image} /><PageIntro kicker={data.title.replace(/Industry|INDUSTRY/i, "").trim() + " Summary"} title={<>Precision for<br /><em>real applications.</em></>}><ScrollText className="page-lead" text={data.summary} /><span className="eyebrow cyan">Technical Capabilities</span>{data.technical.split("\n\n").map((p, i) => <p key={i} className="body-copy">{p}</p>)}<span className="eyebrow cyan">Materials We Machine</span><div className="detail-list">{data.materials.map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div><span className="eyebrow cyan">{data.finishingTitle}</span><div className="detail-list">{data.finishing.map((item) => <div key={item}><CheckCircle2 size={16} /><span>{item}</span></div>)}</div><span className="eyebrow cyan">{data.focusTitle}</span><p className="body-copy">{data.focus}</p><LinkButton to="/contact">CONTACT US</LinkButton></PageIntro><section className="media-grid page-pad" data-theme="dark">{data.gallery.map((image) => <Reveal key={image} className="media-card-wrap"><div className="media-card"><div className="media-card-image"><img src={image} alt={data.title} loading="lazy" /></div></div></Reveal>)}</section><VpiVisionFooter /></div>;
}
export function AutomotivePage() { return <IndustryPage data={industryData.automotive} />; }
export function ElectronicsPage() { return <IndustryPage data={industryData.electronics} />; }
export function RoboticsPage() { return <IndustryPage data={industryData.robotics} />; }
export function MedicalPage() { return <IndustryPage data={industryData.medical} />; }
export function DieMouldPage() { return <IndustryPage data={industryData["die-mould"]} />; }
export function EnergyPage() { return <SimpleIndustryPage title="Energy" copy="High-performance components that empower sustainable and efficient energy systems across industries." />; }
export function FoodPage() { return <SimpleIndustryPage title="Food" copy="Engineering precision tools and equipment that uphold hygiene, safety, and efficiency in food production." />; }
export function CriticalRDPage() { return <IndustryPage data={industryData["critical-rd"]} />; }
export function TelecomPage() { return <IndustryPage data={industryData.telecom} />; }

export function ServicesPage() {
  const services = [
    ["01", "Custom Machining", "Tailored to exact design and tolerance requirements."],
    ["02", "Precision Expertise", "Decades of experience in high-accuracy machining."],
    ["03", "Scalable Solutions", "From single parts to batch runs with ease."],
    ["04", "Quality Control", "Integrated CMMs, tool presetters, and more."],
  ];
  return <div><PageHero number="01" eyebrow="VPI’S SERVICES" title="PRECISION MANUFACTURING." accent="SCALABLE CAPABILITIES." lead="BUILT FOR INNOVATION" image={factoryImage} /><PageIntro kicker="Expertise You Can Trust" title={<>VPI'S <em>Services</em></>}><p className="page-lead">Discover custom CNC solutions built for complexity and scale. Our flexible production setup ensures precision, adaptability, and efficiency across every industry we serve.</p><LinkButton to="/contact">EXPLORE OUR SERVICES</LinkButton></PageIntro><section className="service-grid page-pad" data-theme="dark">{services.map(([number, title, copy]) => <Reveal key={number}><article className="service-panel" onMouseMove={spotlightMove}><span className="service-number">{number}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</section><section className="page-pad" data-theme="steel"><div className="section-heading-row"><div><span className="eyebrow cyan">Advanced Design & Machining Capabilities</span><h2>Our <em>Capabilities</em></h2></div></div><div className="detail-list">{["CNC Milling – 3, 4, and 5 Axis", "Sliding Head CNC – 9 to 13 Axis", "Turn-Mills – 5 to 9 Axis", "Turning Centers – 2 Axis", "CNC Grinding – 3 Axis", "EDM – 5 Axis"].map((item) => <div key={item}><CheckCircle2 size={16}/><span>{item}</span></div>)}</div><div className="page-lead">{["Turn Mill: 9 Axis | 240 X 500", "Turn Mill: 7 Axis | 200 X 500", "Sliding Head Machines: 13 Axis | 32 X 330; 9 Axis | 16 X 220; 7 Axis | 20 X 220; 5 Axis | 26 X 280", "Vertical Machining Center: 3 Axis | 1020 X 560 X 560; 4 Axis | 760 X 500 X 600; 5 Axis | 500 x 450 x 450", "Horizontal Machining Center: 4 Axis | 900 X 700 X 700; 4 Axis | 310 X 310 X 330", "Wire EDM: 5 Axis | 600 X 450 X 400", "CNC Grinding: 3 Axis | 100 X 50; SG | 400 X 100"].map((item) => <p key={item}>{item}</p>)}</div></section><section className="process-section page-pad" data-theme="dark"><div className="section-heading-row"><div><span className="eyebrow cyan">CAD TO FINISHED PART</span><h2>Four steps.<br /><em>One standard.</em></h2></div></div><ProcessSteps /></section><VpiVisionFooter /></div>;
}

export function ProductsPage() {
  return <div><PageHero number="01" eyebrow="PRODUCTS" title="Explore Our Exceptional" accent="Product Selection" lead="VPI Product Solutions" image={productImages.lineup} /><PageIntro kicker="CNC Collet Chucks & Revolving Centers" title={<>Precision CNC<br /><em>Tooling Solutions</em></>}><p className="page-lead">At VPI, we deliver precision-engineered metal components and assemblies tailored to meet the highest industry standards. Our product range includes custom CNC-machined parts, metal enclosures, brackets, shafts, and precision tools designed for durability and performance.</p><div className="detail-list">{["High-precision CNC machining", "Custom metal components", "Durable and high-performance"].map((x) => <div key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div></PageIntro><section className="media-grid page-pad" data-theme="dark">{[[productImages.collet,"VPI CNC Collet Chucks"],[productImages.components,"VPI Precision Components"],[productImages.lineup,"CNC Collet Chucks & Revolving Centers"]].map(([image,title]) => <Reveal key={title}><div className="media-card"><div className="media-card-image"><img src={image} alt={title} loading="lazy" /></div><div className="media-card-body"><span className="service-number">VPI PRODUCT SOLUTIONS</span><h3>{title}</h3></div></div></Reveal>)}</section><section className="page-pad" data-theme="steel"><div className="detail-list"><div><CheckCircle2 size={16}/><span>High-volume production</span></div><div><CheckCircle2 size={16}/><span>Specialized prototyping</span></div><div><CheckCircle2 size={16}/><span>Advanced manufacturing</span></div></div><LinkButton to="/products/cnc-collet-chucks">REQUEST PRODUCT DETAILS</LinkButton></section><VpiVisionFooter /></div>;
}

export function CNCColletChucksPage() {
  return <div><PageHero number="01" eyebrow="CNC COLLET CHUCKS" title="VG-20 CNC Collet" accent="Chuck" lead="Precision-engineered CNC Collet Chuck designed for accuracy, rigidity, and durability in high-speed machining applications" image={productImages.collet} /><PageIntro kicker="Key Features" title={<>VG-20 <em>Collet Chuck</em></>}><div className="detail-list">{["High Precision: Exceptional concentricity for precision turning operations with micron-level accuracy", "Optimized Design: Lightweight, compact structure for fast acceleration and minimal vibration", "Superior Durability: Built with premium materials and precision engineering for long-lasting performance", "Versatile Compatibility: Works seamlessly with a wide range of CNC lathes and machining centers", "Flexible Applications: Ideal for both high-volume production and precision toolroom environments"].map((x) => <div key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div><LinkButton to="/contact">GET QUOTE</LinkButton></PageIntro><PrecisionScene /><section className="spec-section page-pad" data-theme="dark"><span className="eyebrow cyan">Technical Specifications</span><div className="spec-table">{[["Model","VG-20"],["Max RPM","4500 RPM"],["Clamping Range","Ø16mm - Ø50mm"],["Weight","3.5 kg"],["Mounting Type","A2-5 Spindle Nose"]].map(([a,b]) => <div className="spec-row" key={a}><span>{a}</span><strong>{b}</strong></div>)}</div></section><RangeSection kicker="VG-20 Collet Chuck Full Specifications" title="VG-20" accent="Specifications" headers={vgHeaders} rows={vgRows} note="VG-20 CNC Collet Chuck" prefix="vg20" /><section className="page-pad" data-theme="steel"><span className="eyebrow cyan">Applications</span><h2>Manufacturing <em>Industries</em></h2><div className="detail-list">{["Automotive components", "Aerospace parts", "Medical devices", "General machining", "Precision turning", "High-speed machining", "Small batch production", "Mass production", "Prototype development"].map((x) => <div key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div></section><VpiVisionFooter /></div>;
}

export function RevolvingCentresPage() { return <OfficialPage eyebrow="PRODUCTS" title="Revolving" accent="Centers" lead="Precision product solution" kicker="Revolving Centers" image={productImages.revolving} paragraphs={["Revolving Centers"]} />; }
export function QuickChangeColletsPage() { return <ProductsPage />; }

export function MediaPage() {
  const posts = [
    ["01", "Next-Generation CNC Machining Technologies", "April 28, 2025", "Explore how VPI is revolutionizing precision manufacturing with advanced collet chuck systems that enhance productivity while minimizing downtime."],
    ["02", "VPI Expands International Partnership Network", "May 2, 2025", "VPI Innovative Solutions announces strategic partnerships with leading European manufacturers to enhance global supply chain capabilities."],
    ["03", "Introducing the VG-20 CNC Collet Chuck Series", "May 5, 2025", "Our newest precision-engineered solution delivers exceptional concentricity and stability for high-speed machining applications."],
  ];
  return <div><PageHero number="01" eyebrow="MEDIA" title="VPI’s Innovative" accent="Media" lead="Blogs and Updates" image={productImages.lineup} /><PageIntro kicker="Blogs and Updates" title={<>Stay updated with the latest insights, trends, and <em>innovations</em> in the manufacturing industry.</>}><p className="page-lead">Our Blogs and Updates section brings you detailed articles, technical write-ups, and news on the cutting-edge projects we are working on, industry advancements, and much more.</p></PageIntro><section className="media-grid page-pad" data-theme="dark">{posts.map(([number,title,date,excerpt]) => <Reveal key={title}><article className="media-card"><div className="media-card-body"><span className="service-number">{number}</span><h3>{title}</h3><div className="media-meta"><span>{date}</span><span>LinkedIn</span></div><p>{excerpt}</p><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="text-link">READ ON LINKEDIN <ArrowUpRight size={14}/></a></div></article></Reveal>)}</section><VpiVisionFooter /></div>;
}

export function ArticlePage() { const { slug } = useParams(); if (!slug) return <Navigate to="/media" replace />; return <MediaPage />; }

export function CareerPage() {
  const positions = ["Production Supervisor / Shift Supervisor", "Operators (Milling Centers, Swiss Turns, Mill Turns, Grinding, EDM Wire Cut, Lathe, Setter)", "Engineering Manager", "NPD Coordinator / Project Engineer", "Assistant Manager Purchase", "Quality Inspector", "Quality Engineer (APQP, PPAP, FMEA, etc.)", "Purchase Executive & Vendor Development Engineer"];
  return <div><PageHero number="01" eyebrow="CAREER" title="Join Our Team at" accent="VPI Innovative Solutions" lead="A Warm Welcome To Our Environment" image={factoryImage} /><PageIntro kicker="Why Work With Us?" title={<>Work with <em>VPI</em></>}><div className="detail-list">{["Innovative Projects", "Accelerated Growth", "Collaborative Culture", "Continuous Learning", "Make an Impact", "Rewards & Benefits"].map((x) => <div key={x}><CheckCircle2 size={16}/><span>{x}</span></div>)}</div></PageIntro><section className="roles-section page-pad" data-theme="dark"><div className="section-heading-row"><div><span className="eyebrow cyan">Open Positions</span><h2>Current <em>Openings</em></h2></div></div><div className="roles-list">{positions.map((position, i) => <Reveal key={position}><div className="role-row"><span className="service-number">0{i+1}</span><h3>{position}</h3><span className="role-tag">MYSORE</span></div></Reveal>)}</div><p className="body-copy">Work Location: VPI Innovative Solutions, Ksetra Tech Park Koorgalli</p><p className="body-copy">Address: #13 P-A, “kSetra Tech Park”, KIADB 1st Main Road Phase-3, Koorgalli Industrial Area, Mysore, India - 570018</p><p className="body-copy">+91 99800 15658 | 0821-2411905</p><p className="body-copy">vpisolutions@gmail.com | tech@vpisolutions.net</p></section><VpiVisionFooter /></div>;
}

export function ContactPage() { return <div><PageHero number="01" eyebrow="CONTACT US" title="Contact" accent="Us" lead="VPI Innovative Solutions - Location" image={factoryImage} /><PageIntro kicker="Contact Us" title={<>Get in <em>touch</em></>}><p className="page-lead">#13 P-A, “kSetra Tech Park”, KIADB 1st Main Road Phase-3, Koorgalli Industrial Area, Mysore, India - 570018</p><div className="contact-meta"><span>+91 9900911202</span><a href="mailto:vpisolutions@gmail.com">vpisolutions@gmail.com</a></div></PageIntro><section className="contact-section page-pad" data-theme="steel"><div className="contact-grid"><div className="contact-form-wrap"><QuoteForm /></div></div></section><VpiVisionFooter /></div>; }
