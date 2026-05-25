import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const ticksRef = useRef(null);
  const textRef = useRef(null);
  const textSpanRef = useRef(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const activeElRef = useRef(null);
  const hoveredRef = useRef(false);
  const clickedRef = useRef(false);
  const cursorTextRef = useRef("");

  const ringStateRef = useRef({
    x: 0,
    y: 0,
    w: 32,
    h: 32,
    r: 16,
    opacity: 0,
  });

  useEffect(() => {
    // 1. Detect touch screens and mobile viewports
    const checkDevice = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches || 
                     ("ontouchstart" in window) || 
                     (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile) return;

    // 2. Hide default cursor globally on body
    document.body.style.cursor = "none";

    // 3. Track mouse coordinates
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setHidden(false);
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);
    
    const handleMouseDown = () => {
      clickedRef.current = true;
    };
    
    const handleMouseUp = () => {
      clickedRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // 4. Interactive Hover Context Listeners
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, input, textarea, [role='button'], .cursor-pointer"
      );
      
      interactives.forEach(el => {
        // Hide standard browser cursor on interactive hover elements
        el.style.cursor = "none";
        
        // Prevent adding multiple listeners to same element
        if (el.dataset.hasCursorListeners) return;
        el.dataset.hasCursorListeners = "true";

        el.addEventListener("mouseenter", () => {
          hoveredRef.current = true;

          // Determine if element is a morphable button or input/placeholder
          const isTextInput = 
            (el.tagName === "INPUT" && 
             el.getAttribute("type") !== "range" && 
             el.getAttribute("type") !== "radio" && 
             el.getAttribute("type") !== "checkbox") || 
            el.tagName === "TEXTAREA";
            
          const isButton = 
            el.tagName === "BUTTON" || 
            el.classList.contains("btn-shine-hover") || 
            el.getAttribute("role") === "button" || 
            (el.tagName === "A" && (el.classList.contains("border") || el.classList.contains("btn-shine-hover")));

          if (isButton || isTextInput) {
            activeElRef.current = el;
          }

          // Contextual labels
          let label = "FOCUS";
          if (el.tagName === "A" && el.getAttribute("href")?.startsWith("#experience")) {
            label = "VIEW";
          } else if (el.tagName === "INPUT" && el.getAttribute("type") === "range") {
            label = "DRAG";
          } else if (isTextInput) {
            label = "TYPE";
          } else if (el.title?.includes("Logo") || el.closest(".cursor-pointer")?.title?.includes("Logo")) {
            label = "SPIN";
          } else if (el.tagName === "BUTTON" && el.closest("form")) {
            label = "SEND";
          } else if (el.tagName === "A" && el.getAttribute("href") === "#cta") {
            label = "ACQUIRE";
          }

          cursorTextRef.current = label;
        });

        el.addEventListener("mouseleave", () => {
          hoveredRef.current = false;
          activeElRef.current = null;
          cursorTextRef.current = "";
        });
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    // 5. Animation/Loop update inside RAF
    let rafId;
    const tick = () => {
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Translate the main cursor container instantly
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check if active element is still connected to DOM
      const activeEl = activeElRef.current && activeElRef.current.isConnected ? activeElRef.current : null;
      const ring = ringRef.current;

      let targetX = mouseX;
      let targetY = mouseY;
      let targetW = 32;
      let targetH = 32;
      let targetR = 16;
      let targetOpacity = 0;
      let showTicks = true;
      let currentText = cursorTextRef.current;

      if (activeEl) {
        const rect = activeEl.getBoundingClientRect();
        const computed = window.getComputedStyle(activeEl);
        
        targetX = rect.left + rect.width / 2;
        targetY = rect.top + rect.height / 2;
        
        // Pad the outer ring relative to the element (8px padding around it)
        targetW = rect.width + 8;
        targetH = rect.height + 8;
        
        // Enforce a minimum size to prevent shrinking to a speck for tiny buttons
        targetW = Math.max(targetW, 36);
        targetH = Math.max(targetH, 36);

        // Parse computed border-radius
        const brStr = computed.borderRadius;
        const rawRadius = parseFloat(brStr) || 0;
        if (brStr.includes("%")) {
          targetR = Math.min(rect.width, rect.height) * (rawRadius / 100);
        } else {
          // Clamp border radius to half of width/height
          targetR = Math.min(rawRadius, Math.min(rect.width, rect.height) / 2);
        }
        // Expand border radius slightly to account for the larger ring padding
        if (targetR > 0) {
          targetR += 4;
        }

        targetOpacity = 1;
        showTicks = false;
      } else if (hoveredRef.current) {
        // Standard hover state (circle ring)
        targetX = mouseX;
        targetY = mouseY;
        targetW = 56;
        targetH = 56;
        targetR = 28;
        targetOpacity = 1;
        showTicks = true;
      }

      // Interpolate states smoothly using lerp (0.22 per frame for snappy magnetic response)
      const ringState = ringStateRef.current;
      if (ringState.opacity === 0 && targetOpacity > 0) {
        // Jump instantly on first reveal to prevent lagging into frame
        ringState.x = targetX;
        ringState.y = targetY;
        ringState.w = targetW;
        ringState.h = targetH;
        ringState.r = targetR;
      } else {
        const lerpSpeed = 0.22;
        ringState.x += (targetX - ringState.x) * lerpSpeed;
        ringState.y += (targetY - ringState.y) * lerpSpeed;
        ringState.w += (targetW - ringState.w) * lerpSpeed;
        ringState.h += (targetH - ringState.h) * lerpSpeed;
        ringState.r += (targetR - ringState.r) * lerpSpeed;
      }
      ringState.opacity += (targetOpacity - ringState.opacity) * 0.15;

      // Update ring styles
      if (ring) {
        const relX = ringState.x - mouseX;
        const relY = ringState.y - mouseY;
        
        // Haptic click scaling
        const clickScale = clickedRef.current ? 0.97 : 1;

        ring.style.width = `${ringState.w}px`;
        ring.style.height = `${ringState.h}px`;
        ring.style.borderRadius = `${ringState.r}px`;
        ring.style.transform = `translate3d(${relX}px, ${relY}px, 0) translate3d(-50%, -50%, 0) scale(${clickScale})`;
        ring.style.opacity = ringState.opacity;
      }

      // Update ticks (crosshair reticle) and set data attributes for child selectors
      if (ticksRef.current) {
        ticksRef.current.setAttribute("data-hovered", hoveredRef.current);
        ticksRef.current.setAttribute("data-clicked", clickedRef.current);

        if (showTicks) {
          ticksRef.current.style.opacity = "1";
          ticksRef.current.style.transform = clickedRef.current
            ? "scale(0.75) rotate(90deg)"
            : hoveredRef.current
              ? "scale(1.8) rotate(45deg)"
              : "scale(1) rotate(0deg)";
        } else {
          ticksRef.current.style.opacity = "0";
          ticksRef.current.style.transform = "scale(0.5) rotate(45deg)";
        }
      }

      // Update text label position
      if (textRef.current && textSpanRef.current) {
        textSpanRef.current.textContent = currentText;

        if (currentText) {
          textRef.current.style.opacity = "1";
          const relX = ringState.x - mouseX;
          const relY = ringState.y - mouseY;
          const textOffset = ringState.h / 2 + 14;
          textRef.current.style.transform = `translate3d(${relX}px, ${relY + textOffset}px, 0) translate3d(-50%, 0, 0)`;
        } else {
          textRef.current.style.opacity = "0";
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  if (isMobile || hidden) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[99999]"
      style={{
        willChange: "transform",
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      {/* 1. Center Core Target Dot */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-chartreuse-light mix-blend-difference pointer-events-none" />

      {/* 2. Precision Crosshair Reticle (rotated 45deg and scaled out on hover, rotates 90deg on click) */}
      <div 
        ref={ticksRef}
        className="group absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
      >
        {/* Top vertical tick */}
        <div className="absolute top-0 w-[1.5px] bg-chartreuse-light transition-all duration-300 h-1.5 translate-y-0 group-data-[hovered=true]:h-1.5 group-data-[hovered=true]:-translate-y-1 group-data-[clicked=true]:h-2.5 group-data-[clicked=true]:translate-y-1" />
        
        {/* Bottom vertical tick */}
        <div className="absolute bottom-0 w-[1.5px] bg-chartreuse-light transition-all duration-300 h-1.5 translate-y-0 group-data-[hovered=true]:h-1.5 group-data-[hovered=true]:translate-y-1 group-data-[clicked=true]:h-2.5 group-data-[clicked=true]:-translate-y-1" />
        
        {/* Left horizontal tick */}
        <div className="absolute left-0 h-[1.5px] bg-chartreuse-light transition-all duration-300 w-1.5 translate-x-0 group-data-[hovered=true]:w-1.5 group-data-[hovered=true]:-translate-x-1 group-data-[clicked=true]:w-2.5 group-data-[clicked=true]:translate-x-1" />
        
        {/* Right horizontal tick */}
        <div className="absolute right-0 h-[1.5px] bg-chartreuse-light transition-all duration-300 w-1.5 translate-x-0 group-data-[hovered=true]:w-1.5 group-data-[hovered=true]:translate-x-1 group-data-[clicked=true]:w-2.5 group-data-[clicked=true]:-translate-x-1" />
      </div>

      {/* 3. Morphing HUD Ring (Glows and snaps to element bounds) */}
      <div 
        ref={ringRef}
        className="absolute top-0 left-0 border border-chartreuse-light/30 bg-chartreuse-light/[0.04] shadow-[0_0_15px_rgba(204,255,0,0.15)] pointer-events-none"
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          transform: "translate3d(-50%, -50%, 0)",
          opacity: 0,
        }}
      />

      {/* 4. Floating HUD Text (positioned underneath the reticle/element) */}
      <div 
        ref={textRef}
        className="absolute transition-all duration-300 flex flex-col items-center opacity-0 pointer-events-none"
        style={{
          transform: "translate3d(0, 24px, 0) translate3d(-50%, 0, 0)",
        }}
      >
        <span 
          ref={textSpanRef}
          className="text-[6px] font-mono font-bold text-white tracking-[0.2em] uppercase bg-black/80 border border-white/10 px-1.5 py-0.5 rounded shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
        />
      </div>
    </div>
  );
}
