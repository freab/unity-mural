import { CircularImages } from "./CircularImages";

import artistsData from "./art-data.json";

export const Experience = ({ onImageClick }) => {
  const totalArtists = artistsData.artists.first.length;

  const groups = [
    { start: 0, count: 19, yPos: 1.6 },
    { start: 19, count: 19, yPos: 0, reverse: true },
    { start: 38, count: 19, yPos: -1.6 }
  ].map((config) => ({
    ...config,
    start: Math.min(config.start, totalArtists),
    count: Math.min(config.count, totalArtists - config.start)
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

      {groups.map((group, i) => (
        <group key={`group-${i}`} position={[0, group.yPos, 0]}>
          <CircularImages
            radius={5}
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
