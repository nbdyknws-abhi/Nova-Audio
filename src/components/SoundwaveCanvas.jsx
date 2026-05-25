import { useEffect, useRef } from "react";

export default function SoundwaveCanvas({ 
  color = "rgba(204, 255, 0, 0.16)",
  accentColor = "rgba(255, 255, 255, 0.1)",
  waveCount = 4, 
  className = "absolute inset-0 w-full h-full pointer-events-none" 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.clientWidth);
    let height = (canvas.height = canvas.clientHeight);

    // Mouse coordinates
    let mouse = { x: width / 2, y: height / 2, active: false, radius: 180 };

    // Set up wave objects
    const waves = [];
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: height / 2,
        length: 0.002 + i * 0.001,
        amplitude: 40 + i * 15,
        frequency: 0.01 + i * 0.005,
        phase: i * Math.PI * 0.25,
        speed: 0.01 + i * 0.002,
        opacity: 0.35 - i * 0.06
      });
    }

    // Floating particles
    const particles = [];
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.5 + 0.1
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.clientWidth;
      height = canvas.height = canvas.clientHeight;
      // Re-center waves
      waves.forEach((w) => (w.y = height / 2));
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("resize", handleResize);
    // Bind mouse events to the parent element if possible, or just the window
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Draw frame
    let tick = 0;
    const render = () => {
      tick += 1;
      ctx.clearRect(0, 0, width, height);

      // Draw horizontal ambient lights
      const ambientGlow = ctx.createRadialGradient(
        mouse.active ? mouse.x : width / 2,
        mouse.active ? mouse.y : height / 2,
        0,
        mouse.active ? mouse.x : width / 2,
        mouse.active ? mouse.y : height / 2,
        mouse.active ? 200 : width / 3
      );
      ambientGlow.addColorStop(0, "rgba(204, 255, 0, 0.025)");
      ambientGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ambientGlow;
      ctx.fillRect(0, 0, width, height);

      // Render floating particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce/Wrap boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Interact with mouse
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            // Subtle pull
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 0.8;
            p.y += (dy / dist) * force * 0.8;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(204, 255, 0, ${p.alpha * 0.8})`;
        ctx.fill();
      });

      // Render flowing waves
      waves.forEach((w) => {
        w.phase += w.speed;
        
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        
        // Gradient color for waves
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.2, color.replace("0.2", String(w.opacity)));
        grad.addColorStop(0.5, accentColor.replace("0.1", String(w.opacity * 1.5)));
        grad.addColorStop(0.8, color.replace("0.2", String(w.opacity)));
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = grad;

        for (let x = 0; x < width; x += 5) {
          // Calculate standard sine height
          let waveY = Math.sin(x * w.length + w.phase) * w.amplitude;

          // Reactive boost when cursor is close to the vertical wave center
          if (mouse.active) {
            const dx = x - mouse.x;
            const dist = Math.abs(dx);
            if (dist < mouse.radius) {
              const proximityFactor = (mouse.radius - dist) / mouse.radius;
              // Amplify wave height based on mouse proximity
              const mouseOffsetRatio = (mouse.y - height / 2) / (height / 2);
              waveY += Math.sin(x * 0.05 + tick * 0.1) * 35 * proximityFactor;
            }
          }

          const drawY = w.y + waveY;

          if (x === 0) {
            ctx.moveTo(x, drawY);
          } else {
            ctx.lineTo(x, drawY);
          }
        }
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [color, accentColor, waveCount]);

  return <canvas ref={canvasRef} className={className} />;
}
