import * as THREE from "three";
import { useRef } from "react";
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
  const position = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    easing.damp(
      groupRef.current.rotation,
      "y",
      (reverse ? 1 : -1) * scroll.offset * Math.PI * 2,
      0.5,
      delta
    );

    imagesRef.current.forEach((image, localIndex) => {
      if (!image) return;

      // Calculate scale
      const baseAngle = (localIndex / count) * Math.PI * 2;
      const currentAngle =
        (baseAngle + groupRef.current.rotation.y) % (Math.PI * 2);
      const angleToCamera = Math.abs(
        Math.atan2(Math.sin(currentAngle), Math.cos(currentAngle))
      );
      const scale = 1.2 + Math.cos(angleToCamera * 2) * 0.3;

      easing.damp(image.scale, "x", scale, 0.3, delta);
      easing.damp(image.scale, "y", scale, 0.3, delta);

      // Calculate visibility
      const angle = (localIndex / count) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const z = Math.cos(angle) * radius;

      position.current.set(x, 0, z);
      position.current.applyMatrix4(groupRef.current.matrixWorld);

      // Update visibility state
      const isVisible = position.current.z >= 0;
      image.visible = isVisible;
      image.userData.visible = isVisible;
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
            key={`${artist.image}-${globalIndex}`}
            ref={(el) => (imagesRef.current[localIndex] = el)}
            url={artist.image}
            scale={1}
            position={[x, 0, z]}
            rotation={[0, angle + Math.PI, 0]}
            transparent
            side={THREE.DoubleSide}
            onClick={(e) => {
              if (e.object.userData.visible) {
                onImageClick(artist, globalIndex);
              }
            }}
            onPointerOver={(e) => {
              if (e.object.userData.visible) {
                document.body.style.cursor = "pointer";
              }
            }}
            onPointerOut={() => {
              document.body.style.cursor = "auto";
            }}
          />
        );
      })}
    </group>
  );
};
