"use client";

import { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";

const COLORS = [
  { name: "Indigo", hex: "#6C63FF" },
  { name: "Charcoal", hex: "#0A0A12" },
  { name: "Cream", hex: "#F5F5F7" },
];

function Mug({ color }) {
  const groupRef = useRef();

  return (
    <group ref={groupRef}>
      {/* mug body */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.8, 0.8, 1.6, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* handle */}
      <mesh position={[1, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.4, 0.12, 16, 32]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  );
}

export default function ProductViewer() {
  const [color, setColor] = useState(COLORS[0].hex);

  return (
    <div style={{ width: "100%", height: "500px", position: "relative" }}>
        <Canvas camera={{ position: [3, 2, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        

        <Mug color={color} />

        <OrbitControls
          enablePan={false}
          minDistance={2.5}
          maxDistance={6}
        />
      </Canvas>

      {/* color picker */}
      <div
        style={{
          position: "absolute",
          bottom: "16px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          background: "rgba(10,10,18,0.7)",
          padding: "10px 14px",
          borderRadius: "999px",
        }}
      >
        {COLORS.map((c) => (
          <button
            key={c.hex}
            onClick={() => setColor(c.hex)}
            aria-label={`Set color to ${c.name}`}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              backgroundColor: c.hex,
              border: color === c.hex ? "2px solid #F5F5F7" : "2px solid transparent",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </div>
  );
}