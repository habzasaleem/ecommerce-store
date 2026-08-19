# 3D Product Viewer — FE-10

## What I built

A 3D product viewer for the store, built with React Three Fiber. The product is a mug — modeled directly in code using a cylinder (body) and a torus (handle), rather than a downloaded 3D file. Users can drag to rotate the mug, pinch/scroll to zoom, and tap one of three color swatches to change the mug's material color in real time.

The viewer is lazy-loaded using Next.js `dynamic()` with `ssr: false`, so the Three.js/R3F code is split into its own chunk and only downloaded when the component actually mounts, not bundled into the main page. It also checks `prefers-reduced-motion` before rendering anything 3D — if that accessibility setting is on, the page shows a static fallback (a plain colored circle with explanatory text) instead of loading the 3D scene at all.

## Interaction

Beyond orbit/rotate, tapping a color swatch updates the mug's `meshStandardMaterial` color via React state — a real material swap, not just camera movement.

## Performance note

Tested on the live Vercel deployment (not localhost) using Chrome DevTools:

- **20 requests, 456 kB transferred, 1.9 MB uncompressed resources**
- **Load: 562ms, DOMContentLoaded: 278ms**
- **INP (interaction responsiveness): 48ms** — well under the 200ms "good" threshold, meaning dragging the mug feels instant
- **CLS: 0** — no layout shift as the page loads

What kept it light: building the mug from primitive geometry (cylinder + torus) in code instead of importing a `.glb` model file meant there was no model asset to download or compress at all — the entire 3D scene ships as JavaScript. I initially used `Environment preset="apartment"` from drei for realistic reflections, but it fetches an external HDRI lighting image over the network, which caused the scene to fail/disappear inconsistently. I removed it and replaced it with manual `ambientLight` + two `directionalLight`s instead, which removed the external dependency and made rendering more reliable, especially on mobile.

I also removed a `navigator.deviceMemory` check I'd originally added to detect low-power devices — it was flagging normal phones as low-memory and blocking the 3D scene unnecessarily. The fallback now only triggers on the actual `prefers-reduced-motion` signal, which is the behavior that matters for accessibility.

## Mobile testing

Tested on two physical Android phones over the live Vercel URL (not local dev server, to avoid Wi-Fi/firewall inconsistencies). Drag-to-rotate, pinch-to-zoom, and color-swap tap all worked correctly. No visible stutter or device heating during a sustained 30-60 second interaction session.

## What I'd add with more time

- Real FPS profiling captured directly on a mobile device rather than desktop DevTools emulation
- A wider color/material palette, including a wireframe or metalness/roughness toggle
- Integrating the viewer into an actual product page in the store (currently on a standalone test route) so it's a live storefront feature rather than an isolated demo
- Swapping the code-built mug for a real downloaded/compressed `.glb` model of an actual product, to compare load impact against the code-generated version