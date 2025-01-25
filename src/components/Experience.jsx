import { CircularImages } from "./CircularImages";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import artistsData from "./art-data.json";

export const Experience = ({ onImageClick }) => {
  const blockingPlaneRef = useRef();
  const { camera } = useThree();
  const totalArtists = artistsData.artists.first.length;

  // Validate group configurations
  const groups = [
    { start: 0, count: 19, yPos: 1.6 },
    { start: 19, count: 19, yPos: 0, reverse: true },
    { start: 38, count: 19, yPos: -1.6 }
  ].map((config) => ({
    ...config,
    start: Math.min(config.start, totalArtists),
    count: Math.min(config.count, totalArtists - config.start)
  }));

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

      <mesh ref={blockingPlaneRef} position={[0, 0, 0]} raycast={() => {}}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="black" />
      </mesh>

      {groups.map((group, i) => (
        <group key={`group-${i}`} position={[0, group.yPos, 0]}>
          <CircularImages
            radius={6} // Increased radius for better spacing
            count={group.count}
            startIndex={group.start}
            reverse={group.reverse}
            artistsData={artistsData}
            onImageClick={onImageClick}
          />
        </group>
      ))}
    </>
  );
};

export default Experience;
