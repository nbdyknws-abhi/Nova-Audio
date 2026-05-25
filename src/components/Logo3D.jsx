import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Logo3D({ className = "w-16 h-16" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Get current dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Geometry: Torus Knot resembles a stylized futuristic sound loop (Infinity N)
    // parameters: radius, tube, tubularSegments, radialSegments, p, q
    const geometry = new THREE.TorusKnotGeometry(0.8, 0.22, 120, 16, 2, 3);

    // 5. Material: Highly polished, liquid-platinum/teal physical metallic material
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xccff00, // Brand chartreuse/acid-gold
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      flatShading: false,
    });

    const logoMesh = new THREE.Mesh(geometry, material);
    scene.add(logoMesh);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Directional light for overall definition
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Dynamic light tracking the mouse cursor for reflective highlights
    const cursorLight = new THREE.PointLight(0xffeaaa, 2.5, 10);
    cursorLight.position.set(0, 0, 2);
    scene.add(cursorLight);

    // 7. Mouse interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      // Normalize mouse coordinates (-1 to 1) relative to container
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 9. Animation loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation (Lerp)
      targetX += (mouseX - targetX) * 0.1;
      targetY += (mouseY - targetY) * 0.1;

      // Slow elegant rotation
      logoMesh.rotation.y = elapsedTime * 0.4;
      logoMesh.rotation.x = elapsedTime * 0.2;

      // Subtle tilt based on mouse position
      logoMesh.rotation.z = targetX * 0.5;
      logoMesh.rotation.x += targetY * 0.3;

      // Position the dynamic light based on mouse
      cursorLight.position.x = targetX * 3;
      cursorLight.position.y = targetY * 3;

      // Render scene
      renderer.render(scene, camera);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`${className} cursor-pointer relative overflow-hidden`}
      title="Nova Audio 3D Interactive Logo"
    />
  );
}
