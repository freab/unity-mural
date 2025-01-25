import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, useProgress } from "@react-three/drei";
import { Experience } from "./components/Experience";

function Loader({ setProgress }) {
  const { progress } = useProgress();
  useEffect(() => {
    setProgress(progress);
  }, [progress]);
  return null;
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      {/* Loading Screen */}
      {!loaded && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#111",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 1s ease",
            opacity: progress === 100 ? 0 : 1,
            pointerEvents: "none"
          }}
        >
          <div
            style={{
              width: "120px",
              height: "2px",
              background: "rgba(255,255,255,0.1)",
              marginBottom: "1rem"
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "white",
                transition: "width 0.3s ease"
              }}
            />
          </div>
          <div
            style={{
              color: "white",
              fontSize: "0.8rem",
              fontFamily: "Inter, sans-serif",
              letterSpacing: "0.1em"
            }}
          >
            LOADING {Math.round(progress)}%
          </div>
        </div>
      )}

      {/* Fixed UI Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          padding: "2rem",
          boxSizing: "border-box",
          fontFamily: "'Inter', sans-serif",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease"
        }}
      >
        {/* Description Text */}
        <div
          style={{
            position: "absolute",
            bottom: "2%",
            left: "2%",
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
              letterSpacing: "-0.02em",
              lineHeight: 1.2
            }}
          >
            The Unity Project Mural
          </h2>
          <p
            style={{
              fontSize: "0.75rem",
              lineHeight: 1.5,
              opacity: 0.8,
              margin: 0,
              fontWeight: 500,
              letterSpacing: "0.01em"
            }}
          >
            The Unity Project Mural is a diverse and collaborative art
            initiative, inviting people to contribute their artistic expressions
            in a way that interlinks with surrounding artworks. illustrating how
            we are all intertwined and connected through various facets of life.
            The artwork featured in this project stems from a vibrant and
            diverse global creative community, showcasing rich and complex art
            styles and concepts. .
          </p>
        </div>

        {/* Project Link */}
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
            borderRadius: "50px",
            backdropFilter: "blur(5px)",
            background: "rgba(0,0,0,0.1)"
          }}
          onMouseOver={(e) => {
            e.target.style.color = "rgba(255,255,255,1)";
            e.target.style.borderColor = "rgba(255,255,255,0.8)";
          }}
          onMouseOut={(e) => {
            e.target.style.color = "rgba(255,255,255,0.8)";
            e.target.style.borderColor = "rgba(255,255,255,0.3)";
          }}
        >
          Visit Original Project →
        </a>
      </div>

      {/* Main Canvas */}
      <Canvas
        style={{ position: "relative", zIndex: 0 }}
        shadows
        camera={{ position: [0, 0, 20], fov: 30 }}
        onCreated={() => setTimeout(() => setLoaded(true), 1000)}
      >
        <Loader setProgress={setProgress} />
        <color attach="background" args={["#111111"]} />
        <ScrollControls pages={5} damping={0.1}>
          <Experience />
        </ScrollControls>
      </Canvas>
    </div>
  );
}

export default App;
