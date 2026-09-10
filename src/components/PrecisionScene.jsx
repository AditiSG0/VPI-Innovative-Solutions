import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { number: "01", title: "Concentric accuracy", copy: "Runout controlled to 0.005 mm for stable, repeatable holding." },
  { number: "02", title: "Balanced under load", copy: "A balanced assembly keeps the spindle calm at high-speed cycles." },
  { number: "03", title: "Made to move", copy: "Hardened surfaces and precise geometry extend tool life." },
  { number: "04", title: "Ready for the next cut", copy: "Every interface engineered to keep your operation in control." },
];

export default function PrecisionScene() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 1.1, 7.5);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    scene.add(new THREE.HemisphereLight(0x98a2ab, 0x08090b, 1.4));
    const keyLight = new THREE.DirectionalLight(0xc8f5ff, 4.2);
    keyLight.position.set(-4, 5, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x00e5ff, 8, 9);
    rimLight.position.set(3, 2, -2);
    scene.add(rimLight);

    const brushed = new THREE.MeshStandardMaterial({ color: 0x8d969c, metalness: 0.92, roughness: 0.22 });
    const darkMetal = new THREE.MeshStandardMaterial({ color: 0x20282e, metalness: 0.95, roughness: 0.2 });
    const copper = new THREE.MeshStandardMaterial({ color: 0xc27e49, metalness: 0.87, roughness: 0.24 });
    const model = new THREE.Group();
    model.position.y = 0.25;
    modelRef.current = model;
    scene.add(model);

    const body = new THREE.Group();
    const main = new THREE.Mesh(new THREE.CylinderGeometry(1.22, 1.05, 1.8, 64), brushed);
    main.rotation.x = Math.PI / 2;
    body.add(main);
    const nose = new THREE.Mesh(new THREE.CylinderGeometry(0.86, 0.95, 0.65, 64), darkMetal);
    nose.rotation.x = Math.PI / 2;
    nose.position.z = 1.08;
    body.add(nose);
    const inner = new THREE.Mesh(new THREE.TorusGeometry(0.56, 0.08, 18, 64), copper);
    inner.position.z = 1.42;
    body.add(inner);
    model.add(body);

    const ring = new THREE.Group();
    const ringMesh = new THREE.Mesh(new THREE.TorusGeometry(1.23, 0.11, 20, 64), darkMetal);
    ringMesh.rotation.x = Math.PI / 2;
    ring.add(ringMesh);
    const ringAccent = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.035, 12, 64), copper);
    ringAccent.rotation.x = Math.PI / 2;
    ringAccent.position.z = -0.25;
    ring.add(ringAccent);
    model.add(ring);

    const collar = new THREE.Group();
    const collarMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.35, 48), darkMetal);
    collarMesh.rotation.x = Math.PI / 2;
    collarMesh.position.z = -1.08;
    collar.add(collarMesh);
    for (let i = 0; i < 8; i += 1) {
      const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.09, 16), copper);
      const angle = (i / 8) * Math.PI * 2;
      bolt.position.set(Math.cos(angle) * 0.54, Math.sin(angle) * 0.54, -1.28);
      bolt.rotation.x = Math.PI / 2;
      collar.add(bolt);
    }
    model.add(collar);

    const floor = new THREE.Mesh(new THREE.CircleGeometry(5.2, 64), new THREE.MeshBasicMaterial({ color: 0x07090a, transparent: true, opacity: 0.65 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.25;
    scene.add(floor);
    const particles = new THREE.Group();
    const particleGeometry = new THREE.BoxGeometry(0.018, 0.018, 0.14);
    for (let i = 0; i < 115; i += 1) {
      const shard = new THREE.Mesh(particleGeometry, new THREE.MeshBasicMaterial({ color: i % 4 === 0 ? 0x00e5ff : 0x8f9ca4, transparent: true, opacity: 0.55 }));
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.4 + Math.random() * 3.1;
      shard.position.set(Math.cos(angle) * radius, -1.16 + Math.random() * 0.08, Math.sin(angle) * radius * 0.45);
      shard.rotation.y = Math.random() * Math.PI;
      shard.rotation.x = Math.random() * Math.PI;
      particles.add(shard);
    }
    scene.add(particles);

    let scrollTl;
    let autoRotation;
    const media = gsap.matchMedia();
    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => setStage(Math.min(3, Math.floor(self.progress * 4))),
        },
      });
      scrollTl.to(model.rotation, { y: Math.PI * 2.2, x: 0.25, ease: "none" }, 0);
      scrollTl.to(body.position, { z: 0.55, y: 0.28, ease: "none" }, 0.2);
      scrollTl.to(ring.position, { x: 1.5, y: 0.35, z: 0.35, ease: "none" }, 0.32);
      scrollTl.to(collar.position, { x: -1.45, y: -0.2, z: 0.3, ease: "none" }, 0.44);
    });
    media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      autoRotation = gsap.to(model.rotation, { y: Math.PI * 2, duration: 18, repeat: -1, ease: "none" });
    });

    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      particles.rotation.y += 0.0008;
      rimLight.position.x = Math.sin(Date.now() * 0.0007) * 3.5;
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(frame);
      scrollTl?.scrollTrigger?.kill();
      scrollTl?.kill();
      autoRotation?.kill();
      media.revert();
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} id="exploded-view" className="scene-section" data-theme="black" data-testid="exploded-view-section">
      <div className="scene-sticky">
        <div className="scene-label"><span>INTERACTIVE ASSEMBLY</span><span>SCROLL TO EXPLODE</span></div>
        <canvas ref={canvasRef} className="precision-canvas" data-testid="precision-3d-canvas" aria-label="Interactive 3D exploded view of a precision collet chuck" />
        <div className="scene-axis axis-x">X + 000.005</div>
        <div className="scene-axis axis-y">Y + 000.000</div>
        <div className="scene-stage-copy" data-testid="exploded-view-callout">
          <span className="eyebrow cyan">STAGE {stages[stage].number} / 04</span>
          <h3>{stages[stage].title}</h3>
          <p>{stages[stage].copy}</p>
          <div className="stage-progress"><span style={{ width: `${((stage + 1) / 4) * 100}%` }} /></div>
        </div>
        <div className="scene-legend"><span className="legend-dot" />VG SERIES / VG-100</div>
      </div>
    </section>
  );
}