import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./components/Experience";
import "./index.css";

export default function App() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Canvas
        style={{ position: "relative", zIndex: 1 }}
        shadows
        camera={{ position: [0, 0, 20], fov: 30 }}
      >
        <color attach="background" args={["#111111"]} />
        <ScrollControls pages={5} damping={0.1}>
          <Experience />
        </ScrollControls>
      </Canvas>

      {/* UI Overlay */}
      <div className="ui-overlay">
        <div className="text-content">
          <h2 className="title">The Unity Project Mural</h2>
          <p className="description">
            The Unity Project Mural is a diverse art project where people's art
            connects, showing our interconnectedness. Its art comes from a
            global community, showcasing rich styles.
          </p>
        </div>

        <a
          href="https://www.unitymural.art/"
          target="_blank"
          rel="noopener noreferrer"
          className="project-link"
        >
          Visit Original Project →
        </a>
      </div>
    </div>
  );
}
