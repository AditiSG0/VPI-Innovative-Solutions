import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

gsap.registerPlugin(ScrollTrigger);

export default function PrecisionScene() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneState = useRef({ rotation: 0, targetRotation: 0, dragRotation: 0 });
  const [degrees, setDegrees] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return undefined;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 2000);
    camera.position.set(310, -310, 185);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.HemisphereLight(0xa9bec9, 0x10161b, 2.2);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 4.2);
    key.position.set(240, -180, 360);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x00e5ff, 1.35);
    fill.position.set(-260, 90, 120);
    scene.add(fill);
    const rim = new THREE.PointLight(0x00e5ff, 75, 700, 2);
    rim.position.set(-140, -80, 120);
    scene.add(rim);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(150, 64),
      new THREE.MeshBasicMaterial({ color: 0x071015, transparent: true, opacity: 0.55 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -92;
    scene.add(ground);

    let product = null;
    let disposed = false;
    const loader = new STLLoader();
    loader.load(
      "/vpi/vg20-a6-60.stl",
      (geometry) => {
        if (disposed) return;
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();
        geometry.center();
        const material = new THREE.MeshPhysicalMaterial({
          color: 0xb8c0c4,
          metalness: 0.96,
          roughness: 0.22,
          clearcoat: 0.32,
          clearcoatRoughness: 0.16,
        });
        product = new THREE.Mesh(geometry, material);
        product.rotation.x = Math.PI / 2;
        product.scale.setScalar(1.22);
        root.add(product);
      },
      undefined,
      () => {
        // Keep the section usable even if the 3D asset is unavailable.
      }
    );

    const target = new THREE.Vector3(0, 0, 0);
    const resize = () => {
      const width = section.clientWidth;
      const height = Math.max(section.clientHeight, window.innerHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let lastDegree = -1;
    const updateDegree = () => {
      const raw = ((sceneState.current.rotation % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      const nextDegree = Math.round((raw / (Math.PI * 2)) * 360) % 360;
      if (nextDegree !== lastDegree) {
        lastDegree = nextDegree;
        setDegrees(nextDegree);
      }
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.15,
      onUpdate: (self) => {
        sceneState.current.targetRotation = self.progress * Math.PI * 2;
      },
    });

    let dragging = false;
    let previousX = 0;
    const down = (event) => { dragging = true; previousX = event.clientX; canvas.setPointerCapture?.(event.pointerId); };
    const move = (event) => {
      if (!dragging) return;
      const delta = event.clientX - previousX;
      previousX = event.clientX;
      sceneState.current.dragRotation += delta * 0.01;
    };
    const up = () => { dragging = false; };
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    canvas.addEventListener("pointerleave", up);

    const tick = () => {
      if (disposed) return;
      const state = sceneState.current;
      const desired = state.targetRotation + state.dragRotation;
      state.rotation += (desired - state.rotation) * 0.1;
      if (product) {
        product.rotation.y = state.rotation;
        product.rotation.x = Math.PI / 2 + Math.sin(state.rotation * 0.5) * 0.035;
        product.position.y = Math.sin(state.rotation * 0.5) * 1.2;
      }
      camera.lookAt(target);
      renderer.render(scene, camera);
      updateDegree();
      frame = requestAnimationFrame(tick);
    };
    let frame = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      trigger.kill();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
      canvas.removeEventListener("pointerleave", up);
      product?.geometry.dispose();
      product?.material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section ref={sectionRef} id="precision-rotation" className="scene-section collet-scene" data-theme="black" data-testid="precision-rotation-section">
      <div className="scene-sticky">
        <div className="scene-label">
          <span>VPI CNC COLLET CHUCK / VG-20</span>
          <span>SCROLL TO ROTATE / DRAG TO INSPECT</span>
        </div>

        <div className="collet-visual" aria-hidden="true">
          <div className="collet-grid-panel" />
          <div className="collet-glow" />
          <div className="collet-product-frame collet-3d-frame">
            <canvas ref={canvasRef} className="precision-canvas" />
            <div className="product-frame-topline">VG-20 A6-60 / VPI INNOVATIVE SOLUTIONS</div>
            <div className="product-frame-corner">360° PRODUCT INSPECTION</div>
          </div>
          <div className="collet-scanline" />
        </div>

        <div className="scene-axis axis-x">ROTATION {String(degrees).padStart(3, "0")}°</div>
        <div className="scene-axis axis-y">AXIS Z / PRODUCT CENTERLINE</div>

        <div className="scene-stage-copy" data-testid="precision-rotation-callout">
          <span className="eyebrow cyan">VG-20 / 360° VIEW</span>
          <h3>Precision from every angle.</h3>
          <p>Scroll through a complete 360° inspection of the VPI VG-20 CNC Collet Chuck.</p>
          <div className="stage-progress"><span style={{ width: `${Math.max(4, (degrees / 360) * 100)}%` }} /></div>
        </div>

        <div className="scene-legend"><span className="legend-dot" />VPI / VG-20 CNC COLLET CHUCK</div>
      </div>
    </section>
  );
}
