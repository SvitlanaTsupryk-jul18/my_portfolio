import { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Billboard, Html } from "@react-three/drei";
import { suspend } from "suspend-react";
import { sections } from "./Section";
const inter = import("@pmndrs/assets/fonts/inter_regular.woff");

export function ActiveCard({ active, setActive, ...props }) {
  const refHtml = useRef();
  const refInnerHtml = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (refHtml.current) {
      setIsVisible(active !== null && true);
      refInnerHtml.current.style.backgroundColor =
        sections[active]?.color || "#008080";
    }
  }, [active]);

  const SectionInfo = sections[active]?.name;

  const { gl } = useThree();

  const handleClick = (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) {
      setActive(null);
    }
  };

  return (
    <Billboard className="billboard" {...props}>
      <Html
        ref={refHtml}
        transparent
        transform
        portal={{ current: gl.domElement.parentNode }}
        className={`wrapperHtml ${isVisible ? "visible" : ""}`}
        position={[0, 0.5, 0]}
        rotation={[0, 0, 0]}
        scale={0.5}
        font={suspend(inter).default}
        fontSize={0.5}
        anchorX="left"
      >
        <div
          style={{ transform: "scale(2)" }}
          onClick={handleClick}
          className="innerHtml"
          ref={refInnerHtml}
        >
          {SectionInfo && <SectionInfo />}
        </div>
      </Html>
    </Billboard>
  );
}
