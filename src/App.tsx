import { useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { MapControls, Plane, Text } from "@react-three/drei";

const events = [
  { name: "Earth forms", date: -4_600_000_000 },
  { name: "Cellular life", date: -3_800_000_000 },
  { name: "First plants", date: -3_000_000_000 },
  { name: "Cambrian explosion", date: -538_000_000 },
  { name: "Extinction event", date: -66_000_000 },
  { name: "Stone tools", date: -3_300_000 },
  { name: "Australopithecus", date: -3_200_000 },
  { name: "Homo habilis", date: -2_300_000 },
  { name: "Homo erectus", date: -1_600_000 },
  { name: "Neanderthals", date: -600_000 },
  { name: "Homo sapiens", date: -300_000 },
  { name: "Cave paintings", date: -50000 },
  { name: "Natufian culture", date: -12000 },
  { name: "Gobekli Tepe", date: -9500 },
  { name: "Cuneform", date: -3300 },
  { name: "Initial stonehenge", date: -3000 },
  { name: "First pyramid", date: -2600 },
  { name: "Stonehenge", date: -2200 },
  { name: "Last mammoths", date: -2000 },
  { name: "Mycenaean", date: -1700 },
  { name: "Last pyramid", date: -1500 },
  { name: "Bronze age collapse", date: -1200 },
  { name: "Nok Culture", date: -1000 },
  { name: "Kushites", date: -780 },
  { name: "Confucius", date: -500 },
  { name: "Ancient Great Wall", date: -440 },
  { name: "Aristotle", date: -340 },
  { name: "Cleopatra", date: -40 },
  { name: "Marcus Aurelius", date: 160 },
  { name: "Constantine Byzantium", date: 330 },
  { name: "Fall of Rome", date: 476 },
  { name: "Aryabhata mathematician", date: 500 },
  { name: "Bagan, Burma", date: 900 },
  { name: "Angkor Wat", date: 1150 },
  { name: "Lalibela, Ethiopia", date: 1200 },
  { name: "Machu Picchu", date: 1400 },
  { name: "Modern Great Wall", date: 1500 },
  { name: "Eiffel tower", date: 1888 },
  { name: "Man on moon", date: 1969 },
  { name: "Now", date: 2024 },
];
const first = events[0].date;
const range = events[events.length - 1].date - events[0].date;

export function Marker({ children, zoom, ...props }) {
  const scale = (1 / zoom) * 20;
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

export function App() {
  const camera = useThree((state) => state.camera);
  const [zoom, setZoom] = useState(1);
  useFrame(() => {
    setZoom(camera.zoom);
  });
  return (
    <>
      <MapControls />
      <Plane
        args={[range / 100, 2 / zoom]}
        position={[range / 100 / 2 + first / 100, 0, 0]}
      ></Plane>
      {events.map((event, i) => (
        <Marker key={i} position={[event.date / 100, 0, 0]} zoom={zoom}>
          {event.date} - {event.name}
        </Marker>
      ))}
    </>
  );
}
