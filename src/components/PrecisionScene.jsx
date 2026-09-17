import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PrecisionScene() {
  const sectionRef = useRef(null);
  const mountRef = useRef(null);
  const angleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const mount = mountRef.current;
    if (!section || !mount) return undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f6f8);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 1000);
    camera.position.set(0, 0.8, 6.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x243041, 2.2);
    scene.add(hemi);
    const key = new THREE.DirectionalLight(0xffffff, 4.2);
    key.position.set(3, 5, 5);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x3ddcff, 2.4);
    rim.position.set(-4, 1, -5);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xffc14a, 1.2);
    fill.position.set(2, -2, 4);
    scene.add(fill);

    const stage = new THREE.Group();
    scene.add(stage);

    const loader = new STLLoader();
    loader.load("/vpi/VG20_A6_60.stl", (geometry) => {
      geometry.computeBoundingBox();
      geometry.computeVertexNormals();
      const center = new THREE.Vector3();
      geometry.boundingBox?.getCenter(center);
      geometry.translate(-center.x, -center.y, -center.z);
      const size = new THREE.Vector3();
      geometry.boundingBox?.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = 3.5 / maxDim;
      const material = new THREE.MeshPhysicalMaterial({
        color: 0xc9d1d7,
        metalness: 0.92,
        roughness: 0.22,
        clearcoat: 0.42,
        clearcoatRoughness: 0.18,
        reflectivity: 0.9,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(scale);
      mesh.rotation.x = Math.PI / 2;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      stage.add(mesh);

      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(2.45, 2.45, 0.08, 96),
        new THREE.MeshStandardMaterial({ color: 0x111a23, metalness: 0.7, roughness: 0.32 })
      );
      base.position.y = -2.02;
      base.castShadow = true;
      base.receiveShadow = true;
      stage.add(base);
    });

    const resize = () => {
      const rect = mount.getBoundingClientRect();
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const onPointerMove = (event) => {
      if (!stage) return;
      const rect = mount.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      stage.rotation.x = THREE.MathUtils.lerp(stage.rotation.x, -py * 0.18, 0.08);
      stage.rotation.z = THREE.MathUtils.lerp(stage.rotation.z, px * 0.12, 0.08);
    };

    mount.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", resize);
    resize();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: 1.05,
      onUpdate: (self) => {
        const turns = self.progress * Math.PI * 2;
        stage.rotation.y = turns;
        if (angleRef.current) angleRef.current.textContent = `${Math.round(self.progress * 360)}°`;
      },
    });

    let rafId = 0;
    const render = () => {
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      trigger.kill();
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", resize);
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="precision-rotation" className="scene-section collet-scene vpi-rotation-scene" data-testid="precision-rotation-section">
      <div className="scene-sticky vpi-rotation-sticky">
        <div className="vpi-rotation-copy">
          <span className="eyebrow">VPI / VG-20 CNC COLLET CHUCK</span>
          <h2>Rotate the<br /><em>product</em></h2>
          <p>Scroll to inspect the VG-20 through a complete 360° rotation.</p>
          <div className="vpi-rotation-meta"><span>SCROLL CONTROLLED</span><strong ref={angleRef}>0°</strong></div>
        </div>
        <div ref={mountRef} className="precision-canvas" aria-label="Interactive 360 degree VG-20 CNC Collet Chuck viewer" />
        <div className="vpi-rotation-grid" aria-hidden="true" />
      </div>
    </section>
  );
}
