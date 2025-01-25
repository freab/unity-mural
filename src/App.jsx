import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./components/Experience";

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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
          padding: "2rem",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "5%",
            maxWidth: "400px",
            color: "white",
            pointerEvents: "auto",
            mixBlendMode: "difference"
          }}
        >
          <h2
            style={{
              fontSize: "1.2rem",
              marginBottom: "1rem",
              fontWeight: 500,
              letterSpacing: "-0.02em"
            }}
          >
            The Unity Project Mural
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.5,
              opacity: 0.8,
              margin: 0,
              fontWeight: 300
            }}
          >
            A collaborative art initiative where individual expressions
            interlink with surrounding artworks, narrating the story of human
            connections.
          </p>
        </div>

        <a
          href="https://www.unitymural.art/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "absolute",
            bottom: "2rem",
            right: "2rem",
            color: "rgba(255,255,255,0.8)",
            fontSize: "0.8rem",
            textDecoration: "none",
            pointerEvents: "auto",
            transition: "all 0.3s ease",
            padding: "0.5rem 1rem",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "50px"
          }}
        >
          Visit Original Project →
        </a>
      </div>
    </div>
  );
}
