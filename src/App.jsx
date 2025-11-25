import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Leva } from "leva";
import { Bvh } from "@react-three/drei";
import { Loader } from "./components/Loader";

export const App = () => (
  <Suspense fallback={<Loader />}>
    <Canvas dpr={[1, 1.5]} fallback={<div>Sorry no WebGL supported!</div>}>
      <Bvh>
        <Experience />
      </Bvh>
      <Leva hidden />
    </Canvas>
  </Suspense>
);
