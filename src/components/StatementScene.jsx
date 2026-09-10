import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stages = [
  { number: "01", title: "Threaded spindle interface", copy: "Precision-rolled threads seat the assembly true to the spindle axis." },
  { number: "02", title: "Slotted collet cage", copy: "Eight ground fingers flex as one — full-circle grip without distortion." },
  { number: "03", title: "Ground clamping bore", copy: "The bore is finished in a single clamping, holding runout to microns." },
  { number: "04", title: "Ready for the line", copy: "Every interface engineered to keep your operation in control." },
];

const STATEMENT = "Every micron is a promise we intend to keep.";

export default function StatementScene() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.2, 6.6);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    scene.add(new THREE.HemisphereLight(0x9aa5ae, 0x07080a, 1.9));
    const keyLight = new THREE.DirectionalLight(0xd4f4ff, 5.2);
    keyLight.position.set(-4, 5, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x00e5ff, 9, 10);
    rimLight.position.set(3.4, 1.6, -2);
    scene.add(rimLight);

    const steel = new THREE.MeshStandardMaterial({ color: 0xb9c0c7, metalness: 0.95, roughness: 0.26 });
    const satin = new THREE.MeshStandardMaterial({ color: 0x79838b, metalness: 0.92, roughness: 0.36 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x1b2025, metalness: 0.92, roughness: 0.3 });

    const model = new THREE.Group();
    model.rotation.z = 0.06;
    scene.add(model);

    const cage = new THREE.Group();
    const ringGeometry = new THREE.TorusGeometry(0.52, 0.075, 18, 64);
    const ringTop = new THREE.Mesh(ringGeometry, steel);
    ringTop.rotation.x = Math.PI / 2;
    ringTop.position.y = 0.78;
    cage.add(ringTop);
    const ringBottom = ringTop.clone();
    ringBottom.position.y = -0.78;
    cage.add(ringBottom);
    const fingers = [];
    const fingerGeometry = new THREE.BoxGeometry(0.14, 1.56, 0.17);
    for (let i = 0; i < 8; i += 1) {
      const angle = (i / 8) * Math.PI * 2;
      const finger = new THREE.Mesh(fingerGeometry, i % 2 === 0 ? steel : satin);
      finger.position.set(Math.cos(angle) * 0.52, 0, Math.sin(angle) * 0.52);
      finger.rotation.y = -angle + Math.PI / 2;
      finger.userData.base = { x: finger.position.x, z: finger.position.z };
      fingers.push(finger);
      cage.add(finger);
    }
    const bore = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 2.6, 48), dark);
    model.add(bore);
    model.add(cage);

    const makeSleeve = (y, radius, height, material) => {
      const sleeve = new THREE.Group();
      const bodyMesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 64), material);
      sleeve.add(bodyMesh);
      const threadGeometry = new THREE.TorusGeometry(radius + 0.012, 0.016, 10, 64);
      for (let i = 0; i < 6; i += 1) {
        const thread = new THREE.Mesh(threadGeometry, steel);
        thread.rotation.x = Math.PI / 2;
        thread.position.y = -height / 2 + 0.1 + i * ((height - 0.2) / 5);
        sleeve.add(thread);
      }
      sleeve.position.y = y;
      return sleeve;
    };
    const topSleeve = makeSleeve(1.45, 0.46, 0.85, satin);
    const bottomSleeve = makeSleeve(-1.5, 0.56, 0.9, steel);
    model.add(topSleeve, bottomSleeve);

    const floor = new THREE.Mesh(new THREE.CircleGeometry(5.4, 64), new THREE.MeshBasicMaterial({ color: 0x07090a, transparent: true, opacity: 0.6 }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.6;
    scene.add(floor);
    const particles = new THREE.Group();
    const shardGeometry = new THREE.BoxGeometry(0.016, 0.016, 0.13);
    for (let i = 0; i < 100; i += 1) {
      const shard = new THREE.Mesh(shardGeometry, new THREE.MeshBasicMaterial({ color: i % 4 === 0 ? 0x00e5ff : 0x8f9ca4, transparent: true, opacity: 0.55 }));
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.9 + Math.random() * 3.4;
      shard.position.set(Math.cos(angle) * radius, -2.5 + Math.random() * 0.08, Math.sin(angle) * radius * 0.5);
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      particles.add(shard);
    }
    scene.add(particles);

    const words = textRef.current ? textRef.current.querySelectorAll(".st-word") : [];
    let scrollTl;
    let autoRotation;
    const media = gsap.matchMedia();
    media.add("(min-width: 861px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(words, { opacity: 0.28 });
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => setStage(Math.min(3, Math.floor(self.progress * 4))),
        },
      });
      scrollTl.to(words, { opacity: 1, stagger: 0.05, ease: "none" }, 0);
      scrollTl.to(model.rotation, { y: Math.PI * 2.4, ease: "none" }, 0);
      scrollTl.to(topSleeve.position, { y: "+=1.15", ease: "none" }, 0.22);
      scrollTl.to(bottomSleeve.position, { y: "-=1.15", ease: "none" }, 0.3);
      fingers.forEach((finger, index) => {
        scrollTl.to(finger.position, { x: finger.userData.base.x * 2.1, z: finger.userData.base.z * 2.1, ease: "none" }, 0.36 + index * 0.012);
      });
      scrollTl.to(bore.position, { y: "-=0.4", ease: "none" }, 0.4);
    });
    media.add("(max-width: 860px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.set(words, { opacity: 1 });
      autoRotation = gsap.to(model.rotation, { y: Math.PI * 2, duration: 20, repeat: -1, ease: "none" });
    });

    let frame;
    requestAnimationFrame(() => ScrollTrigger.refresh());
    const animate = () => {
      frame = requestAnimationFrame(animate);
      particles.rotation.y += 0.0007;
      rimLight.position.x = Math.sin(Date.now() * 0.0007) * 3.6;
      rimLight.position.y = 1.6 + Math.sin(Date.now() * 0.0004) * 1.2;
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
    <section ref={sectionRef} className="statement-scene" data-theme="black" data-testid="statement-scene">
      <div className="statement-sticky">
        <div className="statement-copy">
          <span className="eyebrow cyan">THE VPI STANDARD / 03</span>
          <p ref={textRef} className="scroll-text st-big" data-testid="home-statement">{STATEMENT.split(" ").map((word, index) => <span className="st-word" key={index}>{word}&nbsp;</span>)}</p>
          <div className="statement-stage" data-testid="statement-stage-callout">
            <span className="eyebrow cyan">STAGE {stages[stage].number} / 04</span>
            <h3>{stages[stage].title}</h3>
            <p>{stages[stage].copy}</p>
            <div className="stage-progress"><span style={{ width: `${((stage + 1) / 4) * 100}%` }} /></div>
          </div>
        </div>
        <canvas ref={canvasRef} className="statement-canvas" data-testid="statement-3d-canvas" aria-label="3D exploded view of a precision collet sleeve" />
      </div>
    </section>
  );
}
