# 🪐 NOVA AUDIO | Flagship Aether-X Digital Campaign

An immersive, cinematic product storytelling experience for **Nova Audio**, a fictional elite audio technology brand. The digital campaign showcases the flagship Aether-X headphones through hyper-responsive user interfaces, real-time WebGL shading, and physics-driven component interactions.

Designed to mirror the high-end industrial engineering of luxury chronographs (e.g., Richard Mille) and the aerodynamic curves of concept supercars, the experience delivers a premium product showcase directly on load.

---

## 🎨 Visual Identity & Theme System

The design utilizes a high-contrast, minimalist dark mode overlayed with premium tactile controls and glowing HUD widgets.

*   **Color Palette:**
    *   **Accent:** `#ccff00` (Luxury Sport Chartreuse / Acid Gold) — Represents high-voltage power and technical edge.
    *   **Secondary Accent:** `#82a600` (Forest Lime-Gold) — Used for depth mapping and subtle glows.
    *   **Metal Chrome:** `#cbd5e1` (Titanium Slate) — For structures and engineering highlights.
    *   **Backdrop:** `#020204` (Pitch Black) with `#080a0f` (Dark Graphite) card overlays.
*   **Typography:**
    *   *Headings:* `Syne` (Geometric, technical sans-serif) for high typographic impact.
    *   *Subheaders:* `Cinzel` (Luxurious editorial serif) to convey prestige.
    *   *Body:* `Inter` (Minimalist sans-serif) for clean readability.
*   **Texture:** A custom procedural SVG fractal noise overlay simulates premium camera grain, giving the application a cinema-grade feel.

---

## 🚀 Immersive Interactive Features

### 1. Custom Reticle Cursor (`CustomCursor.jsx`)
*   **Aesthetic:** Inspired by military camera viewfinders and high-performance camera target reticles.
*   **States & Mechanics:**
    *   *Default:* A fine crosshair (`+` ticks) wrapping a central dot, tracking the cursor with spring physics.
    *   *Hover:* When hovering over interactive items, the reticle scales up, rotates 45 degrees into an `x`, and casts a rotating circular HUD ring with action labels (e.g., `VIEW`, `DRAG`, `SPIN`).
    *   *Active:* Clamps down tightly and contracts 90 degrees on click events, providing simulated haptic shutter feedback.
*   **Device Safety:** Automatically disables on touch viewports to preserve default mobile gesture mechanics.

### 2. Interactive 3D Brand Logo (`Logo3D.jsx`)
*   **Aesthetic:** A WebGL Torus Knot representing infinite sound and loop harmonics.
*   **Material Shading:** Crafted in vanilla Three.js using high metalness (`0.95`), low roughness, and a clearcoat lacquer layer to cast liquid-titanium reflections.
*   **Interactivity:**
    *   Slow-rotates on idle to catch background lighting.
    *   Detects cursor position to rotate on the X and Y axes, reflecting a cursor-linked light source across the metallic surface.

### 3. Exploded Assembly Workbench (`ProductExperience.jsx`)
*   **Aesthetic:** An industrial blueprint schematic representing the physical layers of the Aether-X.
*   **Slider Control:** Dragging a manual slider (from `0%` to `100%`) translates the components outward in space, demonstrating the engineering behind the headband, carbon fiber enclosure, N52 bio-cellulose drivers, and memory foam ear cushions.
*   **Hotspot Tooltips:** High-performance hotspots are placed along the exploded components. Clicking any hotspot reveals granular performance specifications and material compositions.

### 4. Proximity-Reactive Soundwave (`SoundwaveCanvas.jsx`)
*   **Aesthetic:** Quantum sound field visualizer.
*   **Mechanics:** Uses a high-performance HTML5 Canvas rendering multiple bezier-curved sine waves.
*   **Cursor Tracking:** Wave amplitude and phase velocity accelerate and swell as the cursor draws near, simulating tactile sonic pressure.

### 5. Cohesive Interactive Underlays
*   *Link Underline Reveal:* Header links project a chartreuse line expanding symmetrically from the center out on hover.
*   *Button Light Sweep:* CTA buttons project a diagnostic diagonal sweep light gradient on cursor entry.
*   *Card Uplift:* Spec cards float up `-4px` and project a chartreuse ambient glow when focused.

---

## 📂 Architecture & Component Mapping

```bash
src/
├── components/
│   ├── CustomCursor.jsx        # Precision target reticle cursor (coordinates, hovers, states)
│   ├── Logo3D.jsx              # Three.js WebGL reflective brand monument
│   ├── SoundwaveCanvas.jsx     # Canvas element displaying mouse-responsive audio wave lines
│   ├── LenisScroll.jsx         # Inertial scroll wrapper initializing Lenis scroll physics
│   ├── Hero.jsx                # Typographic intro monogram and floating product campaign
│   ├── BrandStory.jsx          # Editorial philosophy layout with grid hover cards
│   ├── ProductExperience.jsx   # Interactive slider-driven exploded mechanical view
│   ├── Technology.jsx          # Custom silicon and ANC detailed specifications
│   ├── CaseStudy.jsx           # Performance monitor dashboard & campaign brief
│   ├── Testimonials.jsx        # Professional reviews from artists & sound engineers
│   ├── CTA.jsx                 # Allocation queue signup and serial locking field
│   └── Footer.jsx              # Navigation directory with lower ambient glow lines
├── App.jsx                     # Core application orchestrator and scroll controller
├── index.css                   # Custom Tailwind v4 styling definitions & grain maps
└── main.jsx                    # React bootstrap entry point
```

---

## 💻 Local Development Setup

### 1. Prerequisites
Verify that [Node.js](https://nodejs.org/) (v18+) is installed on your computer.

### 2. Dependency Installation
Initialize the dependencies using `npm`:
```bash
npm install
```

### 3. Running the Development Server
Launch the local dev environment with hot-module replacement (HMR):
```bash
npm run dev
```
Open **[http://localhost:5174/](http://localhost:5174/)** in your web browser.

### 4. Build for Production
To build highly optimized, production-ready static assets:
```bash
npm run build
```
The minified bundles and static assets will output to the `/dist` directory, ready for deployment.

---

## ⚡ Performance & Mobile Optimizations

To ensure cinematic visuals do not compromise accessibility and performance:
1.  **Lenis Scroll Decoupling:** Smooth scroll physics are managed outside of the main layout flow to prevent scroll-jacking lagging on resource-intensive screens.
2.  **GPU-Accelerated Transforms:** All animations and transitions use CSS properties that trigger hardware acceleration (like `transform` and `opacity`) rather than layout-triggering properties.
3.  **Exploded View Bounds-Check:** The mechanical disassembly frame uses fixed aspect containers that resize gracefully on mobile devices (e.g., iPhone SE), preventing layout breaks.
4.  **Touch Viewport Bypasses:** High-latency event listeners (like the custom cursor trailing loop) are completely bypassed on touch devices to conserve battery and CPU resources.
