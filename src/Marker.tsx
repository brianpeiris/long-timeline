import { Plane, Text } from "@react-three/drei";

export function Marker({ children, zoom, ...props }) {
  const scale = 1 / zoom * 20;
  return (
    <group {...props}>
      <Plane args={[0.1 * scale, 2 * scale]}></Plane>
      <Text
        position={[0, 1.5 * scale, 0]}
        rotation={[0, 0, 45]}
        scale={[scale, scale, scale]}
        anchorX="left"
      >
        {children}
      </Text>
    </group>
  );
}
