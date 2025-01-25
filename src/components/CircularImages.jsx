import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Image, useScroll } from "@react-three/drei";
import { easing } from "maath";

export const CircularImages = ({
  radius = 10,
  count = 20,
  startIndex = 0,
  reverse = false,
  onImageClick,
  artistsData
}) => {
  const groupRef = useRef();
  const imagesRef = useRef([]);
  const scroll = useScroll();
  const hoverState = useRef(Array(count).fill(false));

  useFrame((state, delta) => {
    // Rotation logic remains the same
    easing.damp(
      groupRef.current.rotation,
      "y",
      (reverse ? 1 : -1) * scroll.offset * Math.PI * 2,
      0.5,
      delta
    );

    // Scale animation with proper index mapping
    imagesRef.current.forEach((image, localIndex) => {
      if (!image) return;

      const globalIndex = startIndex + localIndex;
      const isHovered = hoverState.current[localIndex];

      const baseAngle = (localIndex / count) * Math.PI * 2;
      const currentAngle =
        (baseAngle + groupRef.current.rotation.y) % (Math.PI * 2);
      const angleToCamera = Math.abs(
        Math.atan2(Math.sin(currentAngle), Math.cos(currentAngle))
      );

      // Scale based on both camera angle and hover state
      const targetScale = isHovered
        ? 1.5
        : 1.2 + Math.cos(angleToCamera * 2) * 0.3;

      easing.damp(image.scale, "x", targetScale, 0.3, delta);
      easing.damp(image.scale, "y", targetScale, 0.3, delta);
    });
  });

  const artistsToShow = artistsData.artists.first.slice(
    startIndex,
    startIndex + count
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {artistsToShow.map((artist, localIndex) => {
        const globalIndex = startIndex + localIndex;
        const angle = (localIndex / count) * Math.PI * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <Image
            key={`image-${globalIndex}`}
            ref={(el) => (imagesRef.current[localIndex] = el)}
            url={artist.image}
            scale={1}
            position={[x, 0, z]}
            rotation={[0, angle + Math.PI, 0]}
            transparent
            side={THREE.DoubleSide}
            onClick={() => onImageClick(artist)}
            onPointerOver={(e) => {
              e.stopPropagation();
              hoverState.current[localIndex] = true;
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              hoverState.current[localIndex] = false;
              document.body.style.cursor = "auto";
            }}
          />
        );
      })}
    </group>
  );
};
