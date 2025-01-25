import { CircularImages } from "./CircularImages";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import artistsData from "./art-data.json";

export const Experience = ({ onImageClick }) => {
  const blockingPlaneRef = useRef();
  const { camera } = useThree();

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

  // Validate indices don't exceed data length
  const totalArtists = artistsData.artists.first.length;
  const indices = [
    { start: 0, count: 19, yPos: 1.6 },
    { start: 19, count: 19, yPos: 0, reverse: true },
    { start: 38, count: 19, yPos: -1.6 }
  ].map(({ start, count, ...rest }) => ({
    start: Math.min(start, totalArtists),
    count: Math.min(count, totalArtists - start),
    ...rest
  }));

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

      {indices.map(({ start, count, yPos, reverse }, i) => (
        <group key={`group-${i}`} position={[0, yPos, 0]}>
          <CircularImages
            radius={5}
            count={count}
            startIndex={start}
            reverse={reverse}
            artistsData={artistsData}
            onImageClick={onImageClick}
          />
        </group>
      ))}
    </>
  );
};

export default Experience;
