"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import MugFallback from "./MugFallback";

const ProductViewer = dynamic(() => import("./ProductViewer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#9CA0B3",
      }}
    >
      Loading 3D viewer…
    </div>
  ),
});

export default function ProductViewerLoader() {
  const [canRender3D, setCanRender3D] = useState(false);

useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    setCanRender3D(true);
  }, []);

  if (!canRender3D) {
    return <MugFallback />;
  }

  return <ProductViewer />;
}