import * as THREE from "three";

// Soft radial gradient shared by all blob shadows (created once)
let blobTexture;
function getBlobTexture() {
  if (blobTexture) return blobTexture;
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  blobTexture = new THREE.CanvasTexture(canvas);
  return blobTexture;
}

// Flat blurred spot lying under a figure. Cheap fake shadow without lights
export function BlobShadow({ size = 2.2, opacity = 0.35, color = "#0f4857", ...props }) {
  return (
    <mesh rotation-x={-Math.PI / 2} raycast={() => null} {...props}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        map={getBlobTexture()}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
