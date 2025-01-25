import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import Experience from "./components/Experience";
import "./index.css";
import artData from "./components/art-data.json";

const InstagramIcon = () => (
  <svg className="instagram-icon" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [showImageOverlay, setShowImageOverlay] = useState(false);

  const handleImageClick = (url) => {
    const imageNumber = url.match(/(\d+)\.png$/)[1];
    const artist = artData.artists.first.find(
      (item) => item.image === `art${imageNumber}`
    );
    setSelectedImage(url);
    setSelectedArtist(artist);
    setShowImageOverlay(true);
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <Canvas
        style={{ position: "relative", zIndex: 1 }}
        shadows
        camera={{ position: [0, 0, 20], fov: 30 }}
      >
        <color attach="background" args={["#111111"]} />
        <ScrollControls pages={5} damping={0.1}>
          <Experience onImageClick={handleImageClick} />
        </ScrollControls>
      </Canvas>

      {showImageOverlay && (
        <div className="image-overlay">
          <div className="image-container">
            <button
              className="close-button"
              onClick={() => setShowImageOverlay(false)}
            >
              ×
            </button>
            <img src={selectedImage} alt="Selected artwork" />
            {selectedArtist && (
              <div className="artist-info">
                <h3>{selectedArtist.artist}</h3>
                <a
                  href={`https://instagram.com/${selectedArtist.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-link"
                >
                  <InstagramIcon />@{selectedArtist.handle}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

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
