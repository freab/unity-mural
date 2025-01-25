import { OrbitControls } from "@react-three/drei";
import { CircularImages } from "./CircularImages";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import artistsData from "./art-data.json"; // Import the JSON data

export const Experience = ({ onImageClick }) => {
  const blockingPlaneRef = useRef();
  const { camera, size } = useThree();

  useFrame(() => {
    if (blockingPlaneRef.current) {
      const distance = camera.position.distanceTo(
        blockingPlaneRef.current.position
      );
      const height =
        2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * distance;
      const width = height * camera.aspect;

      blockingPlaneRef.current.scale.set(width, height, 1);
      blockingPlaneRef.current.quaternion.copy(camera.quaternion);
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {/* Black Blocking Plane */}
      <mesh ref={blockingPlaneRef} position={[0, 0, 0]} raycast={() => {}}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {/* Top Circle - First 19 images */}
      <group position={[0, 1.6, 0]}>
        <CircularImages
          radius={5}
          count={19}
          startIndex={0}
          artistsData={artistsData}
          onImageClick={onImageClick}
        />
      </group>

      {/* Middle Circle - Next 19 images */}
      <group position={[0, 0, 0]}>
        <CircularImages
          radius={5}
          count={19}
          startIndex={19}
          reverse={true}
          artistsData={artistsData}
          onImageClick={onImageClick}
        />
      </group>

      {/* Bottom Circle - Final 19 images */}
      <group position={[0, -1.6, 0]}>
        <CircularImages
          radius={5}
          count={19}
          startIndex={38}
          artistsData={artistsData}
          onImageClick={onImageClick}
        />
      </group>
    </>
  );
};

export default Experience;
