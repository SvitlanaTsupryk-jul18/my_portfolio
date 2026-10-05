import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, useCursor } from "@react-three/drei";
import { easing } from "maath";
import { useControls } from "leva";

const GeometryMap = {
  boxGeometry: THREE.BoxGeometry,
  sphereGeometry: THREE.SphereGeometry,
  torusKnotGeometry: THREE.TorusKnotGeometry,
  dodecahedronGeometry: THREE.DodecahedronGeometry,
  icosahedronGeometry: THREE.IcosahedronGeometry,
  torusGeometry: THREE.TorusGeometry,
};

export function Ball({ isActive, sectionGeometry, params, color, ...props }) {
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Create the geometry once instead of on every render (e.g. on each hover)
  const geometryInstance = useMemo(
    () => new GeometryMap[sectionGeometry](...params),
    [sectionGeometry, params]
  );

  // Free GPU memory when the geometry is replaced or the ball unmounts
  useEffect(() => () => geometryInstance.dispose(), [geometryInstance]);

  const onHover = () => {
    setIsHovered(true);
  };

  useFrame((state, delta) => {
    if (isHovered) {
      easing.damp(ref.current.material, "metalness", 0.5, 0.1, delta);
    } else {
      easing.damp(ref.current.material, "metalness", 0, 0.1, delta);
    }
  });
  useCursor(isHovered);

  const config = useControls("balls", {
    ballsColor: "green",
    ballsMetallness: { value: 0, min: 0, max: 1, step: 0.01 },
    ballsRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
    ballsTransparent: true,
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.45, min: 0, max: 5, step: 0.01 },
    thickness: { value: 2.5, min: 0, max: 5, step: 0.01 },
    ballsOpacity: { value: 1, min: 0, max: 1, step: 0.01 },
    reflectivity: { value: 0.05, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    sparclesCount: { value: 30, min: 0, max: 100, step: 10 },
    sparclesSize: { value: 2, min: 0, max: 10, step: 0.1 },
    sparclesSpeed: { value: 1, min: 0, max: 10, step: 0.1 },
    glowIntensity: { value: 2.5, min: 0, max: 6, step: 0.1 },
  });

  return (
    <mesh
      onPointerOver={onHover}
      onPointerOut={() => setIsHovered(false)}
      {...props}
      ref={ref}
      geometry={geometryInstance}
    >
      <meshPhysicalMaterial
        needsUpdate={true}
        color={color}
        metalness={config.ballsMetallness}
        roughness={config.ballsRoughness}
        transparent={config.ballsTransparent}
        transmission={config.transmission}
        ior={config.ior}
        opacity={config.ballsOpacity}
        thickness={config.thickness}
        reflectivity={config.reflectivity}
        clearcoat={config.clearcoat}
        clearcoatRoughness={config.clearcoatRoughness}
        // Glow in the figure's own color. Intensity must push it above the Bloom threshold
        emissive={color}
        emissiveIntensity={isActive ? config.glowIntensity : 0}
      />

      {isActive && (
        <Sparkles
          color="white"
          opacity={0.8}
          count={config.sparclesCount}
          scale={config.sparclesSize}
          size={config.sparclesSize}
          speed={config.sparclesSpeed}
        />
      )}
    </mesh>
  );
}
