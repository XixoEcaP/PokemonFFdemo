const Map = ({ id, tiles, events }) => {
    return {
      id,
      tiles, // A 2D array representing the map (0 = walkable, 1 = non-walkable)
      events, // Events like map transitions
    };
  };
  
  export default Map;
  
  