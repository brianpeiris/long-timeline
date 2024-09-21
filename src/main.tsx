import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";

import { App } from "./App";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Canvas
    orthographic
    camera={{
      position: [0, 0, 50],
      zoom: 50,
      near: 0.01,
      far: 10000,
      up: [0, 0, 1],
    }}
  >
    <App />
  </Canvas>,
);
