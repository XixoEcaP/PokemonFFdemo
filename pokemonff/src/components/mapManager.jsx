import { useEffect } from 'react';

const MapManager = ({ playerPosition, map, onMapChange }) => {
  useEffect(() => {
    const currentTileEvent = map.events.find(
      (event) => event.x === playerPosition.x && event.y === playerPosition.y
    );
    if (currentTileEvent && currentTileEvent.type === 'mapTransition') {
      onMapChange(currentTileEvent.targetMap);
    }
  }, [playerPosition, map, onMapChange]);

  return null; // Logic-only component
};

export default MapManager;


