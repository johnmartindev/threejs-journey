import {
  MeshReflectorMaterial,
  Float,
  Text,
  Html,
  PivotControls,
  TransformControls,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();
  const sphere = useRef();

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh ref={cube} position-x={0} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="ivory" dithering="true" />
      </mesh>

      <TransformControls object={cube} />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10} scale-x={30}>
        <planeGeometry />
        <MeshReflectorMaterial
          dithering={true}
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.8}
          color="#111"
        />
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          color="salmon"
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          JJM
        </Text>
      </Float>
    </>
  );
}
