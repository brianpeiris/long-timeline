import React, { useEffect, useState } from "react";
import { useThree, useFrame, GroupProps } from "@react-three/fiber";
import { Image, MapControls, Plane, Text } from "@react-three/drei";

import events from "./events";

const first = events[0].date;
const range = events[events.length - 1].date - events[0].date;

function formatDate(date: number) {
  if (date >= 0) {
    return `${date} CE`;
  } else if (date > -10000) {
    return `${-date} BCE`;
  } else {
    return `${(-date).toLocaleString()} BCE`;
  }
}

interface MarkerProps extends GroupProps {
  children: React.ReactNode;
  link?: string;
  image?: string;
  zoom: number;
  onActiveChanged: (active: boolean) => void;
  active: boolean;
}

export function Marker({
  children,
  link,
  image,
  zoom,
  onActiveChanged,
  active,
  ...props
}: MarkerProps) {
  const scale = (1 / zoom) * 20;
  return (
    <group {...props}>
      <Plane args={[0.1 * scale, 2 * scale]}></Plane>
      <Text
        position={[0, 1.5 * scale, 0]}
        rotation={[0, 0, 45]}
        scale={[scale, scale, scale]}
        anchorX="left"
        onPointerOver={() => onActiveChanged(true)}
        onPointerOut={() => onActiveChanged(false)}
        onPointerUp={() => link && window.open(link)}
        color={active ? "red" : "white"}
      >
        {children}
      </Text>
      {active && image && (
        <>
          <Plane
            rotation={[0, 0, Math.PI / 4]}
            position={[0, -4.8 * scale, 0]}
            scale={5 * scale}
          />
          <Plane
            position={[0, -8.0 * scale, 0]}
            scale={10.4 * scale}
          />
          <Image
            url={`/images/${image}`}
            scale={10 * scale}
            position={[0, -8 * scale, 0.1]}
          />
        </>
      )}
    </group>
  );
}

export function App() {
  const camera = useThree((state) => state.camera);
  const [zoom, setZoom] = useState(0.0012);
  const [active, setActive] = useState<number | null>(null);
  useFrame(() => setZoom(camera.zoom));
  useEffect(() => {
    camera.zoom = zoom;
    camera.updateProjectionMatrix();
  }, []);
  useEffect(() => {
    document.body.style.cursor = active === null ? "auto" : "pointer";
  }, [active]);
  function handleMarkerActiveChanged(i: number, newActive: boolean) {
    setActive((active) => (newActive ? i : active === i ? null : active));
  }
  const dateScale = 100;
  const numParts = 200;
  const partWidth = range / dateScale / numParts;
  const baselineParts = Array.from({ length: numParts }, (_, i) => (
    <Plane
      key={i}
      args={[partWidth, 2 / zoom]}
      position={[i * partWidth + first / dateScale + partWidth / 2, 0, 0]}
    ></Plane>
  ));
  return (
    <>
      <MapControls enableRotate={false} zoomSpeed={2} />
      {baselineParts}
      {events.map((event, i) => (
        <Marker
          key={i}
          position={[event.date / dateScale, 0, 0]}
          zoom={zoom}
          onActiveChanged={(newActive) =>
            handleMarkerActiveChanged(i, newActive)
          }
          active={active === i}
          link={event.link}
          image={event.image}
        >
          {formatDate(event.date)} - {event.name}
        </Marker>
      ))}
    </>
  );
}
